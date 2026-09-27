// ============================================================
//  DUMMY DATA — for the prototype only. Nothing here is real.
//  All money values are in INR and converted for US/UAE display.
// ============================================================

// ---------- Strategy Library ----------
export const LIBRARY = [
  {
    id: 'nifty-opening-breakout', name: 'Nifty Opening Breakout', seg: 'Nifty options', style: 'Intraday', box: 'White box',
    what: 'Buys Nifty options when the market breaks out of its first 15-minute range. Exits by 3:15 pm.',
    cap: 100000, risk: 'Medium', worst: -12.4, bt: 24.1, paper: 6.1, paperMo: 3, live: 3.8, liveMo: 2, users: '142 paper · 38 live',
    best: 'Strong trending days', fitsToday: false, seed: 11, drift: 0.7,
  },
  {
    id: 'nifty-925-straddle', name: 'Nifty 9:25 Straddle', seg: 'Nifty options', style: 'Intraday', box: 'White box',
    what: 'Sells Nifty at-the-money call and put at 9:25 am with a stop loss on each side. Exits by 3:15 pm.',
    cap: 250000, risk: 'High', worst: -18.2, bt: 31.5, paper: 4.2, paperMo: 3, live: null, liveMo: 0, users: '96 paper',
    best: 'Calm, range-bound days', fitsToday: true, seed: 27, drift: 0.8,
  },
  {
    id: 'sector-leaders-swing', name: 'Sector Leaders Swing', seg: 'Stocks', style: 'Swing · weekly', box: 'Black box',
    what: 'Holds 5–8 stocks from the strongest sectors and rebalances every week.',
    cap: 200000, risk: 'Medium', worst: -14.8, bt: 21.7, paper: 5.4, paperMo: 3, live: 2.9, liveMo: 3, users: '210 paper · 61 live',
    best: 'Bullish markets', fitsToday: true, seed: 43, drift: 0.6,
  },
  {
    id: '200-day-pullback', name: '200-Day Pullback', seg: 'Stocks', style: 'Swing · days', box: 'White box',
    what: 'Buys strong stocks when they dip back to their 200-day average and bounce. Sells on a trailing stop.',
    cap: 50000, risk: 'Low', worst: -8.9, bt: 15.2, paper: 3.1, paperMo: 2, live: 1.7, liveMo: 1, users: '188 paper · 44 live',
    best: 'Bullish markets', fitsToday: true, seed: 5, drift: 0.45,
  },
  {
    id: 'nifty-futures-trend', name: 'Nifty Futures Trend', seg: 'Futures', style: 'Intraday', box: 'White box',
    what: 'Trades Nifty futures in the direction of the MACD trend on the 15-minute chart. One trade a day, max.',
    cap: 150000, risk: 'High', worst: -16.5, bt: 19.8, paper: -1.2, paperMo: 1, live: null, liveMo: 0, users: '53 paper',
    best: 'Trending markets, up or down', fitsToday: true, seed: 71, drift: 0.4,
  },
  {
    id: 'all-weather-trend', name: 'All-Weather Trend Blend', seg: 'Futures', style: 'Positional', box: 'Black box',
    what: 'Blends trend and value signals across index and commodity futures, sizing each trade by volatility.',
    cap: 500000, risk: 'Low', worst: -7.6, bt: 13.9, paper: 2.4, paperMo: 3, live: 1.1, liveMo: 2, users: '67 paper · 19 live',
    best: 'Any market', fitsToday: true, seed: 88, drift: 0.35,
  },
  {
    id: 'crypto-200-day', name: 'Crypto 200-Day Pullback', seg: 'Crypto', style: '24/7 · Swing', box: 'White box',
    what: 'Buys BTC, ETH or SOL when price dips back to its 200-day average in an uptrend. Runs round the clock.',
    cap: 25000, risk: 'Medium', worst: -21.3, bt: 38.6, paper: 7.9, paperMo: 3, live: null, liveMo: 0, users: '74 paper',
    best: 'Crypto uptrends', fitsToday: null, seed: 52, drift: 0.55,
  },
  {
    id: 'eth-structure-breakout', name: 'ETH Structure Breakout', seg: 'Crypto', style: '24/7 · Intraday', box: 'White box',
    what: 'Enters ETH when price breaks its last swing high or low (a “break of structure”). Tight stop, fast exit.',
    cap: 25000, risk: 'High', worst: -27.5, bt: 44.2, paper: 9.3, paperMo: 2, live: null, liveMo: 0, users: '41 paper',
    best: 'Volatile crypto markets', fitsToday: null, seed: 64, drift: 0.5,
  },
];

export const RISK_COLOR = { Low: 'var(--pos)', Medium: 'var(--warn)', High: 'var(--neg)' };
export const RISK_LEVEL = { Low: 1, Medium: 2, High: 3 };

// ---------- Overview (per money mode) ----------
export const OVERVIEW = {
  live: {
    today: 3420, todayPct: '+0.12%', todayNote: '3 strategies traded today', openPos: '4 open positions',
    total: 107967, realized: 86730, unrealized: 21237,
    capLabel: 'Portfolio value', value: 3007967, pct: '+3.72%', capital: 2900000, capNote: 'capital',
    running: 6, of: 21, bars: [28.6, 4.8, 66.6], healthNote: '1 stopped · 14 paused (broker logged out) · 0 errors',
    rows: [
      { name: 'Nifty Opening Breakout', id: 'nifty-opening-breakout', seg: 'Nifty options · Intraday', st: 'pos', status: '2 running', vsb: 'On track ✓', today: 2140, total: 48210 },
      { name: 'Sector Leaders Swing', id: 'sector-leaders-swing', seg: 'Stocks · Weekly', st: 'pos', status: '1 running · 1 stopped', vsb: 'Above ✓', today: 860, total: 31540 },
      { name: '200-Day Pullback', id: '200-day-pullback', seg: 'Stocks · Swing', st: 'pos', status: '3 running', vsb: 'Below ⚠', today: 420, total: 19880 },
      { name: 'Nifty Futures Trend', id: 'nifty-futures-trend', seg: 'Futures · Intraday', st: 'warn', status: '6 paused', vsb: '—', today: 0, total: 8337 },
      { name: 'All-Weather Trend Blend', id: 'all-weather-trend', seg: 'Futures · Positional', st: 'warn', status: '8 paused', vsb: '—', today: 0, total: 0 },
    ],
    markets: [['Nifty options', 2140], ['Stocks', 1280], ['Futures', 0]],
    feed: [
      ['Stop loss moved up to lock in profit', '10:58 am', 'var(--brand)'],
      ['Nifty Opening Breakout bought NIFTY 24500 CE × 75', '10:42 am', 'var(--pos-2)'],
      ['Sector Leaders Swing rebalanced 2 stocks', '9:31 am', 'var(--brand)'],
      ['Upstox session expired — 14 strategies paused', '9:00 am', 'var(--warn-2)'],
      ['All intraday positions closed', 'Yesterday, 3:15 pm', 'var(--faint)'],
    ],
  },
  paper: {
    today: 1180, todayPct: '+0.12%', todayNote: 'virtual money', openPos: '3 open paper positions',
    total: 24560, realized: 18300, unrealized: 6260,
    capLabel: 'Virtual capital', value: 1024560, pct: '+2.46%', capital: 1000000, capNote: 'virtual',
    running: 5, of: 5, bars: [100, 0, 0], healthNote: 'Nifty 9:25 Straddle can go live in 5 days',
    rows: [
      { name: 'Crypto 200-Day Pullback', id: 'crypto-200-day', seg: 'Crypto · 24/7 · Swing', st: 'pos', status: '3 running', vsb: 'In line ✓', today: 640, total: 12760 },
      { name: 'ETH Structure Breakout', id: 'eth-structure-breakout', seg: 'Crypto · 24/7 · Intraday', st: 'pos', status: '1 running', vsb: 'Above ✓', today: 540, total: 9300 },
      { name: 'Nifty 9:25 Straddle', id: 'nifty-925-straddle', seg: 'Nifty options · Intraday', st: 'brand', status: 'Day 9 of 14', vsb: 'In line ✓', today: 0, total: 2500 },
    ],
    markets: [['Crypto', 1180], ['Nifty options', 0]],
    feed: [
      ['Crypto 200-Day Pullback bought 0.05 BTC (paper)', '11:05 am', 'var(--pos-2)'],
      ['ETH Structure Breakout hit target (paper)', '6:20 am', 'var(--pos-2)'],
      ['Nifty 9:25 Straddle: 9 of 14 paper days done', 'Yesterday', 'var(--brand)'],
    ],
  },
};

export const MARKET_STATUS = {
  IN: [['NSE open', true], ['NYSE opens 7:00 pm IST', false], ['Crypto 24/7', true]],
  US: [['NYSE opens 9:30 am ET', false], ['NSE closed', false], ['Crypto 24/7', true]],
  AE: [['DFM open · until 3:00 pm', true], ['NYSE opens 5:30 pm GST', false], ['Crypto 24/7', true]],
};

export const MARKETS = [
  { key: 'fo', mark: 'F&O', name: 'Indian F&O', desc: 'Nifty options and futures · intraday', count: 3, from: 100000, seg: ['Nifty options', 'Futures'], color: ['#EEF0FF', '#3538CD'] },
  { key: 'eq', mark: 'EQ', name: 'Indian stocks', desc: 'Swing trades in the strongest sectors', count: 2, from: 50000, seg: ['Stocks'], color: ['#E6F4EA', '#05603A'] },
  { key: 'cr', mark: '₿', name: 'Crypto', desc: 'BTC, ETH and SOL · runs 24/7', count: 2, from: 25000, seg: ['Crypto'], color: ['#FFF1E6', '#B93815'] },
  { key: 'us', mark: 'US', name: 'US stocks', desc: 'S&P 500 stocks and options', count: 0, from: 0, seg: [], soon: true, color: ['#F2F4F7', '#344054'] },
];

// ---------- My deployments ----------
export const DEPLOYMENTS = [
  { name: 'eth_bos_blueprint_423', meta: 'eth_bos_blueprint · NSE', key: 'running', filter: false },
  { name: 'eth_bos_blueprint_422', meta: 'eth_bos_blueprint · NSE', key: 'running', filter: false },
  { name: 'ema200_retest_421', meta: 'SOL · ema200_retest', key: 'out', filter: true },
  { name: 'ema200_retest_420', meta: 'ETH · ema200_retest', key: 'out', filter: true },
  { name: 'ema200_retest_419', meta: 'BTC · ema200_retest', key: 'out', filter: true },
  { name: 'ema200_retest_418', meta: 'GOLD · ema200_retest', key: 'out', filter: true },
];

export const SIGNAL_MODELS = ['ORB', 'US Stocks', 'MACD Intraday', 'MACD Intraday V1', 'MACD Intraday V2', 'MACD Futures', 'Nifty Straddle 925'];
export const SIGNALS = [
  ['2026-09-28', '—', '—', '—', '—', 'Downtrend', '—', '—', true],
  ['2026-09-25', 'BEARISH', 'Bearish', 'Bearish', 'Choppy', 'Choppy', 'Downtrend', '23,070.90'],
  ['2026-09-24', 'BULLISH', 'Bullish', 'Bullish', 'Choppy', 'Uptrend', 'Uptrend', '23,441.35'],
  ['2026-09-23', 'BULLISH', 'Bullish', 'Bullish', 'Choppy', 'Uptrend', 'Uptrend', '23,382.30'],
  ['2026-09-22', 'BULLISH', 'Bullish', 'Bullish', 'Downtrend', 'Choppy', 'Uptrend', '23,432.70'],
  ['2026-09-21', 'BULLISH', 'Bullish', 'Bullish', 'Downtrend', 'Choppy', 'Choppy', '23,340.85'],
  ['2026-09-18', 'BULLISH', 'Bullish', 'Bullish', 'Downtrend', 'Downtrend', 'Downtrend', '23,314.95'],
  ['2026-09-17', 'NEUTRAL', 'Bearish', 'Bullish', 'Downtrend', 'Downtrend', 'Downtrend', '23,234.85'],
  ['2026-09-16', 'BEARISH', 'Bearish', 'Bearish', 'Downtrend', 'Downtrend', 'Downtrend', '23,154.45'],
  ['2026-09-15', 'NEUTRAL', 'Bearish', 'Bullish', 'Downtrend', 'Downtrend', 'Downtrend', '23,445.10'],
];

// ---------- Market Pulse ----------
export const SECTOR_RANK = ['Textiles', 'Industrial', 'Pharma & Healthcare', 'Metals', 'Energy', 'Auto', 'Services', 'Banking & Financials', 'Power', 'Diversified', 'Chemicals', 'Media & Entertainment'];
export const INTRADAY_LEADERS = [['Telecom', 25.44], ['Consumer', 13.05], ['Infrastructure', 4.45], ['Energy', 2.49], ['Industrial', 1.65]];
export const TOP_BUYS = [['WELCORP', 'Industrial', 144.13], ['CPPLUS', 'Industrial', 111.25], ['ATHERENERG', 'Auto', 101.28], ['ACUTAAS', 'Pharma', 79.19], ['KIRLOSENG', 'Industrial', 77.94], ['LAURUSLABS', 'Pharma', 76.1], ['SYRMA', 'Industrial', 71.57], ['APARINDS', 'Industrial', 63.9], ['MCX', 'Banking & Fin.', 63.68], ['SONACOMS', 'Auto', 61.77]];
export const TOP_SELLS = [['KPITTECH', 'IT', -40.14], ['RPOWER', 'Power', -36.87], ['KEC', 'Infrastructure', -35.75], ['POLICYBZR', 'Banking & Fin.', -34.77], ['KAYNES', 'Industrial', -34.6], ['FIRSTCRY', 'Consumption', -33.68], ['MAPMYINDIA', 'IT', -32.55], ['NEWGEN', 'IT', -31.0], ['TARIL', 'Industrial', -30.65], ['ZEEL', 'Media', -30.54]];
export const RRG = [
  ['Nifty Pharma', 113.32, 2.46, 'Leading', 65.0, 50.0, 95.45], ['Nifty Bank', 240.42, 0.85, 'Leading', 14.29, 95.45, 68.18],
  ['Nifty Energy', 160.36, 1.01, 'Leading', 22.5, 77.27, 77.27], ['Nifty Metal', 55.64, 1.33, 'Leading', 46.67, 31.82, 86.36],
  ['Nifty FMCG', 194.14, -0.52, 'Lagging', 13.33, 86.36, 31.82], ['Nifty IT', 125.82, -1.14, 'Lagging', 10.0, 68.18, 22.73],
  ['Nifty Financial Services', 108.76, 0.35, 'Leading', 10.0, 40.91, 59.09], ['Nifty Auto', 117.07, -1.75, 'Lagging', 26.67, 59.09, 4.55],
  ['Nifty Media', 6.57, 0.14, 'Leading', 40.0, 13.64, 50.0], ['Nifty PSU Bank', 35.61, -0.1, 'Weakening', 25.0, 22.73, 40.91],
  ['Nifty Realty', 3.7, -1.28, 'Lagging', 40.0, 4.55, 13.64],
];

// ---------- AI Regime Engine ----------
export const REGIME_GROUPS = [
  { id: 'A', agent: 'Macro Sentinel', name: 'Global macro', score: 0.55, wI: 0.05, wP: 0.3, feeds: '5 of 6 feeds live', ok: false,
    top: [['GIFT Nifty premium', '+0.4%', 1], ['US 10Y yield', '−6 bps', 1], ['Dollar index (DXY)', '101.2 ↓', 1]] },
  { id: 'B', agent: 'India Macro Analyst', name: 'India macro', score: 0.48, wI: 0.05, wP: 0.3, feeds: '6 of 6 feeds live', ok: true,
    top: [['FII net cash flow', '+₹2,140 cr', 1], ['USD/INR', 'Stable', 0], ['RBI stance', 'Neutral', 0]] },
  { id: 'C', agent: 'Internals Analyst', name: 'Market internals', score: -0.3, wI: 0.7, wP: 0.35, feeds: '13 of 14 feeds live', ok: false,
    top: [['India VIX', '14.8 (+9%)', -1], ['Advance/decline', '0.62', -1], ['Put-call ratio', '0.78', -1]] },
  { id: 'E', agent: 'Calendar Analyst', name: 'Calendar', score: -0.2, wI: 0.2, wP: 0.05, feeds: '5 of 5 feeds live', ok: true,
    top: [['Monthly expiry', 'in 2 days', -1], ['Results season', 'Heavy week', -1], ['Holiday nearby', 'No', 0]] },
];
export const REGIME_FACTORS = {
  intraday: [['India VIX spike', -0.09], ['Weak breadth (A/D)', -0.07], ['Low put-call ratio', -0.04], ['Expiry in 2 days', -0.03], ['FII index longs', 0.02], ['GIFT Nifty premium', 0.01]],
  positional: [['FII cash buying', 0.07], ['US 10Y yield easing', 0.05], ['GIFT Nifty premium', 0.04], ['Weak breadth (A/D)', -0.04], ['India VIX spike', -0.03], ['USD/INR stable', 0.02]],
};
export const REGIME_NARRATIVE = {
  intraday: 'India VIX jumped 9% and only 38% of Nifty stocks are rising, with monthly expiry two days away. Expect choppy, downward-leaning sessions — breakout strategies should be cautious today.',
  positional: 'Foreign investors turned net buyers and US yields eased overnight, so the bigger backdrop is supportive. Internals are still soft, so this is a cautious bullish — not a strong one.',
};
export const REGIME_HEALTH = [
  ['Zerodha market data', 'Live · 10:30 am', true], ['NSE reports (FII/DII, breadth)', 'Live · yesterday 6:10 pm', true],
  ['FRED (US rates)', 'Live · 8:40 am', true], ['RBI / MOSPI releases', 'Live · as published', true],
  ['TradingView (Shanghai index)', 'Stale 2h · left out of score', false],
];
export const INDICATORS = [
  ['India VIX', '14.8', '+9.1% today', 'Bearish', 3, -0.5], ['Put-call ratio', '0.78', '−0.12 vs avg', 'Bearish', 7, 0.3],
  ['Advance / decline', '0.62', '38% rising', 'Bearish', 9, 0.4], ['FII index long %', '41%', '+3 pts week', 'Neutral', 12, -0.1],
  ['GIFT Nifty', '+0.4%', 'vs Nifty close', 'Bullish', 15, -0.4], ['Dollar index', '101.2', '−0.3% overnight', 'Bullish', 18, 0.35],
];
// U = up/bullish, M = neutral/choppy, D = down/bearish — last 60 sessions
export const REGIME_HISTORY = 'UUUUUUMMMMUUUUUUUUUMMMDDDDDDDMMMMUUUUUUUUMMMMMDDDDDDDDDDMMDD';

// ---------- Brokers ----------
export const BROKERS = [
  { name: 'Upstox', sub: 'Connected 9 Jul 2026 · ID 15', mark: 'U', color: ['#EEE9FF', '#5925DC'], strategies: 21,
    tags: ['eth_bos_blueprint_423', 'eth_bos_blueprint_422', 'ema200_retest_421', 'ema200_retest_420', 'ema200_retest_419', 'ema200_retest_418', 'combined_algo_417', 'combined_algo_416', 'ema200_retest_415', 'combined_algo_414', 'carver_value_413', 'carver_value_412', 'carver_value_411', 'carver_value_410', 'carver_combined_409', 'carver_breakout_408', 'carver_breakout_407', 'nd_tt_v4_v1_405', 'Options turtle Live', 'nd_tt_v4_options_346', 'refnd_tt_v4_335'] },
  { name: 'Zerodha_new2', sub: 'Zerodha · Connected 28 Jan 2026 · ID 11', mark: 'Z', color: ['#FFF1E6', '#B93815'], strategies: 0, tags: [] },
];

// ---------- Performance ----------
export const PERF_BY_STRATEGY = [
  ['Nifty Opening Breakout', 'Live', 48210, 118, '47%', '−4.1%'], ['Sector Leaders Swing', 'Live', 31540, 42, '55%', '−5.9%'],
  ['200-Day Pullback', 'Live', 19880, 36, '58%', '−3.2%'], ['Crypto 200-Day Pullback', 'Paper', 12760, 64, '44%', '−9.7%'],
  ['Nifty Futures Trend', 'Paper', -4423, 152, '38%', '−6.8%'],
];
export const PERF_BY_REGIME = [[92410, '44%', 182], [31780, '31%', 131], [-16223, '25%', 99]];

// ---------- Pricing ----------
export const PRICES = {
  IN: { m: ['₹0', '₹499', '₹1,499', '₹3,999'], y: ['₹0', '₹416', '₹1,249', '₹3,333'], yt: ['', '₹4,990', '₹14,990', '₹39,990'], founding: '₹999', addon: '₹149', tax: 'Prices include GST.' },
  US: { m: ['$0', '$12', '$29', '$79'], y: ['$0', '$10', '$24', '$66'], yt: ['', '$120', '$290', '$790'], founding: '$19', addon: '$3', tax: 'Plus applicable sales tax.' },
  AE: { m: ['AED 0', 'AED 45', 'AED 109', 'AED 289'], y: ['AED 0', 'AED 37', 'AED 91', 'AED 241'], yt: ['', 'AED 450', 'AED 1,090', 'AED 2,890'], founding: 'AED 69', addon: 'AED 12', tax: 'Prices include VAT.' },
};
export const PLANS = [
  { name: 'Free', tagline: 'Learn and test ideas with virtual money.', cta: 'Start free', features: ['Unlimited paper trading', 'Browse the Strategy Library', '10 backtests a day', 'Market Pulse (daily)'] },
  { name: 'Starter', tagline: 'Your first live strategies, on a small account.', cta: 'Choose Starter', features: ['Everything in Free', '3 live strategies', '1 broker or exchange', 'White-box strategies', 'Unlimited backtests', 'Telegram & email alerts'] },
  { name: 'Pro', tagline: 'For active traders running several systems.', cta: 'Try Pro free for 14 days', popular: true, features: ['Everything in Starter', '10 live strategies', '3 brokers or exchanges', 'Full Market Pulse (intraday)', 'Market regime filter for strategies', 'Black-box strategy subscriptions', 'P&L and tax reports'] },
  { name: 'Elite', tagline: 'For large accounts and multi-account setups.', cta: 'Choose Elite', features: ['Everything in Pro', '30 live strategies', 'Up to 5 accounts', 'First access to the AI Regime Engine', 'API & webhooks', 'Priority support & onboarding call'] },
];

const COMMON_FAQ = {
  profit: ['Do you take a share of my profits?', 'No. You pay a fixed monthly fee. We never take a share of your profits.'],
  money: ['Do you hold my money?', 'Never. Your funds stay in your own broker or exchange account. Synaptic can place the orders you set up, but it cannot withdraw or transfer money.'],
  login: ['Is my broker login safe?', "We never see or store your broker password. You log in on your broker's own page and we receive a secure access key, which you can revoke at any time."],
  returns: ['Do you guarantee returns?', 'No. Trading carries risk and you can lose money. Backtest, paper and live results shown on Synaptic do not guarantee future returns.'],
  cancel: ['Can I cancel anytime? Do you give refunds?', 'Yes, cancel in one click from Billing and keep access until the end of your billing period. Refunds: [YOUR REFUND POLICY].'],
};
export const FAQ = {
  IN: [COMMON_FAQ.profit,
    ['Which brokers and exchanges are supported?', 'Zerodha and Upstox for stocks and F&O. Crypto (BTC, ETH, SOL) runs on [YOUR CRYPTO EXCHANGE]. More brokers are coming soon.'],
    ['Is algo trading allowed for retail traders in India?', "Yes. Under SEBI's retail algo framework, orders go through your broker's approved API and carry an exchange algo ID. [CONFIRM YOUR REGISTRATION STATUS]"],
    COMMON_FAQ.money, COMMON_FAQ.login,
    ['How is crypto trading taxed in India?', 'Gains from crypto are taxed at 30%, 1% TDS is deducted on transfers, and losses cannot be set off against other income. Our tax report helps you file, but it is not tax advice.'],
    ['Do I pay broker charges separately?', 'Yes. Brokerage, exchange fees, taxes and any broker API fees are paid to your broker. Our plan prices already include GST.'],
    COMMON_FAQ.returns, COMMON_FAQ.cancel],
  US: [COMMON_FAQ.profit,
    ['Which brokers are supported in the US?', 'We are launching with Interactive Brokers and Alpaca for US stocks and options. Crypto exchanges will follow. Join the waitlist to get early access.'],
    ['Is Synaptic an investment adviser?', 'Synaptic is trading software: you choose the strategy, your capital and your risk limits. [CONFIRM REGULATORY POSITION WITH US COUNSEL]'],
    ['Do day-trading rules apply to me?', "Yes. Your broker's rules still apply, including any pattern day trader limits on margin accounts. Synaptic warns you before a strategy would break them."],
    COMMON_FAQ.money, COMMON_FAQ.login,
    ['How do I handle taxes?', 'Export your full trade history in one click for your tax filing or accountant. Plan prices exclude sales tax, which is added at checkout where it applies.'],
    COMMON_FAQ.returns, COMMON_FAQ.cancel],
  AE: [COMMON_FAQ.profit,
    ['What can I trade from the UAE?', 'US stocks and options, UAE-listed stocks (DFM and ADX), and crypto. Availability depends on your broker or exchange.'],
    ['Which brokers and exchanges are supported?', 'We are launching with Interactive Brokers and a UAE-licensed crypto exchange [NAME]. Join the waitlist to get early access.'],
    ['Is there tax on my trading gains?', 'The UAE currently has no personal income tax for individuals, but if you are a tax resident of another country, its rules may apply. Our plan prices include 5% VAT.'],
    COMMON_FAQ.money, COMMON_FAQ.login,
    ['Is Synaptic available in Arabic?', 'English is available today. Arabic is coming soon.'],
    COMMON_FAQ.returns, COMMON_FAQ.cancel],
};
