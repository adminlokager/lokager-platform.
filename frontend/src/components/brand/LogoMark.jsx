export const MARK_SHAPES = (
  <>
    <polygon points="8,26 44,12 44,90 8,90" fill="url(#lk-gold)" />
    <polygon points="36,15 44,12 44,90 36,90" fill="url(#lk-gold-deep)" />
    <polygon points="52,48 68,41 68,92 52,92" fill="url(#lk-gold)" />
    <polygon points="63,43 68,41 68,92 63,92" fill="url(#lk-gold-deep)" />
    <polygon points="76,63 90,57 90,95 76,95" fill="url(#lk-gold)" />
    <polygon points="86,59 90,57 90,95 86,95" fill="url(#lk-gold-deep)" />
    <polygon points="8,90 44,90 114,101 8,101" fill="url(#lk-gold-foot)" />
    <polygon points="8,101 114,101 108,106 8,106" fill="url(#lk-gold-deep)" />
  </>
);

export const MarkDefs = () => (
  <defs>
    <linearGradient id="lk-gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#E9CF8E" />
      <stop offset="0.5" stopColor="#CBA25C" />
      <stop offset="1" stopColor="#B8894A" />
    </linearGradient>
    <linearGradient id="lk-gold-deep" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#A67A3E" />
      <stop offset="1" stopColor="#7E5B2C" />
    </linearGradient>
    <linearGradient id="lk-gold-foot" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#D4B47C" />
      <stop offset="1" stopColor="#B8894A" />
    </linearGradient>
  </defs>
);

export const LogoMark = ({ className, title = "LOKAGER", testId = "logo-mark" }) => (
  <svg viewBox="0 0 120 110" className={className} role="img" aria-label={title} data-testid={testId}>
    <MarkDefs />
    {MARK_SHAPES}
  </svg>
);

export const BrandA = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="lk-gold-a" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#D9B975" />
        <stop offset="1" stopColor="#B8894A" />
      </linearGradient>
    </defs>
    <polygon points="0,100 15,100 50,22 85,100 100,100 57,0 43,0" fill="url(#lk-gold-a)" />
    <rect x="41" y="60" width="18" height="18" fill="url(#lk-gold-a)" />
  </svg>
);
