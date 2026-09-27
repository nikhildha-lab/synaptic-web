import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../state/AppState.jsx';
import { Icon, Pills, SampleBadge } from '../components/ui.jsx';
import { StrategyTabs } from './Library.jsx';
import { DEPLOYMENTS, SIGNALS, SIGNAL_MODELS } from '../data/dummy.js';

const chipFor = (v) => (v === '—' ? 'gray' : /bull|up/i.test(v) ? 'pos' : /bear|down/i.test(v) ? 'neg' : 'gray');

export default function Deployments() {
  const [params] = useSearchParams();
  const tab = params.get('tab') === 'signals' ? 'signals' : 'deployments';
  const { fmt, aiEngine } = useApp();
  const [filter, setFilter] = useState('all');
  const [model, setModel] = useState('ORB');
  const rows = DEPLOYMENTS.filter((d) => filter === 'all' || d.key === filter);

  return (
    <div className="page">
      <div className="row-between">
        <h1 className="page-title">Strategies</h1>
        <div className="row"><SampleBadge /><button type="button" className="btn">Import</button><Link to="/library" className="btn primary"><Icon name="plus" size={18} color="#fff" width={2.4} />New strategy</Link></div>
      </div>
      <StrategyTabs active={tab} />

      {tab === 'deployments' ? (
        <>
          <div className={`banner ${aiEngine ? 'dark' : 'light'}`} style={{ padding: '12px 16px' }}>
            <span className="dot" style={{ width: 10, height: 10, background: aiEngine ? 'var(--neg-2)' : 'var(--neg)', boxShadow: aiEngine ? '0 0 10px #F04438' : 'none' }} />
            <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>
              {aiEngine ? 'AI regime today: Bearish (intraday). 4 deployments with the regime filter are sitting out.' : 'Market regime today: Downtrend (classic). Deployments with the regime filter follow it.'}
            </span>
            <Link to="/market-pulse" style={{ fontWeight: 700, fontSize: 14, color: aiEngine ? 'var(--lilac-2)' : 'var(--brand)' }}>{aiEngine ? 'Why?' : 'AI Regime Engine · coming soon'}</Link>
          </div>

          <div className="row wrap">
            <div className="row" style={{ flex: 1, minWidth: 260, height: 44, padding: '0 14px', background: 'var(--surface)', border: '1px solid var(--line-strong)', borderRadius: 10 }}>
              <Icon name="search" color="var(--muted)" />
              <input aria-label="Search strategies" placeholder="Search by name or symbol" style={{ flex: 1, border: 0, outline: 'none', fontFamily: 'inherit', fontSize: 15 }} />
            </div>
            <Pills value={filter} onChange={setFilter} options={[{ value: 'all', label: 'All 21' }, { value: 'running', label: 'Running 6' }, { value: 'out', label: 'Logged out 14' }, { value: 'paused', label: 'Paused 1' }]} />
          </div>

          <div className="card flush">
            <div className="t-head" style={{ gridTemplateColumns: '2.6fr 1fr 1fr 1fr 0.8fr 0.7fr 220px' }}>
              <span>Strategy</span><span>Status</span><span>Broker</span><span className="right">Total P&amp;L</span><span className="right">Win rate</span><span className="right">Trades</span><span />
            </div>
            {rows.length === 0 && <div className="empty" style={{ border: 0 }}>Nothing here.</div>}
            {rows.map((d) => {
              const run = d.key === 'running';
              const reg = !d.filter ? 'Regime filter off' : aiEngine ? 'Sits out today · regime' : 'Regime filter on';
              return (
                <div key={d.name} className="t-row" style={{ gridTemplateColumns: '2.6fr 1fr 1fr 1fr 0.8fr 0.7fr 220px' }}>
                  <div className="col" style={{ gap: 4 }}>
                    <div className="row wrap" style={{ gap: 8 }}>
                      <b className="mono" style={{ fontSize: 14 }}>{d.name}</b>
                      <span className="chip gray" style={{ borderRadius: 6, fontSize: 11 }}>PAPER</span>
                      <span className="chip" style={{ borderRadius: 6, fontSize: 11, ...(!d.filter ? { color: 'var(--faint)' } : aiEngine ? { background: 'var(--night)', color: '#FDB022' } : { background: 'var(--brand-soft)', color: 'var(--brand)' }) }}>{reg}</span>
                    </div>
                    <span className="hint" style={{ fontSize: 13 }}>{d.meta}</span>
                  </div>
                  <span><span className={`chip ${run ? 'pos' : 'warn'}`}>● {run ? 'Running' : 'Logged out'}</span></span>
                  <span>Upstox</span>
                  <b className="right num">{fmt(0)}</b>
                  <span className="right">0%</span>
                  <span className="right">0</span>
                  <div className="row" style={{ justifyContent: 'flex-end', gap: 8 }}>
                    <button type="button" className={`btn sm${run ? '' : ' primary'}`}>{run ? 'Pause' : 'Reconnect'}</button>
                    <Link to="/library/nifty-opening-breakout" className="btn sm">Details</Link>
                    <button type="button" className="icon-btn" style={{ width: 36, height: 36 }} aria-label="More actions (edit, restart, delete)">⋯</button>
                  </div>
                </div>
              );
            })}
            <div className="row-between" style={{ padding: '14px 24px', fontSize: 14 }}>
              <span className="muted">Showing {rows.length} of 21 strategies</span>
              <div className="row" style={{ gap: 6 }}>{[1, 2, 3, 4].map((n) => <button key={n} type="button" className={`btn sm${n === 1 ? ' primary' : ''}`} style={{ width: 36, padding: 0 }}>{n}</button>)}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row-between wrap">
            <Pills value={model} onChange={setModel} options={SIGNAL_MODELS} />
            <div className="row"><button type="button" className="btn sm">Last 30 days</button><button type="button" className="btn sm"><Icon name="download" size={16} />CSV</button></div>
          </div>
          <div className="card" style={{ flexDirection: 'row', alignItems: 'center', gap: 32 }}>
            {[['Bullish days', 34, 'pos'], ['Bearish days', 46, 'neg'], ['Neutral days', 23, 'muted']].map(([k, v, t]) => <div key={k} className="col" style={{ gap: 2 }}><span className="muted" style={{ fontSize: 13 }}>{k}</span><span className={`display ${t}`} style={{ fontSize: 26 }}>{v}</span></div>)}
            <div className="bar" style={{ flex: 1, height: 12 }}><div style={{ width: '33%', background: 'var(--pos-2)' }} /><div style={{ width: '44.7%', background: 'var(--neg-2)' }} /><div style={{ width: '22.3%', background: 'var(--faint)' }} /></div>
          </div>
          <div className="card flush">
            <div className="t-head" style={{ gridTemplateColumns: '1.3fr .8fr 1fr .9fr .9fr 1.3fr 2fr 1fr' }}>
              <span>Trade date</span><span>Instrument</span><span>Signal</span><span>HMA</span><span>MACD</span><span>Daily regime</span><span>4H regime (AM · PM)</span><span className="right">Last close</span>
            </div>
            {SIGNALS.map(([date, dir, hma, macd, reg, am, pm, close, pending]) => (
              <div key={date} className="t-row" style={{ gridTemplateColumns: '1.3fr .8fr 1fr .9fr .9fr 1.3fr 2fr 1fr' }}>
                <span className="row num" style={{ gap: 8 }}>{date}{pending && <span className="chip warn">Pending</span>}</span>
                <b>NIFTY</b>
                {[dir, hma, macd, reg].map((v, i) => <span key={i}><span className={`chip ${chipFor(v)}`} style={{ borderRadius: 6 }}>{v}</span></span>)}
                <span className="row" style={{ gap: 6 }}>{[am, pm].map((v, i) => <span key={i} className={`chip ${chipFor(v)}`} style={{ borderRadius: 6 }}>{v}</span>)}</span>
                <span className="right num muted">{close}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
