// Executed before the app paints, so returning visitors see no green flash.
try {
  if (
    location.pathname !== "/" ||
    sessionStorage.getItem("esgrow:home-intro-seen:v1") === "true"
  ) {
    document.documentElement.removeAttribute("data-preloading");
  }
} catch {
  // The intro also works when browser storage is unavailable.
}
