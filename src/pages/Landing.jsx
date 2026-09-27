import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, RiskBars, Sparkline } from '../components/ui.jsx';
import { MarketingShell } from '../components/Marketing.jsx';
import { useApp } from '../state/AppState.jsx';
import { LIBRARY, PLANS, PRICES, REGIME_GROUPS, REGIME_NARRATIVE } from '../data/dummy.js';
import { linePath, sparkPath, walk } from '../lib/charts.js';
import { Counter, reduceMotion, useCycle, useInView, useReveal } from '../lib/motion.jsx';
import { NeuralCore, labelOf } from './Regime.jsx';
import { BGS } from '../lib/backgrounds.js';

// Premium, scrollable welcome page. Sections reveal as you scroll; numbers count up; the hero card "trades" live (sample data).

const WORDS = ['Nifty options', 'US stocks', 'Bitcoin & Ether', 'swing trades', 'your own ideas'];
const WORD_COLORS = ['#A5A9FF', '#7DD3FC', '#FCD34D', '#86EFAC', '#F9A8D4'];

const TICKS = [
  ['NIFTY 50', '24,812.35', 0.42], ['BANK NIFTY', '53,190.10', -0.18], ['SENSEX', '81,457.60', 0.37], ['S&P 500', '5,612.40', 0.21],
  ['NASDAQ 100', '19,804.75', 0.55], ['DOW', '41,930.20', -0.08], ['BTC', '$64,210', 1.84], ['ETH', '$3,142', 2.31],
  ['SOL', '$148.60', -0.94], ['USD/INR', '83.52', 0.03], ['GOLD', '$2,418', 0.26], ['INDIA VIX', '14.8', 9.1],
];

const STORY = [
  { k: 'pick', n: '01', t: 'Pick a strategy you understand', d: 'Every strategy card says what it does in one line, how much money it needs, how risky it is and its worst fall — before you read a single chart.' },
  { k: 'test', n: '02', t: 'Prove it on years of data', d: 'Backtest in seconds. See the return, the worst fall and the win rate, explained in plain English.' },
  { k: 'paper', n: '03', t: 'Practice with paper money', d: 'Run it on today’s live market with virtual money. Unlimited and free — for as long as you like.' },
  { k: 'live', n: '04', t: 'Go live, with guard-rails', d: 'Connect your broker. Orders go to your own account, with a daily loss limit and a one-click kill switch.' },
];

// ---------- Hero ----------
function LiveCard() {
  const base = useMemo(() => walk(17, 60, 0.55, 3.2), []);
  const [pts, setPts] = useState(base);
  const [pnl, setPnl] = useState(18420);
  useEffect(() => {
    if (reduceMotion()) return undefined;
    const id = setInterval(() => {
      setPts((p) => { const last = p[p.length - 1]; const next = last + 0.35 + (Math.random() - 0.45) * 3.4; return [...p.slice(1), next]; });
      setPnl((v) => Math.round(v + (Math.random() - 0.4) * 260));
    }, 1100);
    return () => clearInterval(id);
  }, []);
  const { d, area } = linePath(pts, 420, 140, 8);
  return (
    <div className="glass-card hero-card float" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="row-between" style={{ padding: '18px 20px 6px' }}>
        <div className="col" style={{ gap: 2 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700, letterSpacing: 1 }}>TODAY’S P&amp;L · 3 LIVE STRATEGIES</span>
          <b className="display num" style={{ fontSize: 34, color: '#4ADE80' }}>+₹{pnl.toLocaleString('en-IN')}</b>
        </div>
        <span className="live-dot"><span />LIVE</span>
      </div>
      <svg viewBox="0 0 420 140" width="100%" height="140" preserveAspectRatio="none" aria-hidden="true" style={{ display: 'block' }}>
        <defs><linearGradient id="heroFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#4ADE80" stopOpacity=".35" /><stop offset="100%" stopColor="#4ADE80" stopOpacity="0" /></linearGradient></defs>
        <path d={area} fill="url(#heroFill)" />
        <path d={d} fill="none" stroke="#4ADE80" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="grid g3" style={{ gap: 0, borderTop: '1px solid var(--line-2)' }}>
        {[['Win rate', '61%'], ['Worst day', '−₹3,120'], ['Loss limit', '₹5,000']].map(([k, v], i) => (
          <div key={k} className="col" style={{ gap: 2, padding: '12px 20px', borderLeft: i ? '1px solid var(--line-2)' : 0 }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{k}</span><b>{v}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const i = useCycle(WORDS.length, 2200);
  return (
    <section className="lp-hero">
      <div className="col" style={{ gap: 26 }}>
        <span className="glass-chip reveal"><span className="dot" style={{ background: '#8B8FF5', boxShadow: '0 0 10px #8B8FF5' }} />New · AI Regime Engine is coming <Link to="/ai-engine" style={{ color: '#C7C9FF' }}>Learn more →</Link></span>
        <h1 className="display lp-title reveal d1">
          Algo trading for<br />
          <span className="word-swap" aria-live="polite">
            {WORDS.map((w, k) => <span key={w} className={k === i ? 'on' : ''} style={{ color: WORD_COLORS[k] }}>{w}</span>)}
          </span>
          <br /><span className="grad-text">that explains itself.</span>
        </h1>
        <p className="lp-sub reveal d2">Pick a proven strategy, see the risk in plain words, test it with paper money — then let it trade in your own broker account. India, US, UAE and crypto.</p>
        <div className="row wrap reveal d3" style={{ gap: 12 }}>
          <Link to="/login" className="btn white lg shine">Start free — paper trade</Link>
          <Link to="/explore" className="btn glass lg">Browse strategies <Icon name="right" size={16} color="#fff" /></Link>
        </div>
        <div className="row wrap reveal d4" style={{ gap: 22, fontSize: 14, color: 'rgba(255,255,255,.7)' }}>
          <span className="row" style={{ gap: 8 }}><Icon name="wallet" size={18} color="#C7C9FF" />Money stays in your broker</span>
          <span className="row" style={{ gap: 8 }}><Icon name="stop" size={18} color="#C7C9FF" />One-click kill switch</span>
          <span className="row" style={{ gap: 8 }}><Icon name="check" size={18} color="#C7C9FF" />No card needed</span>
        </div>
      </div>
      <div className="lp-hero-visual reveal d2">
        <LiveCard />
        <div className="glass-card mini-float float2">
          <span className="row" style={{ gap: 10 }}><span className="orb-dot" />Market mood</span>
          <b style={{ color: '#FDB022' }}>Neutral → Bullish</b>
        </div>
        <div className="glass-card mini-float2 float3">
          <Icon name="sparkle" size={16} color="#86EFAC" />
          <span>Sector Leaders Swing bought <b>TATAMOTORS</b></span>
        </div>
      </div>
      <a href="#ticker" className="scroll-cue" aria-label="Scroll down"><span /></a>
    </section>
  );
}

// ---------- Ticker marquee ----------
function Ticker() {
  const row = [...TICKS, ...TICKS];
  return (
    <div id="ticker" className="marquee" aria-label="Market prices (sample)">
      <div className="marquee-track">
        {row.map(([n, v, c], k) => (
          <span key={k} className="tick"><b>{n}</b><span>{v}</span><span style={{ color: c >= 0 ? '#4ADE80' : '#F87171' }}>{c >= 0 ? '▲' : '▼'} {Math.abs(c).toFixed(2)}%</span></span>
        ))}
      </div>
    </div>
  );
}

// ---------- Numbers ----------
function Numbers() {
  return (
    <section className="lp-section">
      <div className="lp-stats reveal">
        {[[<Counter key="a" to={40} suffix="+" />, 'ready-made strategies'], [<Counter key="b" to={12} suffix=" yrs" />, 'of market data to backtest on'], [<Counter key="c" to={4} />, 'markets · India, US, UAE, crypto'], [<Counter key="d" to={0} prefix="₹" />, 'to start paper trading']].map(([v, l]) => (
          <div key={l} className="col" style={{ gap: 4 }}>
            <b className="display grad-text" style={{ fontSize: 52, lineHeight: 1 }}>{v}</b>
            <span style={{ color: 'var(--muted)', fontSize: 15 }}>{l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- Sticky scroll story ----------
function StoryVisual({ k }) {
  const s = LIBRARY[2];
  const bt = useMemo(() => linePath(walk(8, 80, 0.5, 3), 460, 180, 8), []);
  return (
    <div className="story-stage">
      <div className={`story-panel${k === 'pick' ? ' on' : ''}`}>
        <div className="glass-card col" style={{ gap: 12 }}>
          <div className="row-between"><b style={{ fontSize: 20 }}>{s.name}</b><span className="chip dark">{s.box}</span></div>
          <span style={{ color: 'var(--ink-2)', lineHeight: 1.55 }}>{s.what}</span>
          <div className="grid g3" style={{ gap: 10 }}>
            <div className="col"><span className="hint">Min. capital</span><b>₹2,00,000</b></div>
            <div className="col"><span className="hint">Risk</span><RiskBars risk={s.risk} /></div>
            <div className="col"><span className="hint">Worst fall</span><b style={{ color: '#F87171' }}>{s.worst}%</b></div>
          </div>
          <div className="row" style={{ gap: 6 }}><span className="chip gray">Backtest +21.7%/yr</span><span className="chip pos">Paper +5.4%</span><span className="chip pos">Live +2.9%</span></div>
        </div>
      </div>
      <div className={`story-panel${k === 'test' ? ' on' : ''}`}>
        <div className="glass-card col" style={{ gap: 10 }}>
          <div className="row-between"><b>Backtest · 2014 – 2026</b><span className="chip pos">+21.7% a year</span></div>
          <svg viewBox="0 0 460 180" width="100%" height="180" preserveAspectRatio="none" aria-hidden="true">
            <path d={bt.area} fill="rgba(139,143,245,.18)" /><path d={bt.d} fill="none" stroke="#A5A9FF" strokeWidth="2.2" vectorEffect="non-scaling-stroke" className={k === 'test' ? 'draw' : ''} pathLength="1" />
          </svg>
          <div className="grid g3" style={{ gap: 10 }}>
            {[['Win rate', '58%'], ['Worst fall', '−14.8%'], ['Trades', '1,204']].map(([a, b]) => <div key={a} className="col"><span className="hint">{a}</span><b>{b}</b></div>)}
          </div>
        </div>
      </div>
      <div className={`story-panel${k === 'paper' ? ' on' : ''}`}>
        <div className="glass-card col" style={{ gap: 12 }}>
          <div className="row-between"><b>Paper trading · week 3</b><span className="chip brand">Virtual ₹5,00,000</span></div>
          {[['Bought HAL', '+₹3,420', '10:42'], ['Sold TRENT', '+₹1,880', '11:15'], ['Bought BEL', '−₹640', '13:05'], ['Sold M&M', '+₹2,210', '14:48']].map(([a, b, t]) => (
            <div key={a} className="row-between" style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,.04)' }}>
              <span className="row" style={{ gap: 10 }}><span className="hint">{t}</span>{a}</span><b style={{ color: b.startsWith('+') ? '#4ADE80' : '#F87171' }}>{b}</b>
            </div>
          ))}
        </div>
      </div>
      <div className={`story-panel${k === 'live' ? ' on' : ''}`}>
        <div className="glass-card col" style={{ gap: 14 }}>
          <div className="row-between"><b>Ready to go live</b><span className="chip pos">All checks passed</span></div>
          {['Broker connected · Zerodha', 'Daily loss limit · ₹5,000', 'Max capital · ₹2,00,000', 'Kill switch · on every screen'].map((t) => (
            <div key={t} className="row" style={{ gap: 10 }}><span className="check-dot"><Icon name="check" size={14} color="#05061A" width={3} /></span>{t}</div>
          ))}
          <button type="button" className="btn primary lg" style={{ marginTop: 6 }}>Deploy live</button>
        </div>
      </div>
    </div>
  );
}

function Story() {
  const [active, setActive] = useState('pick');
  const refs = useRef([]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.dataset.k); }), { rootMargin: '-45% 0px -45% 0px' });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <section className="lp-section">
      <div className="col reveal" style={{ gap: 10, maxWidth: 720 }}>
        <span className="eyebrow">How it works</span>
        <h2 className="display lp-h2">From idea to live trade, <span className="grad-text">one safe step at a time.</span></h2>
      </div>
      <div className="story">
        <div className="story-steps">
          {STORY.map((s, k) => (
            <div key={s.k} ref={(el) => { refs.current[k] = el; }} data-k={s.k} className={`story-step${active === s.k ? ' on' : ''}`}>
              <span className="story-n">{s.n}</span>
              <h3 className="display" style={{ fontSize: 28, margin: 0 }}>{s.t}</h3>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'var(--muted)' }}>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="story-sticky"><StoryVisual k={active} /></div>
      </div>
    </section>
  );
}

// ---------- Strategy carousel ----------
function Strategies() {
  const { fmt } = useApp();
  const track = useRef(null);
  const go = (d) => track.current?.scrollBy({ left: d * 360, behavior: 'smooth' });
  return (
    <section className="lp-section">
      <div className="row-between wrap reveal" style={{ gap: 16, alignItems: 'flex-end' }}>
        <div className="col" style={{ gap: 10 }}>
          <span className="eyebrow">Strategy library</span>
          <h2 className="display lp-h2">Strategies with <span className="grad-text">nothing to hide.</span></h2>
          <p className="lp-p">Capital, risk and worst fall on every card. Proof from backtest, paper and live — side by side.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button type="button" className="btn glass" onClick={() => go(-1)} aria-label="Previous strategies">‹</button>
          <button type="button" className="btn glass" onClick={() => go(1)} aria-label="Next strategies">›</button>
          <Link to="/explore" className="btn white">See all</Link>
        </div>
      </div>
      <div className="carousel reveal d1" ref={track}>
        {LIBRARY.map((s) => (
          <Link key={s.id} to={`/library/${s.id}`} className="glass-card col carousel-card" style={{ gap: 12, color: 'var(--ink)' }}>
            <div className="row-between"><span className="chip gray">{s.seg}</span><span className={`chip ${s.box === 'White box' ? 'outline' : 'dark'}`}>{s.box}</span></div>
            <b style={{ fontSize: 20 }}>{s.name}</b>
            <span style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)', minHeight: 66 }}>{s.what}</span>
            <Sparkline d={sparkPath(s.seed, s.drift, 300, 56, 30)} color="#A5A9FF" w={300} h={56} />
            <div className="row-between" style={{ fontSize: 13 }}>
              <span className="col"><span className="hint">From</span><b>{fmt(s.cap)}</b></span>
              <span className="col"><span className="hint">Risk</span><RiskBars risk={s.risk} /></span>
              <span className="col" style={{ alignItems: 'flex-end' }}><span className="hint">Backtest</span><b style={{ color: '#4ADE80' }}>+{s.bt}%/yr</b></span>
            </div>
          </Link>
        ))}
      </div>
      <span className="chip sample" style={{ alignSelf: 'flex-start' }}>Sample data</span>
    </section>
  );
}

// ---------- AI engine ----------
function AiTeaser() {
  const w = REGIME_GROUPS.map((g) => g.wP);
  const meta = REGIME_GROUPS.reduce((s, g, k) => s + g.score * w[k], 0);
  return (
    <section className="lp-section">
      <div className="ai-band reveal">
        <div className="col" style={{ gap: 18, padding: '48px 0 48px 48px' }}>
          <span className="eyebrow" style={{ color: '#C7C9FF' }}>AI Regime Engine · coming soon</span>
          <h2 className="display lp-h2">A brain that reads <span className="grad-text">the market’s mood.</span></h2>
          <p className="lp-p">Four AI agents watch global macro, India macro, market internals and the calendar. Every 30 minutes they agree on one word — Bullish, Bearish or Neutral — and tell you why.</p>
          <div className="glass-card row" style={{ alignItems: 'flex-start', gap: 12, background: 'rgba(255,255,255,.05)' }}>
            <Icon name="sparkle" size={20} color="#A5A9FF" />
            <span style={{ lineHeight: 1.55, color: 'var(--ink-2)', fontSize: 15 }}>“{REGIME_NARRATIVE.positional}”</span>
          </div>
          <div className="row" style={{ gap: 10 }}>
            <Link to="/ai-engine" className="btn white lg">Explore the AI engine</Link>
          </div>
        </div>
        <div style={{ display: 'grid', placeItems: 'center', padding: 20 }}><NeuralCore label={labelOf(meta)} meta={meta} weights={w} /></div>
      </div>
    </section>
  );
}

// ---------- Bento: markets + safety ----------
function Bento() {
  const globe = BGS[1];
  return (
    <section className="lp-section">
      <div className="col reveal" style={{ gap: 10, maxWidth: 760 }}>
        <span className="eyebrow">Built for serious money</span>
        <h2 className="display lp-h2">Global markets. <span className="grad-text">Local rules. Your broker.</span></h2>
      </div>
      <div className="bento">
        <div className="glass-card bento-a reveal" style={{ backgroundImage: `linear-gradient(90deg, rgba(8,10,30,.92) 0%, rgba(8,10,30,.55) 60%, rgba(8,10,30,.2) 100%), url(${globe.src})`, backgroundSize: 'cover', backgroundPosition: 'center right' }}>
          <span className="eyebrow">4 markets · 1 account</span>
          <b className="display" style={{ fontSize: 30, lineHeight: 1.15, maxWidth: 420 }}>India, US, UAE and crypto — in your currency.</b>
          <div className="row wrap" style={{ gap: 8, marginTop: 'auto' }}>
            {['🇮🇳 NSE · BSE', '🇺🇸 NYSE · NASDAQ', '🇦🇪 Dubai · AED', '₿ BTC · ETH · SOL'].map((m) => <span key={m} className="chip outline" style={{ fontSize: 13, padding: '6px 12px' }}>{m}</span>)}
          </div>
        </div>
        <div className="glass-card bento-b reveal d1">
          <span className="big-ic" style={{ background: 'rgba(74,222,128,.14)' }}><Icon name="wallet" size={24} color="#4ADE80" /></span>
          <b style={{ fontSize: 20 }}>We never hold your money</b>
          <span className="lp-p" style={{ fontSize: 15 }}>Funds stay in your own broker account. We only send orders.</span>
        </div>
        <div className="glass-card bento-c reveal d2">
          <span className="big-ic" style={{ background: 'rgba(248,113,113,.14)' }}><Icon name="stop" size={24} color="#F87171" /></span>
          <b style={{ fontSize: 20 }}>Kill switch, everywhere</b>
          <span className="lp-p" style={{ fontSize: 15 }}>Stop one strategy or all of them in one tap.</span>
        </div>
        <div className="glass-card bento-d reveal d1">
          <span className="big-ic" style={{ background: 'rgba(252,211,77,.14)' }}><Icon name="alert" size={24} color="#FCD34D" /></span>
          <b style={{ fontSize: 20 }}>Daily loss limit</b>
          <span className="lp-p" style={{ fontSize: 15 }}>Pick your max loss for the day. Trading pauses when it’s hit.</span>
        </div>
        <div className="glass-card bento-e reveal d2">
          <span className="big-ic" style={{ background: 'rgba(139,143,245,.18)' }}><Icon name="lock" size={24} color="#A5A9FF" /></span>
          <b style={{ fontSize: 20 }}>Official broker APIs</b>
          <span className="lp-p" style={{ fontSize: 15 }}>Encrypted connections. We never see your broker password.</span>
        </div>
      </div>
    </section>
  );
}

// ---------- Pricing teaser ----------
function PriceTeaser() {
  const { region } = useApp();
  const p = PRICES[region].m;
  return (
    <section className="lp-section">
      <div className="col reveal" style={{ gap: 10, alignItems: 'center', textAlign: 'center' }}>
        <span className="eyebrow">Simple pricing</span>
        <h2 className="display lp-h2">Paper trade free. <span className="grad-text">Pay when you go live.</span></h2>
        <p className="lp-p">Plans grow with the number of live strategies — never with your profits.</p>
      </div>
      <div className="grid g4" style={{ gap: 14 }}>
        {PLANS.map((pl, k) => (
          <div key={pl.name} className={`glass-card col reveal d${k}`} style={{ gap: 8, ...(pl.popular ? { border: '1px solid rgba(165,169,255,.7)', boxShadow: '0 0 0 1px rgba(165,169,255,.3), 0 20px 60px rgba(110,117,255,.25)' } : {}) }}>
            <div className="row-between"><b style={{ fontSize: 18 }}>{pl.name}</b>{pl.popular && <span className="chip brand">Popular</span>}</div>
            <b className="display" style={{ fontSize: 34 }}>{p[k]}<span style={{ fontSize: 15, color: 'var(--muted)', fontWeight: 500 }}>{k ? ' / mo' : ''}</span></b>
            <span style={{ fontSize: 14, color: 'var(--muted)' }}>{pl.tagline}</span>
          </div>
        ))}
      </div>
      <Link to="/pricing" className="btn glass lg reveal" style={{ alignSelf: 'center' }}>Compare plans <Icon name="right" size={16} color="#fff" /></Link>
    </section>
  );
}

// ---------- Final CTA ----------
function FinalCta() {
  const [ref, seen] = useInView(0.3);
  return (
    <section className="lp-section">
      <div ref={ref} className={`final-cta${seen ? ' in' : ''}`}>
        <div className="final-glow" aria-hidden="true" />
        <h2 className="display" style={{ fontSize: 56, lineHeight: 1.05, margin: 0, position: 'relative' }}>Your first strategy<br /><span className="grad-text">is 2 minutes away.</span></h2>
        <p className="lp-p" style={{ position: 'relative', textAlign: 'center' }}>Start with paper money. No card, no risk. Go live only when the proof convinces you.</p>
        <div className="row wrap" style={{ gap: 12, justifyContent: 'center', position: 'relative' }}>
          <Link to="/login" className="btn white lg shine">Start free</Link>
          <Link to="/product" className="btn glass lg">How it works</Link>
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  useReveal();
  return (
    <MarketingShell hero>
      <Hero />
      <Ticker />
      <Numbers />
      <Story />
      <Strategies />
      <AiTeaser />
      <Bento />
      <PriceTeaser />
      <FinalCta />
    </MarketingShell>
  );
}
