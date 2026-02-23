import { useEffect, useRef } from "react";
import { drawDevotionalArt } from "../utils/art";

export default function AiArtSection({ prompts, artSeed, onRegenerate }) {
  const canvasRefs = useRef([]);

  useEffect(() => {
    canvasRefs.current.forEach((canvas, index) => {
      if (!canvas) return;
      drawDevotionalArt(canvas, index + artSeed * 37, prompts[index].title);
    });
  }, [artSeed, prompts]);

  return (
    <section id="ai-art" className="ai-art section-frame">
      <div className="section-head">
        <p className="section-tag lang-en">Generated Visuals</p>
        <p className="section-tag lang-mr">निर्मित दृश्यरूपे</p>
        <h2 className="lang-en">AI-Style Devotional Scene Generator</h2>
        <h2 className="lang-mr">AI-शैली भक्तीदृश्य जनरेटर</h2>
      </div>

      <div className="panel">
        <p className="lang-en">
          Click refresh to generate new visual compositions inspired by Khandoba themes. These are
          procedural artworks rendered in-browser.
        </p>
        <p className="lang-mr">
          रिफ्रेश क्लिक केल्यावर खंडोबा थीमवर आधारित नवीन दृश्यरचना तयार होतील. ही प्रतिमा
          ब्राउझरमध्ये प्रक्रियात्मक पद्धतीने रेंडर केली जाते.
        </p>
        <button className="btn solid lang-en" onClick={onRegenerate}>
          Regenerate Art
        </button>
        <button className="btn solid lang-mr" onClick={onRegenerate}>
          नवीन दृश्य तयार करा
        </button>
      </div>

      <div className="art-grid">
        {prompts.map((item, index) => (
          <article key={item.id} className="art-card reveal-item">
            <div className="art-head">
              <h3>{item.title}</h3>
              <p>{item.prompt}</p>
            </div>
            <div className="art-canvas-wrap">
              <canvas
                ref={(node) => {
                  canvasRefs.current[index] = node;
                }}
                width="960"
                height="540"
                aria-label={`Generated devotional art for ${item.title}`}
              ></canvas>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
