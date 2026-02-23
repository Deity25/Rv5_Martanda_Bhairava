export default function Loader({ hidden }) {
  return (
    <div
      id="loader"
      className={`loader ${hidden ? "hidden" : ""}`}
      aria-live="polite"
      aria-label="Loading heritage archive"
    >
      <div className="loader-core">
        <img
          src="/assets/svg/jai-malhar-logo.svg"
          alt="Jai Malhar style devotional logo"
          className="loader-kirit jai-logo"
        />
        <div className="tilak-wrap" aria-hidden="true">
          <span className="tilak-line"></span>
          <span className="tilak-dot"></span>
        </div>
        <h1 className="loader-title">Shri Khandoba Divya Darbar</h1>
        <p className="loader-sub">Loading manuscripts, temple atlas, and stories...</p>
      </div>
    </div>
  );
}
