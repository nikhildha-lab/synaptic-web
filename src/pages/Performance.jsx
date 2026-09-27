import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../state/AppState.jsx';
import { Icon, Pills, SampleBadge, Seg } from '../components/ui.jsx';
import { PERF_BY_REGIME, PERF_BY_STRATEGY } from '../data/dummy.js';
import { linePath, walk } from '../lib/charts.js';

const REG = [['var(--pos)', 'var(--pos-soft)', 'var(--pos-line)'], ['var(--warn)', 'var(--warn-soft)', 'var(--warn-line)'], ['var(--neg)', 'var(--neg-soft)', 'var(--neg-line)']];

export default function Performance() {
  const { fmt, aiEngine } = useApp();
  const [mode, setMode] = useState('All');
  const [pnl, setPnl] = useState('Realized');
  const [period, setPeriod] = useState('All time');
  const chart = linePath(walk(17, 120, 0.55, 4.2, 107967), 1300, 270, 14);
  const names = aiEngine ? ['Bullish', 'Neutral', 'Bearish'] : ['Uptrend', 'Choppy', 'Downtrend'];

  return (
    <div className="page">
      <div className="row-between wrap" style={{ alignItems: 'flex-end' }}>
        <div className="col" style={{ gap: 4 }}>
          <h1 className="page-title">Performance</h1>
          <span className="page-sub">Updates as you change filters — no “Generate” step.</span>
        </div>
        <div className="row"><SampleBadge /><button type="button" className="btn sm"><Icon name="download" size={16} />Export CSV</button><button type="button" className="btn sm">Tax report (FY)</button></div>
      </div>

      <div className="card" style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 16, padding: '14px 16px' }}>
        <Seg label="Mode" value={mode} onChange={setMode} options={['All', 'Live', 'Paper']} />
        <Seg label="P&L type" value={pnl} onChange={setPnl} options={['Realized', 'Unrealized', 'Both']} />
        <button type="button" className="btn sm">All strategies <Icon name="chevron" size={14} /></button>
        <div style={{ marginLeft: 'auto' }}><Pills value={period} onChange={setPeriod} options={['Today', 'Week', 'Month', 'FY', 'All time']} /></div>
      </div>

      <div className="grid g4">
        <div className="card stat"><span className="label">Realized P&amp;L</span><span className="value pos num" style={{ fontSize: 28 }}>{fmt(86730, { sign: true })}</span></div>
        <div className="card stat"><span className="label">Unrealized P&amp;L</span><span className="value pos num" style={{ fontSize: 28 }}>{fmt(21237, { sign: true })}</span></div>
        <div className="card stat"><span className="label">Win rate</span><span className="value" style={{ fontSize: 28 }}>46% <span className="muted" style={{ fontSize: 15, fontWeight: 600 }}>of 412 trades</span></span></div>
        <div className="card stat"><span className="label">Worst drop from a high</span><span className="value neg" style={{ fontSize: 28 }}>−6.8%</span></div>
      </div>

      <div className="card">
        <div className="row-between"><h2 className="h2">Equity curve</h2><span className="hint" style={{ fontSize: 13 }}>{mode} · {pnl} · {period}</span></div>
        <svg width="100%" height="270" viewBox="0 0 1300 270" preserveAspectRatio="none" role="img" aria-label="Cumulative P&L over time" style={{ color: 'var(--brand)' }}>
          <line x1="0" x2="1300" y1={chart.zeroY} y2={chart.zeroY} stroke="var(--line-strong)" style={{ stroke: 'var(--line-strong)' }} strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          <path d={chart.area} fill="currentColor" fillOpacity="0.08" />
          <path d={chart.d} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="card">
        <div className="row-between"><h2 className="h2">P&amp;L by market regime</h2><span className="hint" style={{ fontSize: 13 }}>Labels from the {aiEngine ? 'AI Regime Engine' : 'classic regime'}</span></div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0,1fr)) minmax(0,1.4fr)', gap: 12 }}>
          {PERF_BY_REGIME.map(([v, days, trades], i) => (
            <div key={i} style={{ padding: 16, background: REG[i][1], border: `1px solid ${REG[i][2]}`, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <b style={{ fontSize: 14, color: REG[i][0] }}>{names[i]}</b>
              <span className={`display num ${v >= 0 ? 'pos' : 'neg'}`} style={{ fontSize: 24 }}>{fmt(v, { sign: true })}</span>
              <span className="hint">{days} of trading days · {trades} trades</span>
            </div>
          ))}
          <div className="insight"><Icon name="sparkle" size={20} color="var(--brand)" /><span>Almost all your losses came on {names[2].toLowerCase()} days, mostly from Nifty Opening Breakout. <Link to="/library/nifty-opening-breakout" style={{ fontWeight: 700 }}>Turn on regime filter</Link></span></div>
        </div>
      </div>

      <div className="card flush">
        <div className="card-head"><h2 className="h2">By strategy</h2><span className="hint" style={{ fontSize: 13 }}>Sorted by P&amp;L</span></div>
        <div className="t-head" style={{ gridTemplateColumns: '2.4fr .8fr 1.2fr .8fr .8fr 1fr' }}>
          <span>Strategy</span><span>Mode</span><span className="right">P&amp;L</span><span className="right">Trades</span><span className="right">Win rate</span><span className="right">Worst drop</span>
        </div>
        {PERF_BY_STRATEGY.map(([n, m, v, t, w, dd]) => (
          <div key={n} className="t-row num" style={{ gridTemplateColumns: '2.4fr .8fr 1.2fr .8fr .8fr 1fr' }}>
            <b>{n}</b><span><span className={`chip ${m === 'Live' ? 'pos' : 'gray'}`} style={{ borderRadius: 6 }}>{m}</span></span>
            <b className={`right ${v >= 0 ? 'pos' : 'neg'}`}>{fmt(v, { sign: true })}</b><span className="right">{t}</span><span className="right">{w}</span><span className="right neg">{dd}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
