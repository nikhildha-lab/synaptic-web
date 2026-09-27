// Region + currency helpers. All dummy amounts are stored in INR and converted for display.
export const REGIONS = {
  IN: { key: 'IN', name: 'India', short: 'India', code: 'INR ₹', rate: 1, locale: 'en-IN', prefix: '₹' },
  US: { key: 'US', name: 'United States', short: 'US', code: 'USD $', rate: 88, locale: 'en-US', prefix: '$' },
  AE: { key: 'AE', name: 'United Arab Emirates', short: 'UAE', code: 'AED', rate: 24, locale: 'en-US', prefix: 'AED ' },
};

export function money(inr, region = 'IN', { sign = false } = {}) {
  const r = REGIONS[region];
  const v = Math.round(Math.abs(inr) / r.rate).toLocaleString(r.locale);
  const s = sign ? (inr > 0 ? '+' : inr < 0 ? '−' : '') : '';
  return `${s}${r.prefix}${v}`;
}

export function signed(n, digits = 2) {
  return `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(digits)}`;
}

export const toneOf = (n) => (n > 0 ? 'pos' : n < 0 ? 'neg' : 'muted');
