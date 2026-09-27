import { RISK_COLOR, RISK_LEVEL } from '../data/dummy.js';

export function Logo({ light = false, size = 30 }) {
  return (
    <span className="brand" style={light ? { color: '#fff' } : undefined}>
      <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true">
        <rect width="36" height="36" rx="9" fill={light ? '#fff' : '#16155A'} />
        <path d="M9 23 L15 16 L20 20 L27 11" stroke={light ? '#16155A' : '#fff'} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="27" cy="11" r="2.4" fill={light ? '#16155A' : '#fff'} />
      </svg>
      <span>SYNAPTIC</span>
    </span>
  );
}

// Minimal stroke icon set
const PATHS = {
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  chevron: 'M6 9l6 6 6-6',
  right: 'M9 6l6 6-6 6',
  plus: 'M12 5v14M5 12h14',
  check: 'M5 12l5 5 9-11',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-3.5-3.5',
  link: 'M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7',
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.5 8.5l-2 5-5 2 2-5z',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  sparkle: 'M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
  download: 'M12 3v12M7 10l5 5 5-5M5 21h14',
  refresh: 'M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5',
  alert: 'M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  briefcase: 'M3 7h18v13H3zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2',
  stop: 'M6 6h12v12H6z',
  chart: 'M3 3v18h18M7 15l4-4 3 3 5-6',
  wallet: 'M3 7h18v13H3zM3 7l3-4h12l3 4',
};
export function Icon({ name, size = 18, color = 'currentColor', width = 2, fill = 'none' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d={PATHS[name]} />
    </svg>
  );
}

export function Seg({ options, value, onChange, dark = false, label }) {
  return (
    <div className={`seg${dark ? ' dark' : ''}`} role="group" aria-label={label}>
      {options.map((o) => {
        const v = typeof o === 'string' ? o : o.value;
        const l = typeof o === 'string' ? o : o.label;
        return (
          <button key={v} type="button" className={value === v ? 'on' : ''} onClick={() => onChange(v)} aria-pressed={value === v}>
            {l}
          </button>
        );
      })}
    </div>
  );
}

export function Pills({ options, value, onChange }) {
  return (
    <div className="row wrap" style={{ gap: 8 }}>
      {options.map((o) => {
        const v = typeof o === 'string' ? o : o.value;
        const l = typeof o === 'string' ? o : o.label;
        return (
          <button key={v} type="button" className={`pill${value === v ? ' on' : ''}`} onClick={() => onChange(v)}>{l}</button>
        );
      })}
    </div>
  );
}

export function RiskBars({ risk }) {
  const n = RISK_LEVEL[risk];
  const c = RISK_COLOR[risk];
  return (
    <span className="row" style={{ gap: 6 }}>
      <span className="risk-bars">{[1, 2, 3].map((i) => <span key={i} style={{ background: i <= n ? c : undefined }} />)}</span>
      <b style={{ color: c }}>{risk}</b>
    </span>
  );
}

export function Diverge({ value, max = 1, height = 12 }) {
  const w = (Math.abs(value) / max) * 50;
  return (
    <div className="diverge" style={{ height }}>
      <div className="mid" />
      <div className="fill" style={{ height, width: `${w}%`, left: `${value >= 0 ? 50 : 50 - w}%`, background: value >= 0 ? 'var(--pos-2)' : 'var(--neg-2)' }} />
    </div>
  );
}

export function Sparkline({ d, color = 'var(--brand)', w = 120, h = 40 }) {
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true" style={{ maxWidth: w * 1.6 }}>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function SampleBadge() {
  return <span className="chip sample">Sample data</span>;
}

export const regimeTone = (label) =>
  /Bull|Up|Leading/.test(label) ? 'pos' : /Bear|Down|Lagging/.test(label) ? 'neg' : /Weak|Neutral|Choppy/.test(label) ? 'warn' : 'gray';
