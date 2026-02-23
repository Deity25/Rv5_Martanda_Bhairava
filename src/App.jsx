import { useEffect, useMemo, useState } from "react";
import { SITE_DATA } from "./data/siteData";
import { useScrollReveal } from "./hooks/useScrollReveal";
import Loader from "./components/Loader";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ArchiveSections from "./components/ArchiveSections";
import TempleSection from "./components/TempleSection";
import YatraPlannerSection from "./components/YatraPlannerSection";
import AiArtSection from "./components/AiArtSection";
import Footer from "./components/Footer";

function makeParticles() {
  const isNarrow = typeof window !== "undefined" && window.innerWidth < 700;
  const count = isNarrow ? 28 : 54;

  return Array.from({ length: count }, (_, index) => ({
    id: index,
    size: 6 + Math.random() * 9,
    left: Math.random() * 100,
    top: -28 + Math.random() * 34,
    opacity: 0.2 + Math.random() * 0.7,
    duration: 8 + Math.random() * 9,
    delay: -16 + Math.random() * 16,
    drift: -80 + Math.random() * 160,
  }));
}

function wrapIndex(index, size) {
  return ((index % size) + size) % size;
}

export default function App() {
  const [language, setLanguage] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [stateFilter, setStateFilter] = useState("all");
  const [templeSearch, setTempleSearch] = useState("");
  const [artSeed, setArtSeed] = useState(1);

  const particles = useMemo(() => makeParticles(), []);
  const heroSlides = SITE_DATA.heroSlides;

  const currentSlide = heroSlides[heroIndex] || heroSlides[0];

  const filteredTemples = useMemo(() => {
    const query = templeSearch.trim().toLowerCase();

    return SITE_DATA.templeAtlas.filter((temple) => {
      const stateOk = stateFilter === "all" || temple.state === stateFilter;

      const haystack = [
        temple.name,
        temple.nameMr,
        temple.state,
        temple.district,
        temple.significanceEn,
        temple.significanceMr,
        temple.category,
      ]
        .join(" ")
        .toLowerCase();

      const textOk = !query || haystack.includes(query);
      return stateOk && textOk;
    });
  }, [stateFilter, templeSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaderHidden(true);
    }, 1300);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("lang-marathi", language === "mr");
    return () => document.body.classList.remove("lang-marathi");
  }, [language]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => wrapIndex(prev + 1, heroSlides.length));
    }, 6500);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useScrollReveal([language, filteredTemples.length, artSeed, heroIndex]);

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "en" ? "mr" : "en"));
  };

  const handleSlideSelect = (index) => {
    setHeroIndex(wrapIndex(index, heroSlides.length));
  };

  return (
    <>
      <div className="grain-overlay" aria-hidden="true"></div>
      <Loader hidden={loaderHidden} />

      <Header
        language={language}
        menuOpen={menuOpen}
        onToggleLanguage={handleLanguageToggle}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMenuOpen(false)}
      />

      <main>
        <HeroSection
          slide={currentSlide}
          slideIndex={heroIndex}
          slideCount={heroSlides.length}
          particles={particles}
          onPrev={() => handleSlideSelect(heroIndex - 1)}
          onNext={() => handleSlideSelect(heroIndex + 1)}
          onSelectSlide={handleSlideSelect}
        />

        <ArchiveSections data={SITE_DATA} />

        <TempleSection
          temples={SITE_DATA.templeAtlas}
          mailarGallery={SITE_DATA.mailarGallery}
          templeProfiles={SITE_DATA.templeProfiles}
          filteredTemples={filteredTemples}
          stateFilter={stateFilter}
          templeSearch={templeSearch}
          onStateFilterChange={setStateFilter}
          onTempleSearchChange={setTempleSearch}
          language={language}
        />

        <YatraPlannerSection
          temples={SITE_DATA.templeAtlas}
          specialNodes={SITE_DATA.yatraSpecialNodes}
          circuits={SITE_DATA.yatraCircuits}
          language={language}
        />

        <AiArtSection
          prompts={SITE_DATA.aiArtPrompts}
          artSeed={artSeed}
          onRegenerate={() => setArtSeed((prev) => prev + 1)}
        />
      </main>

      <Footer disclaimer={SITE_DATA.siteMeta.disclaimer} />
    </>
  );
}
