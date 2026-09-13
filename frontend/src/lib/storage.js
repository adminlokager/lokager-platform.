const safe = (fn, fallback = null) => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

export const storage = {
  get: (key) => safe(() => window.localStorage.getItem(key)),
  set: (key, value) => safe(() => window.localStorage.setItem(key, value)),
  remove: (key) => safe(() => window.localStorage.removeItem(key)),
};
