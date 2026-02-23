export default function HeroSection({ slide, slideIndex, slideCount, particles, onPrev, onNext, onSelectSlide }) {
  return (
    <section id="hero" className="hero section-frame">
      <div className="hero-bg" style={{ backgroundImage: `url('${slide.image}')` }} aria-hidden="true"></div>

      <div className="hero-particles" id="heroParticles" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="hero-particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              opacity: particle.opacity,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              "--drift": `${particle.drift}px`,
            }}
          ></span>
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-kirit-col">
          <div className="kirit-3d-wrap">
            <img
              src="/assets/svg/jai-malhar-logo.svg"
              alt="Jai Malhar style logo"
              className="kirit-3d jai-logo"
            />
            <div className="tilak-glow" aria-hidden="true"></div>
          </div>
          <p className="intro-mantra lang-en">Yelkot Yelkot Jai Malhar</p>
          <p className="intro-mantra lang-mr">येळकोट येळकोट जय मल्हार</p>
        </div>

        <div className="hero-text-col">
          <p className="eyebrow lang-en">Immersive Devotional-History Portal</p>
          <p className="eyebrow lang-mr">भव्य भक्ती-इतिहास डिजिटल संग्रह</p>

          <h1 className="hero-title lang-en">{slide.titleEn}</h1>
          <h1 className="hero-title lang-mr">{slide.titleMr}</h1>

          <p className="hero-description lang-en">{slide.descriptionEn}</p>
          <p className="hero-description lang-mr">{slide.descriptionMr}</p>

          <div className="hero-cta-row">
            <a href="#temples" className="btn solid lang-en">
              Open Temple Atlas
            </a>
            <a href="#temples" className="btn solid lang-mr">
              मंदिर नकाशा पहा
            </a>
            <a href="#stories" className="btn outline lang-en">
              Read Story Vault
            </a>
            <a href="#stories" className="btn outline lang-mr">
              कथा संग्रह वाचा
            </a>
          </div>

          <div className="hero-slide-controls" aria-label="Hero slides">
            <button className="slide-btn" aria-label="Previous slide" onClick={onPrev}>
              ◀
            </button>
            <div className="slide-dots">
              {Array.from({ length: slideCount }).map((_, index) => (
                <button
                  key={index}
                  className={`slide-dot ${index === slideIndex ? "active" : ""}`}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => onSelectSlide(index)}
                ></button>
              ))}
            </div>
            <button className="slide-btn" aria-label="Next slide" onClick={onNext}>
              ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
