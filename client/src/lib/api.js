export async function sendInquiry(values) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 35000);
  try {
    const response = await fetch(
      `${(import.meta.env?.VITE_API_URL || "").replace(/\/+$/, "")}/api/inquiries`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal,
      },
    );
    if (!response.headers.get("content-type")?.includes("application/json")) {
      if (import.meta.env?.DEV)
        console.warn("Inquiry API returned a non-JSON response", {
          status: response.status,
          type: response.headers.get("content-type"),
          url: response.url,
        });
      throw new Error(
        "Inquiry delivery is unavailable. Please download your brief and try again later.",
      );
    }
    const data = await response.json();
    if (!response.ok)
      throw new Error(
        data.message || "We could not send your inquiry. Please try again.",
      );
    if (response.status !== 201 || data.message !== "Inquiry received.")
      throw new Error(
        "We could not confirm receipt. Please contact the studio before resending.",
      );
    return data;
  } catch (error) {
    if (error.name === "AbortError")
      throw new Error(
        "The server took too long to confirm receipt. Your details are still here. Please contact the studio before resending.",
      );
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
