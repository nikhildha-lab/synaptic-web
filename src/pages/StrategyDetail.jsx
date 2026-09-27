import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../state/AppState.jsx';
import { Icon, RiskBars, SampleBadge, Seg } from '../components/ui.jsx';
import { LIBRARY } from '../data/dummy.js';
import { linePath, walk } from '../lib/charts.js';

const REG_COLORS = [['var(--pos)', 'var(--pos-soft)', 'var(--pos-line)'], ['var(--warn)', 'var(--warn-soft)', 'var(--warn-line)'], ['var(--neg)', 'var(--neg-soft)', 'var(--neg-line)']];
const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

export default function StrategyDetail() {
  const { id } = useParams();
  const s = LIBRARY.find((x) => x.id === id) || LIBRARY[0];
  const { fmt, aiEngine, region } = useApp();
  const [boxView, setBoxView] = useState(s.box);
  const [proof, setProof] = useState('backtest');
  const [mode, setMode] = useState('paper');
  const [ack, setAck] = useState(false);
  const [paperDays, setPaperDays] = useState(9);
  const [regOn, setRegOn] = useState(true);
  const [allow, setAllow] = useState({ 0: true, 1: true, 2: false });

  const P = {
    backtest: { pts: walk(s.seed + 7, 150, 0.6, 5, 72), note: 'Tested on Oct 2023 – Sep 2026 data, including brokerage and slippage.', stats: [['Return / yr', `+${s.bt}%`, 'pos'], ['Win rate', '47%'], ['Max drop', `${s.worst}%`, 'neg'], ['Trades', '618'], ['Avg / trade', `+${fmt(412)}`, 'pos'], ['Profit factor', '1.52']], months: [3.2, -1.8, 2.6, 4.1, -2.9, 1.4, 5.2, 0.8, -1.1, 2.9, 3.6, 1.9].map((v, i) => [MONTHS[i], v]) },
    paper: { pts: walk(s.seed + 19, 60, 0.5, 4, s.paper), note: `Virtual money on live prices for ${s.paperMo} months · 58 trades.`, stats: [['Return', `${s.paper >= 0 ? '+' : ''}${s.paper}%`, s.paper >= 0 ? 'pos' : 'neg'], ['Win rate', '45%'], ['Max drop', '−4.3%', 'neg'], ['Trades', '58'], ['Avg / trade', `+${fmt(105)}`, 'pos'], ['Profit factor', '1.38']], months: [['Jul', 2.4], ['Aug', 1.9], ['Sep', 1.7]] },
    live: s.live === null ? null : { pts: walk(s.seed + 33, 40, 0.5, 4, s.live), note: `Real orders from verified users for ${s.liveMo} months · averaged per ${fmt(100000)}.`, stats: [['Return', `+${s.live}%`, 'pos'], ['Win rate', '44%'], ['Max drop', '−3.6%', 'neg'], ['Trades', '39'], ['Avg / trade', `+${fmt(97)}`, 'pos'], ['Gap vs paper', '−0.4%']], months: [['Aug', 2.1], ['Sep', 1.7]] },
  };
  const cur = P[proof] || P.backtest;
  const chart = linePath(cur.pts, 860, 220, 10);
  const names = aiEngine ? ['Bullish', 'Neutral', 'Bearish'] : ['Uptrend', 'Choppy', 'Downtrend'];
  const byReg = [['45%', '+44.8%', '55%', '−5.1%'], ['30%', '+21.0%', '47%', '−6.4%'], ['25%', '−8.2%', '36%', '−11.8%']];
  const paperOk = paperDays >= 14;
  const isLive = mode === 'live';
  const ready = paperOk && ack;
  const todayTrades = !regOn || allow[2];

  return (
    <div className="page">
      <div className="row-between">
        <div className="muted" style={{ fontSize: 14 }}><Link to="/library" style={{ fontWeight: 600 }}>Strategy Library</Link> / {s.name}</div>
        <SampleBadge />
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1fr) 400px', alignItems: 'start' }}>
        <div className="col" style={{ gap: 20 }}>
          <div className="card" style={{ padding: 28, gap: 18 }}>
            <div className="row wrap" style={{ gap: 8 }}>
              <span className="chip brand">{s.seg}</span><span className="chip gray">{s.style}</span>
              <span className={`chip ${boxView === 'White box' ? 'outline' : 'dark'}`}>{boxView === 'White box' ? 'White box · rules visible' : 'Black box · rules private'}</span>
              {s.live !== null && <span className="chip pos">✓ Live verified</span>}
            </div>
            <h1 className="display" style={{ fontSize: 36 }}>{s.name}</h1>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: 'var(--ink-2)' }}>{s.what}</p>
            <div className="grid g4" style={{ gap: 12 }}>
              <div className="tile"><span className="k">Min capital</span><span className="v">{fmt(s.cap)}</span></div>
              <div className="tile"><span className="k">Risk</span><span className="v"><RiskBars risk={s.risk} /></span></div>
              <div className="tile"><span className="k">Worst loss (peak to low)</span><span className="v neg">{s.worst}%</span></div>
              <div className="tile"><span className="k">Works best in</span><span className="v" style={{ fontSize: 16 }}>{s.best}</span></div>
            </div>
          </div>

          <div className="card">
            <div className="row-between"><h2 className="h2" style={{ fontSize: 20 }}>How it works</h2><Seg label="Preview as" value={boxView} onChange={setBoxView} options={['White box', 'Black box']} /></div>
            {boxView === 'White box' ? (
              <div className="grid g2" style={{ gap: 12 }}>
                {[['Mark the range', "Note Nifty's high and low from 9:15 to 9:30 am."], ['Enter on breakout', 'A 5-min close above the high buys an ATM call; below the low buys an ATM put.'], ['Protect the trade', 'Stop loss at 30% of premium; trail it once the trade is up 40%.'], ['Close by 3:15 pm', 'Any open position is squared off. No new trade after 1:30 pm.']].map(([t, d], i) => (
                  <div key={t} className="row" style={{ alignItems: 'flex-start', padding: 16, border: '1px solid var(--line)', borderRadius: 12 }}>
                    <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--brand-soft)', color: 'var(--brand)', display: 'grid', placeItems: 'center', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    <div className="col" style={{ gap: 2 }}><b>{t}</b><span className="muted" style={{ fontSize: 14, lineHeight: 1.45 }}>{d}</span></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="banner dark" style={{ alignItems: 'flex-start' }}>
                  <Icon name="lock" size={26} color="#fff" />
                  <div className="col" style={{ gap: 6 }}><b>The exact rules are private</b><span style={{ fontSize: 14, lineHeight: 1.5, color: '#D0D5DD' }}>Offered by [Creator name] · SEBI Research Analyst Reg. No. [INH000000000]. You won't see the formula, but you will see every order it places, in real time.</span></div>
                </div>
                <div className="grid g3" style={{ gap: 12 }}>
                  {[['Trades', `${s.seg} only`], ['When', '9:30 am – 3:15 pm'], ['Always has', 'a stop loss on every trade']].map(([k, v]) => <div key={k} style={{ padding: '14px 16px', border: '1px solid var(--line)', borderRadius: 12, fontSize: 14 }}><b>{k}:</b> {v}</div>)}
                </div>
              </>
            )}
          </div>

          <div className="card" style={{ gap: 18 }}>
            <div className="row-between"><h2 className="h2" style={{ fontSize: 20 }}>Proof</h2>
              <Seg label="Proof type" value={proof} onChange={setProof} options={[{ value: 'backtest', label: 'Backtest · 3 yr' }, { value: 'paper', label: `Paper · ${s.paperMo} mo` }, ...(P.live ? [{ value: 'live', label: `Live · ${s.liveMo} mo` }] : [])]} />
            </div>
            <span className="muted" style={{ fontSize: 14 }}>{cur.note}</span>
            <div className="grid g6" style={{ gap: 10 }}>
              {cur.stats.map(([k, v, t]) => <div key={k} className="tile" style={{ padding: '12px 14px' }}><span className="k">{k}</span><b className={t || ''} style={{ fontSize: 17 }}>{v}</b></div>)}
            </div>
            <svg width="100%" height="220" viewBox="0 0 860 220" preserveAspectRatio="none" role="img" aria-label="Equity curve" style={{ color: 'var(--brand)' }}>
              <line x1="0" x2="860" y1={chart.zeroY} y2={chart.zeroY} stroke="var(--line-strong)" style={{ stroke: 'var(--line-strong)' }} strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
              <path d={chart.area} fill="currentColor" fillOpacity="0.08" />
              <path d={chart.d} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="col" style={{ gap: 8 }}>
              <b style={{ fontSize: 13, color: 'var(--ink-2)' }}>Month by month</b>
              <div className="row wrap" style={{ gap: 6 }}>
                {cur.months.map(([m, v]) => (
                  <div key={m} style={{ width: 64, padding: '8px 0', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: v >= 0 ? `rgba(23,178,106,${0.12 + Math.min(Math.abs(v), 6) / 12})` : `rgba(240,68,56,${0.12 + Math.min(Math.abs(v), 6) / 12})`, color: v >= 0 ? 'var(--pos-ink)' : 'var(--neg-ink)' }}>
                    <span style={{ fontSize: 11, opacity: 0.8 }}>{m}</span><b style={{ fontSize: 13 }}>{v >= 0 ? '+' : '−'}{Math.abs(v).toFixed(1)}%</b>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="row-between"><h2 className="h2" style={{ fontSize: 20 }}>How it does in each market</h2><span className="muted" style={{ fontSize: 13 }}>Labels from the {aiEngine ? 'AI Regime Engine' : 'classic regime'}</span></div>
            <div className="grid g3" style={{ gap: 12 }}>
              {byReg.map((r, i) => (
                <div key={i} style={{ padding: 16, background: REG_COLORS[i][1], border: `1px solid ${REG_COLORS[i][2]}`, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div className="row-between"><b style={{ color: REG_COLORS[i][0] }}>{names[i]}</b><span className="hint">{r[0]} of days</span></div>
                  <span className={`display ${r[1].startsWith('−') ? 'neg' : 'pos'}`} style={{ fontSize: 26 }}>{r[1]} <span className="muted" style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font)' }}>/ yr</span></span>
                  <div className="row-between" style={{ fontSize: 13 }}><span>Win rate <b>{r[2]}</b></span><span>Worst drop <b className="neg">{r[3]}</b></span></div>
                </div>
              ))}
            </div>
            <div className="insight"><Icon name="sparkle" size={20} color="var(--brand)" /><span>This strategy makes most of its money in {names[0].toLowerCase()} markets and loses in {names[2].toLowerCase()} ones. Skipping {names[2].toLowerCase()} days would have lifted its yearly return to about +26.5% and cut its worst drop to −6.4%.</span></div>
          </div>

          <div className="card">
            <h2 className="h2" style={{ fontSize: 20 }}>Know the risk</h2>
            <div className="grid g3" style={{ gap: 12 }}>
              {[['Worst drop from a high', `${s.worst}% (≈ ${fmt(Math.abs(s.worst) * 1000)} on ${fmt(100000)})`], ['Worst single day', '−3.1%'], ['Longest losing streak', '7 trades in a row']].map(([k, v]) => (
                <div key={k} className="tile" style={{ background: 'var(--neg-soft)' }}><span className="k" style={{ color: 'var(--neg-ink)' }}>{k}</span><b style={{ fontSize: 17, color: 'var(--neg-ink)' }}>{v}</b></div>
              ))}
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)' }}>
              <li>Loses on sideways days when the breakout fails and reverses.</li>
              <li>Big gap-up or gap-down openings can trigger fast stop losses.</li>
              <li>Past results — backtest, paper or live — don't guarantee future returns.</li>
            </ul>
          </div>
        </div>

        {/* Deploy panel */}
        <aside className="card" style={{ position: 'sticky', top: 88, gap: 18, boxShadow: '0 8px 24px rgba(16,24,40,.06)' }}>
          <h2 className="h2" style={{ fontSize: 20 }}>Deploy this strategy</h2>
          <div className="seg" style={{ width: '100%' }}>
            <button type="button" style={{ flex: 1, height: 40 }} className={!isLive ? 'on' : ''} onClick={() => setMode('paper')}>Paper trade</button>
            <button type="button" style={{ flex: 1, height: 40 }} className={isLive ? 'on' : ''} onClick={() => setMode('live')}>Live trade</button>
          </div>
          {isLive
            ? <div style={{ padding: '12px 14px', background: 'var(--warn-soft)', borderRadius: 10, fontSize: 14, lineHeight: 1.5, color: 'var(--ink)' }}>Places real orders in your broker account with real money.</div>
            : <div style={{ padding: '12px 14px', background: 'var(--brand-soft)', borderRadius: 10, fontSize: 14, lineHeight: 1.5, color: 'var(--ink)' }}>Runs with virtual money on real market prices. No broker needed. Free on every plan.</div>}
          <div className="field"><label htmlFor="cap">Capital</label><input id="cap" className="input" defaultValue={fmt(s.cap)} style={{ fontWeight: 600, fontSize: 16 }} /><span className="hint">Minimum {fmt(s.cap)}</span></div>
          <div className="field"><label htmlFor="dl">Stop for the day if I lose</label><input id="dl" className="input" defaultValue={`${fmt(s.cap * 0.03)} (3%)`} /></div>

          <div style={{ padding: 16, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 12, ...(aiEngine ? { background: 'var(--night)', color: '#fff' } : { background: 'var(--surface-2)', border: '1px solid var(--line)' }) }}>
            <div className="row-between">
              <div className="col" style={{ gap: 2 }}>
                <b style={{ fontSize: 15 }}>Only trade in the right market</b>
                <span style={{ fontSize: 12, color: aiEngine ? 'var(--lilac-3)' : 'var(--muted)' }}>{aiEngine ? 'Uses the AI Regime Engine · intraday view' : 'Uses the classic regime today · upgrades to AI automatically'}</span>
              </div>
              <button type="button" role="switch" aria-checked={regOn} aria-label="Market regime filter" className={`switch${regOn ? ' on' : ''}`} onClick={() => setRegOn(!regOn)}><span /></button>
            </div>
            {regOn && (
              <>
                <span style={{ fontSize: 12, fontWeight: 600, color: aiEngine ? 'var(--lilac-2)' : 'var(--ink-2)' }}>Trade when the market is</span>
                <div className="row" style={{ gap: 6 }}>
                  {names.map((n, i) => (
                    <button key={n} type="button" onClick={() => setAllow({ ...allow, [i]: !allow[i] })} aria-pressed={allow[i]}
                      style={{ flex: 1, height: 36, borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', ...(allow[i] ? { background: REG_COLORS[i][1], border: `1px solid ${REG_COLORS[i][2]}`, color: REG_COLORS[i][0] } : { background: 'transparent', border: `1px dashed ${aiEngine ? '#4A4E8A' : 'var(--line-strong)'}`, color: aiEngine ? '#A3A6C8' : 'var(--muted)' }) }}>
                      {allow[i] ? '✓' : '✕'} {n}
                    </button>
                  ))}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: todayTrades ? (aiEngine ? '#4ADE80' : 'var(--pos)') : (aiEngine ? '#FDB022' : 'var(--warn)') }}>
                  Today the market is {names[2]} → this strategy will {todayTrades ? 'trade' : 'sit out'}.
                </span>
              </>
            )}
          </div>

          {isLive && (
            <>
              <div className="field"><label htmlFor="brk">Broker</label><select id="brk" className="input"><option>Upstox</option><option>Zerodha_new2</option></select></div>
              <div className="col" style={{ padding: 16, border: '1px solid var(--line)', borderRadius: 12, gap: 12 }}>
                <b style={{ fontSize: 14 }}>Before you go live</b>
                {[['Broker connected', true], [`${region === 'IN' ? 'Starter' : 'Starter'} plan or above`, true]].map(([t]) => (
                  <div key={t} className="row" style={{ fontSize: 14 }}><span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--pos-2)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 13 }}>✓</span>{t}</div>
                ))}
                <div className="col" style={{ gap: 6 }}>
                  <div className="row" style={{ fontSize: 14 }}><span style={{ width: 22, height: 22, borderRadius: 999, background: paperOk ? 'var(--pos-2)' : 'var(--warn-2)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 13 }}>{paperOk ? '✓' : '…'}</span>Paper trade {Math.min(paperDays, 14)} of 14 days</div>
                  <div className="bar" style={{ marginLeft: 32, height: 6 }}><div style={{ width: `${Math.min(100, (paperDays / 14) * 100)}%`, background: paperOk ? 'var(--pos-2)' : 'var(--warn-2)' }} /></div>
                  {!paperOk && <button type="button" className="btn ghost sm" style={{ alignSelf: 'flex-start', marginLeft: 24, color: 'var(--brand)' }} onClick={() => setPaperDays(14)}>Demo: finish paper period</button>}
                </div>
                <label className="row" style={{ alignItems: 'flex-start', fontSize: 13, lineHeight: 1.45, color: 'var(--ink-2)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} style={{ marginTop: 2, width: 18, height: 18 }} />
                  I understand this uses real money, I can lose up to my capital, and past results don't guarantee returns.
                </label>
              </div>
            </>
          )}

          {!isLive
            ? <button type="button" className="btn primary lg block">Start paper trading</button>
            : <button type="button" className={`btn lg block ${ready ? 'success' : ''}`} disabled={!ready}>{ready ? `Go live with ${fmt(s.cap)}` : paperOk ? 'Tick the box to continue' : 'Finish paper trading first'}</button>}
          <span className="hint" style={{ textAlign: 'center' }}>{!isLive ? 'Go live after 14 days of paper trading.' : ready ? 'You can pause or stop anytime.' : !paperOk ? `${14 - paperDays} more trading days of paper results needed.` : ''}</span>
        </aside>
      </div>
    </div>
  );
}
