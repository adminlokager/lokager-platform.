const BARS = [
  [0, 60], [40, 110], [70, 90], [120, 150], [150, 200], [175, 130], [220, 170], [250, 240], [275, 120], [320, 180],
  [350, 260], [380, 150], [430, 210], [470, 300], [500, 140], [550, 230], [590, 180], [630, 320], [660, 200], [700, 260],
  [740, 150], [780, 340], [810, 220], [860, 170], [900, 280], [930, 200], [980, 240], [1020, 360], [1050, 180], [1100, 220],
  [1140, 300], [1180, 160], [1220, 250], [1260, 120], [1300, 190], [1340, 140], [1380, 210], [1410, 90],
];

export const Skyline = ({ className = "" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 1440 380"
    preserveAspectRatio="xMidYMax slice"
    className={`pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] w-full text-gold ${className}`}
    style={{ maskImage: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)", WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)" }}
  >
    {BARS.map(([x, h], i) => (
      <rect key={i} x={x} y={380 - h} width={i % 3 === 0 ? 34 : 26} height={h} fill="currentColor" opacity={0.06 + (i % 4) * 0.015} />
    ))}
    <line x1="0" y1="379.5" x2="1440" y2="379.5" stroke="currentColor" strokeOpacity="0.35" />
  </svg>
);
