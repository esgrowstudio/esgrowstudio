export default function GrowthVisual({ compact = false }) {
  return (
    <div className={"growth-visual" + (compact ? " is-compact" : "")}>
      <div className="growth-orbit orbit-one" aria-hidden="true" />
      <div className="growth-orbit orbit-two" aria-hidden="true" />
      <img
        src="/assets/brand/esgrow-mark.png"
        alt="Esgrow's silver and gold E emblem wrapped in a vibrant green leaf."
        width="1254"
        height="1254"
        fetchPriority={compact ? "auto" : "high"}
      />
      {!compact && (
        <>
          <div className="growth-note note-top">
            <span className="status-dot" /> Rooted in strategy.
            <br />
            <strong>Built for what’s next.</strong>
          </div>
          <div className="growth-note note-bottom">
            <span className="growth-mini">↗</span>
            <div>
              <strong>Good ideas. Real growth.</strong>
              <span>Design × technology × marketing</span>
            </div>
          </div>
          <span className="visual-coordinate">
            FROM ROOTS TO RESULTS / ESGROW®
          </span>
        </>
      )}
    </div>
  );
}
