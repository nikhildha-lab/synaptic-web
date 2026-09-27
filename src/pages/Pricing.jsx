import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Seg } from '../components/ui.jsx';
import { MarketingShell } from '../components/Marketing.jsx';
import { useApp } from '../state/AppState.jsx';
import { FAQ, PLANS, PRICES } from '../data/dummy.js';
import { bgStyle } from '../lib/backgrounds.js';

const REGION_TABS = [{ value: 'IN', label: 'India · ₹' }, { value: 'US', label: 'US · $' }, { value: 'AE', label: 'UAE · AED' }];

export default function Pricing() {
  const { region, setRegion, bgs } = useApp();
  const band = bgs.pricing >= 0;
  const [yearly, setYearly] = useState(false);
  const [open, setOpen] = useState(0);
  const p = PRICES[region];
  const prices = yearly ? p.y : p.m;
  const billed = (i) => (i === 0 ? 'Free forever · no card needed' : yearly ? `Billed ${p.yt[i]} yearly` : 'Billed monthly');

  return (
    <MarketingShell>

      <div className="page" style={{ maxWidth: 1200, gap: 28, paddingTop: 24 }}>
        <div className="col" style={band
          ? { alignItems: 'center', textAlign: 'center', gap: 14, padding: '64px 24px 56px', borderRadius: 24, color: '#fff', ...bgStyle(bgs.pricing, 'radial-gradient(ellipse at center, rgba(5,6,20,.40) 0%, rgba(5,6,20,.70) 100%)') }
          : { alignItems: 'center', textAlign: 'center', gap: 14, paddingTop: 20 }}>
          <span className="kicker" style={{ color: band ? '#C7C9FF' : 'var(--brand)' }}>Pricing</span>
          <h1 className="display" style={{ fontSize: 46, lineHeight: 1.1 }}>Paper trade free. Pay when you go live.</h1>
          <p className="page-sub" style={{ fontSize: 18, maxWidth: 640, margin: 0, ...(band ? { color: 'rgba(255,255,255,.8)' } : {}) }}>Plans grow with the number of strategies you run live — not with your profits.</p>
          <div className="row wrap" style={{ gap: 12, justifyContent: 'center', marginTop: 8 }}>
          <Seg label="Region" value={region} onChange={(v) => { setRegion(v); setOpen(0); }} options={REGION_TABS} />
          <div className="seg">
            <button type="button" className={!yearly ? 'on' : ''} onClick={() => setYearly(false)}>Monthly</button>
            <button type="button" className={yearly ? 'on' : ''} onClick={() => setYearly(true)}>Yearly <span className="chip pos">2 months free</span></button>
          </div>
          </div>
        </div>

        <div className="banner dark glass-card" style={{ justifyContent: 'space-between', background: 'linear-gradient(120deg, rgba(110,117,255,.30), rgba(10,12,34,.55))' }}>
          <span><b>Founding member offer:</b> Pro at <b>{p.founding}</b> / month, locked for life — first 500 members only.</span>
          <Link to="/login" className="btn white sm">Claim offer</Link>
        </div>

        <div className="grid g4" style={{ gap: 16, alignItems: 'start' }}>
          {PLANS.map((plan, i) => (
            <div key={plan.name} className="card" style={plan.popular ? { border: '2px solid var(--brand)', boxShadow: '0 12px 32px rgba(53,56,205,.14)', gap: 12 } : { gap: 12 }}>
              <div className="row-between" style={{ minHeight: 26 }}>
                <span className="display" style={{ fontSize: 22 }}>{plan.name}</span>
                {plan.popular && <span className="chip" style={{ background: 'var(--brand)', color: 'var(--on-brand)' }}>Most popular</span>}
              </div>
              <p className="muted" style={{ margin: 0, fontSize: 14, minHeight: 40 }}>{plan.tagline}</p>
              <div className="row" style={{ alignItems: 'baseline', gap: 4 }}>
                <span className="display num" style={{ fontSize: 36 }}>{prices[i]}</span>
                {i > 0 && <span className="muted">/ mo</span>}
              </div>
              <span className="hint" style={{ minHeight: 16 }}>{billed(i)}</span>
              <Link to="/login" className={`btn block${plan.popular ? ' primary' : ''}`}>{plan.cta}</Link>
              <div style={{ height: 1, background: 'var(--line)' }} />
              <div className="col" style={{ gap: 10 }}>
                {plan.features.map((f) => (
                  <div key={f} className="row" style={{ alignItems: 'flex-start', gap: 8 }}><Icon name="check" size={18} color="var(--pos)" width={2.4} /><span style={{ fontSize: 14, color: 'var(--ink-2)' }}>{f}</span></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="row-between muted wrap" style={{ fontSize: 14 }}>
          <span>Need more? Add live strategies for <b style={{ color: 'var(--ink)' }}>{p.addon}</b> / month each.</span>
          <span>Premium black-box strategies are priced by their creators. {p.tax}</span>
        </div>

        <div className="col" style={{ alignItems: 'center', gap: 18, paddingTop: 16 }}>
          <div className="row-between" style={{ width: '100%', maxWidth: 880 }}>
            <h2 className="display" style={{ fontSize: 28 }}>Common questions</h2>
            <span className="muted" style={{ fontSize: 14 }}>Answers for <b style={{ color: 'var(--ink)' }}>{REGION_TABS.find((r) => r.value === region).label.split(' ')[0]}</b></span>
          </div>
          <div className="card flush" style={{ width: '100%', maxWidth: 880 }}>
            {FAQ[region].map(([q, a], i) => (
              <div key={q} style={{ borderBottom: '1px solid var(--line-2)' }}>
                <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}
                  style={{ width: '100%', minHeight: 60, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: 'none', border: 0, fontSize: 16, fontWeight: 600, color: 'var(--ink)', textAlign: 'left', cursor: 'pointer' }}>
                  <span>{q}</span>
                  <span style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--line-2)', display: 'grid', placeItems: 'center', fontSize: 18, transform: `rotate(${open === i ? 45 : 0}deg)`, transition: 'transform .15s' }}>+</span>
                </button>
                {open === i && <p style={{ margin: 0, padding: '0 24px 20px', fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)' }}>{a}</p>}
              </div>
            ))}
          </div>
          <span className="muted" style={{ fontSize: 13 }}>Still have a question? <a href="#" style={{ fontWeight: 600 }}>Talk to us</a></span>
        </div>
      </div>
    </MarketingShell>
  );
}
