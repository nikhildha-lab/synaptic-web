import { useId } from 'react';

// Small glowing, breathing orb used for AI teasers and regime chips.
const TONES = {
  ai: ['#8B8FF5', '#2A2DA8'],
  Bullish: ['#17B26A', '#05603A'],
  Bearish: ['#F04438', '#912018'],
  Neutral: ['#F79009', '#93370D'],
};

export default function Orb({ size = 44, tone = 'ai', ring = false }) {
  const id = useId().replace(/:/g, '');
  const [c, deep] = TONES[tone] || TONES.ai;
  const r = size / 4;
  const cx = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" style={{ flexShrink: 0, overflow: 'visible' }}>
      <defs>
        <radialGradient id={`orb${id}`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor={c} />
          <stop offset="100%" stopColor={deep} />
        </radialGradient>
        <filter id={`glow${id}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={size / 18} result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {ring && <circle className="syn-spin" cx={cx} cy={cx} r={size * 0.44} fill="none" stroke="#8B8FF5" strokeOpacity="0.45" strokeDasharray="2 6" />}
      <circle className="syn-pulse" cx={cx} cy={cx} r={r} fill="none" stroke={c} strokeWidth="1.5" />
      <g className="syn-breathe" filter={`url(#glow${id})`}>
        <circle cx={cx} cy={cx} r={r} fill={`url(#orb${id})`} />
      </g>
    </svg>
  );
}
