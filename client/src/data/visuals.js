export const visuals = {
  "web-design": {
    alt: "A refined website design workspace with a silver display, botanical layouts and sage colour swatches.",
  },
  "website-development": {
    alt: "A responsive website presented on a silver laptop and matching mobile screen in a bright studio.",
  },
  seo: {
    alt: "Search and organic growth analytics on a clean desktop display beside a magnifying glass.",
  },
  "digital-strategy": {
    alt: "A carefully organised strategy desk with customer journey maps, planning notes and a tablet.",
  },
  "social-media": {
    alt: "A modern content creation setup with a smartphone, camera and coordinated social media layouts.",
  },
  "performance-marketing": {
    alt: "A campaign planning workspace with advertising creative and a clear performance dashboard.",
  },
  "hosting-cloud": {
    alt: "Sculptural silver server towers and glass cloud forms in an airy architectural setting.",
  },
  "branding-content": {
    alt: "A premium brand identity collection with ivory stationery, lime packaging and thoughtful material details.",
  },
  "maintenance-support": {
    alt: "A tidy website care workspace with a laptop, diagnostic checklist and precision tools.",
  },
  "digital-workspace": {
    alt: "A coordinated collection of desktop, tablet and mobile website experiences in a botanical studio.",
  },
  "creative-studio": {
    alt: "A sunlit creative studio with a shared design table, material samples and lush plants.",
  },
  "contact-desk": {
    alt: "An inviting consultation desk with a notebook, coffee, a silver laptop and soft morning light.",
  },
  "botanical-growth": {
    alt: "A fresh green sapling growing from a sculptural stone planter in soft daylight.",
  },
};

export function visualSource(name, width = 1200) {
  return `/assets/imagery/${name}-${width}.webp`;
}

export const articleVisuals = {
  "before-you-redesign": "web-design",
  "connected-marketing": "performance-marketing",
  "website-care": "maintenance-support",
};
