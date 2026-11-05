import { routes } from "./routes.js";

export const origin = "https://esgrowstudio.com";
export const socialImage = origin + "/assets/hero-laptop-studio-hq-1200.webp";
const pages = {
  "/": [
    "Digital Marketing & Web Development in Jalandhar",
    "Esgrow Studio helps businesses in Jalandhar, Punjab and across India with website development, social media marketing, video shoots, branding and paid ads.",
  ],
  "/services": [
    "Digital Marketing & Website Services in Jalandhar",
    "Explore website development, SEO, branding, social media management, video production, Meta Ads and Google Ads for your business.",
  ],
  "/work": [
    "Web Design & Marketing Case Studies",
    "See how Esgrow Studio has built websites, online stores and campaigns for businesses across industries. Explore the work and the thinking behind it.",
  ],
  "/pricing": [
    "Website & Digital Marketing Packages",
    "Compare Starter, Growth and Premium packages for websites, social media, on-location video shoots and managed Meta Ads. Plans from ₹39,999.",
  ],
  "/about": [
    "About Our Digital Agency",
    "Meet Esgrow Studio, a creative and digital growth partner for businesses in Jalandhar, Punjab and across India.",
  ],
  "/blog": [
    "Insights on Websites & Digital Marketing",
    "Practical advice on website redesign, SEO and connected marketing for business owners planning their next step.",
  ],
  "/contact": [
    "Contact Esgrow Studio in Jalandhar",
    "Tell us about your website, branding, video shoot or marketing project. Get in touch to discuss the right scope for your business.",
  ],
  "/faq": [
    "FAQs About Website & Marketing Services",
    "Find answers about working with Esgrow Studio, including project scope, timelines and ongoing support.",
  ],
  "/sitemap": [
    "Website Directory",
    "Find Esgrow Studio services, case studies, pricing, articles and contact information in one place.",
  ],
  "/services/social-media": [
    "Social Media Marketing in Jalandhar",
    "Build a consistent social presence with content planning, reel production, static post design, publishing and engagement support.",
  ],
  "/services/performance-marketing": [
    "Meta & Google Ads Management in Jalandhar",
    "Reach the right audience with campaign setup, creative testing and lead measurement. We plan Meta Ads and Google Ads around your business goals.",
  ],
  "/services/website-development": [
    "Website Development in Jalandhar",
    "Get a responsive business website or online store built around your goals, with clear customer journeys and an easy way to enquire.",
  ],
  "/services/branding-content": [
    "Branding, Content & Video Shoots in Punjab",
    "Build a recognisable brand with visual direction, campaign content, on-location shoots and edited reels for social media.",
  ],
};
export function getMetadata(pathname) {
  const path = pathname.replace(/\/$/, "") || "/";
  const page = routes.find((route) => route.path === path);
  const [title, description] = pages[path] || [];
  return {
    title: title
      ? title + (path === "/contact" ? "" : " | Esgrow Studio")
      : (page?.title || "Page not found") + " | Esgrow Studio",
    description:
      description ||
      page?.description ||
      (page
        ? "Read Esgrow Studio’s " + page.title.toLowerCase() + " information."
        : "This page could not be found. Explore Esgrow Studio’s services and work."),
    canonical: page && path !== "/404" ? origin + path : null,
  };
}
