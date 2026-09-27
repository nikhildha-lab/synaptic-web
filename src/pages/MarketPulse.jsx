import { Link, useSearchParams } from 'react-router-dom';
import { SampleBadge, Icon, Seg } from '../components/ui.jsx';
import { INTRADAY_LEADERS, RRG, SECTOR_RANK, TOP_BUYS, TOP_SELLS } from '../data/dummy.js';

export function PulseTabs({ active }) {
  return (
    <div className="tabs">
      <Link to="/market-pulse" className={active === 'regime' ? 'on' : ''}>Regime</Link>
      <Link to="/market-pulse/sectors" className={active === 'sectors' ? 'on' : ''}>Sectors</Link>
      <Link to="/market-pulse/sectors?view=ranking" className={active === 'ranking' ? 'on' : ''}>Sector ranking</Link>
      <a href="#" onClick={(e) => e.preventDefault()}>Stock screener</a>
      <a href="#" onClick={(e) => e.preventDefault()}>Accumulation</a>
      <a href="#" onClick={(e) => e.preventDefault()}>Intraday scanner</a>
    </div>
  );
}

export function PulseHeader() {
  return (
    <div className="row-between wrap" style={{ alignItems: 'flex-end' }}>
      <div className="col" style={{ gap: 4 }}>
        <h1 className="page-title">Market Pulse</h1>
        <span className="page-sub">What kind of market is this, right now — and should your strategies trade in it?</span>
      </div>
      <div className="row"><SampleBadge /><span className="muted" style={{ fontSize: 13 }}>Updated 3:24 pm</span><button type="button" className="btn sm"><Icon name="refresh" size={16} />Refresh</button></div>
    </div>
  );
}

function StockTable({ title, chip, rows, pos }) {
  const max = Math.abs(rows[0][2]);
  return (
    <div className="card flush">
      <div className="card-head"><h2 className="h2">{title}</h2><span className={`chip ${pos ? 'pos' : 'neg'}`}>{chip}</span></div>
      <div className="t-head" style={{ gridTemplateColumns: '1.2fr 1.4fr 1.6fr', padding: '8px 24px' }}><span>Symbol</span><span>Sector</span><span className="right">Strength</span></div>
      {rows.map(([s, sec, v]) => (
        <div key={s} className="t-row" style={{ gridTemplateColumns: '1.2fr 1.4fr 1.6fr', padding: '8px 24px' }}>
          <b>{s}</b><span className="muted">{sec}</span>
          <div className="row" style={{ justifyContent: 'flex-end', gap: 10 }}>
            <div className="bar" style={{ width: 110 }}><div style={{ width: `${(Math.abs(v) / max) * 100}%`, background: pos ? 'var(--pos-2)' : 'var(--neg-2)', borderRadius: 999 }} /></div>
            <b className={`num ${pos ? 'pos' : 'neg'}`} style={{ width: 56, textAlign: 'right' }}>{v.toFixed(2)}</b>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MarketPulse() {
  const [params, setParams] = useSearchParams();
  const view = params.get('view') === 'ranking' ? 'ranking' : 'sectors';
  const setView = (v) => setParams(v === 'ranking' ? { view: 'ranking' } : {});
  const q = { Leading: 'pos', Lagging: 'neg', Weakening: 'warn' };
  return (
    <div className="page">
      <PulseHeader />
      <PulseTabs active={view} />
      <Seg label="View" value={view} onChange={setView} options={[{ value: 'sectors', label: 'Sectors overview' }, { value: 'ranking', label: 'Sector ranking (RRG)' }]} />

      {view === 'sectors' ? (
        <>
          <div className="grid g2">
            <div className="card">
              <div className="row-between"><h2 className="h2">Sector strength ranking</h2><a href="#" style={{ fontWeight: 600, fontSize: 14 }}>All 19 sectors</a></div>
              <div className="grid g2" style={{ gap: '8px 24px' }}>
                {SECTOR_RANK.map((n, i) => (
                  <div key={n} className="row" style={{ height: 36, borderBottom: '1px solid var(--line-2)', gap: 10 }}>
                    <span style={{ width: 36, height: 24, borderRadius: 6, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, background: i < 5 ? 'var(--pos)' : 'var(--line-2)', color: i < 5 ? '#fff' : '#475467' }}>#{i + 1}</span>
                    <span style={{ fontSize: 14 }}>{n}</span>
                  </div>
                ))}
              </div>
              <div className="row hint" style={{ gap: 16 }}><span className="row" style={{ gap: 6 }}><span className="dot" style={{ borderRadius: 3, background: 'var(--pos)' }} />Top 5 — strongest</span><span className="row" style={{ gap: 6 }}><span className="dot" style={{ borderRadius: 3, background: 'var(--faint)' }} />Middle</span></div>
            </div>
            <div className="card" style={{ gap: 16 }}>
              <div className="col" style={{ gap: 2 }}><h2 className="h2">Intraday leaders</h2><span className="hint" style={{ fontSize: 13 }}>Top 5 sectors by average relative strength today</span></div>
              {INTRADAY_LEADERS.map(([n, v]) => (
                <div key={n} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 60px', gap: 12, alignItems: 'center' }}>
                  <b style={{ fontSize: 14 }}>{n}</b>
                  <div className="bar" style={{ height: 12 }}><div style={{ width: `${(v / 25.44) * 100}%`, background: 'var(--brand)', borderRadius: 999 }} /></div>
                  <b className="right num">{v.toFixed(2)}</b>
                </div>
              ))}
              <div className="insight" style={{ marginTop: 'auto' }}>Telecom leads intraday but ranks #14 on the daily list — a possible early rotation to watch.</div>
            </div>
          </div>
          <div className="grid g2">
            <StockTable title="Strongest stocks" chip="Buy watchlist" rows={TOP_BUYS} pos />
            <StockTable title="Weakest stocks" chip="Sell watchlist" rows={TOP_SELLS} />
          </div>
        </>
      ) : (
        <div className="card flush">
          <div className="card-head">
            <div className="col" style={{ gap: 2 }}><h2 className="h2">Nifty sector ranking (vs Nifty 50)</h2><span className="hint" style={{ fontSize: 13 }}>Relative strength, momentum and RRG quadrant. Refreshed daily at 8:27 am.</span></div>
            <div className="row" style={{ gap: 8 }}><span className="chip pos">Leading 7</span><span className="chip warn">Weakening 1</span><span className="chip neg">Lagging 3</span></div>
          </div>
          <div className="t-head" style={{ gridTemplateColumns: '60px 1.8fr 1fr 1fr 1.1fr 1.4fr 1fr 1fr 1fr' }}>
            <span>Rank</span><span>Sector</span><span className="right">RS ratio</span><span className="right">Momentum</span><span>Quadrant</span><span>Breadth</span><span>Delivery</span><span className="right">RS %ile</span><span className="right">Mom. %ile</span>
          </div>
          {RRG.map(([n, ratio, mom, quad, br, rp, mp], i) => (
            <div key={n} className="t-row num" style={{ gridTemplateColumns: '60px 1.8fr 1fr 1fr 1.1fr 1.4fr 1fr 1fr 1fr' }}>
              <span className="muted">#{i + 1}</span><b>{n}</b><span className="right">{ratio.toFixed(2)}</span>
              <b className={`right ${mom >= 0 ? 'pos' : 'neg'}`}>{mom > 0 ? '+' : ''}{mom.toFixed(2)}</b>
              <span><span className={`chip ${q[quad]}`}>{quad}</span></span>
              <span className="row" style={{ gap: 8 }}><span className="bar" style={{ width: 70, height: 6 }}><span style={{ display: 'block', width: `${br}%`, background: 'var(--brand)' }} /></span>{br.toFixed(1)}%</span>
              <span className="muted">Flat</span><span className="right">{rp.toFixed(1)}</span><span className="right">{mp.toFixed(1)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
