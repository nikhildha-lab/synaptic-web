import { useState } from 'react';
import { SampleBadge, Icon } from '../components/ui.jsx';
import { BROKERS } from '../data/dummy.js';

export default function Brokers() {
  const [showAll, setShowAll] = useState(false);
  const [reminder, setReminder] = useState(true);
  return (
    <div className="page">
      <div className="row-between wrap" style={{ alignItems: 'flex-end' }}>
        <div className="col" style={{ gap: 4 }}>
          <h1 className="page-title">Brokers</h1>
          <span className="page-sub">Connect the accounts your strategies trade through.</span>
        </div>
        <div className="row"><SampleBadge /><button type="button" className="btn">Add backtest data source</button><button type="button" className="btn primary"><Icon name="plus" size={18} color="#fff" width={2.4} />Connect broker</button></div>
      </div>

      <div className="banner light" style={{ justifyContent: 'space-between' }}>
        <div className="row"><Icon name="clock" size={22} color="var(--brand)" /><div className="col" style={{ gap: 2 }}><b>Daily login reminder</b><span className="muted" style={{ fontSize: 13 }}>Indian broker sessions expire every day. We'll remind you at 8:45 am on Telegram and email.</span></div></div>
        <button type="button" role="switch" aria-checked={reminder} aria-label="Daily login reminder" className={`switch${reminder ? ' on' : ''}`} onClick={() => setReminder(!reminder)}><span /></button>
      </div>

      <div className="grid g2" style={{ alignItems: 'start' }}>
        {BROKERS.map((b) => (
          <div key={b.name} className="card" style={{ gap: 18 }}>
            <div className="row-between" style={{ alignItems: 'flex-start' }}>
              <div className="row" style={{ gap: 14 }}>
                <span className="display" style={{ width: 48, height: 48, borderRadius: 12, background: b.color[0], color: b.color[1], display: 'grid', placeItems: 'center', fontSize: 22 }}>{b.mark}</span>
                <div className="col" style={{ gap: 2 }}><b style={{ fontSize: 18 }}>{b.name}</b><span className="hint" style={{ fontSize: 13 }}>{b.sub}</span></div>
              </div>
              <span className="chip pos">● Active</span>
            </div>
            {b.strategies ? (
              <>
                <div className="grid g2" style={{ gap: 12 }}>
                  <div className="tile"><span className="k">Strategies using it</span><span className="v">{b.strategies}</span></div>
                  <div className="tile"><span className="k">Today's session</span><span className="v warn" style={{ fontSize: 16 }}>Expired · log in again</span></div>
                </div>
                <div className="col">
                  <b style={{ fontSize: 13, color: 'var(--ink-2)' }}>Strategies</b>
                  <div className="row wrap" style={{ gap: 6 }}>
                    {(showAll ? b.tags : b.tags.slice(0, 6)).map((t) => <span key={t} className="mono" style={{ padding: '4px 10px', background: 'var(--line-2)', borderRadius: 6, fontSize: 12, color: 'var(--ink-2)' }}>{t}</span>)}
                    <button type="button" className="btn ghost sm" style={{ color: 'var(--brand)' }} onClick={() => setShowAll(!showAll)}>{showAll ? 'Show less' : `+${b.tags.length - 6} more`}</button>
                  </div>
                </div>
                <div className="row-between" style={{ paddingTop: 16, borderTop: '1px solid var(--line-2)' }}>
                  <span className="hint">Can't remove while strategies use it</span>
                  <div className="row"><button type="button" className="btn sm">Edit</button><button type="button" className="btn sm primary">Log in to {b.name}</button></div>
                </div>
              </>
            ) : (
              <>
                <div className="tile" style={{ padding: 20 }}><b style={{ fontSize: 15 }}>No strategies use this account yet</b><span className="hint" style={{ fontSize: 13 }}>Pick it as the broker when you deploy a strategy.</span></div>
                <div className="row" style={{ justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid var(--line-2)' }}><button type="button" className="btn sm danger">Remove</button><button type="button" className="btn sm">Edit</button></div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="card" style={{ gap: 12 }}>
        <h2 className="h2">Coming soon</h2>
        <div className="row wrap" style={{ gap: 10 }}>
          {['Interactive Brokers (US & UAE)', 'Alpaca (US)', 'Crypto exchange (India)', 'UAE-licensed crypto exchange'].map((n) => <span key={n} className="chip gray" style={{ padding: '6px 12px', fontSize: 13 }}>{n}</span>)}
        </div>
      </div>
    </div>
  );
}
