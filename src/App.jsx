import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from './state/AppState.jsx';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Pricing from './pages/Pricing.jsx';
import Overview from './pages/Overview.jsx';
import Deployments from './pages/Deployments.jsx';
import Library from './pages/Library.jsx';
import StrategyDetail from './pages/StrategyDetail.jsx';
import MarketPulse from './pages/MarketPulse.jsx';
import Regime from './pages/Regime.jsx';
import Brokers from './pages/Brokers.jsx';
import Performance from './pages/Performance.jsx';
import Backtest from './pages/Backtest.jsx';

// HashRouter keeps links working on GitHub Pages and when opening the built files directly.
export default function App() {
  return (
    <AppStateProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route element={<Layout />}>
            <Route path="/overview" element={<Overview />} />
            <Route path="/strategies" element={<Deployments />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/:id" element={<StrategyDetail />} />
            <Route path="/market-pulse" element={<Regime />} />
            <Route path="/market-pulse/sectors" element={<MarketPulse />} />
            <Route path="/backtest" element={<Backtest />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/brokers" element={<Brokers />} />
          </Route>
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </HashRouter>
    </AppStateProvider>
  );
}
