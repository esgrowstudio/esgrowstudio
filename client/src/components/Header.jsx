import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import BrandMark from "./BrandMark.jsx";
import useHeaderContrast from "../hooks/useHeaderContrast.js";

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Esgrow Studio home">
      <BrandMark className="brand-logo" />
      <span className="brand-type" data-adaptive-ink>
        <span>
          ES<span>GROW</span> STUDIO
        </span>
        <small>FROM ROOTS TO RESULTS</small>
      </span>
    </Link>
  );
}
export default function Header() {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  useHeaderContrast(headerRef, pathname);
  const [overHero, setOverHero] = useState(pathname === "/");
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const outside = (event) => {
      if (!headerRef.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1001px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    const close = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.querySelector(".menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 45);
      const hero = document.querySelector(".atmosphere-hero");
      setOverHero(
        pathname === "/" && !!hero && window.scrollY < hero.offsetHeight - 100,
      );
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);
  return (
    <header
      ref={headerRef}
      className={[
        "liquid-header",
        scrolled && "is-scrolled",
        overHero && "on-hero",
        open && "menu-open",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Brand />
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={open ? "open" : ""}
      >
        {[
          ["Home", "/"],
          ["Services", "/services"],
          ["Our work", "/work"],
          ["About", "/about"],
          ["Insights", "/blog"],
        ].map(([name, to]) => (
          <NavLink
            key={name}
            data-adaptive-ink
            to={to}
            end={to === "/"}
            onClick={() => setOpen(false)}
          >
            {name}
          </NavLink>
        ))}
      </nav>
      <Link className="button small" to="/contact" data-adaptive-ink>
        Let’s talk <span>↗</span>
      </Link>
      <button
        className="menu-toggle"
        data-adaptive-ink
        aria-controls="main-navigation"
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        {open ? "×" : "☰"}
      </button>
    </header>
  );
}
