import { useEffect, useRef, useState } from "react";
import "../styles/hero-video.css";

export default function HeroVideo() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    const hero = video.closest(".hero");
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 680px)");
    const connection = navigator.connection;
    let frame = 0,
      disposed = false;

    function update() {
      frame = 0;
      const fallback = reduced.matches || connection?.saveData;
      const active =
        !fallback &&
        !document.hidden &&
        !root.hasAttribute("data-preloading") &&
        window.scrollY < hero.offsetHeight;
      if (!active) {
        video.pause();
        if (fallback) setReady(false);
        return;
      }
      const source = mobile.matches
        ? "/assets/hero-pf4.mp4"
        : "/assets/hero-pf4.mp4";
      if (video.getAttribute("src") !== source) {
        setReady(false);
        video.src = source;
        video.load();
      }
      video.muted = true;
      if (video.paused) {
        const play = video.play();
        play?.catch(() => {
          /* Autoplay restrictions leave the poster visible. */
        });
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const showVideo = () => {
      if (!disposed) setReady(true);
    };
    const showPoster = () => {
      if (!disposed) setReady(false);
    };
    const introObserver = new MutationObserver(schedule);
    introObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-preloading"],
    });
    video.addEventListener("playing", showVideo);
    video.addEventListener("error", showPoster);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    reduced.addEventListener("change", schedule);
    mobile.addEventListener("change", schedule);
    connection?.addEventListener?.("change", schedule);
    update();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      introObserver.disconnect();
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.removeEventListener("playing", showVideo);
      video.removeEventListener("error", showPoster);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      reduced.removeEventListener("change", schedule);
      mobile.removeEventListener("change", schedule);
      connection?.removeEventListener?.("change", schedule);
    };
  }, []);

  return (
    <div className="hero-image hero-video-shell" aria-hidden="true">
      <video
        ref={videoRef}
        className={
          ready ? "hero-background-video is-ready" : "hero-background-video"
        }
        poster="/assets/hero-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        tabIndex={-1}
      />
    </div>
  );
}
