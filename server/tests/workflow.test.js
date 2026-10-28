import test from "node:test";
import assert from "node:assert/strict";
import { createInquiryHandler } from "../src/controllers/inquiryController.js";
import { createApp } from "../src/app.js";
import { services, validateInquiry } from "../src/utils/validateInquiry.js";
import catalog from "../../client/src/data/services.json" with { type: "json" };
const good = {
  name: "Workflow Test",
  email: "workflow@example.com",
  business: "Test business",
  service: services[0],
  message: "A test project brief for the workflow audit.",
  consent: true,
};
function response() {
  return {
    statusCode: undefined,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}
test("all frontend service choices are accepted by the server", () => {
  for (const service of [
    ...catalog.map((s) => s.name),
    "A little bit of everything",
  ])
    assert.equal(validateInquiry({ ...good, service }).error, undefined);
});
test("receipt is confirmed only after persistence completes", async () => {
  let finish;
  let saved;
  const gate = new Promise((resolve) => {
    finish = resolve;
  });
  const handler = createInquiryHandler({
    isStorageReady: () => true,
    saveInquiry: async (value) => {
      saved = value;
      await gate;
    },
  });
  const res = response();
  const pending = handler(
    { body: { ...good, extra: "must not persist" } },
    res,
  );
  assert.equal(res.statusCode, undefined);
  finish();
  await pending;
  assert.equal(res.statusCode, 201);
  assert.deepEqual(res.body, { message: "Inquiry received." });
  assert.equal(saved.extra, undefined);
  assert.equal(saved.consent, true);
});
test("invalid inputs and honeypot submissions never reach storage", async () => {
  let writes = 0;
  const handler = createInquiryHandler({
    isStorageReady: () => true,
    saveInquiry: async () => {
      writes++;
    },
  });
  for (const body of [
    { ...good, consent: false },
    { ...good, website: "spam" },
    { ...good, email: { $gt: "" } },
  ]) {
    const res = response();
    await handler({ body }, res);
    assert.equal(res.statusCode, 400);
  }
  assert.equal(writes, 0);
});
test("missing database and failed writes return 503 without false receipt", async () => {
  for (const dependencies of [
    {
      isStorageReady: () => false,
      saveInquiry: () => assert.fail("must not write"),
    },
    {
      isStorageReady: () => true,
      saveInquiry: async () => {
        throw new Error("storage unavailable");
      },
    },
  ]) {
    const res = response();
    await createInquiryHandler(dependencies)({ body: good }, res);
    assert.equal(res.statusCode, 503);
    assert.notEqual(res.body.message, "Inquiry received.");
  }
});
test("HTTP API handles validation, malformed JSON and unknown endpoints", async (t) => {
  const server = createApp().listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const invalid = await fetch(base + "/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...good, consent: false }),
  });
  assert.equal(invalid.status, 400);
  assert.match((await invalid.json()).message, /privacy/i);
  const malformed = await fetch(base + "/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  assert.equal(malformed.status, 400);
  assert.equal((await fetch(base + "/api/no-such-endpoint")).status, 404);
  assert.equal((await fetch(base + "/api/health")).status, 200);
  const readiness = await fetch(base + "/api/ready");
  assert.equal(readiness.status, 503);
  assert.equal((await readiness.json()).ready, false);
});
