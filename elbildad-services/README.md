# Elbildad Services LTD — Procurement Master App

A full-stack procurement and global sourcing web application built with Next.js 14.

## Features

- **Public Landing Page** — Services, stats, visa highlight, CTA
- **Client Portal** — Login, dashboard, order tracking, receipt downloads, new requests
- **Admin Dashboard** — Client management, order creation, revenue overview
- **AI Sourcing Assistant** — Powered by Claude (English + Hausa)
- **Auto-Generated Receipts** — Downloadable HTML / printable PDF

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **AI**: Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Hosting**: Vercel
- **Styling**: Custom CSS (no external CSS library needed)

---

## Quick Start

### 1. Clone or upload to GitHub

```bash
git clone https://github.com/YOUR_USERNAME/elbildad-services.git
cd elbildad-services
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get your API key at: https://console.anthropic.com

### 4. Run locally

```bash
npm run dev
```

Open http://localhost:3000

---

## Deploy to Vercel

### Option A — Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. In **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your key from console.anthropic.com
4. Click **Deploy**

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel
```

### After Deployment — Add Your Domain

1. In Vercel → Project Settings → Domains
2. Add `elbildadservices.com` and `www.elbildadservices.com`
3. Update DNS in Wix to point to Vercel

---

## Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@elbildadservices.com | admin2024 |
| Client | sani@example.com | client123 |
| Client | fatima@example.com | client123 |

---

## Project Structure

```
elbildad-services/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js        ← Claude AI API endpoint
│   ├── layout.js               ← Root layout + SEO metadata
│   └── page.js                 ← Entry point
├── components/
│   └── ElbildadApp.jsx         ← Full app (all pages + logic)
├── .env.local.example          ← Environment variable template
├── next.config.js
├── package.json
└── README.md
```

---

## Next Steps (Production Upgrades)

To take this to full production, consider:

1. **Database**: Connect Supabase for real client/order storage
2. **Auth**: Replace mock auth with Supabase Auth or NextAuth
3. **Payments**: Integrate Paystack for invoice payments
4. **Email**: Add Resend for order notifications
5. **File Storage**: Supabase Storage for shipping documents
6. **Real-time**: Supabase Realtime for live order status updates

---

## Support

Built for Elbildad Services LTD — Kano, Nigeria
