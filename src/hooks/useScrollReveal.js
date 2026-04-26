import { useEffect } from "react";

const SELECTOR =
  ".section-head h2, .section-head p, .panel, .table-wrap, .story-card, .song-card, .art-card, .timeline-item, .glossary-card, .stat-card";
export function useScrollReveal(triggerValues = []) {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(SELECTOR));

    if (!("IntersectionObserver" in window)) {
      targets.forEach((node) => node.classList.add("in-view"));
      return undefined;
    }
  const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    targets.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, triggerValues);
}
