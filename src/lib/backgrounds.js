// Premium background images (in /public/bg) and the places in the app that can use one.
const FILES = [
  ['01-neural-aurora', 'Neural Aurora'],
  ['02-global-arc', 'Global Arc'],
  ['03-liquid-gold', 'Liquid Gold'],
  ['04-glass-orb', 'Glass Orb'],
  ['05-topographic-pnl', 'Topographic P&L'],
  ['06-horizon-grid', 'Horizon Grid'],
  ['07-particle-flow', 'Particle Flow'],
  ['08-aurora-ribbons', 'Aurora Ribbons'],
  ['09-emerald-guilloche', 'Emerald Guilloché'],
  ['10-desert-dunes', 'Desert Dunes'],
  ['11-ticker-rain', 'Ticker Rain'],
  ['12-sector-mosaic', 'Sector Mosaic'],
  ['13-black-marble', 'Black Marble'],
  ['14-candle-nebula', 'Candle Nebula'],
];

export const BGS = FILES.map(([file, name], i) => ({ n: i + 1, file, name, src: `./bg/${file}.jpg`, thumb: `./bg/thumb/${file}.jpg` }));

// Each place keeps its own background, so they can be tested separately. -1 = no image (original look).
export const SPOTS = [
  { key: 'landing', label: 'Site background', path: '/welcome' },
  { key: 'login', label: 'Login', path: '/login' },
  { key: 'pricing', label: 'Pricing header', path: '/pricing' },
  { key: 'ai', label: 'AI engine card', path: '/market-pulse' },
];

export const DEFAULT_BGS = { landing: 0, login: 7, pricing: 0, ai: 6 };

// Which place the current page controls (used by the demo bar).
export const spotForPath = (path) => (['/product', '/explore', '/ai-engine'].includes(path) ? 'landing' : SPOTS.find((s) => path === s.path)?.key);

// Background style with a dark overlay so white text stays readable.
export function bgStyle(idx, overlay = 'linear-gradient(90deg, rgba(5,6,20,.78) 0%, rgba(5,6,20,.35) 60%, rgba(5,6,20,.15) 100%)') {
  const b = BGS[idx];
  if (!b) return {};
  return { backgroundImage: `${overlay}, url(${b.src})`, backgroundSize: 'cover', backgroundPosition: 'center' };
}
