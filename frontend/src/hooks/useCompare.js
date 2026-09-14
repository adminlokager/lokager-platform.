import { useCallback, useEffect, useState } from "react";

// In-memory compare store (max 3), shared across component instances in the tab.
// Transient by design (resets on reload) — a shortlist for side-by-side compare.
const MAX = 3;
let items = [];
const listeners = new Set();
const notify = () => listeners.forEach((l) => l(items));

export const useCompare = () => {
  const [ids, setLocal] = useState(items);

  useEffect(() => {
    const l = (next) => setLocal(next);
    listeners.add(l);
    setLocal(items);
    return () => listeners.delete(l);
  }, []);

  const toggle = useCallback((id) => {
    if (items.includes(id)) { items = items.filter((x) => x !== id); notify(); return true; }
    if (items.length >= MAX) return false;
    items = [...items, id];
    notify();
    return true;
  }, []);

  const remove = useCallback((id) => { items = items.filter((x) => x !== id); notify(); }, []);
  const clear = useCallback(() => { items = []; notify(); }, []);

  return { ids, isInCompare: (id) => ids.includes(id), toggle, remove, clear, max: MAX };
};
