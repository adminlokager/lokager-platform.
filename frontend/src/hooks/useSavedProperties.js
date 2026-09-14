import { useCallback, useEffect, useState } from "react";

const KEY = "lokager_saved_properties";

const read = () => {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
};

// Module-level store so every hook instance in the same tab stays in sync
// (same-tab writes do not fire the 'storage' event). Still listens to
// 'storage' for cross-tab sync. Structured to later swap for backend storage.
let current = read();
const listeners = new Set();

const write = (next) => {
  current = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
  listeners.forEach((l) => l(current));
};

export const useSavedProperties = () => {
  const [ids, setLocal] = useState(current);

  useEffect(() => {
    const listener = (next) => setLocal(next);
    listeners.add(listener);
    const onStorage = (e) => { if (e.key === KEY) { current = read(); listeners.forEach((l) => l(current)); } };
    window.addEventListener("storage", onStorage);
    // Sync in case store changed before mount.
    setLocal(current);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const toggle = useCallback((id) => {
    write(current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }, []);

  const isSaved = useCallback((id) => ids.includes(id), [ids]);
  const setIds = useCallback((next) => write(Array.isArray(next) ? next : []), []);

  return { ids, isSaved, toggle, setIds };
};
