# Synaptic — clickable prototype

A working website of the new **Synaptic** algo-trading platform design, filled with **dummy data**.
It doesn't connect to any broker or real market. It's for showing the look, the screens and the user flow.

---

## 🚀 How to open it (for partners)

### Step 1: Install Node.js (one time only)

Download the **LTS** version from **https://nodejs.org** and install it. It's like any normal app.

To check it worked, open **Terminal** (Mac) or **Command Prompt** (Windows) and type:

```bash
node -v
```

You should see a version number like `v20.x` or `v22.x`.

### Step 2: Download this project

**Option A: No Git needed**
1. On this page, click the green **Code** button, then **Download ZIP**.
2. Unzip it. You'll get a folder called `synaptic-web-main`.

**Option B: With Git**
```bash
git clone https://github.com/nikhildha-lab/synaptic-web.git
```

### Step 3: Run it

In Terminal, go into the project folder and start it:

```bash
cd synaptic-web          # or: cd synaptic-web-main   (if you downloaded the ZIP)
npm install              # first time only, takes ~30 seconds
npm run dev
```

Your browser opens **http://localhost:5173** automatically. If it doesn't, open that link yourself.

To stop it, go back to Terminal and press **Ctrl + C**.

> Tip for Mac: to open Terminal inside the folder, right-click the folder in Finder, then **Services**, then **New Terminal at Folder**.

---

## 🧭 What to look at

Start at the **Welcome** page (the public website), then click **Sign in** to reach the **Login** screen. You can use any email and password (it's a demo), or click **Google**.

| Screen | What it shows |
|---|---|
| **Welcome · Product · Strategies · AI Engine** | The public website: landing page, what the product does, the strategy store and the AI Regime Engine (coming soon) |
| **Login / Sign up** | Email, Google, Apple, mobile OTP, 2-step verification, country at sign-up |
| **Pricing** | Free / Starter / Pro / Elite plans. Switch **India ₹ · US $ · UAE AED** (the FAQs change per region too) |
| **Overview** | Home screen. Changes for a **new**, **paper** or **live** user |
| **Strategies → Library** | Strategy "store": what each one does, min capital, risk, worst loss, proof |
| **Strategy detail** | Backtest / paper / live proof, "how it does in each market", Paper → Live deploy with safety checks |
| **Strategies → My deployments / Signals** | Running strategies and daily signals |
| **Market Pulse → Regime** | Market regime: Classic today, **AI Regime Engine** (glowing brain) when switched on |
| **Market Pulse → Sectors** | Sector strength, strongest/weakest stocks, sector ranking |
| **Performance** | P&L chart, P&L by market regime, per-strategy results |
| **Brokers** | Connected broker accounts and daily login reminder |

### 🎛️ Demo controls (bottom of the screen)

A dark bar at the bottom lets you switch the demo:

- **User:** `New` · `Paper` · `Live`. See how the Overview changes for each type of user.
- **AI engine:** `Coming soon` · `On`. Turn the AI Regime Engine on or off across all pages.
- **Background:** on the public pages and Login, flip through 14 premium background images (‹ ›), or click **All** to open the Background lab.
- **Theme:** 14 colour themes (light and dark). Use the ‹ › arrows or the dropdown to try them. Your choice is remembered.

The **region picker** (🌐 top right) switches the currency and number format between India, US and UAE.

---

## ❓ Common problems

| Problem | Fix |
|---|---|
| `node: command not found` / `npm: command not found` | Node.js isn't installed. Do Step 1, then close and reopen Terminal |
| `Port 5173 is already in use` | Another copy is running. Close it (Ctrl + C) or open the link it prints instead |
| Page is blank | Make sure you ran `npm install` first, then `npm run dev` again |
| Fonts look plain | You're offline. The fonts load from Google Fonts |

---

## 💬 Feedback

Please note your feedback **page by page**, for example "Pricing: ...", "Overview (new user): ...".
You can open an **Issue** on this repo (**Issues** tab, then **New issue**), or send it to Nikhil directly.

---

## 🛠️ For developers

**Built with:** React 18 + Vite + React Router (hash routing, so it works on any static host).

```
src/
  data/dummy.js        ← all sample numbers and text (edit here)
  pages/               ← one file per screen
  components/          ← top nav, demo bar, glowing orb, small UI pieces
  state/AppState.jsx   ← region, user type, AI feature flag
  lib/                 ← currency formatting, chart helpers
  styles.css           ← colours, fonts, spacing (design tokens at the top)
```

- `npm run build` creates a `dist/` folder you can host anywhere (Netlify, Vercel, GitHub Pages).
- Placeholders in `[BRACKETS]` (refund policy, exchange names, registration numbers) still need real answers.
- All numbers are made up and marked **Sample data** on screen.
