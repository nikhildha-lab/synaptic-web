import { Link } from 'react-router-dom';
import { Icon } from '../components/ui.jsx';

// Placeholder — Backtest Lab hasn't been designed yet.
export default function Backtest() {
  return (
    <div className="page">
      <h1 className="page-title">Backtest Lab</h1>
      <div className="empty col" style={{ alignItems: 'center', gap: 12 }}>
        <Icon name="chart" size={32} color="var(--brand)" />
        <b style={{ fontSize: 18, color: 'var(--ink)' }}>Backtest Lab is being designed</b>
        <span>Test any strategy on years of historical data, with and without the market regime filter.</span>
        <Link to="/library" className="btn primary">Browse strategies meanwhile</Link>
      </div>
    </div>
  );
}
