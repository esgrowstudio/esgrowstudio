import test from "node:test";
import assert from "node:assert/strict";
import {
  isSheetsConfigured,
  saveInquiryToSheets,
  checkSheetsReady,
} from "../src/utils/googleSheets.js";
const env = {
  INQUIRY_SHEETS_URL:
    "https://script.google.com/macros/s/example_deployment/exec",
  INQUIRY_SHEETS_SECRET: "test-only-".repeat(5),
};
const inquiry = {
  name: "Test",
  email: "test@example.com",
  business: "",
  service: "Web design",
  message: "A test request for our website.",
  consent: true,
  requestId: "12345678-1234-4234-8234-123456789abc",
};
test("sheets configuration only accepts an HTTPS Apps Script execution URL", () => {
  assert.equal(isSheetsConfigured(env), true);
  for (const url of [
    "http://localhost:3000",
    "https://evil.example/exec",
    "https://script.google.com/macros/s/id/dev",
  ])
    assert.equal(
      isSheetsConfigured({ ...env, INQUIRY_SHEETS_URL: url }),
      false,
    );
  assert.equal(
    isSheetsConfigured({ ...env, INQUIRY_SHEETS_SECRET: "" }),
    false,
  );
});
test("sheets adapter preserves request ID and confirms matching acknowledgement", async () => {
  let calls = 0;
  const fetcher = async (url, options) => {
    calls++;
    assert.equal(url, env.INQUIRY_SHEETS_URL);
    const body = JSON.parse(options.body);
    assert.equal(body.secret, env.INQUIRY_SHEETS_SECRET);
    assert.deepEqual(body.inquiry, inquiry);
    return Response.json({ ok: true, requestId: inquiry.requestId });
  };
  const result = await saveInquiryToSheets(inquiry, { env, fetcher });
  assert.equal(result.requestId, inquiry.requestId);
  assert.equal(calls, 1);
});
test("sheets adapter never reports success for login pages, permission failures or mismatched receipts", async () => {
  for (const response of [
    new Response("<html>Login</html>", {
      headers: { "Content-Type": "text/html" },
    }),
    Response.json({ ok: false, error: "Unauthorized" }),
    Response.json({ ok: true, requestId: "wrong" }),
  ]) {
    await assert.rejects(
      saveInquiryToSheets(inquiry, { env, fetcher: async () => response }),
    );
  }
});
test("readiness checks the destination rather than configuration alone", async () => {
  assert.equal(
    await checkSheetsReady({
      env,
      fetcher: async () => Response.json({ ok: true, ready: true }),
    }),
    true,
  );
  assert.equal(
    await checkSheetsReady({
      env,
      fetcher: async () => Response.json({ ok: false }),
    }),
    false,
  );
});
