const SIZE = 320;
const STROKE = 2;
const R = (SIZE - STROKE * 4) / 2;
const C = 2 * Math.PI * R;

export const CountdownRing = ({ progress }) => (
  <svg
    data-testid="countdown-ring"
    viewBox={`0 0 ${SIZE} ${SIZE}`}
    className="h-[260px] w-[260px] sm:h-[340px] sm:w-[340px] lg:h-[400px] lg:w-[400px] -rotate-90"
    aria-hidden="true"
  >
    <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="rgba(246,241,231,0.12)" strokeWidth={STROKE} />
    <circle
      cx={SIZE / 2}
      cy={SIZE / 2}
      r={R}
      fill="none"
      stroke="#B8894A"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeDasharray={C}
      strokeDashoffset={C * (1 - progress)}
      style={{ transition: "stroke-dashoffset 120ms linear" }}
    />
  </svg>
);
