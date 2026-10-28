import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sendInquiry } from "../lib/googleSheets.js";
import services from "../data/services.json";
import { contact } from "../data/contact.js";
import { createInquiryId } from "../lib/inquiryId.js";
const serviceNames = [
  ...services.map((s) => s.name),
  "A little bit of everything",
];
export default function InquiryForm() {
  const submitting = useRef(false);
  const requestId = useRef(null);
  if (!requestId.current) requestId.current = createInquiryId();
  const [params] = useSearchParams();
  const requestedService = services.find(
    (service) => service.slug === params.get("service"),
  );
  const [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false),
    [values, setValues] = useState({
      name: "",
      email: "",
      business: "",
      service: requestedService?.name || serviceNames[0],
      message: params.get("plan")
        ? `I'm interested in a ${params.get("plan")} engagement.\n\n`
        : "",
      website: "",
    }),
    [consent, setConsent] = useState(false);
  const update = (e) => {
    requestId.current = createInquiryId();
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  async function submit(e) {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true);
    setStatus("Sending your inquiry…");
    try {
      await sendInquiry({ ...values, consent, requestId: requestId.current });
      setStatus("Thank you. Your inquiry has been received by Esgrow Studio.");
      setValues({ ...values, name: "", email: "", business: "", message: "" });
      setConsent(false);
      requestId.current = createInquiryId();
    } catch (error) {
      setStatus(
        error instanceof TypeError
          ? "Unable to send your enquiry. You can download your brief instead."
          : error.message,
      );
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }
  function download() {
    const text = [
      "ESGROW STUDIO — PROJECT BRIEF",
      `STUDIO EMAIL: ${contact.email}`,
      `STUDIO PHONE / WHATSAPP: ${contact.phone}`,
      "",
      ...Object.entries(values)
        .filter(([k]) => k !== "website")
        .map(([key, val]) => `${key.toUpperCase()}: ${val}`),
      "",
      "Downloaded locally. This file is not a submission.",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "esgrow-project-brief.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(
      "Your brief has downloaded locally. This download does not submit your inquiry.",
    );
  }
  return (
    <form onSubmit={submit} className="inquiry-form" aria-busy={busy}>
      <fieldset disabled={busy} className="inquiry-fields">
        <label>
          Your name
          <input
            name="name"
            value={values.name}
            onChange={update}
            autoComplete="name"
            maxLength={100}
            required
            placeholder="Your name"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={update}
            autoComplete="email"
            maxLength={254}
            required
            placeholder="you@company.com"
          />
        </label>
        <label>
          Business / website
          <input
            name="business"
            value={values.business}
            onChange={update}
            maxLength={200}
            placeholder="Your business or website"
          />
        </label>
        <label>
          I’m interested in
          <select name="service" value={values.service} onChange={update}>
            {serviceNames.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          Your project
          <textarea
            name="message"
            rows={4}
            value={values.message}
            onChange={update}
            minLength={15}
            maxLength={5000}
            required
            placeholder="Your goals, timeline and what you have in mind…"
          />
        </label>
        <label className="honeypot" aria-hidden="true">
          Leave this empty
          <input
            tabIndex={-1}
            name="website"
            value={values.website}
            onChange={update}
            autoComplete="off"
          />
        </label>
        <label className="consent">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          <span>
            I agree to Esgrow Studio processing this inquiry as described in the{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              privacy policy
            </a>
            .
          </span>
        </label>
        <p className="form-note">
          Your enquiry is sent securely to Esgrow Studio’s Google Sheet. No
          marketing subscription is created.
        </p>
        <div className="actions">
          <button className="button yellow" disabled={busy} type="submit">
            {busy ? "Sending…" : "Send my inquiry ↗"}
          </button>
          <button className="button" type="button" onClick={download}>
            Download brief ↓
          </button>
        </div>
      </fieldset>
      <p role="status" aria-live="polite" className="form-status">
        {status}
      </p>
    </form>
  );
}
