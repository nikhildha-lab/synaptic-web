import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { money } from '../lib/format.js';
import { THEMES, applyTheme } from '../lib/themes.js';

// Global demo state: region/currency, which kind of user is logged in, the AI engine feature flag and the colour theme.
const Ctx = createContext(null);

const savedTheme = () => {
  try { return Math.min(Number(localStorage.getItem('synaptic-theme') || 0), THEMES.length - 1); } catch { return 0; }
};

export function AppStateProvider({ children }) {
  const [region, setRegion] = useState('IN');
  const [stage, setStage] = useState('live'); // 'new' | 'paper' | 'live'
  const [aiEngine, setAiEngine] = useState(false); // feature flag: AI Regime Engine on/off
  const [betaJoined, setBetaJoined] = useState(false);
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    applyTheme(THEMES[theme]);
    try { localStorage.setItem('synaptic-theme', String(theme)); } catch { /* ignore */ }
  }, [theme]);

  const value = useMemo(
    () => ({
      region, setRegion,
      stage, setStage,
      aiEngine, setAiEngine,
      betaJoined, setBetaJoined,
      theme, setTheme,
      fmt: (inr, opts) => money(inr, region, opts),
    }),
    [region, stage, aiEngine, betaJoined, theme]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useApp = () => useContext(Ctx);
