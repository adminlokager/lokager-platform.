import { useCallback, useEffect, useRef, useState } from "react";
import { COUNTDOWN_MS, ZERO_HOLD_MS, CELEBRATION_MS } from "@/lib/site";
import { unlockAudio, playChime } from "@/lib/chime";

const COUNTDOWN_END = COUNTDOWN_MS + ZERO_HOLD_MS;

export const useLaunchCeremony = () => {
  const startedAtRef = useRef(0);
  const chimedRef = useRef(false);
  const [phase, setPhase] = useState("idle");
  const [remaining, setRemaining] = useState(COUNTDOWN_MS / 1000);
  const [progress, setProgress] = useState(0);

  const start = useCallback(() => {
    if (startedAtRef.current) return;
    unlockAudio();
    startedAtRef.current = Date.now();
    setRemaining(COUNTDOWN_MS / 1000);
    setProgress(0);
    setPhase("countdown");
  }, []);

  useEffect(() => {
    if (phase !== "countdown") return undefined;
    const tick = () => {
      const elapsed = Date.now() - startedAtRef.current;
      setRemaining(Math.max(0, Math.ceil((COUNTDOWN_MS - elapsed) / 1000)));
      setProgress(Math.min(1, elapsed / COUNTDOWN_MS));
      if (elapsed >= COUNTDOWN_MS && !chimedRef.current) {
        chimedRef.current = true;
        playChime();
      }
      if (elapsed >= COUNTDOWN_END) setPhase("celebration");
    };
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "celebration") return undefined;
    const id = setTimeout(() => setPhase("complete"), CELEBRATION_MS);
    return () => clearTimeout(id);
  }, [phase]);

  return { phase, remaining, progress, start };
};
