import { Suspense, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import usePageMotion from "../hooks/usePageMotion.js";
import Preloader from "./Preloader.jsx";
export default function Layout() {
  const { pathname } = useLocation();
  const home = pathname === "/";
  useLayoutEffect(() => {
    document.body.className = home ? "" : "inner-page";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, home]);
  usePageMotion(pathname);
  return (
    <>
      <Preloader enabled={home} />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-shell">
        <Header />
        <main id="main-content" key={pathname}>
          <Suspense
            fallback={
              <div className="page-loading" role="status">
                Getting things ready…
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
