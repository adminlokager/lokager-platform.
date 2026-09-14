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

// Lightweight browser shortlist (stores property IDs only). Structured so it
// can later be swapped for account-based backend storage without UI changes.
export const useSavedProperties = () => {
  const [ids, setIds] = useState(read);

  useEffect(() => {
    const onStorage = (e) => { if (e.key === KEY) setIds(read()); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next) => {
    setIds(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }, []);

  const toggle = useCallback((id) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const isSaved = useCallback((id) => ids.includes(id), [ids]);

  return { ids, isSaved, toggle, setIds: persist };
};
