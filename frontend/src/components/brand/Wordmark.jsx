import { WORDMARK_VIEWBOX, WORDMARK_LETTERS, WORDMARK_A, WORDMARK_A_WINDOW, WORDMARK_TM } from "@/components/brand/wordmarkPaths";

export const Wordmark = ({ className, tone = "charcoal", testId = "brand-wordmark" }) => {
  const ink = tone === "ivory" ? "#F6F1E7" : "#111111";
  return (
    <svg viewBox={WORDMARK_VIEWBOX} className={className} role="img" aria-label="LOKAGER" data-testid={testId}>
      <defs>
        <linearGradient id="lk-word-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9B975" />
          <stop offset="1" stopColor="#B8894A" />
        </linearGradient>
      </defs>
      <path d={WORDMARK_LETTERS} fill={ink} />
      <path d={WORDMARK_A} fill="url(#lk-word-gold)" />
      <path d={WORDMARK_A_WINDOW} fill="url(#lk-word-gold)" />
      <path d={WORDMARK_TM} fill={ink} fillOpacity="0.85" />
    </svg>
  );
};
