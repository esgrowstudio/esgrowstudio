import { useEffect, useRef } from "react";

// Scoped to portfolio content so changing a filter also reveals new cards.
export default function usePortfolioMotion(dependency) {
  const ref = useRef(null);
  useEffect(() => {
    const elements = ref.current?.querySelectorAll("[data-enter]") || [];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("has-entered");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((element, i) => {
      element.style.setProperty("--entry-delay", `${(i % 2) * 90}ms`);
      element.classList.add("will-enter");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [dependency]);
  return ref;
}
