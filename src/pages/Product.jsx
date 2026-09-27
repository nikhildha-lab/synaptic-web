import { Link } from 'react-router-dom';
import { Icon, Sparkline } from '../components/ui.jsx';
import { CtaBand, MarketingShell, MktHero, MktSection } from '../components/Marketing.jsx';
import { sparkPath } from '../lib/charts.js';

// Public "Product" page: what Synaptic does, how it works, safety and markets.
const STEPS = [
  ['search', '1. Pick', 'Choose a ready-made strategy, or build your own. Each one is explained in plain words.'],
  ['chart', '2. Backtest', 'See how it did over past years: return, worst fall and win rate — before you risk anything.'],
  ['clock', '3. Paper trade', 'Run it on today’s market with fake money. Watch real results for a few weeks.'],
  ['sparkle', '4. Go live', 'Connect your broker and let it trade, with daily loss limits and a one-click stop.'],
];

const FEATURES = [
  ['compass', 'Strategy Library', 'A store of strategies. Every card shows what it does, money needed, risk level, worst loss and proof.', '/library'],
  ['chart', 'Backtest Lab', 'Test any idea on years of data. Results in plain language, not just numbers.', '/backtest'],
  ['clock', 'Paper trading', 'Unlimited practice with virtual money on live prices. Free forever.', '/overview'],
  ['briefcase', 'Live trading', 'Orders go to your own broker account. We never hold your money.', '/strategies'],
  ['sparkle', 'Market Pulse', 'Today’s market mood, sector strength and the stocks leading and lagging.', '/market-pulse'],
  ['refresh', 'Performance', 'Profit and loss by day, by strategy and by market mood — so you know what works.', '/performance'],
];

const SAFETY = [
  ['wallet', 'Your money stays with your broker', 'Synaptic only sends orders. Funds never leave your broker account.'],
  ['alert', 'Daily loss limit', 'Set the most you are willing to lose in a day. We stop trading when it is hit.'],
  ['stop', 'One-click kill switch', 'Stop one strategy or all of them, instantly, from any screen.'],
  ['lock', 'Encrypted connections', 'Broker logins use official APIs. We never see or store your broker password.'],
];

const MARKETS = [
  ['India', '₹', 'NSE & BSE stocks, Nifty & Bank Nifty options and futures', ['Zerodha', 'Upstox', 'Angel One', 'Dhan']],
  ['United States', '$', 'NYSE & NASDAQ stocks and ETFs', ['Interactive Brokers', 'Alpaca']],
  ['UAE', 'AED', 'US and global stocks from Dubai, in AED or USD', ['Interactive Brokers', '[Local broker]']],
  ['Crypto', '₿', 'BTC, ETH and SOL, 24 × 7', ['[Exchange 1]', '[Exchange 2]']],
];

function MockScreen() {
  return (
    <div className="glass-card col" style={{ gap: 14, padding: 22 }}>
      <div className="row-between">
        <b>My strategies</b>
        <span className="chip pos">3 live · 2 paper</span>
      </div>
      {[['Sector Leaders Swing', 'Live', '+₹8,420', 43, 0.6], ['200-Day Pullback', 'Live', '+₹2,160', 5, 0.45], ['Nifty 9:25 Straddle', 'Paper', '+₹4,900', 27, 0.8]].map(([n, st, p, seed, dr]) => (
        <div key={n} className="row-between" style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,.04)', border: '1px solid var(--line-2)', gap: 12 }}>
          <div className="col" style={{ gap: 2, minWidth: 0 }}>
            <b style={{ fontSize: 14 }}>{n}</b>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{st} · this month</span>
          </div>
          <div style={{ width: 110 }}><Sparkline d={sparkPath(seed, dr, 110, 30, 24)} color="#4ADE80" w={110} h={30} /></div>
          <b className="num" style={{ color: '#4ADE80', fontSize: 14 }}>{p}</b>
        </div>
      ))}
      <div className="row" style={{ gap: 8, fontSize: 13, color: 'var(--muted)' }}><Icon name="stop" size={16} color="#F87171" />Kill switch ready · Daily loss limit ₹5,000</div>
    </div>
  );
}

export default function Product() {
  return (
    <MarketingShell>
      <div className="mkt-split">
        <MktHero kicker="Product" title="From idea to live trade — in one place." sub="Synaptic helps you pick a strategy you understand, prove it works, and run it safely in your own broker account.">
          <div className="row" style={{ gap: 12 }}>
            <Link to="/login" className="btn white lg">Start free</Link>
            <Link to="/explore" className="btn glass lg">See strategies</Link>
          </div>
        </MktHero>
        <div style={{ padding: '72px 56px 0 0' }} className="mkt-hide-sm"><MockScreen /></div>
      </div>

      <MktSection title="How it works" sub="Four simple steps. You move to the next one only when you are comfortable.">
        <div className="grid g4" style={{ gap: 14 }}>
          {STEPS.map(([ic, t, d]) => (
            <div key={t} className="glass-card col" style={{ gap: 10 }}>
              <span className="glass-ic"><Icon name={ic} size={18} color="#fff" /></span>
              <b style={{ fontSize: 18 }}>{t}</b>
              <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.55 }}>{d}</span>
            </div>
          ))}
        </div>
      </MktSection>

      <MktSection title="Everything you need" sub="Six tools that work together. Click any one to see the real screen.">
        <div className="grid g3" style={{ gap: 14 }}>
          {FEATURES.map(([ic, t, d, to]) => (
            <Link key={t} to={to} className="glass-card col mkt-hover" style={{ gap: 10, color: 'var(--ink)' }}>
              <span className="glass-ic" style={{ background: 'rgba(110,117,255,.22)' }}><Icon name={ic} size={18} color="#C7C9FF" /></span>
              <b style={{ fontSize: 18 }}>{t}</b>
              <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.55 }}>{d}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#C7C9FF', marginTop: 'auto' }}>See screen →</span>
            </Link>
          ))}
        </div>
      </MktSection>

      <MktSection title="Safety comes first" sub="Algo trading should never feel like handing over your money. These rules are always on.">
        <div className="grid g4" style={{ gap: 14 }}>
          {SAFETY.map(([ic, t, d]) => (
            <div key={t} className="glass-card col" style={{ gap: 10 }}>
              <span className="glass-ic" style={{ background: 'rgba(74,222,128,.16)' }}><Icon name={ic} size={18} color="#4ADE80" /></span>
              <b style={{ fontSize: 16 }}>{t}</b>
              <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.55 }}>{d}</span>
            </div>
          ))}
        </div>
      </MktSection>

      <MktSection title="Built for India, US and UAE" sub="Your country sets the currency, brokers and rules. Crypto works everywhere.">
        <div className="grid g4" style={{ gap: 14 }}>
          {MARKETS.map(([n, cur, d, brokers]) => (
            <div key={n} className="glass-card col" style={{ gap: 10 }}>
              <div className="row-between"><b style={{ fontSize: 18 }}>{n}</b><span className="chip gray">{cur}</span></div>
              <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>{d}</span>
              <div className="row wrap" style={{ gap: 6, marginTop: 'auto' }}>{brokers.map((b) => <span key={b} className="chip outline">{b}</span>)}</div>
            </div>
          ))}
        </div>
      </MktSection>

      <CtaBand />
    </MarketingShell>
  );
}
