import { lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
const ServicesPage = lazy(() => import("./pages/ServicesPage.jsx"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage.jsx"));
const WorkPage = lazy(() => import("./pages/WorkPage.jsx"));
const ProjectPage = lazy(() => import("./pages/ProjectPage.jsx"));
const PricingPage = lazy(() => import("./pages/PricingPage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const BlogPage = lazy(() => import("./pages/BlogPage.jsx"));
const ArticlePage = lazy(() => import("./pages/ArticlePage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const LegalPage = lazy(() => import("./pages/LegalPage.jsx"));
const FaqPage = lazy(() => import("./pages/FaqPage.jsx"));
const SitemapPage = lazy(() => import("./pages/SitemapPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));
import { getMetadata, socialImage } from "./data/seo.js";
function Metadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const { title, description, canonical } = getMetadata(pathname);
    document.title = title;
    const update = (tag, attr, key, field, value) => {
      let element = document.head.querySelector(`${tag}[${attr}="${key}"]`);
      if (!value) {
        element?.remove();
        return;
      }
      if (!element) {
        element = document.createElement(tag);
        element.setAttribute(attr, key);
        document.head.append(element);
      }
      element.setAttribute(field, value);
    };
    update("meta", "name", "description", "content", description);
    update("link", "rel", "canonical", "href", canonical);
    update("meta", "name", "robots", "content", canonical ? null : "noindex");
    for (const [key, value] of Object.entries({
      title,
      description,
      url: canonical,
      image: socialImage,
      type: "website",
      site_name: "Esgrow Studio",
    })) {
      update(
        "meta",
        "property",
        "og:" + key,
        "content",
        canonical ? value : null,
      );
    }
    update(
      "meta",
      "name",
      "twitter:card",
      "content",
      canonical ? "summary_large_image" : null,
    );
  }, [pathname]);
  return null;
}
export default function App() {
  return (
    <BrowserRouter>
      <Metadata />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="work/:slug" element={<ProjectPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<ArticlePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="sitemap" element={<SitemapPage />} />
          {["privacy", "terms", "cookies", "accessibility"].map((type) => (
            <Route path={type} key={type} element={<LegalPage type={type} />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
