# Deployment Guide

This document describes how to deploy the static portfolio.

## Recommended Platforms
The portfolio is a fully client-side static React site, and is recommended to be hosted on **Netlify** or **Vercel**.

---

## 1. Deploying to Netlify (Vite Setup)
1. Commit the codebase to a GitHub repository.
2. Link your repository in Netlify site settings.
3. Configure build parameters:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy**.

---

## 2. Deploying to Vercel (CLI)
You can deploy directly from your command line:
```bash
npm install -g vercel
vercel --prod
```
Vercel automatically detects the Vite build commands and configures paths.
