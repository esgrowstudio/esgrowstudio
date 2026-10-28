import { useEffect } from "react";

// Native scrolling, route-aware reveals and progress. Observe filtered-in cards too.
export default function usePageMotion(pathname) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const main = document.getElementById("main-content");
    if (!main) return;
    const selectors =
      ".reveal, .service-tile, .plan, .feature-story, .journal-pair > a, .article-body > section, .sitemap-grid > div, .related-services a, .proposal-process > div, .pricing-faq, .faq-directory > details, .service-method > div, .service-deliverables > div, .legal-body > section";
    let sequence = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            target.classList.add("visible");
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.06 },
    );
    const observe = () => {
      main.querySelectorAll(selectors).forEach((element) => {
        if (element.dataset.motionObserved) return;
        element.dataset.motionObserved = "true";
        element.style.setProperty("--stagger", `${(sequence++ % 3) * 65}ms`);
        if (preference.matches) element.classList.add("visible");
        else {
          element.classList.add("motion-ready");
          observer.observe(element);
        }
      });
    };
    observe();
    const mutations = new MutationObserver(observe);
    mutations.observe(main, { childList: true, subtree: true });
    const showAll = () => {
      if (preference.matches)
        main
          .querySelectorAll(selectors)
          .forEach((el) => el.classList.add("visible"));
    };
    preference.addEventListener("change", showAll);
    let frame = 0;
    const paint = () => {
      frame = 0;
      const progress = document.querySelector(".scroll-progress");
      if (progress)
        progress.style.transform = `scaleX(${window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", showAll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);
}
