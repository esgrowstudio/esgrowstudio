import HomeSections from "../components/HomeSections.jsx";
export default function HomePage() {
  return (
    <>
      <section
        className="atmosphere-hero"
        aria-label="Esgrow — From roots to results"
      >
        <img
          className="atmosphere-background"
          src="/assets/hero-laptop-studio-hq-1920.webp"
          srcSet="/assets/hero-laptop-studio-hq-640.webp 640w, /assets/hero-laptop-studio-hq-1200.webp 1200w, /assets/hero-laptop-studio-hq-1920.webp 1920w, /assets/hero-laptop-studio-hq-2560.webp 2560w, /assets/hero-laptop-studio-hq-3840.webp 3840w"
          sizes="(max-width: 1000px) 88vw, max(100vw, 177.7svh, 1244px)"
          alt=""
          width="1672"
          height="941"
          fetchPriority="high"
          decoding="async"
        />
        <div className="atmosphere-composition">
          <h1 className="roots-statement" aria-label="From roots to results">
            <span>FROM</span>
            <span>ROOTS</span>
            <span>TO RESULTS</span>
          </h1>
          <div className="atmosphere-wordmark" aria-label="Esgrow registered">
            <span>ESGROW</span>
            <sup className="wordmark-registration">®</sup>
          </div>
        </div>
        <a className="atmosphere-scroll" href="#services">
          <span>scroll for more</span>
          <span className="atmosphere-scroll-arrow" aria-hidden="true">
            ↓
          </span>
        </a>
      </section>
      <HomeSections />
    </>
  );
}
