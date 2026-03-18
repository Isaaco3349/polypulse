# PolyPulse

A real-time Polymarket analytics dashboard built with Next.js 16 and Tailwind CSS.

## Live Demo
🔗 https://polypulse-eight.vercel.app/

## Features

### 📊 Probability Movement Charts
- Live price history charts on every market card
- Powered by Polymarket CLOB API
- Purple line chart showing probability over time

### 🔥 Trending Markets
- Top markets ranked by 24h trading volume
- Live Yes/No probability display
- Visual probability progress bar

### ⚡ Biggest Probability Movers
- Markets with the largest 24h price swings
- Green/red indicators for up/down moves
- Full chart history per card

### 🕒 Recent Market Activity
- Most recently updated markets
- Time ago display (e.g. "2m ago", "1h ago")
- Live probability + change badge

### 🔍 Search & Filter
- Search any market by keyword
- Quick suggestions: Fed, Trump, Bitcoin, Election, NBA...
- Filter by category: Politics, Crypto, Sports, Science, Business

### 🔔 Price Alert Notifications
- Set price alerts on any market card via the bell icon
- Choose above/below threshold
- Browser push notification when probability crosses your target
- Alerts persist across sessions via localStorage

### 🌐 Individual Market Pages
- Dedicated page per market at `/market/[id]`
- Full probability chart with extended height
- Yes/No/all outcomes with probability bars
- Volume, 24h change, and alert button

## Data Sources
- **Gamma API** `https://gamma-api.polymarket.com` — markets, volume, probabilities
- **CLOB API** `https://clob.polymarket.com` — price history
- No API key required — fully public

## Tech Stack
- Next.js 16 (App Router)
- Tailwind CSS
- Recharts
- Polymarket Public APIs

## Getting Started
```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy
One-click deploy on Vercel. No environment variables needed.

## Built by
[@Havertz3349](https://x.com/Havertz3349) · [GitHub](https://github.com/Isaaco3349)
