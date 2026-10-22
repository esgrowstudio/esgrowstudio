# Website imagery

Created 13 original images using the built-in image generation tool: nine service-specific visuals and four editorial scenes. Final prompts, preserved source paths and exported asset paths are recorded in [imagery-manifest.json](imagery-manifest.json).

All website-ready files are saved in `client/public/assets/imagery/`. The source PNGs remain in the Codex generated-images directory. Each asset has 320px, 640px and 1200px WebP versions; the 39 exported files total approximately 2.1 MB. Resizing and encoding preserve the generated compositions; no creative edits were made during conversion.

## Placement

- Services: a responsive-development overview hero, nine image cards and a matching large hero for every service detail page.
- Home: service photography, device showcase and relevant process visuals. The existing E/leaf brand hero remains.
- About: creative studio, botanical growth and discipline imagery.
- Work: device showcase hero. Actual client screenshots remain attached to the existing case studies.
- Contact: an inviting consultation desk.
- Pricing: project, growth and care imagery.
- Journal: topic-specific covers on the listing and each article.
- FAQ: a small consultation-desk visual.
- Shared call to action: botanical growth detail.

Generated workspace and service images are illustrative concepts, not photographs of Esgrow's office or verified performance reports. Existing project descriptions and case-study screenshots were not replaced with generated client work.

## Delivery and behavior

`EditorialImage.jsx` uses responsive `srcset`/`sizes`, explicit image dimensions, async decoding and lazy loading below the fold. Main page imagery is eager-loaded. Decorative duplicate images use empty alt text; meaningful hero images have descriptive alt text. Image zoom interactions respect reduced-motion preferences. Natural crops, glass captions and light frames match the white/lime theme.

`scripts/prepare-imagery.py` reproduces the responsive WebP exports from the preserved sources using Python and Pillow. Normal npm development/build commands use the checked-in WebP files and do not require Python.

## Checks

- All 13 original compositions visually inspected after export.
- Twenty affected routes checked at 390px: no horizontal document overflow or broken loaded images.
- Twelve representative routes checked at 1440px: no horizontal document overflow or broken loaded images; no browser console errors reported in this pass.
- Six primary routes checked at 320px: home, services, about, work, contact and pricing; no horizontal document overflow.
- Services Grow filter checked: SEO, social media and paid marketing retain their own images; mobile cards select the 320px sources.
- Production build passed. Exported WebP files were checked for existence and decoded successfully.
