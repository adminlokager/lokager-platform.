export const LogoMark = ({ className, title = "LOKAGER", testId = "logo-mark" }) => (
  <svg viewBox="0 0 120 108" className={className} role="img" aria-label={title} data-testid={testId}>
    <defs>
      <linearGradient id="lk-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E3C27C" />
        <stop offset="0.55" stopColor="#C9A05A" />
        <stop offset="1" stopColor="#B8894A" />
      </linearGradient>
      <linearGradient id="lk-gold-deep" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#A67A3E" />
        <stop offset="1" stopColor="#85602F" />
      </linearGradient>
    </defs>
    <polygon points="10,60 24,52 24,86 10,86" fill="url(#lk-gold)" />
    <polygon points="20,54 24,52 24,86 20,86" fill="url(#lk-gold-deep)" />
    <polygon points="30,44 44,36 44,86 30,86" fill="url(#lk-gold)" />
    <polygon points="40,38 44,36 44,86 40,86" fill="url(#lk-gold-deep)" />
    <polygon points="50,26 72,14 72,86 50,86" fill="url(#lk-gold)" />
    <polygon points="64,18 72,14 72,86 64,86" fill="url(#lk-gold-deep)" />
    <polygon points="10,86 96,86 110,100 10,100" fill="url(#lk-gold)" />
    <polygon points="10,100 110,100 104,106 10,106" fill="url(#lk-gold-deep)" />
  </svg>
);
