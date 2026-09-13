import { useEffect } from "react";
import confetti from "canvas-confetti";

const CHAMPAGNE = ["#D4B47C", "#E9D9B5", "#B8894A", "#F3E5AB"];

export const useGoldConfetti = () => {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const drift = (x, angle) =>
      confetti({
        particleCount: 26,
        spread: 90,
        angle,
        startVelocity: 18,
        gravity: 0.45,
        drift: x < 0.5 ? 0.3 : -0.3,
        scalar: 0.65,
        ticks: 420,
        shapes: ["circle"],
        colors: CHAMPAGNE,
        origin: { x, y: 0.62 },
        zIndex: 40,
      });
    const timers = [1200, 2600, 4000, 5400].map((ms, i) =>
      setTimeout(() => {
        drift(0.18, 70 + (i % 2) * 10);
        drift(0.82, 110 - (i % 2) * 10);
      }, ms),
    );
    return () => {
      timers.forEach(clearTimeout);
      confetti.reset();
    };
  }, []);
};
