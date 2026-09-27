import { useEffect, useRef, useState } from 'react';

// Small motion helpers for the public pages. All respect "reduce motion" settings.
export const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Adds the "in" class to every .reveal element inside the page when it scrolls into view.
export function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (reduceMotion() || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return undefined; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [dep]);
}

// true once the element has been seen.
export function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) { setSeen(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

// Number that counts up when it scrolls into view.
export function Counter({ to, prefix = '', suffix = '', decimals = 0, ms = 1400 }) {
  const [ref, seen] = useInView(0.5);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return undefined;
    if (reduceMotion()) { setV(to); return undefined; }
    let raf; const t0 = performance.now();
    const tick = (t) => { const p = Math.min(1, (t - t0) / ms); setV(to * (1 - (1 - p) ** 3)); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, ms]);
  return <span ref={ref}>{prefix}{v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}

// Cycles through words every few seconds (for the hero headline).
export function useCycle(n, ms = 2400) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduceMotion()) return undefined;
    const id = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(id);
  }, [n, ms]);
  return i;
}

// Scroll position (0 → 1 of the page) and raw pixels, throttled with rAF.
export function useScroll() {
  const [s, setS] = useState({ y: 0, p: 0 });
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setS({ y: window.scrollY, p: max > 0 ? window.scrollY / max : 0 });
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);
  return s;
}
