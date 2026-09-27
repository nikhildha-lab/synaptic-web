import { bgStyle } from '../lib/backgrounds.js';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../state/AppState.jsx';
import { Diverge, Icon, Seg, Sparkline } from '../components/ui.jsx';
import Orb from '../components/Orb.jsx';
import { PulseHeader, PulseTabs } from './MarketPulse.jsx';
import { INDICATORS, REGIME_FACTORS, REGIME_GROUPS, REGIME_HEALTH, REGIME_HISTORY, REGIME_NARRATIVE } from '../data/dummy.js';
import { linePath, rng, sparkPath } from '../lib/charts.js';

const COLORS = { Bullish: ['#17B26A', '#05603A', '#4ADE80'], Bearish: ['#F04438', '#912018', '#FF7A6E'], Neutral: ['#F79009', '#93370D', '#FDB022'] };
const sgn = (v) => (v > 0.05 ? '#17B26A' : v < -0.05 ? '#F04438' : '#F79009');
export const labelOf = (v) => (v > 0.15 ? 'Bullish' : v < -0.15 ? 'Bearish' : 'Neutral');

// The "glowing brain": four data agents pulse into the regime core.
export function NeuralCore({ label, meta, weights }) {
  const [c, deep] = COLORS[label];
  const neurons = useMemo(() => {
    const r = rng(29);
    const hubs = [[120, 90], [440, 90], [440, 350], [120, 350], [280, 220]];
    return Array.from({ length: 34 }, () => {
      let x = 30 + r() * 500;
      const y = 24 + r() * 392;
      if (Math.hypot(x - 280, y - 220) < 80) x += x > 280 ? 60 : -60;
      const hub = hubs.reduce((b, h) => (Math.hypot(h[0] - x, h[1] - y) < Math.hypot(b[0] - x, b[1] - y) ? h : b));
      return { x, y, hub, rad: 1.2 + r() * 2.2, delay: r() * 3 };
    });
  }, []);
  const nodes = [[120, 90, 'A', 'Global macro'], [440, 90, 'B', 'India macro'], [440, 350, 'C', 'Market internals'], [120, 350, 'E', 'Calendar']];
  return (
    <svg width="100%" viewBox="0 0 560 440" role="img" aria-label="Regime engine: four data agents feeding the central regime core" style={{ maxWidth: 560, display: 'block' }}>
      <defs>
        <radialGradient id="synHalo"><stop offset="0%" stopColor={c} stopOpacity=".55" /><stop offset="60%" stopColor={c} stopOpacity=".12" /><stop offset="100%" stopColor={c} stopOpacity="0" /></radialGradient>
        <radialGradient id="synCore" cx="40%" cy="35%" r="70%"><stop offset="0%" stopColor="#fff" stopOpacity=".95" /><stop offset="35%" stopColor={c} /><stop offset="100%" stopColor={deep} /></radialGradient>
        <filter id="synGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <circle cx="280" cy="220" r="190" fill="url(#synHalo)" />
      {neurons.map((n, i) => <line key={`l${i}`} x1={n.x} y1={n.y} x2={n.hub[0]} y2={n.hub[1]} strokeOpacity=".18" style={{ stroke: 'var(--lilac)' }} />)}
      {neurons.map((n, i) => <circle key={`n${i}`} className="syn-twinkle" cx={n.x} cy={n.y} r={n.rad} style={{ fill: 'var(--lilac-2)', animationDelay: `${n.delay}s` }} />)}
      <circle className="syn-spin" cx="280" cy="220" r="118" fill="none" strokeOpacity=".35" strokeDasharray="2 8" style={{ stroke: 'var(--lilac)' }} />
      {nodes.map(([x, y, id], i) => (
        <path key={id} className="syn-flow" d={`M${x} ${y} Q ${(x + 280) / 2} ${(y + 220) / 2 + (y < 220 ? -10 : 10)} 280 220`} fill="none" stroke={sgn(REGIME_GROUPS[i].score)} strokeWidth={weights[i] > 0.5 ? 4 : 2.2} strokeLinecap="round" />
      ))}
      <circle className="syn-pulse" cx="280" cy="220" r="58" fill="none" stroke={c} strokeWidth="2" />
      <circle className="syn-pulse2" cx="280" cy="220" r="58" fill="none" stroke={c} strokeWidth="1.5" />
      <g className="syn-breathe" filter="url(#synGlow)"><circle cx="280" cy="220" r="56" fill="url(#synCore)" /></g>
      <circle cx="280" cy="220" r="42" fillOpacity=".55" style={{ fill: 'var(--night)' }} />
      <text x="280" y="216" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" letterSpacing="1.5">{label.toUpperCase()}</text>
      <text x="280" y="236" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff" fillOpacity=".85">{meta > 0 ? '+' : '−'}{Math.abs(meta).toFixed(2)}</text>
      {nodes.map(([x, y, id, name], i) => (
        <g key={`node${id}`}>
          <circle cx={x} cy={y} r="20" style={{ fill: 'var(--night-2)' }} stroke={sgn(REGIME_GROUPS[i].score)} strokeWidth="2.5" filter="url(#synGlow)" />
          <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">{id}</text>
          <text x={x} y={y < 220 ? y - 38 : y + 46} textAnchor="middle" fontSize="12" fontWeight="600" style={{ fill: 'var(--lilac-2)' }}>{name} · {Math.round(weights[i] * 100)}%</text>
        </g>
      ))}
    </svg>
  );
}

function History({ ai }) {
  const r = rng(41);
  let v = 100;
  const pts = [];
  const bands = REGIME_HISTORY.split('');
  bands.forEach((c) => { v += (c === 'U' ? 0.55 : c === 'D' ? -0.6 : 0) + (r() - 0.5) * 1.6; pts.push(v); });
  const min = Math.min(...pts);
  const line = linePath(pts.map((p) => p - min), 1344, 240, 20);
  const bg = { U: 'var(--pos-soft)', M: 'var(--warn-soft)', D: 'var(--neg-soft)' };
  const names = ai ? ['Bullish', 'Neutral', 'Bearish'] : ['Uptrend', 'Choppy', 'Downtrend'];
  return (
    <div className="card">
      <div className="row-between wrap">
        <h2 className="h2">{ai ? 'Regime history' : 'Classic regime history'} vs Nifty — last 60 sessions</h2>
        <div className="row" style={{ gap: 16, fontSize: 13 }}>{names.map((n, i) => <span key={n} className="row" style={{ gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: Object.values(bg)[i] }} />{n}</span>)}</div>
      </div>
      <div style={{ position: 'relative', height: 240, borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>{bands.map((c, i) => <div key={i} style={{ flex: 1, background: bg[c] }} />)}</div>
        <svg width="100%" height="240" viewBox="0 0 1344 240" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }} role="img" aria-label="Nifty price over 60 sessions with regime shading">
          <path d={line.d} fill="none" stroke="currentColor" strokeWidth="2.2" vectorEffect="non-scaling-stroke" style={{ color: 'var(--ink)' }} />
        </svg>
      </div>
      <div className="row-between hint"><span>60 sessions ago</span><span>Nifty 50</span><span>Today</span></div>
    </div>
  );
}

function Indicators() {
  const tone = { Bullish: 'pos', Bearish: 'neg', Neutral: 'gray' };
  const color = { Bullish: '#17B26A', Bearish: '#F04438', Neutral: '#98A2B3' };
  return (
    <div className="col" style={{ gap: 12 }}>
      <h2 className="h2">Key indicators</h2>
      <div className="grid g6" style={{ gap: 14 }}>
        {INDICATORS.map(([n, v, chg, sig, seed, drift]) => (
          <div key={n} className="card" style={{ padding: 16, gap: 6 }}>
            <span className="hint" style={{ fontWeight: 600 }}>{n}</span>
            <b className="num" style={{ fontSize: 22 }}>{v}</b>
            <Sparkline d={sparkPath(seed, drift, 180, 36, 24)} color={color[sig]} w={180} h={36} />
            <div className="row-between"><span className="hint">{chg}</span><span className={`chip ${tone[sig]}`} style={{ fontSize: 11 }}>{sig}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Regime() {
  const { aiEngine, betaJoined, setBetaJoined, bgs } = useApp();
  const [profile, setProfile] = useState('intraday');
  const intra = profile === 'intraday';
  const weights = REGIME_GROUPS.map((g) => (intra ? g.wI : g.wP));
  const meta = REGIME_GROUPS.reduce((s, g, i) => s + g.score * weights[i], 0);
  const label = labelOf(meta);
  const [c, , glow] = COLORS[label];

  return (
    <div className="page">
      <PulseHeader />
      <PulseTabs active="regime" />

      {aiEngine ? (
        <>
          <div className="card dark" style={{ padding: 0, display: 'grid', gridTemplateColumns: 'minmax(0, 560px) minmax(0, 1fr)', gap: 0, overflow: 'hidden', borderRadius: 20, ...bgStyle(bgs.ai, 'linear-gradient(90deg, rgba(5,6,20,.35) 0%, rgba(5,6,20,.70) 55%, rgba(5,6,20,.82) 100%)') }}>
            <div style={{ padding: 8 }}><NeuralCore label={label} meta={meta} weights={weights} /></div>
            <div className="col" style={{ padding: '40px 44px 36px 8px', gap: 18 }}>
              <div className="row-between">
                <span className="kicker row" style={{ gap: 8, color: 'var(--lilac-3)' }}><span className="dot" style={{ background: 'var(--lilac)', boxShadow: '0 0 10px #8B8FF5' }} />AI Regime Engine</span>
                <Seg dark label="Trading horizon" value={profile} onChange={setProfile} options={[{ value: 'intraday', label: 'Intraday' }, { value: 'positional', label: 'Positional' }]} />
              </div>
              <div className="col" style={{ gap: 6 }}>
                <span style={{ fontSize: 15, color: '#A3A6C8' }}>{intra ? 'Today, for intraday trades, the market looks' : 'This week, for swing and positional trades, the market looks'}</span>
                <div className="row" style={{ alignItems: 'baseline', gap: 16 }}>
                  <span className="display" style={{ fontSize: 64, lineHeight: 1, color: glow, textShadow: `0 0 28px ${c}` }}>{label}</span>
                  <span className="chip" style={{ background: 'var(--night-3)', border: '1px solid var(--night-line)', color: '#fff', fontSize: 14, padding: '5px 12px' }}>Medium confidence</span>
                </div>
              </div>
              <div className="col" style={{ gap: 8 }}>
                <div style={{ position: 'relative', height: 10, borderRadius: 999, background: 'var(--night-3)' }}>
                  <div style={{ position: 'absolute', left: 0, width: '42.5%', height: 10, borderRadius: '999px 0 0 999px', background: '#F04438', opacity: 0.55 }} />
                  <div style={{ position: 'absolute', left: '42.5%', width: '15%', height: 10, background: '#F79009', opacity: 0.55 }} />
                  <div style={{ position: 'absolute', left: '57.5%', width: '42.5%', height: 10, borderRadius: '0 999px 999px 0', background: '#17B26A', opacity: 0.55 }} />
                  <div style={{ position: 'absolute', top: -5, left: `calc(${((meta + 1) / 2) * 100}% - 10px)`, width: 20, height: 20, borderRadius: 999, background: '#fff', boxShadow: `0 0 0 4px ${c}, 0 0 18px ${c}` }} />
                </div>
                <div className="row-between" style={{ fontSize: 12, color: '#A3A6C8' }}><span>Bearish −1</span><span>Neutral</span><span>Bullish +1</span></div>
              </div>
              <div className="row" style={{ padding: '16px 18px', background: 'var(--night-2)', border: '1px solid var(--night-line)', borderRadius: 14, alignItems: 'flex-start' }}>
                <Icon name="sparkle" size={20} color="var(--lilac)" />
                <span style={{ fontSize: 15, lineHeight: 1.55, color: '#E6E7FB' }}>{REGIME_NARRATIVE[profile]}</span>
              </div>
              <div className="row wrap" style={{ marginTop: 'auto', gap: 18, fontSize: 13, color: '#A3A6C8' }}>
                <span><b style={{ color: '#fff' }}>{intra ? '95%' : '94%'}</b> data complete</span>
                <span>Updated <b style={{ color: '#fff' }}>{intra ? '10:30 am' : '8:45 am'}</b></span>
                <span>Next <b style={{ color: '#fff' }}>{intra ? '11:00 am' : 'tomorrow 8:45 am'}</b></span>
                <span>Weights <b style={{ color: '#fff' }}>v1.3</b></span>
              </div>
            </div>
          </div>

          <div className="grid g4" style={{ gap: 16 }}>
            {REGIME_GROUPS.map((g, i) => {
              const tag = labelOf(g.score);
              return (
                <div key={g.id} className="card" style={{ padding: 20, gap: 12 }}>
                  <div className="row-between" style={{ alignItems: 'flex-start' }}>
                    <div className="col" style={{ gap: 2 }}><span className="hint" style={{ fontWeight: 700 }}>{g.id} · {g.agent}</span><b style={{ fontSize: 17 }}>{g.name}</b></div>
                    <span className={`chip ${tag === 'Bullish' ? 'pos' : tag === 'Bearish' ? 'neg' : 'warn'}`}>{tag}</span>
                  </div>
                  <div className="row"><div style={{ flex: 1 }}><Diverge value={g.score} height={8} /></div><b className={`num ${g.score > 0 ? 'pos' : 'neg'}`} style={{ width: 44, textAlign: 'right' }}>{g.score > 0 ? '+' : '−'}{Math.abs(g.score).toFixed(2)}</b></div>
                  <div className="col" style={{ gap: 6 }}>
                    {g.top.map(([k, v, t]) => <div key={k} className="row-between" style={{ fontSize: 13 }}><span style={{ color: 'var(--ink-2)' }}>{k}</span><b className={t > 0 ? 'pos' : t < 0 ? 'neg' : 'muted'}>{v}</b></div>)}
                  </div>
                  <div className="row-between hint" style={{ paddingTop: 10, borderTop: '1px solid var(--line-2)' }}>
                    <span className="row" style={{ gap: 6 }}><span className="dot" style={{ background: g.ok ? 'var(--pos-2)' : 'var(--warn-2)' }} />{g.feeds}</span>
                    <span>Weight {Math.round(weights[i] * 100)}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid g2">
            <div className="card">
              <div className="row-between"><h2 className="h2">Why this call</h2><span className="hint" style={{ fontSize: 13 }}>Biggest pushes toward bearish ← → bullish</span></div>
              {REGIME_FACTORS[profile].map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '170px 1fr 56px', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>{k}</span>
                  <Diverge value={v} max={0.09} height={14} />
                  <b className={`right num ${v > 0 ? 'pos' : 'neg'}`}>{v > 0 ? '+' : '−'}{Math.abs(v).toFixed(2)}</b>
                </div>
              ))}
            </div>
            <div className="col" style={{ gap: 20 }}>
              <div className="card" style={{ gap: 12 }}>
                <div className="row-between"><h2 className="h2">Your strategies today</h2><Link to="/strategies" style={{ fontSize: 13, fontWeight: 600 }}>Regime filter settings</Link></div>
                {(intra
                  ? [['Nifty Opening Breakout', 'Sitting out · bearish intraday', 'warn'], ['Nifty 9:25 Straddle', 'Trading · half size', 'brand'], ['Nifty Futures Trend', 'Trading · short bias only', 'pos']]
                  : [['Sector Leaders Swing', 'Trading · full size', 'pos'], ['200-Day Pullback', 'Trading · full size', 'pos'], ['All-Weather Trend Blend', 'Not using regime filter', 'gray']]
                ).map(([n, st, t]) => <div key={n} className="row-between" style={{ fontSize: 14 }}><b>{n}</b><span className={`chip ${t}`}>{st}</span></div>)}
              </div>
              <div className="card" style={{ gap: 10 }}>
                <div className="row-between"><h2 className="h2">Data health</h2><span className="hint">Checked by the Auditor · no simulated data</span></div>
                {REGIME_HEALTH.map(([k, v, ok]) => <div key={k} className="row-between" style={{ fontSize: 13 }}><span className="row" style={{ gap: 8, color: 'var(--ink-2)' }}><span className="dot" style={{ background: ok ? 'var(--pos-2)' : 'var(--warn-2)' }} />{k}</span><span className="muted">{v}</span></div>)}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)' }}>
          <div className="card" style={{ padding: 28, gap: 20, borderRadius: 20 }}>
            <div className="row-between"><span className="kicker muted">Market regime · classic</span><span className="hint" style={{ fontSize: 13 }}>Nifty 50 · updated 3:30 pm</span></div>
            <div className="row" style={{ alignItems: 'baseline', gap: 16 }}><span className="display neg" style={{ fontSize: 52 }}>Downtrend</span><span className="muted">Daily regime</span></div>
            <div className="grid g3" style={{ gap: 12 }}>
              <div className="tile"><span className="k">4H · morning</span><b className="neg">Downtrend</b></div>
              <div className="tile"><span className="k">4H · afternoon</span><b className="muted">Choppy</b></div>
              <div className="tile"><span className="k">Last close</span><b>23,070.90</b></div>
            </div>
            <span style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)' }}>Based on Nifty's 5- and 8-period moving averages. Simple and fast — it tells you the trend, but not <i>why</i>, and it doesn't look at volatility, flows or global cues.</span>
          </div>
          <div className="card dark" style={{ padding: 28, gap: 16, borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -10, top: -10 }}><Orb size={170} ring /></div>
            <span className="chip" style={{ alignSelf: 'flex-start', background: 'var(--night-3)', border: '1px solid var(--night-line)', color: 'var(--lilac-2)', letterSpacing: 1 }}>COMING SOON</span>
            <h2 className="display" style={{ fontSize: 28, maxWidth: 300 }}>AI Regime Engine</h2>
            <span style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--lilac-2)', maxWidth: 380 }}>Four data agents read 31 signals — global markets, India macro, market internals and the calendar — and explain every call in plain English.</span>
            <div className="col" style={{ gap: 8, fontSize: 14, color: '#E6E7FB' }}>
              <span>✓ Separate intraday and positional views</span><span>✓ Confidence level and “why this call”</span><span>✓ Let strategies sit out the wrong market</span>
            </div>
            <button type="button" className={`btn ${betaJoined ? 'ghost' : 'white'}`} style={{ alignSelf: 'flex-start', marginTop: 'auto', ...(betaJoined ? { color: 'var(--lilac-3)' } : {}) }} onClick={() => setBetaJoined(true)}>{betaJoined ? "You're on the list ✓" : 'Join the beta'}</button>
          </div>
        </div>
      )}

      <History ai={aiEngine} />
      <Indicators />
    </div>
  );
}
