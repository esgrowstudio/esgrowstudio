import test from "node:test";
import assert from "node:assert/strict";
import { sendInquiry } from "../../client/src/lib/api.js";
const payload = {
  name: "Workflow Test",
  email: "workflow@example.com",
  service: "Web design",
  message: "Testing the inquiry request flow.",
  consent: true,
};
test("client sends one JSON request and requires a confirmed receipt", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "/api/inquiries");
    assert.equal(options.method, "POST");
    assert.deepEqual(JSON.parse(options.body), payload);
    return Response.json({ message: "Inquiry received." }, { status: 201 });
  });
  assert.deepEqual(await sendInquiry(payload), {
    message: "Inquiry received.",
  });
});
test("client exposes API failures and rejects HTML or false success", async (t) => {
  const mock = t.mock.method(globalThis, "fetch");
  for (const [response, pattern] of [
    [
      Response.json({ message: "Database unavailable" }, { status: 503 }),
      /Database unavailable/,
    ],
    [
      new Response("<html>Preview</html>", {
        headers: { "Content-Type": "text/html" },
      }),
      /unavailable/,
    ],
    [Response.json({ ok: true }), /could not confirm/],
  ]) {
    mock.mock.mockImplementation(async () => response);
    await assert.rejects(sendInquiry(payload), pattern);
  }
});
test("client releases a stalled submission after timeout", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  t.mock.method(
    globalThis,
    "fetch",
    (_url, { signal }) =>
      new Promise((_resolve, reject) =>
        signal.addEventListener("abort", () =>
          reject(new DOMException("Aborted", "AbortError")),
        ),
      ),
  );
  const request = sendInquiry(payload);
  t.mock.timers.tick(35000);
  await assert.rejects(request, /too long to confirm receipt/);
});
