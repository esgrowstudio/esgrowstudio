# Esgrow light growth theme

Historical design notes. Current runtime and contact delivery setup: see README.md and google-sheets-integration.md.

The supplied reference informs the split hero, lime accents, compact outlined service cards, project grids, story/values layout and contact form. The implementation uses white surfaces, charcoal text, pale green sections and restrained glass navigation and floating cards.

## Site structure

- Home: growth hero, nine connected services, project preview, four featured projects, three-step process and shared call to action.
- Services: filterable directory and nine complete service detail pages, retaining scope, process and FAQs.
- Work: three-column desktop project grid, filters, scroll illustration and nine detailed case studies.
- About: story, values, working principles and team disciplines.
- Contact: responsive form, service preselection, consent and local brief download.
- Pricing, journal/articles, FAQs, policies, sitemap and 404 use the same light typography, surfaces, buttons, navigation and footer.

The reference's example statistics, people and contact details were not copied as business facts. Existing project stories and service details are retained.

## Implementation

`src/styles/growth-theme.css` is the shared theme layer, loaded after the existing component styles in `main.jsx`. Portfolio styles are loaded once globally so navigating to a case study cannot change the theme's cascade order.

`ServiceIcon.jsx` provides consistent SVG line icons. The original botanical hero was superseded by the supplied laptop photograph; its unused component has been removed. Scroll reveals use IntersectionObserver and observe newly filtered cards. Scrolling is native, with anchor offsets and a requestAnimationFrame progress indicator. Reduced-motion preferences are respected. Mobile navigation closes after a route change or Escape.

## Generated asset

- Tool: built-in image generation, without the CLI fallback.
- Project asset: `docs/reference-assets/growth-sculpture.png`.
- Original generation is preserved in the Codex generated-images directory.
- The generated image was visually inspected before use. CSS edge masks blend it into the light page background.

Final prompt:

> Use case: stylized-concept. Asset type: premium digital growth agency website hero artwork, landscape 3:2. Create a photoreal cinematic studio still life: a beautiful abstract sculptural letter E formed from three flowing brushed silver metallic ribbons, with a living vivid lime green leaf woven through the middle ribbon. Standing on a small lush moss island, delicate tiny plants and glossy leaves around it. Bright white seamless studio background with very pale sage atmospheric light, soft daylight from upper right, realistic soft contact shadows, droplets on leaf, exquisite silver material reflections. The emblem fills the center-right of the composition, entire object visible with generous white space and no cropping, sophisticated macro product photography. White and light gray dominate, lime green highlights. No dark background, no text, no watermark, no extra letters. This is a white-theme reinterpretation of a metallic E with a leaf representing growth, not a website screenshot.

## Validation

- All 35 registered routes loaded at a 390px browser viewport (375px content area with scrollbar). No horizontal document overflow or broken loaded images were found.
- Fourteen representative routes checked at 1440px: no horizontal overflow, broken loaded images or dark section backgrounds. No browser console errors were reported in this pass.
- Additional 320px checks: home, services, work, about, contact and development detail. No horizontal overflow.
- Additional 768px checks: home, work, contact and web design detail. No horizontal overflow.
- Services Grow filter returned the three growth services. E-commerce project filter returned five projects.
- Mobile menu opening, Escape dismissal and route navigation verified.
- Contact `?service=seo` selected SEO & organic growth. Required name, email, message and consent fields remain intact.
- Local brief download tested using dummy QA details; the text file downloaded successfully and the form displayed its local-only confirmation. No inquiry was submitted.
- Existing server syntax checks and four validation tests passed. Production build passed.

The website backend referenced by these original design checks has since been removed. Contact enquiries now go directly from the frontend to Google Apps Script; current checks are recorded in release-verification.md.
