export default function BrandMark({ className = "", size = 48 }) {
  return (
    <img
      className={"brand-image " + className}
      src="/assets/brand/esgrow-mark-128.webp"
      srcSet="/assets/brand/esgrow-mark-64.webp 64w, /assets/brand/esgrow-mark-128.webp 128w, /assets/brand/esgrow-mark-256.webp 256w"
      sizes={`${size}px`}
      width="1254"
      height="1254"
      alt=""
      decoding="async"
    />
  );
}
