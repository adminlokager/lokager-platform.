import { useCallback, useEffect, useRef, useState } from "react";
import { storage } from "@/lib/storage";
import { unlockAudio, playChime } from "@/lib/chime";
import { COUNTDOWN_MS, ZERO_HOLD_MS, CELEBRATION_MS, STORAGE_KEYS } from "@/lib/site";

const COUNTDOWN_END = COUNTDOWN_MS + ZERO_HOLD_MS;

const derivePhase = (respectSeen) => {
  const startedAt = Number(storage.get(STORAGE_KEYS.startedAt));
  if (startedAt) {
    const elapsed = Date.now() - startedAt;
    if (elapsed < COUNTDOWN_END) return { phase: "countdown", startedAt };
    if (elapsed < COUNTDOWN_END + CELEBRATION_MS) return { phase: "celebration", startedAt };
    if (respectSeen) return { phase: "complete", startedAt };
  }
  if (respectSeen && storage.get(STORAGE_KEYS.seen) === "1") return { phase: "complete", startedAt: 0 };
  return { phase: "idle", startedAt: 0 };
};

export const useLaunchCeremony = ({ respectSeen = true } = {}) => {
  const initial = useRef(derivePhase(respectSeen));
  const startedAtRef = useRef(initial.current.startedAt);
  const [phase, setPhase] = useState(initial.current.phase);
  const [remaining, setRemaining] = useState(COUNTDOWN_MS / 1000);
  const [progress, setProgress] = useState(0);
  const chimedRef = useRef(false);

  const start = useCallback(() => {
    if (startedAtRef.current && phase !== "idle") return;
    unlockAudio();
    const now = Date.now();
    startedAtRef.current = now;
    storage.set(STORAGE_KEYS.startedAt, String(now));
    setRemaining(COUNTDOWN_MS / 1000);
    setProgress(0);
    setPhase("countdown");
  }, [phase]);

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
    storage.set(STORAGE_KEYS.seen, "1");
    const elapsed = Date.now() - startedAtRef.current - COUNTDOWN_END;
    const id = setTimeout(() => setPhase("complete"), Math.max(0, CELEBRATION_MS - elapsed));
    return () => clearTimeout(id);
  }, [phase]);

  return { phase, remaining, progress, start };
};
