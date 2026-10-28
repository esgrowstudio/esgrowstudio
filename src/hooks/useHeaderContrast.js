import { useEffect } from "react";

// Choose black or white from the scene beneath each control, including local images.
// This avoids blend-mode isolation problems caused by a glass backdrop filter.
export default function useHeaderContrast(headerRef, pathname) {
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    const pixels = new WeakMap();
    const luminance = ([r, g, b]) => {
      const linear = [r, g, b].map((v) => {
        const value = v / 255;
        return value <= 0.04045
          ? value / 12.92
          : ((value + 0.055) / 1.055) ** 2.4;
      });
      return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
    };
    const imageColour = (img, x, y) => {
      if (!img.complete || !img.naturalWidth) return null;
      let data = pixels.get(img);
      if (!data || data.src !== img.currentSrc) {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = canvas.height = 64;
          const context = canvas.getContext("2d", { willReadFrequently: true });
          context.drawImage(img, 0, 0, 64, 64);
          data = {
            src: img.currentSrc,
            rgba: context.getImageData(0, 0, 64, 64).data,
          };
          pixels.set(img, data);
        } catch {
          return null;
        }
      }
      const rect = img.getBoundingClientRect();
      const style = getComputedStyle(img);
      const fit = style.objectFit;
      let width = rect.width,
        height = rect.height;
      if (fit === "cover" || fit === "contain") {
        const scale = Math[fit === "cover" ? "max" : "min"](
          rect.width / img.naturalWidth,
          rect.height / img.naturalHeight,
        );
        width = img.naturalWidth * scale;
        height = img.naturalHeight * scale;
      }
      const position = style.objectPosition
        .split(" ")
        .map((v) => parseFloat(v) / 100);
      const u =
        (x - rect.left - (rect.width - width) * (position[0] || 0)) / width;
      const v =
        (y - rect.top - (rect.height - height) * (position[1] || 0)) / height;
      if (u < 0 || u > 1 || v < 0 || v > 1) return null;
      const index =
        (Math.min(63, Math.floor(v * 64)) * 64 +
          Math.min(63, Math.floor(u * 64))) *
        4;
      const colour = Array.from(data.rgba.slice(index, index + 3));
      if (
        img.classList.contains("atmosphere-background") &&
        innerWidth > 1000
      ) {
        const horizontal = x / innerWidth;
        const veil =
          horizontal < 0.24
            ? 0.8 - horizontal * 0.6
            : horizontal < 0.62
              ? Math.max(0, (0.65 * (0.62 - horizontal)) / 0.38)
              : 0;
        return colour.map(
          (channel, i) => channel * (1 - veil) + [4, 25, 16][i] * veil,
        );
      }
      return colour;
    };
    const sceneColour = (x, y) => {
      const under = document
        .elementsFromPoint(x, y)
        .filter((el) => !header.contains(el));
      const hero = under.find((el) =>
        el.classList?.contains("atmosphere-hero"),
      );
      if (hero && innerWidth > 1000) {
        const image = hero.querySelector(".atmosphere-background");
        const colour = image && imageColour(image, x, y);
        if (colour) return colour;
      }
      for (const element of under) {
        if (element instanceof HTMLImageElement) {
          const colour = imageColour(element, x, y);
          if (colour) return colour;
        }
        const rgba = getComputedStyle(element)
          .backgroundColor.match(/[\d.]+/g)
          ?.map(Number);
        if (rgba && (rgba.length === 3 || rgba[3] >= 0.8))
          return rgba.slice(0, 3);
      }
      return [255, 255, 255];
    };
    const paint = () => {
      frame = 0;
      header.querySelectorAll("[data-adaptive-ink]").forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (
          !rect.width ||
          !rect.height ||
          (element.closest("nav") && innerWidth <= 1000)
        )
          return;
        const values = [-12, 0, 12].map((offset) =>
          luminance(
            sceneColour(
              Math.max(
                0,
                Math.min(innerWidth - 1, rect.left + rect.width / 2 + offset),
              ),
              rect.top + rect.height / 2,
            ),
          ),
        );
        const light = values.reduce((a, b) => a + b, 0) / values.length;
        element.style.setProperty(
          "--header-ink",
          light > 0.179 ? "#102015" : "#ffffff",
        );
      });
    };
    const update = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    document.addEventListener("load", update, true);
    const observer = new MutationObserver(update);
    observer.observe(header, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-preloading"],
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("load", update, true);
    };
  }, [headerRef, pathname]);
}
