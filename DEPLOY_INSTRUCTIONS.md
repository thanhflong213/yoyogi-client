# 🚀 Quick Deployment Instructions

## Choose Your Deployment Strategy

### ✅ RECOMMENDED: Separate Frontend + Backend

**Best for production, easiest to manage**

---

## 🎯 Step-by-Step Deployment

### Part 1: Deploy Backend (JSON Server) to Render.com

#### 1. Prepare Your Backend

Your `server.js` is already created! ✅

#### 2. Push to GitHub (if not already)

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### 3. Deploy to Render.com

1. Go to https://render.com
2. Sign up / Log in (free account)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name:** `yoyogi-api` (or any name)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
6. Click "Create Web Service"
7. Wait 2-3 minutes for deployment
8. Copy your URL: `https://yoyogi-api.onrender.com`

---

### Part 2: Deploy Frontend to Vercel

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Update API URL

Create a file named `.env.production` (already gitignored):

```env
VITE_API_URL=https://yoyogi-api.onrender.com/api
```

Replace `yoyogi-api.onrender.com` with YOUR Render backend URL.

#### 4. Deploy to Vercel

```bash
# First deployment (will ask questions)
vercel

# Production deployment
vercel --prod
```

#### 5. Set Environment Variable in Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://yoyogi-api.onrender.com/api` (your Render URL)
   - **Environment:** Production
5. Click Save
6. Redeploy: `vercel --prod`

---

## 🧪 Test Your Deployment

### Test Backend

```bash
# Should return your exams
curl https://yoyogi-api.onrender.com/api/exams
```

### Test Frontend

Open your Vercel URL in browser:
```
https://your-app.vercel.app
```

---

## ⚡ Quick Commands Cheatsheet

```bash
# Deploy backend (after git push to GitHub)
# → Render auto-deploys

# Deploy frontend
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

---

## 🔧 Update Your API Service File

You need to update `src/services/api.ts` to use environment variable:

```typescript
import axios from 'axios';

// Use environment variable, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Rest of your API code...
```

---

## 📊 Deployment Checklist

### Backend (Render.com):
- [x] `server.js` created ✅
- [ ] Pushed to GitHub
- [ ] Created Render web service
- [ ] Deployed successfully
- [ ] Tested API endpoint
- [ ] Copied backend URL

### Frontend (Vercel):
- [x] `vercel.json` created ✅
- [x] `.vercelignore` created ✅
- [ ] Updated `src/services/api.ts`
- [ ] Created `.env.production` with backend URL
- [ ] Installed Vercel CLI
- [ ] Logged in to Vercel
- [ ] Deployed with `vercel --prod`
- [ ] Set env var in Vercel dashboard
- [ ] Tested frontend URL

---

## 🎯 Expected URLs

After deployment, you'll have:

- **Backend API:** `https://yoyogi-api.onrender.com/api`
- **Frontend:** `https://your-app.vercel.app`

---

## 🔥 One-Line Deploy (After Initial Setup)

```bash
# Update and deploy frontend
git add . && git commit -m "Update" && git push && vercel --prod

# Backend auto-deploys via Render when you push to GitHub
```

---

## 💡 Pro Tips

### 1. Free Tier Limitations

**Render.com Free Tier:**
- Spins down after 15 minutes of inactivity
- Takes ~30 seconds to wake up on first request
- 750 hours/month free

**Solution:** Use a service like UptimeRobot to ping your API every 14 minutes.

### 2. Custom Domain

**Add to Vercel:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as shown

**Add to Render:**
1. Go to Service Settings → Custom Domain
2. Add your domain
3. Update DNS records

### 3. Automatic Deployments

**Render:** Automatically deploys when you push to GitHub main branch

**Vercel:** 
```bash
# Install Vercel GitHub integration
# Every push to main will auto-deploy
```

---

## 🆘 Troubleshooting

### Backend not responding?

```bash
# Check Render logs
# Go to Render dashboard → Your service → Logs
```

### Frontend can't connect to backend?

1. Check CORS is enabled in `server.js` ✅
2. Verify `VITE_API_URL` env var in Vercel
3. Check browser console for errors
4. Ensure backend URL ends with `/api`

### Build fails on Vercel?

```bash
# Test build locally first
npm run build

# Check Node version matches
node --version  # Should be 18.x or higher
```

---

## 🎉 You're Done!

Your exam platform is now live at:
- **Frontend:** https://your-app.vercel.app
- **API:** https://yoyogi-api.onrender.com/api

Share your app with the world! 🌍🚀

---

## 📱 Next Steps

1. **Add Custom Domain** (optional)
2. **Set up monitoring** (Vercel Analytics)
3. **Add error tracking** (Sentry)
4. **Upgrade to real database** (Supabase/MongoDB)
5. **Add authentication** (Clerk/Auth0)

---

## 💰 Cost

- Render Free Tier: $0/month
- Vercel Hobby: $0/month
- **Total: FREE! 🎉**

Perfect for getting started and can handle thousands of users!

