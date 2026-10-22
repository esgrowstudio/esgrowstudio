import test from "node:test";
import assert from "node:assert/strict";
import { validateInquiry } from "../src/utils/validateInquiry.js";
const good = {
  name: "Example Person",
  email: "example@example.com",
  business: "Example",
  service: "Web design",
  message: "A new website for our business.",
  consent: true,
};
test("accepts a valid inquiry and trims inputs", () => {
  const { value, error } = validateInquiry({
    ...good,
    name: " Example Person ",
  });
  assert.equal(error, undefined);
  assert.equal(value.name, "Example Person");
});
test("rejects missing consent", () =>
  assert.ok(validateInquiry({ ...good, consent: false }).error));
test("rejects operator objects and oversized messages", () => {
  assert.ok(validateInquiry({ ...good, email: { $gt: "" } }).error);
  assert.ok(validateInquiry({ ...good, message: "x".repeat(5001) }).error);
});
test("rejects invalid addresses, unsupported services and incomplete briefs", () => {
  for (const override of [
    { email: "bad" },
    { service: "unknown" },
    { message: "short" },
  ])
    assert.ok(validateInquiry({ ...good, ...override }).error);
});
