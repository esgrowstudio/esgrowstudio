import serviceCatalog from "../../../client/src/data/services.json" with { type: "json" };
export const services = [
  ...serviceCatalog.map((service) => service.name),
  "A little bit of everything",
];
export function validateInquiry(body) {
  if (!body || typeof body !== "object")
    return { error: "Please complete the inquiry form." };
  const value = {};
  for (const [key, max] of [
    ["name", 100],
    ["email", 254],
    ["business", 200],
    ["service", 100],
    ["message", 5000],
  ]) {
    if (body[key] !== undefined && typeof body[key] !== "string")
      return { error: "Please enter valid text in each field." };
    value[key] = (body[key] || "").trim();
    if (value[key].length > max)
      return { error: `The ${key} field is too long.` };
  }
  if (
    !value.name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) ||
    value.message.length < 15 ||
    !services.includes(value.service)
  )
    return {
      error:
        "Please provide your name, a valid email, a service and at least 15 characters about your project.",
    };
  if (body.consent !== true)
    return { error: "Please accept the privacy notice before submitting." };
  value.consent = true;
  if (body.requestId !== undefined) {
    if (
      typeof body.requestId !== "string" ||
      !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(
        body.requestId,
      )
    )
      return { error: "Please refresh the form and try again." };
    value.requestId = body.requestId;
  }
  return { value };
}
