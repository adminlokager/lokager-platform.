const SIZE = 400;
const C = SIZE / 2;
const R_OUTER = 196;
const R_TICK = 186;
const R_RING = 168;
const R_INNER = 146;
const CIRC = 2 * Math.PI * R_RING;

const TICKS = Array.from({ length: 60 }, (_, i) => {
  const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
  const major = i % 5 === 0;
  const r1 = R_TICK - (major ? 14 : 7);
  return { i, major, x1: C + r1 * Math.cos(a), y1: C + r1 * Math.sin(a), x2: C + R_TICK * Math.cos(a), y2: C + R_TICK * Math.sin(a) };
});

export const CountdownDial = ({ progress }) => {
  const lit = Math.floor(progress * 60);
  return (
    <svg
      data-testid="countdown-dial"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-[clamp(230px,38dvh,400px)] w-[clamp(230px,38dvh,400px)]"
      aria-hidden="true"
    >
      <circle cx={C} cy={C} r={R_OUTER} fill="none" stroke="#D4B47C" strokeOpacity="0.4" strokeWidth="1" />
      {TICKS.map((t) => (
        <line
          key={t.i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={t.i < lit ? "#B8894A" : "#D4B47C"}
          strokeOpacity={t.i < lit ? 1 : 0.45}
          strokeWidth={t.major ? 1.6 : 1}
          strokeLinecap="round"
        />
      ))}
      <circle cx={C} cy={C} r={R_RING} fill="none" stroke="#D4B47C" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle
        cx={C}
        cy={C}
        r={R_RING}
        fill="none"
        stroke="#B8894A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        strokeDashoffset={CIRC * (1 - progress)}
        transform={`rotate(-90 ${C} ${C})`}
        style={{ transition: "stroke-dashoffset 120ms linear" }}
      />
      <circle cx={C} cy={C} r={R_INNER} fill="#FBF8F2" fillOpacity="0.6" stroke="#B8894A" strokeOpacity="0.18" strokeWidth="1" />
    </svg>
  );
};
