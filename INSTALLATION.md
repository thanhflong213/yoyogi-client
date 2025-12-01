# Installation Instructions

Complete setup guide for the Yoyogi Exam Platform.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - comes with Node.js
- **Git** (optional) - for version control

### Verify Installation

```bash
node --version  # Should be v18+
npm --version   # Should be v9+
```

## Installation Steps

### 1. Navigate to Project Directory

```bash
cd yoyogi-client
```

### 2. Install Dependencies

This project already has `package.json` configured. Simply run:

```bash
npm install
```

This will install all dependencies including:

**Core Dependencies:**
- react@19.2.0
- react-dom@19.2.0
- typescript@5.9.3
- vite@7.2.4

**UI & Styling:**
- tailwindcss@4.1.17
- @tailwindcss/vite@4.1.17
- All @radix-ui components (shadcn/ui)
- lucide-react@0.554.0 (icons)

**State & Data Management:**
- zustand@5.0.4
- @tanstack/react-query@5.64.2
- axios@1.7.9

**Routing:**
- react-router@7.1.0
- react-router-dom@7.1.0

**Forms & Validation:**
- react-hook-form@7.67.0
- zod@4.1.13
- @hookform/resolvers@5.2.2

**Internationalization:**
- react-i18next@15.2.0
- i18next@24.4.0

**Charts:**
- recharts@2.15.4

**Development:**
- json-server@1.0.0-beta.3
- @types/node@24.10.1
- eslint and related plugins

### 3. Verify Installation

After installation completes, verify by checking:

```bash
ls node_modules
# Should show hundreds of installed packages

npm list --depth=0
# Shows top-level dependencies
```

## Configuration

### Environment Variables (Optional)

The project works with default settings, but you can customize:

Create `.env.local` file in the root:

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_NAME=Yoyogi Exam Platform
VITE_APP_VERSION=1.0.0
```

## Running the Application

### Development Mode

You need TWO terminal windows running simultaneously:

**Terminal 1: Frontend Development Server**
```bash
npm run dev
```
- Starts Vite dev server
- Available at: http://localhost:5173
- Hot Module Replacement (HMR) enabled
- Instant updates on file changes

**Terminal 2: Mock Backend Server**
```bash
npm run server
```
- Starts JSON Server
- Available at: http://localhost:3001
- Serves mock API endpoints
- Auto-watches `db.json` for changes

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the Yoyogi Exam Platform home page!

## Verification Checklist

After starting both servers, verify everything works:

- [ ] Frontend loads at http://localhost:5173
- [ ] No console errors in browser DevTools
- [ ] Sidebar navigation works
- [ ] Language switcher works (EN, JP, VN)
- [ ] Can browse exams page
- [ ] API responds at http://localhost:3001/exams
- [ ] Can start and complete an exam
- [ ] Results page displays correctly
- [ ] History and Statistics pages load

## Common Issues & Solutions

### Issue: Port 5173 already in use

**Solution:**
```bash
# Use different port
npm run dev -- --port 3000
```

### Issue: Port 3001 already in use

**Solution:**
```bash
# Use different port for JSON Server
npx json-server --watch db.json --port 3002
```

Then update API URL in your code or .env:
```env
VITE_API_BASE_URL=http://localhost:3002
```

### Issue: Module not found errors

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors

**Solution:**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Fix auto-fixable issues
npm run lint -- --fix
```

### Issue: Vite cache issues

**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Issue: JSON Server not serving data

**Solution:**
```bash
# Verify db.json exists and is valid JSON
cat db.json | json_pp

# Restart JSON Server
npm run server
```

## Building for Production

### Create Production Build

```bash
npm run build
```

This will:
1. Run TypeScript compiler
2. Build optimized production bundle
3. Output to `dist/` directory

### Preview Production Build

```bash
npm run preview
```

Access at: http://localhost:4173

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── index.html
```

## Deployment

### Static Hosting (Vercel, Netlify, etc.)

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder

3. Configure environment variables on hosting platform

### Environment Variables for Production

```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_NAME=Yoyogi Exam Platform
```

## IDE Setup (Recommended)

### VS Code Extensions

Install these extensions for better DX:

- **ESLint** - Linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - TailwindCSS autocomplete
- **TypeScript Vue Plugin (Volar)** - TypeScript support
- **Error Lens** - Inline errors

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Next Steps

After successful installation:

1. ✅ Read `GETTING_STARTED.md` for usage guide
2. ✅ Read `README.md` for project overview
3. ✅ Explore the codebase structure
4. ✅ Start customizing for your needs

## System Requirements

### Minimum Requirements
- RAM: 4GB
- Disk Space: 500MB
- CPU: Dual-core processor

### Recommended
- RAM: 8GB+
- Disk Space: 1GB+
- CPU: Quad-core processor
- SSD for faster builds

## Browser Support

The application supports:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Development Tools

### Useful Commands

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Start JSON Server
npm run server

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## Getting Help

If you encounter issues:

1. Check this installation guide
2. Review `GETTING_STARTED.md`
3. Check browser console for errors
4. Verify both servers are running
5. Check `package.json` for correct versions

## Success! 🎉

If everything is working:
- ✅ Both servers running
- ✅ Application loads in browser
- ✅ No console errors
- ✅ Can navigate between pages

You're ready to start developing!

---

**Installation Complete** - You can now start building your exam platform! 🚀

