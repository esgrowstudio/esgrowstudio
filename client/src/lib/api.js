export async function sendInquiry(values) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL || ""}/api/inquiries`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    },
  );
  if (!response.headers.get("content-type")?.includes("application/json"))
    throw new Error(
      "Inquiry delivery is unavailable. Please download your brief and try again later.",
    );
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      data.message || "We could not send your inquiry. Please try again.",
    );
  return data;
}
