import { randomUUID } from "node:crypto";
const URL_PATTERN =
  /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/;
export function isSheetsConfigured(env = process.env) {
  return (
    URL_PATTERN.test(env.INQUIRY_SHEETS_URL || "") &&
    (env.INQUIRY_SHEETS_SECRET || "").length >= 32
  );
}
export async function callSheets(
  payload,
  { env = process.env, fetcher = fetch } = {},
) {
  if (!isSheetsConfigured(env))
    throw new Error("Sheets receiver is not configured.");
  const response = await fetcher(env.INQUIRY_SHEETS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, secret: env.INQUIRY_SHEETS_SECRET }),
    signal: AbortSignal.timeout(30000),
    redirect: "follow",
  });
  if (
    !response.ok ||
    !response.headers.get("content-type")?.includes("application/json")
  )
    throw new Error("Sheets did not confirm receipt.");
  const result = await response.json();
  if (result.ok !== true)
    throw new Error("Sheets could not save this inquiry.");
  return result;
}
export async function saveInquiryToSheets(value, options) {
  const inquiry = { ...value, requestId: value.requestId || randomUUID() };
  const result = await callSheets({ action: "append", inquiry }, options);
  if (result.requestId !== inquiry.requestId)
    throw new Error("Sheets receipt does not match the inquiry.");
  return result;
}
export async function checkSheetsReady(options) {
  try {
    const result = await callSheets({ action: "health" }, options);
    return result.ready === true;
  } catch {
    return false;
  }
}
