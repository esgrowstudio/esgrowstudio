# Photo hero and glass navigation

The original supplied laptop photograph is preserved at `docs/reference-assets/hero-laptop-studio.png`. The home hero uses the existing optimized `public/assets/hero-laptop-studio-{640,1200,1672}.webp` exports of that same photograph. Desktop uses proportional cover positioning with directional dark scrims for readable type. At widths of 1000px or less, the complete photo appears in its own uncropped frame between the tagline and wordmark.

The heading remains three lines: FROM / ROOTS / TO RESULTS. The lower-right wordmark reads ESGROW® using locally hosted Six Caps, alongside Anton for the headline. A horizontal rule separates the centered scroll-to-services link. Font licenses are included in `public/fonts/`.

`src/styles/atmosphere.css` controls the composition and floating navigation. The header has a 10% white tint, backdrop blur, fine highlights and larger navigation text. `useHeaderContrast.js` chooses dark or white ink for each header control from the scene underneath, including local imagery. The supplied logo keeps its colours. Header and footer both display ESGROW STUDIO through the shared Brand component.

Responsive navigation includes route-close and Escape dismissal. Reduced-motion and reduced-transparency preferences have fallbacks. The site shell and header have no desktop width cap.
