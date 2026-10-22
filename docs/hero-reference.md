# Reference hero and clear glass navigation

The home hero uses the user's first supplied image, copied unchanged to `client/public/assets/hero-green-atmosphere.png`. SHA-256 hashes of the source and project copy match. Its horizontal lines remain part of the original artwork.

The left heading is exactly three lines: FROM / ROOTS / TO RESULTS. The lower-right ESGROW wordmark sits above the artwork's lower rule, with a centered “scroll for more” anchor below the rule. The link moves to the home services section. Other page content and the light site palette remain in place.

Locally hosted Anton and Six Caps fonts provide the bold condensed heading and tall narrow wordmark. Font files and their SIL Open Font License notices are in `client/public/fonts/`. The reference images were used for composition and typography direction; the background was not regenerated.

`client/src/styles/atmosphere.css` owns the hero and glass header treatment. The floating header has a transparent background, backdrop blur, modest saturation, fine specular edges and translucent controls. Its text adapts between the hero and light page content; the mobile menu retains keyboard dismissal and route-close behavior. Reduced-motion and reduced-transparency preferences have fallbacks.

Checks: desktop composition at 1440 × 900, mobile at 390 × 844, small phone at 320 × 740, no horizontal overflow; lower-right wordmark verified above the lower rule and scroll cue below it. Scroll-to-services navigation, transparent header after scrolling, mobile menu navigation and inner-page heading clearance verified. Production build passed.

Full-width correction: removed the 1600px site-shell cap and the 1504px navigation cap. The hero and shared wrapper now match the document's available width. Wide aspect ratios preserve the artwork's horizontal-rule positions; a dark hero fallback prevents a white flash before the image loads. Home, services, work and contact were checked at 320, 390, 768, 1024, 1440, 1920 and 2560px: wrapper width matched the viewport content width and no horizontal overflow was found.
