import { useEffect } from "react";
import confetti from "canvas-confetti";

const COLORS = ["#B8894A", "#D4AF37", "#F3E5AB", "#111111", "#FFFFFF"];

export const useGoldConfetti = () => {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const burst = (x, angle) =>
      confetti({ particleCount: 90, spread: 70, startVelocity: 45, origin: { x, y: 0.7 }, angle, colors: COLORS, scalar: 1.05, ticks: 260, zIndex: 50 });
    burst(0.15, 60);
    burst(0.85, 120);
    const rain = setTimeout(() => confetti({ particleCount: 140, spread: 160, startVelocity: 30, origin: { x: 0.5, y: 0.3 }, colors: COLORS, ticks: 300, zIndex: 50 }), 700);
    const timers = [1800, 3200].map((ms) => setTimeout(() => { burst(0.2, 65); burst(0.8, 115); }, ms));
    return () => {
      clearTimeout(rain);
      timers.forEach(clearTimeout);
      confetti.reset();
    };
  }, []);
};
