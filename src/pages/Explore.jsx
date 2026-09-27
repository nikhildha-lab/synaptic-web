import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, RiskBars, Sparkline } from '../components/ui.jsx';
import { CtaBand, MarketingShell, MktHero, MktSection } from '../components/Marketing.jsx';
import { useApp } from '../state/AppState.jsx';
import { LIBRARY } from '../data/dummy.js';
import { sparkPath } from '../lib/charts.js';

// Public "Strategies" page: the strategy store, open to visitors (no sign-in).
const FILTERS = ['All', 'Stocks', 'Nifty options', 'Futures', 'Crypto'];
const pct = (v) => (v == null ? '—' : `${v > 0 ? '+' : ''}${v.toFixed(1)}%`);

const PROOF = [
  ['chart', 'Backtest', 'How it did over past years on real data. Good for ideas — but it is the past.', 'Years'],
  ['clock', 'Paper trading', 'How it is doing now, with fake money, for everyone who is testing it.', 'Weeks'],
  ['sparkle', 'Live trading', 'Real results from real accounts. The strongest proof, shown only when we have it.', 'Months'],
];

function StrategyCard({ s }) {
  const { fmt } = useApp();
  return (
    <div className="glass-card col" style={{ gap: 12 }}>
      <div className="row-between" style={{ alignItems: 'flex-start', gap: 10 }}>
        <div className="col" style={{ gap: 4 }}>
          <b style={{ fontSize: 18 }}>{s.name}</b>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>{s.seg} · {s.style}</span>
        </div>
        <span className={`chip ${s.box === 'White box' ? 'outline' : 'dark'}`}>{s.box}</span>
      </div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)', minHeight: 44 }}>{s.what}</p>
      <Sparkline d={sparkPath(s.seed, s.drift, 300, 44, 30)} color="#8B8FF5" w={300} h={44} />
      <div className="grid g3" style={{ gap: 8, fontSize: 13 }}>
        <div className="col" style={{ gap: 2 }}><span style={{ color: 'var(--muted)' }}>Min. capital</span><b>{fmt(s.cap)}</b></div>
        <div className="col" style={{ gap: 2 }}><span style={{ color: 'var(--muted)' }}>Risk</span><RiskBars risk={s.risk} /></div>
        <div className="col" style={{ gap: 2 }}><span style={{ color: 'var(--muted)' }}>Worst fall</span><b style={{ color: '#F87171' }}>{s.worst}%</b></div>
      </div>
      <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
        <span className="chip gray">Backtest {pct(s.bt)}/yr</span>
        <span className={`chip ${s.paper >= 0 ? 'pos' : 'neg'}`}>Paper {pct(s.paper)} · {s.paperMo} mo</span>
        {s.live != null ? <span className="chip pos">Live {pct(s.live)} · {s.liveMo} mo</span> : <span className="chip outline">Live: not yet</span>}
      </div>
      <div className="row-between" style={{ paddingTop: 10, borderTop: '1px solid var(--line-2)', fontSize: 13 }}>
        <span style={{ color: 'var(--muted)' }}>Best in: {s.best}</span>
        <Link to={`/library/${s.id}`} style={{ fontWeight: 700, color: '#C7C9FF' }}>Details →</Link>
      </div>
    </div>
  );
}

export default function Explore() {
  const [f, setF] = useState('All');
  const list = LIBRARY.filter((s) => f === 'All' || s.seg === f);

  return (
    <MarketingShell>
      <MktHero kicker="Strategies" title="Strategies explained in plain words." sub="Every strategy shows what it does, how much money you need, how risky it is, the worst fall so far — and proof from backtest, paper and live trading.">
        <div className="row" style={{ gap: 12 }}>
          <Link to="/login" className="btn white lg">Try any strategy free</Link>
          <a href="#list" className="btn glass lg">Browse the library</a>
        </div>
      </MktHero>

      <MktSection>
        <div id="list" className="row-between wrap" style={{ gap: 12 }}>
          <div className="seg">{FILTERS.map((x) => <button key={x} type="button" className={x === f ? 'on' : ''} onClick={() => setF(x)}>{x}</button>)}</div>
          <span className="chip sample">Sample data</span>
        </div>
        <div className="grid g3" style={{ gap: 14 }}>
          {list.map((s) => <StrategyCard key={s.id} s={s} />)}
        </div>
      </MktSection>

      <MktSection title="Three kinds of proof" sub="We show where the numbers come from, so you can judge them yourself.">
        <div className="grid g3" style={{ gap: 14 }}>
          {PROOF.map(([ic, t, d, len], i) => (
            <div key={t} className="glass-card col" style={{ gap: 10 }}>
              <div className="row-between">
                <span className="glass-ic"><Icon name={ic} size={18} color="#fff" /></span>
                <span className="row" style={{ gap: 3 }}>{[0, 1, 2].map((k) => <span key={k} style={{ width: 16, height: 6, borderRadius: 3, background: k <= i ? '#4ADE80' : 'rgba(255,255,255,.15)' }} />)}</span>
              </div>
              <b style={{ fontSize: 18 }}>{t}</b>
              <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.55 }}>{d}</span>
              <span style={{ fontSize: 12, color: 'var(--faint)', fontWeight: 700, letterSpacing: 0.8 }}>TIME SCALE · {len.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </MktSection>

      <MktSection title="White box or black box?" sub="Choose how much of the logic you want to see.">
        <div className="grid g2" style={{ gap: 14 }}>
          <div className="glass-card col" style={{ gap: 10 }}>
            <span className="chip outline" style={{ alignSelf: 'flex-start' }}>White box</span>
            <b style={{ fontSize: 20 }}>See every rule</b>
            <span style={{ color: 'var(--muted)', lineHeight: 1.55 }}>Entry, exit and stop-loss rules are fully visible. You can copy and change them in the Backtest Lab.</span>
          </div>
          <div className="glass-card col" style={{ gap: 10 }}>
            <span className="chip dark" style={{ alignSelf: 'flex-start', border: '1px solid rgba(255,255,255,.2)' }}>Black box</span>
            <b style={{ fontSize: 20 }}>Rules stay private, results don’t</b>
            <span style={{ color: 'var(--muted)', lineHeight: 1.55 }}>The creator keeps the logic secret, but risk, worst fall and all proof numbers are always shown.</span>
          </div>
        </div>
      </MktSection>

      <MktSection>
        <div className="glass-card row-between wrap" style={{ gap: 16 }}>
          <div className="col" style={{ gap: 4 }}>
            <span className="chip brand" style={{ alignSelf: 'flex-start' }}>Coming later</span>
            <b style={{ fontSize: 18 }}>Share your own strategy</b>
            <span style={{ color: 'var(--muted)' }}>Build a strategy, prove it on paper, then publish it for others — and earn when they use it.</span>
          </div>
          <Link to="/login" className="btn glass">Get notified</Link>
        </div>
      </MktSection>

      <CtaBand title="Try any strategy with paper money first." />
    </MarketingShell>
  );
}
