const NAV_ITEMS = [
  { href: "#hero", label: "Landing" },
  { href: "#manuscripts", label: "Manuscripts" },
  { href: "#temples", label: "Temple Atlas" },
  { href: "#temple-profiles", label: "Temple Detail" },
  { href: "#yatra", label: "Yatra Planner" },
  { href: "#stories", label: "Stories" },
  { href: "#meals", label: "Meals & Rituals" },
  { href: "#songs", label: "Songs" },
  { href: "#series", label: "Jai Malhar" },
  { href: "#legacy", label: "Legacy" },
  { href: "#sources", label: "Sources" },
];
export default function Header({ language, menuOpen, onToggleLanguage, onToggleMenu, onCloseMenu }) {
  return (
    <header className="site-header" id="top">
      <div className="header-left">
        <img
          src="/assets/svg/jai-malhar-logo.svg"
          alt="Jai Malhar style logo"
          className="header-logo jai-logo"
        />
        <div className="brand-stack">
          <p className="brand-title">Shri Khandoba Divya Darbar</p>
          <p className="brand-sub">Marathi + English Living Archive</p>
        </div>
      </div>
      <div className="header-actions">
        <button id="langToggle" className="btn ghost" aria-label="Toggle language" onClick={onToggleLanguage}>
          <span className={`lang-pill ${language === "en" ? "active" : ""}`} data-lang-target="en">
            EN
          </span>
          <span className={`lang-pill ${language === "mr" ? "active" : ""}`} data-lang-target="mr">
            मराठी
          </span>
        </button>
        <button id="menuToggle" className="btn ghost mobile-only" aria-label="Open menu" onClick={onToggleMenu}>
          ☰
        </button>
      </div>

      <nav id="mainNav" className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} onClick={onCloseMenu}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
