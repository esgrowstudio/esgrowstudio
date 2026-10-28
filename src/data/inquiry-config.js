export const inquiryConfig = {
  // Public Apps Script receiver URL; no private key or server secret belongs here.
  endpoint:
    import.meta.env?.VITE_GOOGLE_SHEETS_URL ||
    "https://script.google.com/macros/s/AKfycbw9850k-bP3ytHpnr66TZhdCFrRh-lwBongvqAEwDIys2dPdPtW7AtgQjOMORbTIxLh/exec",
  timeoutMs: 45000,
};
