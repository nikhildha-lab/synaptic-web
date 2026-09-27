import { Link } from 'react-router-dom';
import { Icon } from '../components/ui.jsx';
import { CtaBand, MarketingShell, MktHero, MktSection } from '../components/Marketing.jsx';
import { useApp } from '../state/AppState.jsx';
import { REGIME_GROUPS, REGIME_NARRATIVE } from '../data/dummy.js';
import { NeuralCore, labelOf } from './Regime.jsx';

// Public "AI Engine" page: explains the AI Regime Engine (coming soon) and lets visitors join the beta list.
const HELPS = [
  ['compass', 'Right strategy for today', 'Shows which strategies usually do well in today’s market mood — and which ones to be careful with.'],
  ['stop', 'Automatic caution', 'Optional: pause or shrink a strategy when the market mood turns against it.'],
  ['sparkle', 'Plain-English reason', 'Every morning, a short note on why the market looks the way it does. No jargon.'],
];

const COMPARE = [
  ['What it looks at', 'Nifty price and a few indicators', '20+ data feeds: global, India, market internals, calendar'],
  ['How often', 'Once a day', 'Every 30 minutes in market hours'],
  ['Trading horizon', 'One view', 'Separate views for intraday and positional'],
  ['Explains itself', 'Label only', 'Label, confidence, top reasons and a daily note'],
  ['Crypto', '—', 'Planned (BTC, ETH, SOL)'],
];

export default function AiEngine() {
  const { betaJoined, setBetaJoined } = useApp();
  const weights = REGIME_GROUPS.map((g) => g.wP);
  const meta = REGIME_GROUPS.reduce((s, g, i) => s + g.score * weights[i], 0);
  const label = labelOf(meta);

  return (
    <MarketingShell>
      <div className="mkt-split">
        <MktHero kicker={<><span className="dot" style={{ background: '#8B8FF5', boxShadow: '0 0 10px #8B8FF5' }} />AI Regime Engine · coming soon</>}
          title="Know the market’s mood before you trade."
          sub="Our AI reads global news signals, India data, market internals and the calendar — then tells you, in one word, whether today looks Bullish, Bearish or Neutral, and why.">
          <div className="row" style={{ gap: 12 }}>
            {betaJoined
              ? <span className="btn glass lg" style={{ cursor: 'default' }}><Icon name="check" size={18} color="#4ADE80" width={2.4} />You’re on the beta list</span>
              : <button type="button" className="btn white lg" onClick={() => setBetaJoined(true)}>Join the beta list</button>}
            <Link to="/market-pulse" className="btn glass lg">See today’s classic view</Link>
          </div>
        </MktHero>
        <div className="mkt-hide-sm" style={{ padding: '40px 40px 0 0', display: 'grid', placeItems: 'center' }}>
          <NeuralCore label={label} meta={meta} weights={weights} />
        </div>
      </div>

      <MktSection title="What the AI reads" sub="Four specialist agents each study one part of the market. The engine weighs them into one clear answer.">
        <div className="grid g4" style={{ gap: 14 }}>
          {REGIME_GROUPS.map((g) => (
            <div key={g.id} className="glass-card col" style={{ gap: 10 }}>
              <div className="row" style={{ gap: 10 }}>
                <span className="glass-ic" style={{ background: 'rgba(139,143,245,.22)', fontWeight: 800 }}>{g.id}</span>
                <div className="col" style={{ gap: 0 }}><b>{g.name}</b><span style={{ fontSize: 12, color: 'var(--muted)' }}>{g.agent}</span></div>
              </div>
              <div className="col" style={{ gap: 6 }}>
                {g.top.map(([k]) => <span key={k} className="row" style={{ gap: 8, fontSize: 14, color: 'var(--ink-2)' }}><span className="dot" style={{ background: '#8B8FF5' }} />{k}</span>)}
              </div>
            </div>
          ))}
        </div>
      </MktSection>

      <MktSection title="What you get every morning" sub="A sample of the daily card (sample data).">
        <div className="glass-card col" style={{ gap: 16, maxWidth: 820 }}>
          <div className="row-between wrap" style={{ gap: 10 }}>
            <span className="row" style={{ gap: 8, fontSize: 13, fontWeight: 700, color: '#C7C9FF', letterSpacing: 1 }}>POSITIONAL VIEW · THIS WEEK</span>
            <span className="chip gray">Medium confidence</span>
          </div>
          <span className="display" style={{ fontSize: 48, lineHeight: 1, color: label === 'Bullish' ? '#4ADE80' : label === 'Bearish' ? '#FF7A6E' : '#FDB022' }}>{label}</span>
          <div className="row" style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,.05)', border: '1px solid var(--line-2)', alignItems: 'flex-start' }}>
            <Icon name="sparkle" size={20} color="#8B8FF5" />
            <span style={{ lineHeight: 1.55, color: 'var(--ink-2)' }}>{REGIME_NARRATIVE.positional}</span>
          </div>
        </div>
      </MktSection>

      <MktSection title="How it helps you">
        <div className="grid g3" style={{ gap: 14 }}>
          {HELPS.map(([ic, t, d]) => (
            <div key={t} className="glass-card col" style={{ gap: 10 }}>
              <span className="glass-ic" style={{ background: 'rgba(139,143,245,.22)' }}><Icon name={ic} size={18} color="#C7C9FF" /></span>
              <b style={{ fontSize: 18 }}>{t}</b>
              <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.55 }}>{d}</span>
            </div>
          ))}
        </div>
      </MktSection>

      <MktSection title="Classic today, AI soon" sub="Everyone gets the Classic regime now. The AI engine switches on for beta members first — nothing changes in how you use the app.">
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="mkt-table">
            <thead><tr><th /><th>Classic (today)</th><th><span className="row" style={{ gap: 6 }}><span className="dot" style={{ background: '#8B8FF5', boxShadow: '0 0 8px #8B8FF5' }} />AI engine (soon)</span></th></tr></thead>
            <tbody>{COMPARE.map(([k, a, b]) => <tr key={k}><td>{k}</td><td>{a}</td><td>{b}</td></tr>)}</tbody>
          </table>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--faint)' }}>The AI engine gives a view of market conditions. It is not investment advice and does not guarantee results.</p>
      </MktSection>

      <CtaBand title="Be first to try the AI Regime Engine." sub="Beta members get it free during the test period." />
    </MarketingShell>
  );
}
