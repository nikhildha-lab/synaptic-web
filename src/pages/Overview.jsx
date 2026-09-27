import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../state/AppState.jsx';
import { Icon, RiskBars, SampleBadge, Seg } from '../components/ui.jsx';
import Orb from '../components/Orb.jsx';
import { LIBRARY, MARKETS, MARKET_STATUS, OVERVIEW } from '../data/dummy.js';

const STARTER = { IN: '₹499', US: '$12', AE: 'AED 45' };
const BUDGET = { IN: '₹1–3 lakh', US: '$1k–5k', AE: 'AED 5k–20k' };
const DEFAULT_MARKET = { IN: 'fo', US: 'us', AE: 'cr' };

export default function Overview() {
  const { stage, region, fmt, aiEngine } = useApp();
  const [mode, setMode] = useState('live');
  const [stopOpen, setStopOpen] = useState(false);
  const isNew = stage === 'new';
  const isPaper = stage === 'paper';
  const d = OVERVIEW[isPaper || mode === 'paper' ? 'paper' : 'live'];

  return (
    <div className="page">
      <div className="row-between wrap" style={{ alignItems: 'flex-end' }}>
        <div className="col" style={{ gap: 8 }}>
          <h1 className="page-title">{isNew ? 'Welcome to Synaptic, Nikhil' : 'Good morning, Nikhil'}</h1>
          <div className="row wrap" style={{ gap: 8 }}>
            {MARKET_STATUS[region].map(([t, on]) => (
              <span key={t} className="status-chip"><span className="dot" style={{ background: on ? 'var(--pos-2)' : 'var(--faint)' }} />{t}</span>
            ))}
            <SampleBadge />
          </div>
        </div>
        {isNew && <Link to="/pricing" className="btn"><b>Free plan</b> · unlimited paper trading · <span style={{ color: 'var(--brand)' }}>Upgrade</span></Link>}
        {isPaper && <span className="chip brand" style={{ height: 40, padding: '0 14px', fontSize: 14 }}><span className="dot" style={{ background: 'var(--brand)' }} />Paper trading · virtual money</span>}
        {stage === 'live' && (
          <div className="row">
            <Seg label="Money type" value={mode} onChange={setMode} options={[
              { value: 'live', label: <><span className="dot" style={{ background: 'var(--pos-2)' }} />Live money</> },
              { value: 'paper', label: <><span className="dot" style={{ background: 'var(--faint)' }} />Paper</> },
            ]} />
            <button type="button" className="btn danger" onClick={() => setStopOpen(true)}><Icon name="stop" size={14} fill="var(--neg)" color="var(--neg)" />Stop all</button>
          </div>
        )}
      </div>

      <NextStep stage={stage} region={region} />

      {isNew ? <NewUser /> : (
        <>
          <div className="grid g4">
            <div className="card stat" style={{ gap: 8 }}>
              <span className="label">Today's P&amp;L · {isPaper || mode === 'paper' ? 'Paper' : 'Live'}</span>
              <span className="value num pos">{fmt(d.today, { sign: true })}</span>
              <span className="muted" style={{ fontSize: 13 }}><b className="pos">{d.todayPct}</b> · {d.todayNote}</span>
              <Link to="/strategies" style={{ fontSize: 13, fontWeight: 600 }}>{d.openPos} →</Link>
            </div>
            <div className="card stat" style={{ gap: 8 }}>
              <span className="label">Total P&amp;L</span>
              <span className="value num pos">{fmt(d.total, { sign: true })}</span>
              <span className="muted" style={{ fontSize: 13 }}>Booked <b style={{ color: 'var(--ink)' }}>{fmt(d.realized)}</b> · Open <b style={{ color: 'var(--ink)' }}>{fmt(d.unrealized)}</b></span>
            </div>
            <div className="card stat" style={{ gap: 8 }}>
              <span className="label">{d.capLabel}</span>
              <span className="value num">{fmt(d.value)}</span>
              <span className="muted" style={{ fontSize: 13 }}><b className="pos">{d.pct}</b> on {fmt(d.capital)} {d.capNote}</span>
            </div>
            <div className="card stat" style={{ gap: 10 }}>
              <span className="label">Strategies</span>
              <span className="value">{d.running} <span className="muted" style={{ fontSize: 17, fontWeight: 600 }}>running of {d.of}</span></span>
              <div className="bar"><div style={{ width: `${d.bars[0]}%`, background: 'var(--pos-2)' }} /><div style={{ width: `${d.bars[1]}%`, background: 'var(--faint)' }} /><div style={{ width: `${d.bars[2]}%`, background: 'var(--warn-2)' }} /></div>
              <span className="hint">{d.healthNote}</span>
            </div>
          </div>

          <div className="grid g-2-1">
            <div className="card flush">
              <div className="card-head"><h2 className="h2">Your strategies</h2><Link to="/strategies" style={{ fontWeight: 600, fontSize: 14 }}>Manage all</Link></div>
              <div className="t-head" style={{ gridTemplateColumns: '2.2fr 1.3fr 1.1fr 1fr 1fr' }}>
                <span>Strategy</span><span>Status</span><span>vs backtest</span><span className="right">Today</span><span className="right">Total</span>
              </div>
              {d.rows.map((r) => (
                <Link key={r.name} to={`/library/${r.id}`} className="t-row" style={{ gridTemplateColumns: '2.2fr 1.3fr 1.1fr 1fr 1fr' }}>
                  <span className="col" style={{ gap: 3 }}><b>{r.name}</b><span className="hint">{r.seg}</span></span>
                  <span><span className={`chip ${r.st}`}>{r.status}</span></span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: /✓/.test(r.vsb) ? 'var(--pos)' : /⚠/.test(r.vsb) ? 'var(--warn)' : 'var(--faint)' }}>{r.vsb}</span>
                  <b className={`right num ${r.today > 0 ? 'pos' : 'muted'}`}>{fmt(r.today, { sign: true })}</b>
                  <b className={`right num ${r.total > 0 ? 'pos' : 'muted'}`}>{fmt(r.total, { sign: true })}</b>
                </Link>
              ))}
            </div>

            <div className="col" style={{ gap: 20 }}>
              <RegimeCard paper={isPaper} />
              <div className="card">
                <h2 className="h3">Today by market</h2>
                {d.markets.map(([n, v]) => (
                  <div key={n} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 80px', gap: 10, alignItems: 'center' }}>
                    <b style={{ fontSize: 14 }}>{n}</b>
                    <div className="bar"><div style={{ width: `${v ? Math.max(2, (v / d.markets[0][1]) * 100) : 0}%`, background: 'var(--pos-2)', borderRadius: 999 }} /></div>
                    <b className="right num pos" style={{ fontSize: 14 }}>{fmt(v, { sign: true })}</b>
                  </div>
                ))}
              </div>
              <div className="card" style={{ gap: 12 }}>
                <div className="row-between"><h2 className="h3">Activity</h2><a href="#" style={{ fontSize: 13, fontWeight: 600 }}>View all</a></div>
                {d.feed.map(([t, time, c]) => (
                  <div key={t} className="feed-item"><span className="dot" style={{ background: c }} /><div className="col" style={{ gap: 1 }}><span style={{ fontSize: 13, lineHeight: 1.4 }}>{t}</span><span className="hint">{time}</span></div></div>
                ))}
              </div>
            </div>
          </div>

          <div className="col" style={{ gap: 14 }}>
            <div className="row-between"><h2 className="h2">Explore by market</h2><Link to="/library" style={{ fontWeight: 600, fontSize: 14 }}>Open Strategy Library</Link></div>
            <div className="grid g4" style={{ gap: 16 }}>
              {MARKETS.map((m) => <MarketCard key={m.key} m={m} />)}
            </div>
          </div>
        </>
      )}

      {stopOpen && (
        <div className="modal-back" onClick={() => setStopOpen(false)}>
          <div className="modal" role="dialog" aria-label="Stop all strategies" onClick={(e) => e.stopPropagation()}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--neg-soft)', display: 'grid', placeItems: 'center' }}><Icon name="stop" fill="var(--neg)" color="var(--neg)" /></span>
            <h3 style={{ fontSize: 20 }}>Stop all {d.running} running strategies?</h3>
            <p className="muted" style={{ margin: 0, lineHeight: 1.55 }}>They will stop placing new orders. You can also close every open position at market price.</p>
            <label className="row" style={{ fontSize: 14 }}><input type="checkbox" defaultChecked /> Also close all open positions now</label>
            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button type="button" className="btn" onClick={() => setStopOpen(false)}>Cancel</button>
              <button type="button" className="btn danger-fill" onClick={() => setStopOpen(false)}>Stop all</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NextStep({ stage, region }) {
  const NS = {
    new: { icon: 'compass', tone: 'var(--brand)', bg: 'var(--brand-soft)', title: 'Pick your first strategy', body: 'Start with paper trading — virtual money on real prices. Free, and no broker needed.', a: ['Browse strategies', '/library'], b: ['How it works', '#'] },
    paper: { icon: 'clock', tone: 'var(--brand)', bg: 'var(--brand-soft)', title: 'Nifty 9:25 Straddle can go live in 5 days', body: `Its paper results are in line with its backtest. Going live needs the Starter plan (${STARTER[region]}/mo) and a connected broker.`, a: ['Connect broker', '/brokers'], b: ['See paper results', '/library/nifty-925-straddle'] },
    live: { icon: 'link', tone: 'var(--warn)', bg: 'var(--warn-soft)', title: 'Reconnect Upstox to resume 14 paused strategies', body: 'Upstox sessions expire daily. Turn on the 8:45 am reminder so this never catches you out.', a: ['Reconnect Upstox', '/brokers'], b: ['Set reminder', '/brokers'] },
  }[stage];
  const done = stage === 'new' ? 0 : 1;
  return (
    <div className="card" style={{ gap: 16 }}>
      <div className="row-between wrap">
        <div className="row" style={{ gap: 16 }}>
          <span style={{ width: 44, height: 44, borderRadius: 12, background: NS.bg, display: 'grid', placeItems: 'center' }}><Icon name={NS.icon} size={22} color={NS.tone} /></span>
          <div className="col" style={{ gap: 2 }}>
            <span className="kicker" style={{ color: NS.tone, letterSpacing: 0.6 }}>Your next step</span>
            <b style={{ fontSize: 17 }}>{NS.title}</b>
            <span className="muted" style={{ fontSize: 14 }}>{NS.body}</span>
          </div>
        </div>
        <div className="row">
          <Link to={NS.b[1]} className="btn">{NS.b[0]}</Link>
          <Link to={NS.a[1]} className="btn primary">{NS.a[0]}</Link>
        </div>
      </div>
      {stage !== 'live' && (
        <div className="grid g3" style={{ paddingTop: 16, borderTop: '1px solid var(--line-2)', gap: 16 }}>
          {['Pick a strategy', 'Paper trade for 14 days', 'Connect broker & go live'].map((l, i) => {
            const isDone = i < done, cur = i === done;
            return (
              <div key={l} className="col" style={{ gap: 8 }}>
                <div style={{ height: 4, borderRadius: 999, background: isDone ? 'var(--pos-2)' : cur ? (stage === 'paper' ? 'linear-gradient(90deg, var(--brand) 64%, var(--line) 64%)' : 'var(--brand)') : 'var(--line)' }} />
                <div className="row" style={{ gap: 8 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 999, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, color: isDone || cur ? '#fff' : 'var(--muted)', background: isDone ? 'var(--pos-2)' : cur ? 'var(--brand)' : 'var(--line-2)' }}>{isDone ? '✓' : i + 1}</span>
                  <span style={{ fontSize: 14, fontWeight: cur ? 700 : 500, color: isDone || cur ? 'var(--ink)' : 'var(--muted)' }}>{l}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BetaButton({ big }) {
  const { betaJoined, setBetaJoined } = useApp();
  return (
    <button type="button" className={`btn ${big ? '' : 'sm'} ${betaJoined ? 'ghost' : 'white'}`} style={betaJoined ? { color: 'var(--lilac-3)' } : undefined} onClick={() => setBetaJoined(true)}>
      {betaJoined ? "You're on the list ✓" : 'Join beta'}
    </button>
  );
}

function RegimeCard({ paper }) {
  const { aiEngine } = useApp();
  if (aiEngine) {
    return (
      <Link to="/market-pulse" className="card dark" style={{ gap: 10, color: '#fff' }}>
        <div className="row-between"><span className="kicker" style={{ color: 'var(--lilac-3)' }}>AI regime · intraday</span><span style={{ fontSize: 12, color: '#A3A6C8' }}>Medium confidence</span></div>
        <div className="row" style={{ gap: 14 }}>
          <Orb size={52} tone="Bearish" />
          <span className="display" style={{ fontSize: 34, color: '#FF7A6E', textShadow: '0 0 22px #F04438' }}>Bearish today</span>
        </div>
        <span style={{ fontSize: 13, lineHeight: 1.5, color: '#E6E7FB' }}>India VIX up 9% and weak breadth before expiry. Breakout strategies are sitting out.</span>
        <b style={{ fontSize: 13, color: 'var(--lilac-2)' }}>{paper ? 'Your straddle fits today — 2 others would sit out' : '3 strategies sitting out today'} →</b>
      </Link>
    );
  }
  return (
    <div className="card">
      <div className="row-between"><h2 className="h3">Market regime</h2><Link to="/market-pulse" style={{ fontSize: 13, fontWeight: 600 }}>Details</Link></div>
      <div className="row" style={{ alignItems: 'baseline', gap: 10 }}>
        <span className="display neg" style={{ fontSize: 28 }}>Downtrend</span><span className="hint">Nifty daily · classic</span>
      </div>
      <div className="row" style={{ padding: 14, background: 'var(--night)', borderRadius: 12, color: '#fff', gap: 12 }}>
        <Orb size={44} />
        <div className="col" style={{ gap: 2, flex: 1 }}>
          <b style={{ fontSize: 14 }}>AI Regime Engine · coming soon</b>
          <span style={{ fontSize: 12, lineHeight: 1.4, color: 'var(--lilac-2)' }}>{paper ? 'Know which market your strategy works best in.' : 'Know when your strategies should trade — and when to sit out.'}</span>
        </div>
        <BetaButton />
      </div>
    </div>
  );
}

function MarketCard({ m, picked, onPick }) {
  const { fmt } = useApp();
  const inner = (
    <>
      <div className="row-between" style={{ width: '100%' }}>
        <span style={{ width: 36, height: 36, borderRadius: 10, background: m.color[0], color: m.color[1], display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 800 }}>{m.mark}</span>
        <span className={`chip ${m.soon ? 'gray' : 'pos'}`}>{m.soon ? 'Coming soon' : `${m.count} strategies`}</span>
      </div>
      <b style={{ fontSize: 16, color: 'var(--ink)' }}>{m.name}</b>
      <span className="muted" style={{ fontSize: 13, lineHeight: 1.4, textAlign: 'left' }}>{m.desc}</span>
      {!onPick && <b style={{ fontSize: 13, color: 'var(--brand)' }}>{m.soon ? 'Join the waitlist →' : `From ${fmt(m.from)} →`}</b>}
    </>
  );
  const style = { alignItems: 'flex-start', gap: 8, cursor: 'pointer', textAlign: 'left', ...(picked ? { border: '2px solid var(--brand)', boxShadow: '0 8px 20px rgba(53,56,205,.12)' } : {}) };
  return onPick
    ? <button type="button" className="card" style={style} onClick={onPick} aria-pressed={picked}>{inner}</button>
    : <Link to="/library" className="card" style={style}>{inner}</Link>;
}

function NewUser() {
  const { region, fmt, aiEngine } = useApp();
  const [market, setMarket] = useState(null);
  const mk = market || DEFAULT_MARKET[region];
  const cur = MARKETS.find((m) => m.key === mk);
  const recs = LIBRARY.filter((s) => cur.seg.includes(s.seg)).slice(0, 3);
  return (
    <div className="col" style={{ gap: 24 }}>
      <div className="col" style={{ gap: 14 }}>
        <div className="col" style={{ gap: 6 }}>
          <h2 className="display" style={{ fontSize: 24 }}>What do you want to trade?</h2>
          <div className="row wrap muted" style={{ fontSize: 14, gap: 10 }}>
            <span>Pick a market — we'll match strategies to your answers:</span>
            <span className="chip outline">Budget {BUDGET[region]}</span>
            <span className="chip outline">Risk comfort: Medium</span>
            <a href="#" style={{ fontWeight: 600 }}>Edit</a>
          </div>
        </div>
        <div className="grid g4" style={{ gap: 16 }}>
          {MARKETS.map((m) => <MarketCard key={m.key} m={m} picked={mk === m.key} onPick={() => setMarket(m.key)} />)}
        </div>
      </div>

      <div className="col" style={{ gap: 14 }}>
        <div className="row-between"><h2 className="h2">Recommended for you · {cur.name}</h2><Link to="/library" style={{ fontWeight: 600, fontSize: 14 }}>See all in Strategy Library</Link></div>
        {recs.length === 0 ? (
          <div className="row-between card" style={{ borderStyle: 'dashed' }}>
            <span className="muted">US stock strategies are launching soon. Get notified the day they go live.</span>
            <button type="button" className="btn primary">Join the waitlist</button>
          </div>
        ) : (
          <div className="grid g3" style={{ gap: 16 }}>
            {recs.map((c) => (
              <div key={c.id} className="card" style={{ gap: 12 }}>
                <div className="row-between"><b style={{ fontSize: 17 }}>{c.name}</b><span className={`chip ${c.live ? 'pos' : 'gray'}`}>{c.live ? '✓ Live verified' : 'Paper proven'}</span></div>
                <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-2)', minHeight: 42 }}>{c.what}</span>
                <div className="grid g3" style={{ gap: 8, padding: '10px 0', borderTop: '1px solid var(--line-2)', borderBottom: '1px solid var(--line-2)' }}>
                  <div className="col" style={{ gap: 2 }}><span className="hint">Min capital</span><b>{fmt(c.cap)}</b></div>
                  <div className="col" style={{ gap: 2 }}><span className="hint">Risk</span><RiskBars risk={c.risk} /></div>
                  <div className="col" style={{ gap: 2 }}><span className="hint">Worst loss</span><b className="neg">−{Math.abs(c.worst)}%</b></div>
                </div>
                <div className="row">
                  <Link to={`/library/${c.id}`} className="btn" style={{ flex: 1 }}>See proof</Link>
                  <Link to={`/library/${c.id}`} className="btn primary" style={{ flex: 1 }}>Paper trade free</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="banner dark" style={{ padding: '24px 28px', gap: 24 }}>
        <Orb size={96} tone={aiEngine ? 'Bearish' : 'ai'} ring />
        <div className="col" style={{ flex: 1, gap: 6 }}>
          <span className="kicker" style={{ color: 'var(--lilac-3)' }}>{aiEngine ? 'New · AI Regime Engine' : 'Coming soon'}</span>
          <b className="display" style={{ fontSize: 24 }}>{aiEngine ? "Today's market: Bearish for intraday" : 'AI Regime Engine'}</b>
          <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--lilac-2)' }}>
            {aiEngine ? 'Our engine reads 31 market signals and tells your strategies when to trade and when to sit out.' : 'Your strategies will know when to trade and when to sit out — with a plain-English reason for every call.'}
          </span>
        </div>
        {aiEngine ? <Link to="/market-pulse" className="btn white">See today's market</Link> : <BetaButton big />}
      </div>

      <div className="card g3" style={{ display: 'grid', gap: 24 }}>
        {[['briefcase', 'Your money stays with your broker', 'We can place orders, never withdraw.'], ['stop', 'Stop anytime, in one click', 'Every strategy has a daily loss limit.'], ['check', 'Results verified by Synaptic', 'Backtest, paper and live — not self-reported.']].map(([ic, t, s]) => (
          <div key={t} className="row"><Icon name={ic} size={22} color="var(--brand)" /><div className="col" style={{ gap: 0 }}><b style={{ fontSize: 14 }}>{t}</b><span className="hint" style={{ fontSize: 13 }}>{s}</span></div></div>
        ))}
      </div>
    </div>
  );
}
