import { createContext, useContext, useMemo, useState } from 'react';
import { money } from '../lib/format.js';

// Global demo state: region/currency, which kind of user is logged in, and the AI engine feature flag.
const Ctx = createContext(null);

export function AppStateProvider({ children }) {
  const [region, setRegion] = useState('IN');
  const [stage, setStage] = useState('live'); // 'new' | 'paper' | 'live'
  const [aiEngine, setAiEngine] = useState(false); // feature flag: AI Regime Engine on/off
  const [betaJoined, setBetaJoined] = useState(false);

  const value = useMemo(
    () => ({
      region, setRegion,
      stage, setStage,
      aiEngine, setAiEngine,
      betaJoined, setBetaJoined,
      fmt: (inr, opts) => money(inr, region, opts),
    }),
    [region, stage, aiEngine, betaJoined]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useApp = () => useContext(Ctx);
