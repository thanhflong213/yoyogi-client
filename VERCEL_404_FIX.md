# 🔧 Fix Vercel 404 Error

## The Problem

Getting `404: NOT_FOUND` error when deploying to Vercel. This happens because:

1. React Router client-side routing needs all routes to serve `index.html`
2. Vercel's default configuration doesn't know about your React routes

---

## ✅ Solution Applied

I've updated your `vercel.json` with the correct configuration.

### New `vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

**What this does:**

- `outputDirectory: "dist"` - Tells Vercel where your built files are
- `rewrites` - Rewrites all routes to index.html (for client-side routing)
- `routes` - First tries to serve static files, then falls back to index.html

---

## 🚀 Redeploy Steps

### Option 1: Deploy from Command Line

```bash
# Make sure changes are committed
git add vercel.json
git commit -m "Fix Vercel routing for React Router"
git push

# Redeploy to Vercel
vercel --prod
```

### Option 2: Deploy from Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Find your project
3. Go to "Deployments" tab
4. Click "Redeploy" on the latest deployment
5. Or push to GitHub (Vercel auto-deploys)

---

## 🔍 Alternative Vercel Configurations

If the above doesn't work, try these alternatives:

### Option A: Simple Rewrites Only

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Option B: With Build Settings

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

### Option C: Explicit Routes

```json
{
  "version": 2,
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## 📋 Deployment Checklist

Before redeploying, verify:

- [ ] `vercel.json` is in project root
- [ ] `vercel.json` is committed to git
- [ ] Build works locally: `npm run build`
- [ ] `dist` folder is created after build
- [ ] `dist/index.html` exists
- [ ] No build errors in terminal

---

## 🧪 Test Locally

Test the build locally before deploying:

```bash
# Build the project
npm run build

# Preview the build
npm run preview

# Open http://localhost:4173
# Navigate to different routes
# Make sure they all work
```

---

## 🔧 Debugging Steps

### 1. Check Vercel Build Logs

1. Go to Vercel Dashboard
2. Click on your project
3. Go to latest deployment
4. Click "View Build Logs"
5. Look for errors

### 2. Check Build Output

Make sure these files exist in your `dist` folder after `npm run build`:

```
dist/
├── index.html          ✅ Must exist
├── assets/
│   ├── index-xxx.js   ✅ Main JS bundle
│   └── index-xxx.css  ✅ Main CSS bundle
└── vite.svg           ✅ Other assets
```

### 3. Verify Environment Variables

In Vercel Dashboard:

1. Go to Settings → Environment Variables
2. Make sure `VITE_API_URL` is set
3. Should be: `https://your-backend.onrender.com/api`

### 4. Check Package.json Scripts

Make sure you have:

```json
{
  "scripts": {
    "build": "tsc -b && vite build",
    "vercel-build": "npm run build"
  }
}
```

---

## 🚨 Common Issues

### Issue 1: Still Getting 404 After Fix

**Solution:** Clear Vercel cache and redeploy

```bash
vercel --prod --force
```

Or in Vercel Dashboard:

- Deployments → ... menu → Redeploy → Clear cache

### Issue 2: Homepage Works, But Routes Don't

**Solution:** This means rewrites aren't working. Try this `vercel.json`:

```json
{
  "rewrites": [{ "source": "/:path*", "destination": "/index.html" }]
}
```

### Issue 3: Assets (CSS/JS) Not Loading

**Solution:** Add explicit asset routing:

```json
{
  "routes": [
    {
      "src": "/assets/(.*)",
      "headers": { "cache-control": "public, max-age=31536000, immutable" },
      "dest": "/assets/$1"
    },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### Issue 4: API Calls Failing

**Solution:** Make sure your API URL is correct:

```typescript
// src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
console.log("API URL:", API_URL); // Check in browser console

export const api = axios.create({
  baseURL: API_URL,
  // ...
});
```

---

## 🎯 Recommended: Deploy Backend First

To avoid issues, deploy your backend BEFORE frontend:

### 1. Deploy Backend to Render

```bash
# Push to GitHub
git push origin main

# Go to Render.com
# Create Web Service from GitHub repo
# Start Command: npm start
# Wait for deployment
# Get URL: https://your-app.onrender.com
```

### 2. Update Frontend Environment

Create `.env.production.local` (gitignored):

```env
VITE_API_URL=https://your-app.onrender.com/api
```

Or set in Vercel Dashboard:

- Settings → Environment Variables
- Add `VITE_API_URL` = `https://your-app.onrender.com/api`

### 3. Deploy Frontend to Vercel

```bash
vercel --prod
```

---

## 📞 Test Deployment

After deployment, test these URLs:

```bash
# Homepage
curl https://your-app.vercel.app

# React Router route (should return HTML, not 404)
curl https://your-app.vercel.app/exams

# Another route
curl https://your-app.vercel.app/history

# All should return the same index.html with 200 status
```

In browser, test:

1. Open homepage
2. Navigate to `/exams` - should work
3. Refresh on `/exams` - should still work (not 404)
4. Navigate to `/history` - should work
5. Refresh on `/history` - should still work

---

## 🔄 Force Redeploy

If nothing works, try a clean deployment:

```bash
# Remove Vercel configuration
rm -rf .vercel

# Redeploy
vercel --prod

# Follow prompts to reconfigure
```

---

## ✅ Final Verification

Your deployment is successful when:

- [ ] Homepage loads (`https://your-app.vercel.app`)
- [ ] Can navigate to routes (`/exams`, `/history`, etc.)
- [ ] Refreshing on any route works (no 404)
- [ ] Assets (CSS, images) load correctly
- [ ] API calls work (check browser console)
- [ ] No errors in browser console

---

## 🎉 Working Configuration

After applying the fix, your `vercel.json` should look like this:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

This ensures all routes serve your React app!

---

## 🚀 Next Steps

Once deployment works:

1. Test all pages and routes
2. Verify API connections
3. Test language switching (EN/JP/VN)
4. Test taking exams
5. Check mobile responsiveness

Your exam platform should now be fully deployed! 🎊
