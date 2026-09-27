# Synaptic — clickable prototype

A working React website of the new Synaptic design, filled with **dummy data**.
Nothing here connects to a broker or a real market. It's for showing partners the look and the flow.

## Run it on your Mac

You need **Node.js 18 or newer**. Check with `node -v`.
If you don't have it, install it from https://nodejs.org.

```bash
cd "~/Documents/Dummy website/synaptic-web"
npm install        # first time only
npm run dev        # opens http://localhost:5173 in your browser
```

Press `Ctrl + C` in the terminal to stop it.

## What's inside

| Page | Link |
|---|---|
| Login / Sign up (Email, Google, Apple, Mobile OTP, 2-step) | `#/login` |
| Pricing (India ₹ / US $ / UAE AED, questions change by region) | `#/pricing` |
| Overview (new user, paper user, live user) | `#/overview` |
| My deployments + Signals | `#/strategies` |
| Strategy Library | `#/library` |
| Strategy detail + Paper/Live deploy | `#/library/nifty-opening-breakout` |
| Market Pulse → Regime (Classic or AI) | `#/market-pulse` |
| Market Pulse → Sectors / Sector ranking | `#/market-pulse/sectors` |
| Brokers | `#/brokers` |
| Performance | `#/performance` |

### Demo controls

A dark bar at the bottom of every app page lets you switch:

- **User type:** New, Paper or Live. The Overview changes for each.
- **AI engine:** Coming soon or On. This flips the AI Regime Engine feature flag across the Overview, Library, Strategy detail, Deployments, Performance and Market Pulse.

The **region picker** (top right) switches the currency and number format between India, US and UAE.

## Share it with partners on GitHub

1. Create an empty repository on github.com, for example `synaptic-web`. It should be **Private**.
2. In the terminal, run these commands. Replace `YOUR-USERNAME` with your GitHub username.

```bash
cd "~/Documents/Dummy website/synaptic-web"
git init
git add .
git commit -m "Synaptic prototype with dummy data"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/synaptic-web.git
git push -u origin main
```

3. On GitHub, go to **Settings → Collaborators** and invite your partners.

### Optional: give partners a live link (GitHub Pages)

```bash
npm run build
```

This creates a `dist` folder. You can host that folder on any static host.
- **Netlify Drop:** drag the `dist` folder onto https://app.netlify.com/drop.
- **GitHub Pages:** push `dist` to a `gh-pages` branch.

The site uses hash links (`#/overview`), so it works on any host without extra setup.

## Where things live

```
src/
  data/dummy.js        ← all sample numbers and text (edit here)
  pages/               ← one file per screen
  components/          ← nav, demo bar, glowing orb, small UI pieces
  state/AppState.jsx   ← region, user type, AI flag
  lib/                 ← currency formatting, chart helpers
  styles.css           ← colours, fonts, spacing
```

## Notes

- All numbers are made up and marked "Sample data" on screen.
- Placeholders in `[BRACKETS]` (refund policy, exchange names, registration numbers) still need real answers.
- Fonts load from Google Fonts. Without internet, the site falls back to system fonts.
# synaptic-web
