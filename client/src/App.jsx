import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import ServiceDetailPage from "./pages/ServiceDetailPage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LegalPage from "./pages/LegalPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import SitemapPage from "./pages/SitemapPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { routes } from "./data/routes.js";
function Metadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = routes.find(
      (r) => r.path === (pathname.replace(/\/$/, "") || "/"),
    );
    document.title = (page?.title || "Page not found") + " — Esgrow Studio";
    document.querySelector('meta[name="description"]').content =
      page?.description ||
      (page?.title || "Page not found") +
        ". Thoughtful design, development and connected digital growth from Esgrow Studio.";
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
