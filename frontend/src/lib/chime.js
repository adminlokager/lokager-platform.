let ctx = null;

export const unlockAudio = () => {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    ctx = ctx || new Ctx();
    if (ctx.state === "suspended") ctx.resume();
    const silent = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = silent;
    src.connect(ctx.destination);
    src.start(0);
  } catch {
    ctx = null;
  }
};

const tone = (freq, at, dur, peak) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, at);
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(peak, at + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(at);
  osc.stop(at + dur + 0.05);
};

export const playChime = () => {
  if (!ctx || ctx.state !== "running") return false;
  const t = ctx.currentTime + 0.01;
  tone(1046.5, t, 2.2, 0.16);
  tone(1318.5, t + 0.14, 2.0, 0.13);
  tone(1568.0, t + 0.28, 2.6, 0.12);
  tone(2093.0, t + 0.28, 1.4, 0.04);
  return true;
};
