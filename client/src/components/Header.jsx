import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Esgrow Studio home">
      <svg
        className="brand-emblem"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 9h33l-7 8H15L8 25h25l-7 8H11l-4 7h25l-7 5H2l6-12 7-8H2l6-8Z"
          fill="currentColor"
        />
        <path
          d="M12 30C17 8 31 17 46 3c-2 18-12 29-34 27Z"
          fill="#9bd52a"
          stroke="white"
          strokeWidth="1.5"
        />
        <path d="M12 30 36 13" stroke="#376a20" strokeWidth="1.5" />
      </svg>
      <span className="brand-type">
        <span>
          ES<span>GROW</span>
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
  const [overHero, setOverHero] = useState(pathname === "/");
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.querySelector(".menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
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
            to={to}
            end={to === "/"}
            onClick={() => setOpen(false)}
          >
            {name}
          </NavLink>
        ))}
      </nav>
      <Link className="button small" to="/contact">
        Let’s talk <span>↗</span>
      </Link>
      <button
        className="menu-toggle"
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
