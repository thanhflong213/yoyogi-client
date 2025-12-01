# Yoyogi Online Exam Platform

A modern, full-featured online examination and practice test platform built with React, TypeScript, and cutting-edge technologies.

## 🚀 Tech Stack

- **Frontend Framework**: Vite + React 19 + TypeScript
- **UI Framework**: TailwindCSS 4 + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Routing**: React Router v7
- **Forms**: React Hook Form + Zod
- **i18n**: react-i18next (EN, JP, VN)
- **Charts**: Recharts
- **Mock Backend**: JSON Server
- **Architecture**: Atomic Design Pattern

## 📁 Project Structure

```
src/
├── assets/              # Static assets (images, fonts, etc.)
├── components/          # React components (Atomic Design)
│   ├── atoms/          # Basic building blocks (Logo, Timer, Badge, etc.)
│   ├── molecules/      # Combinations of atoms (ExamCard, StatCard, etc.)
│   ├── organisms/      # Complex components (Header, Sidebar, Questions)
│   ├── templates/      # Page layouts (MainLayout)
│   └── ui/             # shadcn/ui components
├── features/           # Feature modules (future expansion)
│   ├── wrong-answers/  # Wrong answer tracking
│   ├── leaderboard/    # User rankings
│   ├── comparison/     # Score comparisons
│   ├── recommendations/ # School recommendations
│   └── feedback/       # Teacher feedback
├── hooks/              # Custom React hooks
├── i18n/               # Internationalization
│   └── locales/        # Translation files (EN, JP, VN)
├── libs/               # Library configurations
├── pages/              # Page components
├── router/             # Routing configuration
├── services/           # API services
├── stores/             # Zustand stores
├── types/              # TypeScript types
├── utils/              # Utility functions
└── main.tsx           # Application entry point
```

## ✨ Features

### Core Features (Implemented)

#### 1. Comprehensive Exam System
- **Multiple Question Types**:
  - Single Choice (Radio)
  - Multiple Choice (Checkbox)
  - True/False
  - Fill-in-the-Blank
  - Matching (Planned)
  - Ordering (Planned)
  - Reading Comprehension
  - Image-based Questions
  - Audio-based Questions

#### 2. Exam Taking Experience
- Real-time countdown timer
- Question navigation
- Answer tracking
- Progress indicator
- Auto-save functionality
- Submit confirmation

#### 3. Results & Analytics
- Detailed score breakdown
- Category-based performance analysis
- Visual charts and graphs
- Question-by-question review
- Time spent tracking
- Pass/Fail status

#### 4. History & Progress Tracking
- Exam history with results
- Performance trends over time
- Best score tracking
- Attempt count

#### 5. Statistics Dashboard
- Overall performance metrics
- Category accuracy breakdown
- Strengths and weaknesses analysis
- Progress over time charts
- Study time tracking

### Future Expandable Features (Structure Prepared)

- Wrong Answer Trends Analysis
- User Leaderboard & Rankings
- National Score Comparison
- School Recommendation System
- Teacher Feedback & Comments

## 🎨 Design Philosophy

The UI is inspired by [Yoyogi Seminar](https://www.yozemi.ac.jp/) but modernized with:
- Clean, minimalistic design
- Modern color schemes
- Responsive layouts
- Smooth animations
- Intuitive navigation

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Additional Required Packages

The following packages are already configured in `package.json`:

- `react-router-dom@^7.1.0`
- `react-router@^7.1.0`
- `zustand@^5.0.4`
- `@tanstack/react-query@^5.64.2`
- `axios@^1.7.9`
- `react-i18next@^15.2.0`
- `i18next@^24.4.0`
- `json-server@^1.0.0-beta.3`

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_NAME=Yoyogi Exam Platform
VITE_APP_VERSION=1.0.0
```

### 4. Start Development Server

```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start JSON Server
npm run server
```

The application will be available at:
- Frontend: `http://localhost:5173`
- API: `http://localhost:3001`

## 📊 Mock Database

The project uses JSON Server for mock backend. Sample data includes:
- 3 sample exams (Mathematics, English, Science)
- 17 sample questions covering all question types
- 1 sample user
- 1 sample exam result

### Available Endpoints

- `GET /exams` - Get all exams
- `GET /exams/:id` - Get exam by ID
- `GET /questions?examId=:examId` - Get questions for an exam
- `GET /results?userId=:userId` - Get user results
- `POST /results` - Submit exam result
- `GET /users/:id` - Get user by ID

## 🌍 Internationalization

The app supports three languages:
- **English (EN)** - Default
- **Japanese (JP)** - 日本語
- **Vietnamese (VN)** - Tiếng Việt

All UI text is internationalized. Switch languages using the language selector in the header.

## 🎯 Key Components

### Atomic Design Components

#### Atoms
- `Logo` - Application logo
- `Timer` - Countdown timer
- `DifficultyBadge` - Exam difficulty indicator
- `ScoreDisplay` - Score visualization
- `CategoryTag` - Category labels
- `LanguageSwitcher` - Language selector

#### Molecules
- `ExamCard` - Exam preview card
- `QuestionNavigation` - Question navigator
- `ResultHistoryCard` - Result history item
- `StatCard` - Statistics card

#### Organisms
- `Header` - Application header
- `Sidebar` - Navigation sidebar
- `QuestionRenderer` - Dynamic question renderer
- Question type components (Single/Multiple Choice, True/False, etc.)

### Pages
- `HomePage` - Landing page with featured exams
- `ExamListPage` - Browse all exams
- `TakeExamPage` - Exam taking interface
- `ExamResultPage` - Results with analytics
- `HistoryPage` - Exam history
- `StatisticsPage` - Performance statistics

## 🔧 State Management

### Zustand Stores

#### `authStore`
- User authentication
- User profile management
- Preferences

#### `examStore`
- Current exam state
- Questions
- User answers
- Timer management
- Navigation

#### `uiStore`
- Theme (light/dark)
- Language preference
- Sidebar state

## 🎨 Styling

- **TailwindCSS 4**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible components
- **Responsive Design**: Mobile-first approach
- **Dark Mode Ready**: Theme system prepared

## 📈 Data Flow

1. **Exam Selection**: User browses and selects an exam
2. **Exam Loading**: Fetch exam and questions from API
3. **Exam Taking**: 
   - Timer starts
   - User answers questions
   - Answers saved in Zustand store
   - Real-time progress tracking
4. **Submission**: 
   - Calculate score
   - Submit to API
   - Navigate to results
5. **Results**: 
   - Display score and analytics
   - Show question-by-question breakdown
   - Category performance analysis

## 🚦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run server       # Start JSON Server
```

## 🔐 Authentication

Currently uses a mock user (`user-1`). Future implementation will include:
- User registration
- Login/Logout
- JWT authentication
- Profile management

## 📱 Responsive Design

The application is fully responsive and tested on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🧪 Future Enhancements

### Priority Features
1. User authentication system
2. Real backend integration
3. Advanced question types (Matching, Ordering)
4. Timer alerts and notifications
5. Bookmark questions for review
6. Notes and annotations
7. Practice mode vs Exam mode
8. Customizable exam creation

### Advanced Features
1. AI-powered question generation
2. Adaptive learning paths
3. Peer-to-peer study groups
4. Video explanations
5. Mobile app (React Native)
6. Offline mode
7. Print exam results
8. Social sharing

## 🤝 Contributing

This is a production-ready boilerplate. To extend:

1. Add new question types in `src/components/organisms/questions/`
2. Create new pages in `src/pages/`
3. Add new API endpoints in `src/services/`
4. Expand Zustand stores in `src/stores/`
5. Add translations in `src/i18n/locales/`

## 📄 License

MIT License - feel free to use this for your projects!

## 🙏 Acknowledgments

- Design inspiration: [Yoyogi Seminar](https://www.yozemi.ac.jp/)
- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- Icons: [Lucide](https://lucide.dev/)

---

**Built with ❤️ for modern online education**
