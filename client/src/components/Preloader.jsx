import { useLayoutEffect, useRef, useState } from "react";
import BrandMark from "./BrandMark.jsx";

const SESSION_KEY = "esgrow:home-intro-seen:v1";
const WORDS = ["From", "Roots", "To", "Results,", "ESGROW®"];

export default function Preloader({ enabled = false }) {
  const [phase, setPhase] = useState(() =>
    enabled && document.documentElement.hasAttribute("data-preloading")
      ? "intro"
      : "done",
  );
  const completeRef = useRef(null);
  useLayoutEffect(() => {
    if (!enabled) {
      document.documentElement.removeAttribute("data-preloading");
      setPhase("done");
      return;
    }
    if (phase === "done") return;
    const root = document.documentElement,
      shell = document.querySelector(".site-shell"),
      skipLink = document.querySelector(".skip-link");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let cancelled = false,
      finished = false;
    const timers = new Set();
    const delay = (ms) =>
      new Promise((resolve) => {
        const timer = setTimeout(() => {
          timers.delete(timer);
          resolve();
        }, ms);
        timers.add(timer);
      });
    const restore = () => {
      root.removeAttribute("data-preloading");
      if (shell) shell.inert = false;
      if (skipLink) skipLink.removeAttribute("inert");
      window.removeEventListener("wheel", blockScroll, true);
      window.removeEventListener("touchmove", blockScroll, true);
      window.removeEventListener("keydown", blockKeys, true);
    };
    const complete = () => {
      if (finished || cancelled) return;
      finished = true;
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {}
      restore();
      setPhase("done");
    };
    completeRef.current = complete;
    if (shell) shell.inert = true;
    if (skipLink) skipLink.setAttribute("inert", "");
    const blockScroll = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const blockKeys = (event) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
        ].includes(event.key) &&
        event.target.tagName !== "BUTTON"
      )
        blockScroll(event);
      if (event.key === "Escape") complete();
    };
    window.addEventListener("wheel", blockScroll, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchmove", blockScroll, {
      passive: false,
      capture: true,
    });
    window.addEventListener("keydown", blockKeys, true);
    const hero = document.querySelector(".hero-image");
    const backgroundUrl =
      hero &&
      getComputedStyle(hero).backgroundImage.match(
        /url\(["']?(.*?)["']?\)/,
      )?.[1];
    const heroImage = new Image();
    if (backgroundUrl) heroImage.src = backgroundUrl;
    const resourcesReady = Promise.all([
      document.fonts?.ready || Promise.resolve(),
      backgroundUrl ? heroImage.decode().catch(() => {}) : Promise.resolve(),
      ...Array.from(document.images)
        .filter((image) => image.loading !== "lazy")
        .map((image) => image.decode?.().catch(() => {}) || Promise.resolve()),
    ]);
    Promise.all([
      delay(reduced ? 350 : 1700),
      Promise.race([resourcesReady, delay(2400)]),
    ]).then(() => {
      if (cancelled || finished) return;
      setPhase("leaving");
      delay(reduced ? 180 : 1450).then(complete);
    });
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      restore();
      window.removeEventListener("wheel", blockScroll, true);
      window.removeEventListener("touchmove", blockScroll, true);
      window.removeEventListener("keydown", blockKeys, true);
      completeRef.current = null;
    };
    // One timeline per app entry; internal route changes never restart it.
  }, [enabled]);
  if (!enabled || phase === "done") return null;
  return (
    <div className="preloader" data-phase={phase}>
      <div className="preloader-panels" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="preloader-panel"
            style={{ "--step": 5 - index }}
          />
        ))}
      </div>
      <div
        className="preloader-content"
        role="status"
        aria-live="polite"
        aria-label="From Roots To Results, ESGROW®"
      >
        <BrandMark className="preloader-brand-mark" size={80} />
        <p className="preloader-copy" aria-hidden="true">
          {WORDS.map((word, index) => (
            <span className="preloader-word-mask" key={word}>
              <span className="preloader-word" style={{ "--word": index }}>
                {word}
              </span>
            </span>
          ))}
        </p>
        <div className="preloader-rule" aria-hidden="true">
          <span />
        </div>
      </div>
      <div className="preloader-bottom">
        <span aria-hidden="true">ROOTED IN IDEAS. BUILT FOR GROWTH.</span>
        <button type="button" onClick={() => completeRef.current?.()}>
          Skip intro <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}
