# Deployment Guide — Md Ikram Portfolio

---

## Before Deploying

Update these in `src/data/site.ts`:

- **email** → your real email
- **whatsapp** → your real number
- **bookingLink** → your Cal.com/Calendly URL

---

## Option 1: Vercel (Recommended — Easiest)

1. Push your code to GitHub:

```bash
cd "F:\New Website\ikram-portfolio"
git init
git add .
git commit -m "Initial commit: Md Ikram portfolio website"
```

2. Create a repo on GitHub and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ikram-portfolio.git
git push -u origin main
```

3. Go to [vercel.com](https://vercel.com) → Sign in with GitHub → **Import Project** → Select your repo → **Deploy**

Vercel auto-detects Next.js and deploys in ~2 minutes. Free tier includes custom domain support.

---

## Option 2: Netlify

1. Push to GitHub (same steps as above)

2. Go to [netlify.com](https://netlify.com) → **Add new site** → Import from GitHub

3. Build command: `npm run build`

4. Publish directory: `.next` (Netlify auto-detects Next.js)

---

## Option 3: Manual Vercel CLI (No GitHub needed)

```bash
cd "F:\New Website\ikram-portfolio"
npm i -g vercel
vercel
```

Follow the prompts — it deploys directly from your folder.
