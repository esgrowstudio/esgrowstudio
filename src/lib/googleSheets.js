import { inquiryConfig } from "../data/inquiry-config.js";
import { createInquiryId } from "./inquiryId.js";
const ENDPOINT =
  /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/;
export function isGoogleReceiptOrigin(origin) {
  try {
    const url = new URL(origin);
    return (
      url.protocol === "https:" &&
      (url.hostname === "script.google.com" ||
        url.hostname === "script.googleusercontent.com" ||
        /^[a-z0-9-]+-script\.googleusercontent\.com$/.test(url.hostname))
    );
  } catch {
    return false;
  }
}
export function matchesReceipt(event, requestId, nonce) {
  const data = event.data;
  return (
    isGoogleReceiptOrigin(event.origin) &&
    data &&
    typeof data === "object" &&
    data.type === "esgrow:inquiry-receipt" &&
    data.requestId === requestId &&
    data.nonce === nonce
  );
}
// A normal cross-origin form POST avoids CORS preflight. Google returns a signed-in-
// independent HTML acknowledgement to this hidden frame after the Sheet write.
// We never assume success from an opaque fetch response or an iframe load event.
export function sendInquiry(
  values,
  {
    browserWindow = window,
    browserDocument = document,
    endpoint = inquiryConfig.endpoint,
    timeoutMs = inquiryConfig.timeoutMs,
  } = {},
) {
  if (!ENDPOINT.test(endpoint))
    return Promise.reject(
      new Error(
        "Enquiry delivery is not configured. Please contact the studio directly.",
      ),
    );
  if (!values.requestId)
    return Promise.reject(new Error("Please refresh the form and try again."));
  const nonce = createInquiryId();
  return new Promise((resolve, reject) => {
    const frame = browserDocument.createElement("iframe");
    frame.name = `esgrow-inquiry-${nonce}`;
    frame.title = "Enquiry delivery acknowledgement";
    frame.hidden = true;
    const form = browserDocument.createElement("form");
    form.method = "POST";
    form.action = endpoint;
    form.target = frame.name;
    form.hidden = true;
    form.enctype = "application/x-www-form-urlencoded";
    const field = browserDocument.createElement("input");
    field.type = "hidden";
    field.name = "payload";
    field.value = JSON.stringify({
      protocol: 2,
      origin: browserWindow.location.origin,
      nonce,
      inquiry: values,
    });
    form.appendChild(field);
    let settled = false;
    const cleanup = () => {
      browserWindow.clearTimeout(timer);
      browserWindow.removeEventListener("message", receive);
      frame.remove();
      form.remove();
    };
    const finish = (error, data) => {
      if (settled) return;
      settled = true;
      cleanup();
      if (error) reject(error);
      else resolve(data);
    };
    const receive = (event) => {
      if (!matchesReceipt(event, values.requestId, nonce)) return;
      if (event.data.ok === true)
        finish(null, { message: "Inquiry received." });
      else
        finish(
          new Error(
            typeof event.data.message === "string"
              ? event.data.message
              : "Your enquiry could not be saved. Please try again or contact the studio.",
          ),
        );
    };
    const timer = browserWindow.setTimeout(
      () =>
        finish(
          new Error(
            "We couldn’t confirm receipt yet. Your details are still here. You can retry or contact the studio directly.",
          ),
        ),
      timeoutMs,
    );
    browserWindow.addEventListener("message", receive);
    browserDocument.body.appendChild(frame);
    browserDocument.body.appendChild(form);
    try {
      form.submit();
    } catch {
      finish(
        new Error(
          "Unable to send your enquiry. Please check your connection and try again.",
        ),
      );
    }
  });
}
