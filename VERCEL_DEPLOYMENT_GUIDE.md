# 🚀 Deploy to Vercel - Complete Guide

## Overview

To deploy your exam platform to Vercel, we need to handle two parts:

1. **Frontend** (React + Vite) - Deploys directly to Vercel
2. **Backend** (JSON Server) - Convert to Vercel API routes

---

## 📋 Prerequisites

```bash
npm install -g vercel
```

---

## 🔧 Setup Steps

### Step 1: Install Dependencies

```bash
npm install json-server cors
```

### Step 2: Create Vercel Configuration

Create `vercel.json` in your project root:

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
    {
      "src": "/api/(.*)",
      "dest": "/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

### Step 3: Create API Directory Structure

```bash
mkdir -p api
```

### Step 4: Create Vercel API Handler

Create `api/index.js`:

```javascript
// api/index.js
const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "../db.json"));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, "../dist"),
});

// Enable CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

server.use(middlewares);

// Add custom routes if needed
server.use(jsonServer.bodyParser);

// Use the router
server.use("/api", router);

module.exports = server;
```

### Step 5: Update Package.json Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "server": "json-server --watch db.json --port 3001",
    "vercel-build": "vite build"
  }
}
```

### Step 6: Update API Base URL

Update your Axios config to use environment variable:

Create `.env.local`:

```
VITE_API_URL=http://localhost:3001
```

Create `.env.production`:

```
VITE_API_URL=https://your-app.vercel.app/api
```

Update `src/services/api.ts`:

```typescript
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ... rest of your API code
```

### Step 7: Create .vercelignore

Create `.vercelignore`:

```
node_modules
.env.local
*.log
.DS_Store
```

### Step 8: Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

---

## 🎯 Alternative: Separate Backend Deployment

If you prefer to keep JSON Server separate, here's a better approach:

### Option A: Deploy JSON Server to Render.com

1. **Create `server.js` in root:**

```javascript
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

server.use(middlewares);
server.use("/api", router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
```

2. **Add to package.json:**

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

3. **Deploy to Render:**

   - Go to https://render.com
   - Create new Web Service
   - Connect your GitHub repo
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variable: `PORT=3001`

4. **Update your frontend:**

```env
VITE_API_URL=https://your-json-server.onrender.com/api
```

### Option B: Deploy JSON Server to Railway.app

1. **Same `server.js` as above**

2. **Deploy to Railway:**

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

3. **Get your Railway URL and update frontend:**

```env
VITE_API_URL=https://your-app.railway.app/api
```

---

## 🔒 Environment Variables in Vercel

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - `VITE_API_URL` = `https://your-backend-url/api`

---

## 📦 Complete Deployment Checklist

### For Frontend (Vercel):

- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Create `vercel.json`
- [ ] Update `.env.production` with API URL
- [ ] Build locally to test: `npm run build`
- [ ] Deploy: `vercel --prod`

### For Backend (Choose one):

#### Option 1: Vercel API Routes

- [ ] Create `api/index.js`
- [ ] Update API routes in `vercel.json`
- [ ] Test locally
- [ ] Deploy with frontend

#### Option 2: Render.com

- [ ] Create `server.js`
- [ ] Push to GitHub
- [ ] Connect to Render
- [ ] Deploy backend
- [ ] Update frontend env vars

#### Option 3: Railway.app

- [ ] Create `server.js`
- [ ] Install Railway CLI
- [ ] Deploy backend
- [ ] Update frontend env vars

---

## 🧪 Testing After Deployment

```bash
# Test API endpoint
curl https://your-app.vercel.app/api/exams

# Test frontend
curl https://your-app.vercel.app
```

---

## 🎨 Recommended Setup (Best Practice)

**For Production:**

1. **Frontend** → Vercel (free, fast, great for React)
2. **Backend** → Render.com or Railway (free tier available)
3. **Database** → Consider upgrading to real database:
   - Supabase (PostgreSQL)
   - MongoDB Atlas
   - PlanetScale (MySQL)

**Why separate backend?**

- Better performance
- Easier to scale
- Can use real database
- More control over API

---

## 🚀 Quick Deploy Script

Create `deploy.sh`:

```bash
#!/bin/bash

echo "🔨 Building frontend..."
npm run build

echo "📦 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Visit: https://your-app.vercel.app"
```

Make it executable:

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🔥 One-Command Deploy

If using Vercel API routes:

```bash
# Deploy everything at once
vercel --prod
```

If using separate backend:

```bash
# Deploy frontend
vercel --prod

# Deploy backend (if using Render)
git push origin main  # Render auto-deploys on push
```

---

## 📊 Cost Comparison

| Service         | Free Tier             | Best For              |
| --------------- | --------------------- | --------------------- |
| **Vercel**      | 100GB bandwidth/month | Frontend + API routes |
| **Render.com**  | 750 hours/month       | JSON Server backend   |
| **Railway.app** | $5 credit/month       | JSON Server backend   |
| **Netlify**     | 100GB bandwidth/month | Alternative to Vercel |

---

## 🎯 Recommended Approach

**For Your Exam Platform:**

1. **Deploy Backend to Render.com** (easiest, free)

   ```bash
   # Create server.js (see above)
   # Push to GitHub
   # Connect to Render
   # Get URL: https://your-api.onrender.com
   ```

2. **Deploy Frontend to Vercel** (fastest, free)

   ```bash
   # Update .env.production
   VITE_API_URL=https://your-api.onrender.com/api

   # Deploy
   vercel --prod
   ```

**Why this setup?**

- ✅ Both have generous free tiers
- ✅ Easy to set up
- ✅ Separate concerns (frontend/backend)
- ✅ Can upgrade database later
- ✅ Good performance

---

## 🛠️ Complete Setup Commands

```bash
# 1. Create server file
cat > server.js << 'EOF'
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: './dist'
});
const port = process.env.PORT || 3001;

server.use(middlewares);
server.use('/api', router);
server.listen(port);
EOF

# 2. Update package.json
npm pkg set scripts.start="node server.js"

# 3. Create production env
cat > .env.production << 'EOF'
VITE_API_URL=https://YOUR_BACKEND_URL/api
EOF

# 4. Deploy
vercel --prod
```

---

## 🎉 After Deployment

Your app will be live at:

- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-api.onrender.com/api`

Test it:

```bash
# Check if API works
curl https://your-api.onrender.com/api/exams

# Check if frontend loads
curl https://your-app.vercel.app
```

---

## 📝 Next Steps

After successful deployment:

1. **Add Custom Domain** (optional)

   - Vercel: Add in project settings
   - Update DNS records

2. **Enable Analytics**

   - Vercel Analytics (free)
   - Google Analytics

3. **Set Up Monitoring**

   - Vercel monitoring
   - Sentry for error tracking

4. **Consider Database Upgrade**
   - Replace JSON Server with real DB
   - Supabase, MongoDB Atlas, or PlanetScale

---

## 🆘 Troubleshooting

### API not working on Vercel?

```bash
# Check API routes in vercel.json
# Make sure CORS is enabled
# Verify environment variables
```

### Build fails?

```bash
# Check Node version
# Verify all dependencies installed
# Test local build: npm run build
```

### 404 errors?

```bash
# Check vercel.json routes
# Verify dist folder exists after build
# Check package.json build script
```

---

## ✅ Deployment Complete!

Your exam platform is now live and accessible worldwide! 🌍🚀

**Remember:** For production, consider upgrading to a real database for better performance and reliability.
