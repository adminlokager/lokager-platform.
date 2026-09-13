import { LogoMark } from "@/components/brand/LogoMark";

const G = ({ children }) => (
  <g fill="none" stroke="#B8894A" strokeWidth="1.2" vectorEffect="non-scaling-stroke">
    {children}
  </g>
);

const Globe = ({ cx = 200, cy = 200, r = 140 }) => (
  <>
    <circle cx={cx} cy={cy} r={r} strokeWidth="1.6" />
    <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.36} strokeOpacity="0.7" />
    <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.72} strokeOpacity="0.5" />
    <ellipse cx={cx} cy={cy} rx={r * 0.36} ry={r} strokeOpacity="0.7" />
    <ellipse cx={cx} cy={cy} rx={r * 0.72} ry={r} strokeOpacity="0.5" />
    <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} strokeOpacity="0.8" />
    <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} strokeOpacity="0.8" />
  </>
);

const NODES = [[70, 90], [200, 60], [330, 100], [110, 210], [250, 190], [340, 250], [80, 330], [210, 320], [320, 340]];
const LINKS = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 7], [5, 8], [6, 7], [7, 8], [1, 7]];

const arts = {
  globe: () => (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <G><Globe /></G>
    </svg>
  ),
  merge: () => (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <G><Globe cx={160} cy={200} r={130} /></G>
      </svg>
      <LogoMark className="absolute right-[8%] top-1/2 h-[46%] w-auto -translate-y-1/2 drop-shadow-[0_12px_30px_rgba(184,137,74,0.25)]" testId="art-merge-mark" />
    </div>
  ),
  world: () => (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <G>
        <Globe />
        <path d="M246 186 Q 300 90 330 130" strokeDasharray="4 6" strokeOpacity="0.8" />
        <path d="M246 186 Q 150 60 90 120" strokeDasharray="4 6" strokeOpacity="0.8" />
        <path d="M246 186 Q 300 300 320 290" strokeDasharray="4 6" strokeOpacity="0.8" />
        <path d="M246 186 Q 120 280 80 260" strokeDasharray="4 6" strokeOpacity="0.8" />
      </G>
      <g fill="#B8894A">
        {[[330, 130], [90, 120], [320, 290], [80, 260]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />)}
        <circle cx="246" cy="186" r="7" />
        <circle cx="246" cy="186" r="18" fill="none" stroke="#B8894A" strokeWidth="1.5" className="origin-[246px_186px] animate-pulse-ring" />
      </g>
    </svg>
  ),
  network: () => (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <G>
        {LINKS.map(([a, b]) => <line key={`${a}-${b}`} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} strokeOpacity="0.7" />)}
        {NODES.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 4 ? 14 : 8} fill="#FBF8F2" strokeWidth="1.6" />)}
      </G>
      <circle cx="250" cy="190" r="5" fill="#B8894A" />
    </svg>
  ),
  identity: () => (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <G>
          <circle cx="200" cy="200" r="170" strokeOpacity="0.35" />
          <circle cx="200" cy="200" r="130" strokeOpacity="0.55" />
        </G>
      </svg>
      <LogoMark className="relative h-[42%] w-auto drop-shadow-[0_16px_36px_rgba(184,137,74,0.3)]" testId="art-identity-mark" />
    </div>
  ),
};

export const LineArt = ({ name }) => {
  const Art = arts[name];
  return Art ? <Art /> : null;
};
