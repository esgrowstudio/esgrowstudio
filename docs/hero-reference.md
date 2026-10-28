# Photo hero and glass navigation

The original supplied laptop photograph is preserved at `docs/reference-assets/hero-laptop-studio.png`. Its AI-enhanced version is preserved at `docs/reference-assets/hero-laptop-studio-enhanced.png`. The home hero uses quality-92 responsive WebP exports at 640, 1200, 1920, 2560 and 3840 pixels wide, named `public/assets/hero-laptop-studio-hq-{width}.webp`. The enhanced source retains the original 1672×941 dimensions; larger delivery variants are Lanczos-resampled, not native 4K photography. The `sizes` attribute accounts for the desktop cover image’s height as well as its width, so tall windows and high-density displays do not select an undersized image. Desktop uses proportional cover positioning with directional dark scrims for readable type. At widths of 1000px or less, the complete photo appears in its own uncropped frame between the tagline and wordmark.

The heading remains three lines: FROM / ROOTS / TO RESULTS. The lower-right wordmark reads ESGROW® using locally hosted Six Caps, alongside Anton for the headline. A horizontal rule separates the centered scroll-to-services link. Font licenses are included in `public/fonts/`.

`src/styles/atmosphere.css` controls the composition and floating navigation. The header has a 10% white tint, backdrop blur, fine highlights and larger navigation text. `useHeaderContrast.js` chooses dark or white ink for each header control from the scene underneath, including local imagery. The supplied logo keeps its colours. Header and footer both display ESGROW STUDIO through the shared Brand component.

Responsive navigation includes route-close and Escape dismissal. Reduced-motion and reduced-transparency preferences have fallbacks. The site shell and header have no desktop width cap.
