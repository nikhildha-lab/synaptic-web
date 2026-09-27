// Deterministic "random" numbers so dummy charts look the same on every load.
export function rng(seed) {
  let x = seed;
  return () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
}

// Random walk that ends at `endValue`. Returns an array of numbers.
export function walk(seed, n, drift, vol, endValue) {
  const r = rng(seed);
  let v = 0;
  const pts = [];
  for (let i = 0; i < n; i++) {
    v += drift + (r() - 0.5) * vol;
    pts.push(v);
  }
  if (endValue !== undefined && pts[n - 1]) {
    const k = endValue / pts[n - 1];
    return pts.map((p) => p * k);
  }
  return pts;
}

// Turns numbers into an SVG path that fits a width × height box.
export function linePath(pts, w, h, pad = 6) {
  const min = Math.min(0, ...pts);
  const max = Math.max(...pts);
  const y = (p) => h - pad - ((p - min) / (max - min || 1)) * (h - pad * 2);
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${((i * w) / (pts.length - 1)).toFixed(1)},${y(p).toFixed(1)}`).join(' ');
  return { d, area: `${d} L${w},${h} L0,${h} Z`, zeroY: y(0) };
}

export function sparkPath(seed, drift, w = 120, h = 40, n = 28) {
  const r = rng(seed);
  let v = h / 2;
  const pts = [];
  for (let i = 0; i < n; i++) {
    v = Math.max(4, Math.min(h - 4, v - drift + (r() - 0.5) * 5));
    pts.push(`${i ? 'L' : 'M'}${((i * w) / (n - 1)).toFixed(1)},${v.toFixed(1)}`);
  }
  return pts.join(' ');
}
