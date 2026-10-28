import test from "node:test";
import assert from "node:assert/strict";
import {
  isGoogleReceiptOrigin,
  matchesReceipt,
  sendInquiry,
} from "../src/lib/googleSheets.js";
const id = "12345678-1234-4234-8234-123456789abc";
const good = {
  origin: "https://abc-script.googleusercontent.com",
  data: {
    type: "esgrow:inquiry-receipt",
    requestId: id,
    nonce: "nonce",
    ok: true,
  },
};
test("only Google HTML-service receipt origins are accepted", () => {
  for (const origin of [
    "https://script.google.com",
    "https://script.googleusercontent.com",
    "https://abc-123-script.googleusercontent.com",
  ])
    assert.equal(isGoogleReceiptOrigin(origin), true);
  for (const origin of [
    "null",
    "https://evil.example",
    "https://script.google.com.evil.example",
    "http://script.google.com",
    "https://googleusercontent.com",
  ])
    assert.equal(isGoogleReceiptOrigin(origin), false);
});
test("receipts must match both request ID and one-time nonce", () => {
  assert.equal(matchesReceipt(good, id, "nonce"), true);
  assert.equal(matchesReceipt(good, "wrong", "nonce"), false);
  assert.equal(matchesReceipt(good, id, "wrong"), false);
  assert.equal(
    matchesReceipt({ ...good, origin: "https://evil.example" }, id, "nonce"),
    false,
  );
  assert.equal(matchesReceipt({ ...good, data: null }, id, "nonce"), null);
});
function harness() {
  let receive,
    timedOut,
    submitted,
    cleaned = 0;
  const nodes = [];
  const win = {
    location: { origin: "http://localhost:5173" },
    setTimeout(fn) {
      timedOut = fn;
      return 1;
    },
    clearTimeout() {},
    addEventListener(_name, fn) {
      receive = fn;
    },
    removeEventListener() {
      receive = null;
    },
  };
  const doc = {
    createElement(tag) {
      const node = {
        tag,
        appendChild(child) {
          this.child = child;
        },
        remove() {
          cleaned++;
        },
        submit() {
          submitted = JSON.parse(this.child.value);
        },
      };
      nodes.push(node);
      return node;
    },
    body: { appendChild() {} },
  };
  return {
    win,
    doc,
    dispatch(overrides = {}) {
      receive({
        origin: good.origin,
        data: {
          type: "esgrow:inquiry-receipt",
          requestId: id,
          nonce: submitted.nonce,
          ok: true,
          ...overrides,
        },
      });
    },
    timeout() {
      timedOut();
    },
    get payload() {
      return submitted;
    },
    get cleaned() {
      return cleaned;
    },
  };
}
test("direct form transport waits for a matching saved receipt and cleans up", async () => {
  const h = harness();
  const pending = sendInquiry(
    { requestId: id, name: "Test" },
    { browserWindow: h.win, browserDocument: h.doc },
  );
  assert.equal(h.payload.origin, "http://localhost:5173");
  assert.equal(h.payload.protocol, 2);
  assert.equal(h.cleaned, 0);
  h.dispatch();
  assert.deepEqual(await pending, { message: "Inquiry received." });
  assert.equal(h.cleaned, 2);
});
test("receiver errors and timeouts retain a failure state instead of claiming delivery", async () => {
  const h = harness();
  const pending = sendInquiry(
    { requestId: id },
    { browserWindow: h.win, browserDocument: h.doc },
  );
  h.dispatch({ ok: false, message: "Please try later" });
  await assert.rejects(pending, /Please try later/);
  assert.equal(h.cleaned, 2);
  const h2 = harness();
  const timed = sendInquiry(
    { requestId: id },
    { browserWindow: h2.win, browserDocument: h2.doc },
  );
  h2.timeout();
  await assert.rejects(timed, /couldn’t confirm receipt/);
  assert.equal(h2.cleaned, 2);
});
