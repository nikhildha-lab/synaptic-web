import { Link, NavLink } from 'react-router-dom';
import { useApp } from '../state/AppState.jsx';
import { BGS } from '../lib/backgrounds.js';
import { Icon, Logo } from './ui.jsx';
import { reduceMotion, useScroll } from '../lib/motion.jsx';

// Shared look for all public pages (Welcome, Product, Strategies, AI Engine, Pricing):
// same dark base, same faded site background and the same glass top bar — so moving between them feels like one site.
const LINKS = [
  ['/product', 'Product'],
  ['/explore', 'Strategies'],
  ['/ai-engine', 'AI Engine'],
  ['/pricing', 'Pricing'],
];

export function MarketingShell({ children, hero = false, right = null }) {
  const { bgs } = useApp();
  const b = BGS[bgs.landing];
  const { y, p } = useScroll();
  const still = reduceMotion();
  // Landing shows the background strongly; inner pages show the same image, faded, so the colour stays consistent.
  // The image sits in a top layer that fades into the dark base colour, so long pages never turn light.
  const shade = hero
    ? 'linear-gradient(90deg, rgba(5,6,26,.86) 0%, rgba(5,6,26,.55) 48%, rgba(5,6,26,.10) 100%), linear-gradient(0deg, #05061A 0%, rgba(5,6,26,0) 40%)'
    : 'linear-gradient(180deg, rgba(5,6,26,.70) 0%, rgba(5,6,26,.85) 55%, #05061A 100%)';
  const layer = b
    ? { backgroundImage: `${shade}, url(${b.src})`, backgroundSize: 'cover', backgroundPosition: 'center top' }
    : { backgroundImage: 'radial-gradient(1200px 600px at 75% 0%, #2A2C8F 0%, rgba(10,11,30,0) 70%)' };

  return (
    <div className="mkt" style={{ minHeight: '100vh', position: 'relative', backgroundColor: '#05061A' }}>
      <div className="mkt-progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />
      <div aria-hidden="true" className="mkt-bg" style={{ ...layer, height: hero ? '112vh' : 900, minHeight: hero ? 820 : 0, transform: hero && !still ? `translate3d(0, ${y * 0.35}px, 0) scale(${1 + Math.min(y, 900) / 6000})` : undefined, opacity: hero ? Math.max(0.15, 1 - y / 1100) : 1 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <header className={`mkt-nav${y > 20 ? ' scrolled' : ''}`}>
        <Link to="/welcome" aria-label="Synaptic home"><Logo light size={34} /></Link>
        <nav className="row mkt-links" aria-label="Site">
          {LINKS.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>{label}</NavLink>)}
        </nav>
        <div className="row" style={{ gap: 10 }}>
          {right}
          <Link to="/login" className="btn glass">Sign in</Link>
          <Link to="/login" className="btn white">Start free</Link>
        </div>
      </header>
      {children}
      <footer className="mkt-foot">
        <div className="row" style={{ gap: 24, flexWrap: 'wrap' }}>
          <Logo light size={24} />
          {LINKS.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
          <a href="#">Risk disclosure</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
        <span>© 2026 Synaptic · Trading involves risk. Past performance does not guarantee future returns. Sample data shown.</span>
      </footer>
      </div>
    </div>
  );
}

// Page title block used on inner public pages.
export function MktHero({ kicker, title, sub, children }) {
  return (
    <section className="mkt-hero">
      {kicker && <span className="glass-chip">{kicker}</span>}
      <h1 className="display">{title}</h1>
      {sub && <p>{sub}</p>}
      {children}
    </section>
  );
}

export function MktSection({ title, sub, children, center = false }) {
  return (
    <section className="mkt-section">
      {(title || sub) && (
        <div className="col" style={{ gap: 8, alignItems: center ? 'center' : 'flex-start', textAlign: center ? 'center' : 'left' }}>
          {title && <h2 className="display" style={{ fontSize: 34, margin: 0, lineHeight: 1.15 }}>{title}</h2>}
          {sub && <p style={{ margin: 0, fontSize: 17, color: 'var(--muted)', maxWidth: 680, lineHeight: 1.55 }}>{sub}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

export function CtaBand({ title = 'Start with paper money. Go live when you’re ready.', sub = 'Free forever for paper trading. No card needed.' }) {
  return (
    <section className="mkt-section">
      <div className="glass-card row-between wrap" style={{ padding: '32px 36px', gap: 20, background: 'linear-gradient(120deg, rgba(110,117,255,.28), rgba(10,12,34,.55))' }}>
        <div className="col" style={{ gap: 6 }}>
          <b className="display" style={{ fontSize: 26 }}>{title}</b>
          <span style={{ color: 'var(--muted)' }}>{sub}</span>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <Link to="/login" className="btn white lg">Start free</Link>
          <Link to="/pricing" className="btn glass lg">See pricing <Icon name="right" size={16} color="#fff" /></Link>
        </div>
      </div>
    </section>
  );
}
