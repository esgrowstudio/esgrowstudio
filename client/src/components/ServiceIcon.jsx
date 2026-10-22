const paths = {
  "web-design": (
    <>
      <rect x="3" y="4" width="26" height="19" rx="3" />
      <path d="M11 28h10M16 23v5M12 10l-4 4 4 4m8-8 4 4-4 4" />
    </>
  ),
  "website-development": (
    <>
      <rect x="3" y="4" width="26" height="23" rx="3" />
      <path d="M3 10h26M8 7h.1M11 7h.1M12 15l-4 4 4 4m8-8 4 4-4 4m-6 0 4-8" />
    </>
  ),
  seo: (
    <>
      <circle cx="14" cy="14" r="10" />
      <path d="m22 22 7 7M8 17l4-5 4 3 4-6" />
    </>
  ),
  "digital-strategy": (
    <>
      <path d="M5 27V17m7 10V12m7 15V8m7 19V3M3 27h26M5 11l7-5 7 1 7-5" />
    </>
  ),
  "social-media": (
    <>
      <circle cx="12" cy="10" r="5" />
      <circle cx="24" cy="11" r="4" />
      <path d="M3 28v-5a9 9 0 0 1 18 0v5m2-10a7 7 0 0 1 7 7v3" />
    </>
  ),
  "performance-marketing": (
    <>
      <path d="m4 13 20-7v20L4 19v-6Zm20-2 5 1v8l-5 1M8 21l2 8h5l-2-7M16 9v14" />
    </>
  ),
  "hosting-cloud": (
    <>
      <path d="M10 24H8a6 6 0 0 1-1-12 9 9 0 0 1 17-2 7 7 0 0 1 0 14h-2M16 16v13m-4-4 4 4 4-4" />
    </>
  ),
  "branding-content": (
    <>
      <path d="m3 26 8-21 8 21M6 19h10m7-7h7m-3 0v14m-4-9h7" />
    </>
  ),
  "maintenance-support": (
    <>
      <path d="m16 3 11 4v9c0 7-11 13-11 13S5 23 5 16V7l11-4Z" />
      <path d="m10 16 4 4 8-9" />
    </>
  ),
};
export default function ServiceIcon({ slug, className = "" }) {
  return (
    <svg
      className={"service-icon " + className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[slug] || paths["digital-strategy"]}
    </svg>
  );
}
