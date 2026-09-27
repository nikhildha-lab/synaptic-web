// 14 colour themes. Each theme sets CSS variables on <html>, so every page restyles instantly.
// Profit is always green and loss always red; brand colours avoid clashing with them.

const T = [
  // name, vibe, mode, bg, surface, line, ink, muted, brand, onBrand, nav, navInk, glow, glowDeep, night, pos, neg, warn
  ['Indigo Classic', 'Calm, trustworthy (current)', 'light', '#F5F6F8', '#FFFFFF', '#E4E7EC', '#101828', '#5B6474', '#3538CD', '#FFFFFF', '#FFFFFF', '#101828', '#8B8FF5', '#2A2DA8', '#0A0B1E', '#067647', '#B42318', '#B54708'],
  ['Midnight Pro', 'Dark trading desk', 'dark', '#0B0D17', '#141726', '#262A40', '#F2F3FA', '#9BA0BC', '#7C83FF', '#0B0D17', '#0F1220', '#F2F3FA', '#7C83FF', '#3036B8', '#1B1F3A', '#34D399', '#F87171', '#FBBF24'],
  ['Terminal Green', 'Bloomberg-style, serious', 'dark', '#070B09', '#0F1712', '#1F2D24', '#E8F5EC', '#8FA697', '#F5A524', '#070B09', '#0A110D', '#E8F5EC', '#3DDC84', '#127A44', '#122019', '#3DDC84', '#FF6B6B', '#F5A524'],
  ['Royal Gold', 'Premium, Dubai & HNI', 'dark', '#0B1426', '#12203A', '#223458', '#F4EFE3', '#A9B3C7', '#D4A94A', '#0B1426', '#0E1A31', '#F4EFE3', '#E8C26B', '#8A6A1F', '#16284A', '#4ADE80', '#F87171', '#E8C26B'],
  ['Desert Sand', 'Warm, UAE-inspired', 'light', '#FAF6EF', '#FFFFFF', '#EADFCF', '#2B2118', '#7A6A58', '#B5652A', '#FFFFFF', '#FFFFFF', '#2B2118', '#E0915A', '#8A4516', '#2B2118', '#1F7A4D', '#B3261E', '#A35C00'],
  ['Emerald Wealth', 'Private bank', 'light', '#F6F7F3', '#FFFFFF', '#E1E5DC', '#14201A', '#5E6B62', '#0B5D46', '#FFFFFF', '#0B3B2E', '#F6F7F3', '#34D399', '#0B5D46', '#0B2A21', '#0E7A45', '#B42318', '#B54708'],
  ['Graphite Mono', 'Minimal, Apple / Linear', 'light', '#F7F7F8', '#FFFFFF', '#E5E5E7', '#111113', '#6B6B72', '#111113', '#FFFFFF', '#FFFFFF', '#111113', '#A1A1AA', '#3F3F46', '#111113', '#16803C', '#C0262D', '#A16207'],
  ['Aurora', 'Futuristic, AI-first', 'dark', '#100A22', '#1A1233', '#2D2150', '#F3EEFF', '#A79BC7', '#A855F7', '#FFFFFF', '#140D2B', '#F3EEFF', '#22D3EE', '#7C3AED', '#1F1540', '#34D399', '#FB7185', '#FBBF24'],
  ['Saffron', 'Bold, proudly Indian', 'light', '#FFF8F1', '#FFFFFF', '#F2E2D0', '#1F1A17', '#6E625A', '#C2520E', '#FFFFFF', '#0B4F3A', '#FFF8F1', '#FFB266', '#C2520E', '#0B3A2C', '#0B7A4B', '#B42318', '#9A5B00'],
  ['Arctic Blue', 'Classic brokerage', 'light', '#F3F7FC', '#FFFFFF', '#DCE6F2', '#0E1B2C', '#5A6B80', '#1D6FE0', '#FFFFFF', '#FFFFFF', '#0E1B2C', '#60A5FA', '#1D4ED8', '#0B1B33', '#0A7D48', '#C72A2A', '#B45309'],
  ['Crimson Bold', 'Energetic (careful: red brand)', 'light', '#FBF7F8', '#FFFFFF', '#EEDFE3', '#1A1A2E', '#6B6478', '#C81E4A', '#FFFFFF', '#1A1A2E', '#FBF7F8', '#FB7185', '#9F1239', '#1A1A2E', '#0F7A47', '#B91C1C', '#B45309'],
  ['Slate Sky', 'Dark, cool and modern', 'dark', '#0F172A', '#1E293B', '#334155', '#F1F5F9', '#94A3B8', '#38BDF8', '#0F172A', '#0B1222', '#F1F5F9', '#38BDF8', '#0369A1', '#172554', '#4ADE80', '#F87171', '#FBBF24'],
  ['Forest Night', 'Gold on deep green', 'dark', '#0C1512', '#13201B', '#22362E', '#ECF5F0', '#94ADA2', '#E3B341', '#0C1512', '#0A120F', '#ECF5F0', '#34D399', '#0F766E', '#102A22', '#34D399', '#F87171', '#E3B341'],
  ['Ocean Teal', 'Fresh, beginner-friendly', 'light', '#F2F8F8', '#FFFFFF', '#D8E8E8', '#0F2426', '#557173', '#0E7C86', '#FFFFFF', '#FFFFFF', '#0F2426', '#2DD4BF', '#0E7C86', '#0B2A2D', '#0B7A45', '#B42318', '#B45309'],
];

const KEYS = ['name', 'vibe', 'mode', 'bg', 'surface', 'line', 'ink', 'muted', 'brand', 'onBrand', 'nav', 'navInk', 'glow', 'glowDeep', 'night', 'pos', 'neg', 'warn'];
export const THEMES = T.map((a) => Object.fromEntries(KEYS.map((k, i) => [k, a[i]])));

const rgb = (hex) => { const n = parseInt(hex.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
const rgba = (hex, a) => `rgba(${rgb(hex).join(',')},${a})`;
const mix = (a, b, t) => { const x = rgb(a), y = rgb(b); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join(''); };

export function applyTheme(t) {
  const dark = t.mode === 'dark';
  const navIsSurface = t.nav === t.surface || t.nav === '#FFFFFF';
  const v = {
    '--bg': t.bg,
    '--surface': t.surface,
    '--surface-2': mix(t.surface, t.bg, dark ? 0.5 : 0.6),
    '--line': t.line,
    '--line-2': mix(t.line, t.surface, 0.5),
    '--line-strong': mix(t.line, t.ink, dark ? 0.15 : 0.12),
    '--ink': t.ink,
    '--ink-2': mix(t.ink, t.muted, 0.35),
    '--muted': t.muted,
    '--faint': mix(t.muted, t.surface, 0.35),
    '--seg': mix(t.line, t.bg, 0.3),
    '--brand': t.brand,
    '--brand-hover': mix(t.brand, dark ? '#FFFFFF' : '#000000', 0.15),
    '--brand-soft': rgba(t.brand, dark ? 0.18 : 0.1),
    '--on-brand': t.onBrand,
    '--nav': t.nav,
    '--nav-ink': t.navInk,
    '--nav-muted': rgba(t.navInk, 0.7),
    '--nav-active': navIsSurface || dark ? t.brand : t.navInk,
    '--navy': dark ? t.night : navIsSurface ? t.night : t.nav,
    '--night': t.night,
    '--night-2': mix(t.night, '#FFFFFF', 0.06),
    '--night-3': mix(t.night, '#FFFFFF', 0.1),
    '--night-line': mix(t.night, '#FFFFFF', 0.18),
    '--lilac': t.glow,
    '--lilac-2': mix(t.glow, '#FFFFFF', 0.6),
    '--lilac-3': mix(t.glow, '#FFFFFF', 0.35),
    '--glow-deep': t.glowDeep,
    '--pos': t.pos, '--pos-2': t.pos, '--pos-ink': t.pos, '--pos-soft': rgba(t.pos, dark ? 0.16 : 0.12),
    '--neg': t.neg, '--neg-2': t.neg, '--neg-ink': t.neg, '--neg-soft': rgba(t.neg, dark ? 0.16 : 0.1),
    '--warn': t.warn, '--warn-2': t.warn, '--warn-ink': t.warn, '--warn-soft': rgba(t.warn, dark ? 0.16 : 0.12),
    '--pos-line': rgba(t.pos, 0.35), '--neg-line': rgba(t.neg, 0.35), '--warn-line': rgba(t.warn, 0.35),
    '--logo-bg': dark ? t.brand : navIsSurface ? t.ink : t.navInk,
    '--logo-fg': dark ? t.onBrand : navIsSurface ? '#FFFFFF' : t.nav,
    '--shadow': dark ? 'rgba(0,0,0,.45)' : 'rgba(16,24,40,.08)',
  };
  const root = document.documentElement;
  Object.entries(v).forEach(([k, val]) => root.style.setProperty(k, val));
  root.style.colorScheme = dark ? 'dark' : 'light';
  root.dataset.theme = t.name;
}
