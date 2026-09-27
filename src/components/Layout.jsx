import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../state/AppState.jsx';
import { REGIONS } from '../lib/format.js';
import { Icon, Logo, Seg } from './ui.jsx';
import { THEMES } from '../lib/themes.js';

const LINKS = [
  ['/overview', 'Overview'],
  ['/strategies', 'Strategies'],
  ['/backtest', 'Backtest Lab'],
  ['/market-pulse', 'Market Pulse'],
  ['/performance', 'Performance'],
  ['/brokers', 'Brokers'],
];

export function RegionPicker() {
  const { region, setRegion } = useApp();
  const [open, setOpen] = useState(false);
  const r = REGIONS[region];
  return (
    <div style={{ position: 'relative' }}>
      <button type="button" className="btn sm" onClick={() => setOpen(!open)} aria-label="Change region and currency" aria-expanded={open}>
        <Icon name="globe" size={16} color="var(--nav-muted)" />
        {r.short} <span className="muted" style={{ fontWeight: 500 }}>{r.code}</span>
        <Icon name="chevron" size={14} color="var(--nav-muted)" />
      </button>
      {open && (
        <div className="popover">
          <span style={{ padding: '8px 10px 4px', fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Region &amp; currency</span>
          {Object.values(REGIONS).map((x) => (
            <button key={x.key} type="button" className={x.key === region ? 'on' : ''} onClick={() => { setRegion(x.key); setOpen(false); }}>
              <span>{x.name}</span><span className="muted" style={{ fontWeight: 500 }}>{x.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TopNav() {
  const loc = useLocation();
  return (
    <header className="topnav">
      <div className="row" style={{ gap: 36 }}>
        <NavLink to="/overview" aria-label="Synaptic home"><Logo /></NavLink>
        <nav className="navlinks" aria-label="Main">
          {LINKS.map(([to, label]) => {
            const active = loc.pathname.startsWith(to) || (to === '/strategies' && loc.pathname.startsWith('/library'));
            return <NavLink key={to} to={to} className={active ? 'active' : ''}>{label}</NavLink>;
          })}
        </nav>
      </div>
      <div className="row">
        <RegionPicker />
        <button type="button" className="icon-btn" aria-label="Notifications, 5 new" style={{ position: 'relative', border: 0 }}>
          <Icon name="bell" size={22} color="#344054" />
          <span className="badge-count">5</span>
        </button>
        <NavLink to="/login" className="row" style={{ gap: 8, padding: '4px 8px 4px 4px', border: '1px solid var(--line)', borderRadius: 999 }} aria-label="Account (sign out)">
          <span style={{ width: 34, height: 34, borderRadius: 999, background: 'var(--brand)', color: 'var(--on-brand)', fontSize: 13, fontWeight: 700, display: 'grid', placeItems: 'center' }}>NI</span>
          <Icon name="chevron" size={16} color="var(--nav-muted)" />
        </NavLink>
      </div>
    </header>
  );
}

// Floating bar for demos: switch user type and the AI engine feature flag.
export function DemoBar() {
  const { stage, setStage, aiEngine, setAiEngine, theme, setTheme } = useApp();
  const t = THEMES[theme];
  const step = (d) => setTheme((theme + d + THEMES.length) % THEMES.length);
  const [hidden, setHidden] = useState(false);
  if (hidden) {
    return (
      <button type="button" className="demobar" style={{ padding: '8px 14px', cursor: 'pointer', border: 0 }} onClick={() => setHidden(false)}>
        <span className="lbl">DEMO CONTROLS</span>
      </button>
    );
  }
  return (
    <div className="demobar" role="region" aria-label="Demo controls">
      <span className="lbl">DEMO</span>
      <span style={{ color: 'var(--lilac-2)' }}>User</span>
      <Seg label="User type" value={stage} onChange={setStage} options={[{ value: 'new', label: 'New' }, { value: 'paper', label: 'Paper' }, { value: 'live', label: 'Live' }]} />
      <span style={{ color: 'var(--lilac-2)' }}>AI engine</span>
      <Seg label="AI engine" value={aiEngine ? 'on' : 'off'} onChange={(v) => setAiEngine(v === 'on')} options={[{ value: 'off', label: 'Coming soon' }, { value: 'on', label: 'On' }]} />
      <span style={{ color: 'var(--lilac-2, #C7C9FF)' }}>Theme</span>
      <button type="button" className="arrow" onClick={() => step(-1)} aria-label="Previous theme">‹</button>
      <span className="theme-dots" aria-hidden="true">{[t.bg, t.brand, t.glow].map((c, i) => <span key={i} style={{ background: c, border: '1px solid rgba(255,255,255,.25)' }} />)}</span>
      <select aria-label="Colour theme" value={theme} onChange={(e) => setTheme(Number(e.target.value))}>
        {THEMES.map((x, i) => <option key={x.name} value={i}>{i + 1}. {x.name}{x.mode === 'dark' ? ' (dark)' : ''}</option>)}
      </select>
      <button type="button" className="arrow" onClick={() => step(1)} aria-label="Next theme">›</button>
      <button type="button" className="hide" onClick={() => setHidden(true)} aria-label="Hide demo controls">×</button>
    </div>
  );
}

export default function Layout() {
  return (
    <>
      <TopNav />
      <main><Outlet /></main>
      <footer className="footer">
        <span>© 2026 Synaptic · Trading involves risk. Past performance does not guarantee future returns.</span>
        <span>v2.1.2 · prototype with sample data</span>
      </footer>
    </>
  );
}
