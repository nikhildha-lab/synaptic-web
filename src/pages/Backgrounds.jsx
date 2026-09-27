import { Link, useSearchParams } from 'react-router-dom';
import { Logo } from '../components/ui.jsx';
import { useApp } from '../state/AppState.jsx';
import { BGS, SPOTS } from '../lib/backgrounds.js';

// Test lab: pick a place, then pick one of the 14 backgrounds for it. Each place keeps its own choice.
export default function Backgrounds() {
  const { bgs, setBg } = useApp();
  const [params, setParams] = useSearchParams();
  const spot = SPOTS.find((s) => s.key === params.get('spot')) || SPOTS[0];
  const cur = bgs[spot.key];

  return (
    <div>
      <header className="topnav" style={{ padding: '0 48px' }}>
        <Link to="/welcome"><Logo /></Link>
        <span className="muted" style={{ fontWeight: 600 }}>Background lab</span>
      </header>
      <div className="page" style={{ maxWidth: 1240, gap: 22 }}>
        <div className="col" style={{ gap: 6 }}>
          <h1 className="page-title">Test backgrounds</h1>
          <p className="page-sub" style={{ margin: 0 }}>Choose a place, click a background, then open the page to see it for real. Each place remembers its own pick.</p>
        </div>

        <div className="row-between wrap" style={{ gap: 12 }}>
          <div className="seg">
            {SPOTS.map((s) => (
              <button key={s.key} type="button" className={s.key === spot.key ? 'on' : ''} onClick={() => setParams({ spot: s.key })}>{s.label}</button>
            ))}
          </div>
          <Link to={spot.path} className="btn primary">Open {spot.label} →</Link>
        </div>
        {spot.key === 'ai' && <p className="hint" style={{ margin: 0 }}>Tip: the AI engine card shows only when the demo bar has <b>AI engine: On</b>.</p>}

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          <button type="button" className={`bg-tile${cur < 0 ? ' on' : ''}`} onClick={() => setBg(spot.key, -1)} style={{ display: 'grid', placeItems: 'center', color: '#A3A6E6', fontWeight: 600 }}>
            No image (original)
          </button>
          {BGS.map((b, i) => (
            <button key={b.file} type="button" className={`bg-tile${cur === i ? ' on' : ''}`} onClick={() => setBg(spot.key, i)} aria-pressed={cur === i}>
              <img src={b.thumb} alt="" loading="lazy" />
              <span className="cap"><span>{b.n}. {b.name}</span>{cur === i && <span>✓ In use</span>}</span>
            </button>
          ))}
        </div>

        <div className="card" style={{ gap: 10 }}>
          <b>Current picks</b>
          <div className="grid g4" style={{ gap: 12 }}>
            {SPOTS.map((s) => (
              <Link key={s.key} to={s.path} className="col" style={{ gap: 6, color: 'var(--ink)' }}>
                <span className="hint" style={{ fontWeight: 600 }}>{s.label}</span>
                <span style={{ fontWeight: 600 }}>{bgs[s.key] >= 0 ? `${BGS[bgs[s.key]].n}. ${BGS[bgs[s.key]].name}` : 'No image'}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
