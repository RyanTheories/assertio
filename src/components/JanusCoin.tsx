interface Props {
  face?: 'trusting' | 'skeptical';
  className?: string;
  size?: number;
}

export function JanusCoin({ face = 'trusting', className, size = 140 }: Props) {
  return (
    <svg
      className={`janus-coin ${className ?? ''}`}
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={`Janus coin, ${face} face`}
    >
      <defs>
        <radialGradient id="janus-face-gradient" cx="35%" cy="30%" r="85%">
          <stop offset="0%" stopColor="var(--coin-hi, #f7e9c9)" />
          <stop offset="70%" stopColor="var(--coin-mid, #d9b96a)" />
          <stop offset="100%" stopColor="var(--coin-lo, #a8873f)" />
        </radialGradient>
      </defs>
      <g className="janus-coin-inner">
        <circle cx="100" cy="100" r="96" fill="url(#janus-face-gradient)" stroke="var(--coin-lo, #a8873f)" strokeWidth="2" />
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i / 48) * Math.PI * 2;
          const x1 = 100 + Math.cos(a) * 88;
          const y1 = 100 + Math.sin(a) * 88;
          const x2 = 100 + Math.cos(a) * 95;
          const y2 = 100 + Math.sin(a) * 95;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--coin-lo, #a8873f)" strokeWidth="2.5" />;
        })}
        <circle cx="100" cy="100" r="84" fill="none" stroke="var(--coin-lo, #a8873f)" strokeWidth="1.5" opacity="0.6" />
        {face === 'trusting' ? <TrustingFace /> : <SkepticalFace />}
      </g>
    </svg>
  );
}

function TrustingFace() {
  return (
    <g>
      <path
        d="M118 44 c-24 0 -44 16 -46 40 c-1 10 2 18 -4 24 c-5 5 -14 4 -14 12 c0 7 8 8 8 14 c0 6 -4 8 -2 14 c2 7 12 6 14 12 c3 10 14 44 46 44 c30 0 44 -28 44 -62 c0 -42 -18 -98 -46 -98 z"
        fill="var(--coin-mid, #d9b96a)"
        stroke="var(--coin-lo, #a8873f)"
        strokeWidth="3"
      />
      <path d="M150 78 q14 4 18 14" fill="none" stroke="var(--coin-lo, #a8873f)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="142" cy="86" rx="5" ry="6" fill="var(--coin-lo, #a8873f)" />
      <path d="M136 122 q10 6 22 2" fill="none" stroke="var(--coin-lo, #a8873f)" strokeWidth="3" strokeLinecap="round" />
      <path d="M128 144 q8 8 20 6" fill="none" stroke="var(--coin-lo, #a8873f)" strokeWidth="3" strokeLinecap="round" />
      <path d="M84 96 l-16 6" stroke="var(--coin-lo, #a8873f)" strokeWidth="3" strokeLinecap="round" />
      <path d="M104 52 c14 2 22 8 26 16" fill="none" stroke="var(--coin-lo, #a8873f)" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function SkepticalFace() {
  return (
    <g>
      <path
        d="M82 44 c24 0 44 16 46 40 c1 10 -2 18 4 24 c5 5 14 4 14 12 c0 7 -8 8 -8 14 c0 6 4 8 2 14 c-2 7 -12 6 -14 12 c-3 10 -14 44 -46 44 c-30 0 -44 -28 -44 -62 c0 -42 18 -98 46 -98 z"
        fill="var(--coin-mid, #d9b96a)"
        stroke="var(--coin-lo, #a8873f)"
        strokeWidth="3"
      />
      <path d="M50 68 q14 -8 26 -2" fill="none" stroke="var(--coin-lo, #a8873f)" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="58" cy="86" rx="5" ry="6" fill="var(--coin-lo, #a8873f)" />
      <path d="M48 76 l16 4" stroke="var(--coin-lo, #a8873f)" strokeWidth="3" strokeLinecap="round" />
      <path d="M64 122 q-10 6 -22 2" fill="none" stroke="var(--coin-lo, #a8873f)" strokeWidth="3" strokeLinecap="round" />
      <path d="M72 144 q-8 8 -20 6" fill="none" stroke="var(--coin-lo, #a8873f)" strokeWidth="3" strokeLinecap="round" />
      <path d="M96 52 c-14 2 -22 8 -26 16" fill="none" stroke="var(--coin-lo, #a8873f)" strokeWidth="3" strokeLinecap="round" />
      <path d="M116 96 l16 6" stroke="var(--coin-lo, #a8873f)" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}
