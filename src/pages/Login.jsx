import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Logo } from '../components/ui.jsx';

const CODES = [['+91', 'India'], ['+1', 'United States'], ['+971', 'UAE']];

export default function Login() {
  const nav = useNavigate();
  const [mode, setMode] = useState('signin');
  const [method, setMethod] = useState('email');
  const [otpSent, setOtpSent] = useState(false);
  const [code, setCode] = useState('+91');
  const [twoFA, setTwoFA] = useState(false);
  const signup = mode === 'signup';

  const submit = (e) => {
    e.preventDefault();
    if (method === 'otp' && !otpSent) return setOtpSent(true);
    if (!signup && method === 'email' && !twoFA) return setTwoFA(true);
    nav('/overview');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'minmax(0, 520px) minmax(0, 1fr)' }} className="login-grid">
      <style>{'@media (max-width: 900px){.login-grid{grid-template-columns:1fr!important}.login-hero{display:none!important}}'}</style>
      <aside className="login-hero" style={{ background: 'var(--navy)', color: '#fff', padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Logo light size={36} />
        <div className="col" style={{ gap: 28 }}>
          <h1 className="display" style={{ fontSize: 48, lineHeight: 1.08 }}>Build it. Test it.<br />Let it trade.</h1>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: '#C9CBF2', maxWidth: 420 }}>
            Algo trading for India, US and UAE markets — backtest ideas, paper trade them, then go live with your own broker.
          </p>
          <div className="col" style={{ gap: 16 }}>
            {[
              ['wallet', 'Your money stays in your own broker account'],
              ['lock', 'Encrypted broker connections — we never see your password'],
              ['stop', 'Stop any strategy, anytime, in one click'],
            ].map(([ic, t]) => (
              <div key={t} className="row"><Icon name={ic} size={22} color="#8B8FF5" /><span style={{ fontSize: 16, color: '#E6E7FB' }}>{t}</span></div>
            ))}
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: '#A3A6E6' }}>
          Trading involves risk. <a href="#" style={{ color: '#C7C9FF' }}>Terms</a> · <a href="#" style={{ color: '#C7C9FF' }}>Privacy</a> · <a href="#" style={{ color: '#C7C9FF' }}>Risk disclosure</a>
        </p>
      </aside>

      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <form onSubmit={submit} className="card" style={{ width: 440, maxWidth: '100%', padding: 40, gap: 18 }}>
          {twoFA ? (
            <>
              <div className="col" style={{ gap: 6 }}>
                <h2 className="display" style={{ fontSize: 28 }}>Two-step verification</h2>
                <p className="muted" style={{ margin: 0 }}>Enter the 6-digit code from your authenticator app.</p>
              </div>
              <OtpBoxes />
              <label className="row" style={{ fontSize: 14, color: 'var(--ink-2)' }}><input type="checkbox" defaultChecked /> Remember this device for 30 days</label>
              <button className="btn primary lg block" type="submit">Verify &amp; sign in</button>
              <button type="button" className="btn ghost" onClick={() => setTwoFA(false)}>Back</button>
            </>
          ) : (
            <>
              <div className="col" style={{ gap: 6 }}>
                <h2 className="display" style={{ fontSize: 30 }}>{signup ? 'Create your account' : 'Welcome back'}</h2>
                <p className="muted" style={{ margin: 0 }}>{signup ? 'Start free with paper trading. No card needed.' : 'Sign in to manage your strategies.'}</p>
              </div>
              <div className="grid g2" style={{ gap: 10 }}>
                <button type="button" className="btn" onClick={() => nav('/overview')}>
                  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z"/><path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.2-8.5 2.2-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>
                  Google
                </button>
                <button type="button" className="btn" onClick={() => nav('/overview')}>
                  <svg width="16" height="18" viewBox="0 0 17 20" aria-hidden="true"><path fill="#000" d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9C3.6 4.8 2 5.8 1 7.3c-1.9 3.3-.5 8.2 1.4 10.9.9 1.3 2 2.8 3.4 2.7 1.4-.1 1.9-.9 3.5-.9s2.1.9 3.5.9c1.5 0 2.4-1.3 3.3-2.7 1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-3-4.5zM11.5 2.9c.7-.9 1.3-2.2 1.1-3.4-1.1 0-2.4.7-3.2 1.6-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.4-.6 3.2-1.5z"/></svg>
                  Apple
                </button>
              </div>
              <div className="row"><div style={{ flex: 1, height: 1, background: 'var(--line)' }} /><span className="muted" style={{ fontSize: 13 }}>or</span><div style={{ flex: 1, height: 1, background: 'var(--line)' }} /></div>
              <div className="seg" style={{ width: '100%' }}>
                <button type="button" style={{ flex: 1 }} className={method === 'email' ? 'on' : ''} onClick={() => setMethod('email')}>Email</button>
                <button type="button" style={{ flex: 1 }} className={method === 'otp' ? 'on' : ''} onClick={() => { setMethod('otp'); setOtpSent(false); }}>Mobile OTP</button>
              </div>

              {signup && (
                <>
                  <div className="field"><label htmlFor="name">Full name</label><input id="name" className="input" placeholder="Your name" /></div>
                  <div className="field">
                    <label htmlFor="country">Country</label>
                    <select id="country" className="input" defaultValue="IN"><option value="IN">India</option><option value="US">United States</option><option value="AE">United Arab Emirates</option></select>
                    <span className="hint">Sets your currency, brokers and the rules that apply to you.</span>
                  </div>
                </>
              )}

              {method === 'email' ? (
                <>
                  <div className="field"><label htmlFor="email">Email</label><input id="email" type="email" className="input" placeholder="you@example.com" /></div>
                  <div className="field">
                    <div className="row-between"><label htmlFor="pw">Password</label>{!signup && <a href="#" style={{ fontSize: 13, fontWeight: 600 }}>Forgot password?</a>}</div>
                    <input id="pw" type="password" className="input" placeholder="••••••••" />
                  </div>
                </>
              ) : (
                <>
                  <div className="field">
                    <label htmlFor="phone">Mobile number</label>
                    <div className="row" style={{ gap: 8 }}>
                      <select aria-label="Country code" className="input" style={{ width: 96 }} value={code} onChange={(e) => setCode(e.target.value)}>
                        {CODES.map(([c, n]) => <option key={c} value={c}>{c} {n === 'United States' ? 'US' : n === 'UAE' ? 'AE' : 'IN'}</option>)}
                      </select>
                      <input id="phone" type="tel" className="input" placeholder={code === '+91' ? '98765 43210' : code === '+1' ? '(415) 555-0123' : '50 123 4567'} />
                    </div>
                  </div>
                  {otpSent && (
                    <div className="field">
                      <label>Enter the 6-digit OTP</label>
                      <OtpBoxes />
                      <span className="hint">Didn't get it? Resend in 0:28</span>
                    </div>
                  )}
                </>
              )}

              {signup && (
                <label className="row" style={{ alignItems: 'flex-start', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.45 }}>
                  <input type="checkbox" style={{ marginTop: 2 }} /> I've read the <a href="#">Risk Disclosure</a> and agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
                </label>
              )}

              <button className="btn primary lg block" type="submit">
                {method === 'otp' && !otpSent ? 'Send OTP' : method === 'otp' ? 'Verify & continue' : signup ? 'Create account' : 'Sign in'}
              </button>

              <p style={{ margin: 0, textAlign: 'center', fontSize: 14 }} className="muted">
                {signup ? 'Already have an account? ' : 'New to Synaptic? '}
                <button type="button" className="btn ghost sm" style={{ padding: 0, height: 'auto', color: 'var(--brand)' }} onClick={() => setMode(signup ? 'signin' : 'signup')}>
                  {signup ? 'Sign in' : 'Create an account'}
                </button>
                {!signup && <> · <Link to="/pricing" style={{ fontWeight: 600 }}>See plans</Link></>}
              </p>
            </>
          )}
        </form>
      </section>
    </div>
  );
}

function OtpBoxes() {
  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(6, minmax(0,1fr))', gap: 8 }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <input key={i} aria-label={`Digit ${i}`} maxLength={1} className="input" style={{ height: 50, textAlign: 'center', fontSize: 20, padding: 0 }} />
      ))}
    </div>
  );
}
