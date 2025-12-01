# 🚀 Quick Start Guide

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start JSON Server (Terminal 1)
```bash
npm run server
```
This will start the mock backend on `http://localhost:3001`

### 3. Start Dev Server (Terminal 2)
```bash
npm run dev
```
This will start the frontend on `http://localhost:5173`

---

## 🎉 You're Ready!

Open your browser and navigate to:
**http://localhost:5173**

---

## ✨ What's New

### All Exams Now Work! 🎯
Previously broken exams are now fixed:
- 日本史総合テスト (exam-4)
- 物理学基礎 (exam-5)
- 化学総合演習 (exam-6)
- 英文法マスター (exam-7)
- 数学I・A 総合問題 (exam-8)
- 世界史近代史 (exam-9)
- 古文読解演習 (exam-10)
- 生物基礎 (exam-11)
- 地理総合 (exam-12)

### New Features 🆕

#### 1. **Open in New Tab**
- Click any exam card to open it in a new tab
- Take multiple exams simultaneously
- Each exam runs independently

#### 2. **Save & Continue**
- Your progress is automatically saved
- Close the tab anytime
- Continue where you left off when you return
- All your answers and time are preserved

#### 3. **Complete i18n**
- Switch between English, Japanese, Vietnamese
- All text is translated
- Use the language switcher in the header

#### 4. **Modern UI**
- Inspired by top Japanese cram schools
- Professional header with achievements bar
- Comprehensive footer with contact info
- Enhanced exam cards with visual appeal
- Fully responsive for mobile, tablet, desktop

---

## 📱 Test on Different Devices

### Mobile
- Open DevTools (F12)
- Click "Toggle device toolbar"
- Select "iPhone SE" or "Galaxy S8+"

### Tablet  
- Select "iPad" or "iPad Pro"

### Desktop
- Default view

---

## 🎮 Try These Features

1. **Start an Exam**
   - Go to "模試一覧" (Exam List)
   - Click on any exam card
   - Exam opens in new tab

2. **Save & Continue**
   - Answer a few questions
   - Close the tab
   - Reopen the same exam
   - Choose "Continue" when prompted

3. **Switch Languages**
   - Use language switcher (EN/JP/VN) in header
   - Watch all text translate instantly

4. **View Your Progress**
   - Check sidebar for progress card
   - View monthly goals
   - See learning tips

5. **Complete an Exam**
   - Answer all questions
   - Click "Submit Exam"
   - View results with detailed explanations

---

## 📚 Available Pages

- **Home** (`/`) - Hero section with features
- **Exam List** (`/exams`) - Browse all available exams
- **Take Exam** (`/exams/:id`) - Take an exam
- **Results** (`/results/:id`) - View exam results
- **History** (`/history`) - Past exam attempts
- **Statistics** (`/statistics`) - Learning analytics
- **Profile** (`/profile`) - User profile

---

## 🎨 UI Highlights

### Header
- Achievement banner (10,000+ students)
- 24/7 support indicator
- Quick contact button
- Notification bell
- Language switcher

### Footer
- Company info with social media
- Quick navigation links
- Support resources
- Contact information

### Exam Cards
- Large preview images
- Popular badges
- Participant counts
- Passing line indicators
- Gradient CTA buttons

### Sidebar
- Progress tracking
- Monthly goals
- Learning tips
- Quick support links

---

## 🐛 Troubleshooting

### Port Already in Use?
If port 3001 or 5173 is already in use:

**Kill processes on Windows:**
```bash
# Find process on port 3001
netstat -ano | findstr :3001
# Kill it
taskkill /PID <process_id> /F

# Find process on port 5173
netstat -ano | findstr :5173
taskkill /PID <process_id> /F
```

**Kill processes on Mac/Linux:**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### JSON Server Not Starting?
Make sure you're in the project root directory:
```bash
cd path/to/yoyogi-client
npm run server
```

### Vite Not Starting?
Clear cache and reinstall:
```bash
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

---

## 📖 More Documentation

- **UPDATES_SUMMARY.md** - Detailed changelog
- **README.md** - Full project overview
- **GETTING_STARTED.md** - Comprehensive guide
- **PROJECT_SUMMARY.md** - Technical architecture

---

## 💡 Tips

1. **Use the Right Browser**: Chrome or Edge recommended
2. **Enable Pop-ups**: Allow pop-ups for opening exams in new tabs
3. **Keep JSON Server Running**: Don't close the terminal with JSON Server
4. **Clear Browser Cache**: If you see stale data, clear cache (Ctrl+Shift+Delete)

---

## 🎓 Happy Studying!

You're all set! Start taking exams and improve your knowledge.

**頑張ってください！** (Good luck!)

---

## Need Help?

Check these files:
- `UPDATES_SUMMARY.md` for what's new
- `README.md` for project overview
- Open an issue if you find bugs

**Enjoy your learning journey! 🚀**

