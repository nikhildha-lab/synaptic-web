import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../state/AppState.jsx';
import { Pills, RiskBars, SampleBadge, Seg, Sparkline } from '../components/ui.jsx';
import Orb from '../components/Orb.jsx';
import { LIBRARY } from '../data/dummy.js';
import { sparkPath } from '../lib/charts.js';

export function StrategyTabs({ active }) {
  return (
    <div className="tabs">
      <Link to="/library" className={active === 'library' ? 'on' : ''}>Library</Link>
      <Link to="/strategies" className={active === 'deployments' ? 'on' : ''}>My deployments</Link>
      <Link to="/strategies?tab=signals" className={active === 'signals' ? 'on' : ''}>Signals</Link>
    </div>
  );
}

const pct = (v) => (v === null ? '—' : `${v >= 0 ? '+' : '−'}${Math.abs(v)}%`);
const tone = (v) => (v === null ? 'var(--faint)' : v < 0 ? 'var(--neg)' : 'var(--pos)');

export default function Library() {
  const { fmt, aiEngine } = useApp();
  const [seg, setSeg] = useState('All');
  const [box, setBox] = useState('All');
  const [risk, setRisk] = useState('All');
  const [fitOnly, setFitOnly] = useState(false);

  const list = LIBRARY.filter((s) =>
    (seg === 'All' || s.seg === seg) && (box === 'All' || s.box === box) && (risk === 'All' || s.risk === risk) && (!aiEngine || !fitOnly || s.fitsToday === true)
  );

  return (
    <div className="page">
      <div className="row-between wrap" style={{ alignItems: 'flex-end' }}>
        <div className="col" style={{ gap: 4 }}>
          <h1 className="page-title">Strategy Library</h1>
          <span className="page-sub">Every strategy shows what it does, what it needs, how risky it is — and its proof.</span>
        </div>
        <SampleBadge />
      </div>
      <StrategyTabs active="library" />

      <div className={`banner ${aiEngine ? 'dark' : 'light'}`}>
        <Orb size={40} tone={aiEngine ? 'Bearish' : 'ai'} />
        <div className="col" style={{ flex: 1, gap: 2 }}>
          <b style={{ fontSize: 15 }}>{aiEngine ? "Today's market (AI): Bearish for intraday · Bullish for positional" : 'Market today: Downtrend (classic regime)'}</b>
          <span style={{ fontSize: 13, color: aiEngine ? 'var(--lilac-2)' : 'var(--muted)' }}>
            {aiEngine ? '5 strategies fit today. Breakout strategies are sitting out until the market calms.' : "Coming soon: the AI Regime Engine will show which strategies fit today's market."}
          </span>
        </div>
        {aiEngine
          ? <button type="button" className={`btn ${fitOnly ? 'success' : 'white'}`} onClick={() => setFitOnly(!fitOnly)}>{fitOnly ? 'Showing: fits today ✓' : 'Show only strategies that fit today'}</button>
          : <Link to="/market-pulse" className="btn">See market regime</Link>}
      </div>

      <div className="row-between wrap">
        <Pills value={seg} onChange={setSeg} options={['All', 'Nifty options', 'Stocks', 'Futures', 'Crypto']} />
        <div className="row wrap">
          <Seg label="Rules" value={box} onChange={setBox} options={['All', 'White box', 'Black box']} />
          <Seg label="Risk" value={risk} onChange={setRisk} options={['All', 'Low', 'Medium', 'High']} />
        </div>
      </div>

      {list.length === 0 ? <div className="empty">No strategies match these filters.</div> : (
        <div className="grid g3">
          {list.map((s) => (
            <div key={s.id} className="card" style={{ gap: 14 }}>
              <div className="row-between">
                <div className="row" style={{ gap: 6 }}><span className="chip brand">{s.seg}</span><span className="chip gray">{s.style}</span></div>
                <span className={`chip ${s.box === 'White box' ? 'outline' : 'dark'}`}>{s.box === 'White box' ? 'White box · rules visible' : 'Black box · rules private'}</span>
              </div>
              <div className="col" style={{ gap: 6 }}>
                <span className="display" style={{ fontSize: 21 }}>{s.name}</span>
                <span style={{ fontSize: 14, lineHeight: 1.5, color: '#475467', minHeight: 42 }}>{s.what}</span>
              </div>
              <div className="grid g3" style={{ gap: 8, padding: '12px 0', borderTop: '1px solid var(--line-2)', borderBottom: '1px solid var(--line-2)' }}>
                <div className="col" style={{ gap: 4 }}><span className="hint">Min capital</span><b style={{ fontSize: 16 }}>{fmt(s.cap)}</b></div>
                <div className="col" style={{ gap: 4 }}><span className="hint">Risk</span><RiskBars risk={s.risk} /></div>
                <div className="col" style={{ gap: 4 }}><span className="hint">Worst loss</span><b className="neg" style={{ fontSize: 16 }}>{pct(s.worst)}</b></div>
              </div>
              <div className="row" style={{ gap: 14 }}>
                <div style={{ width: 120, flexShrink: 0 }}><Sparkline d={sparkPath(s.seed, s.drift)} /></div>
                <div className="col" style={{ flex: 1, gap: 4, fontSize: 13 }}>
                  <div className="row-between"><span className="muted">Backtest (3 yr, per yr)</span><b style={{ color: tone(s.bt) }}>{pct(s.bt)}</b></div>
                  <div className="row-between"><span className="muted">Paper · {s.paperMo} mo</span><b style={{ color: tone(s.paper) }}>{pct(s.paper)}</b></div>
                  <div className="row-between"><span className="muted">Live · {s.liveMo ? `${s.liveMo} mo` : 'none yet'}</span><b style={{ color: tone(s.live) }}>{pct(s.live)}</b></div>
                </div>
              </div>
              <div className="row"><span className={`chip ${s.live !== null ? 'pos' : 'gray'}`}>{s.live !== null ? '✓ Live verified' : 'Paper only — not live yet'}</span><span className="hint">{s.users}</span></div>
              <div className="row-between" style={{ padding: '10px 12px', background: 'var(--surface-2)', borderRadius: 10 }}>
                <span style={{ fontSize: 13 }}><span className="muted">Works best in:</span> <b>{s.best}</b></span>
                {aiEngine && (
                  <span className={`chip ${s.fitsToday === true ? 'pos' : s.fitsToday === false ? 'warn' : 'gray'}`}>
                    {s.fitsToday === true ? '✓ Fits today' : s.fitsToday === false ? 'Sits out today' : 'Crypto regime · coming later'}
                  </span>
                )}
              </div>
              <div className="row">
                <Link to={`/library/${s.id}`} className="btn" style={{ flex: 1 }}>View proof</Link>
                <Link to={`/library/${s.id}`} className="btn primary" style={{ flex: 1 }}>Paper trade free</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
