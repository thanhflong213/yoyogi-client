# Quick Reference Guide

Fast lookup for common tasks and commands.

## 🚀 Quick Start

```bash
# Install
npm install

# Run (need 2 terminals)
npm run dev      # Terminal 1: Frontend
npm run server   # Terminal 2: Backend

# Access
http://localhost:5173   # Frontend
http://localhost:3001   # API
```

## 📁 Key Files & Locations

```
src/
├── pages/              → Add new pages here
├── components/
│   ├── atoms/         → Basic UI elements
│   ├── molecules/     → Composite components
│   ├── organisms/     → Complex features
│   └── ui/            → shadcn/ui components
├── stores/            → Zustand state (auth, exam, ui)
├── services/          → API calls
├── hooks/             → Custom hooks
├── i18n/locales/      → Translations
└── types/             → TypeScript types

db.json                → Mock database
```

## 🎨 Common Components

### Import Paths
```typescript
// UI Components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Custom Components
import { Logo } from '@/components/atoms'
import { ExamCard } from '@/components/molecules'

// Hooks
import { useExams } from '@/hooks/useExams'
import { useExamStore } from '@/stores'

// Services
import { examService } from '@/services'

// Types
import { Exam, Question } from '@/types'
```

## 🔧 Common Tasks

### Add New Page

1. Create file: `src/pages/YourPage.tsx`
```typescript
const YourPage = () => {
  return <div>Your Page</div>
}
export default YourPage
```

2. Add route: `src/router/index.tsx`
```typescript
{
  path: 'your-path',
  element: <YourPage />,
}
```

3. Add nav: `src/components/organisms/Sidebar.tsx`
```typescript
{ path: '/your-path', icon: Icon, label: 'nav.yourPage' }
```

4. Add translation: `src/i18n/locales/en.json`
```json
"nav": {
  "yourPage": "Your Page"
}
```

### Add New Question Type

1. Define type: `src/types/exam.ts`
```typescript
export interface YourQuestion extends BaseQuestion {
  type: 'your-type';
  // your fields
}
```

2. Create component: `src/components/organisms/questions/YourQuestion.tsx`
```typescript
export const YourQuestion = ({ question, value, onChange }) => {
  return <div>Your question UI</div>
}
```

3. Update renderer: `src/components/organisms/questions/QuestionRenderer.tsx`
```typescript
case 'your-type':
  return <YourQuestion {...props} />
```

4. Add to db.json

### Add Translation

1. Edit `src/i18n/locales/en.json`
2. Edit `src/i18n/locales/jp.json`
3. Edit `src/i18n/locales/vn.json`

Use in component:
```typescript
const { t } = useTranslation()
<div>{t('your.key')}</div>
```

### Add Exam to Database

Edit `db.json`:
```json
{
  "exams": [
    {
      "id": "exam-new",
      "title": "Your Exam",
      "category": "mathematics",
      "duration": 60,
      "totalPoints": 100,
      "passingScore": 70,
      "questionIds": ["q1", "q2"],
      "difficulty": "medium",
      "tags": ["tag1"]
    }
  ],
  "questions": [
    {
      "id": "q1",
      "type": "single-choice",
      "question": "Your question?",
      "options": ["A", "B", "C"],
      "correctAnswer": 0,
      "category": "mathematics",
      "difficulty": "easy",
      "points": 10,
      "explanation": "Because...",
      "examId": "exam-new"
    }
  ]
}
```

## 🎯 State Management

### Use Stores

```typescript
// Auth Store
const { user, login, logout } = useAuthStore()

// Exam Store
const { currentExam, questions, userAnswers, saveAnswer } = useExamStore()

// UI Store
const { language, theme, setLanguage } = useUiStore()
```

### Create New Store

`src/stores/yourStore.ts`:
```typescript
import { create } from 'zustand'

interface YourState {
  data: any
  setData: (data: any) => void
}

export const useYourStore = create<YourState>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}))
```

## 🔌 API Calls

### Using React Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query'
import { examService } from '@/services'

// Fetch data
const { data, isLoading, error } = useQuery({
  queryKey: ['exams'],
  queryFn: examService.getExams,
})

// Mutate data
const mutation = useMutation({
  mutationFn: examService.submitResult,
  onSuccess: () => {
    // Handle success
  },
})
```

### Add New Service

`src/services/yourService.ts`:
```typescript
import { api } from './api'

export const yourService = {
  getData: async () => {
    const response = await api.get('/your-endpoint')
    return response.data
  },
  
  postData: async (data: any) => {
    const response = await api.post('/your-endpoint', data)
    return response.data
  },
}
```

## 🎨 Styling

### Tailwind Classes
```typescript
<div className="flex items-center gap-4 p-6 rounded-lg bg-primary text-white">
```

### shadcn/ui Components
```typescript
import { Button } from '@/components/ui/button'

<Button variant="outline" size="lg">Click</Button>
```

### Custom Styles
```css
/* src/index.css */
.your-class {
  @apply flex items-center gap-4;
}
```

## 🐛 Debugging

### Check Console
```typescript
console.log('Debug:', { data, state })
```

### React Query DevTools
```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

<ReactQueryDevtools />
```

### Check Network
- Open DevTools → Network tab
- Filter: XHR
- Check requests to `localhost:3001`

### Check State
```typescript
// In component
useEffect(() => {
  console.log('State changed:', state)
}, [state])
```

## 📦 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
# Output: dist/
```

### Preview Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

## 🔑 Environment Variables

Create `.env.local`:
```env
VITE_API_BASE_URL=http://localhost:3001
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

## 📊 Common Patterns

### Loading State
```typescript
if (isLoading) {
  return <div>Loading...</div>
}
```

### Error Handling
```typescript
if (error) {
  return <div>Error: {error.message}</div>
}
```

### Conditional Rendering
```typescript
{data ? <Component data={data} /> : <EmptyState />}
```

### List Rendering
```typescript
{items.map((item) => (
  <Card key={item.id}>{item.title}</Card>
))}
```

## 🎯 TypeScript Tips

### Type Component Props
```typescript
interface Props {
  title: string
  count?: number
  onClick: () => void
}

const Component = ({ title, count = 0, onClick }: Props) => {
  // ...
}
```

### Type Hooks
```typescript
const [state, setState] = useState<string>('')
const data = useQuery<Exam[]>({ ... })
```

### Import Types
```typescript
import type { Exam, Question } from '@/types'
```

## 🔍 Common Issues

### Port in use
```bash
# Kill process
npx kill-port 5173
npx kill-port 3001

# Or use different port
npm run dev -- --port 3000
```

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Type errors
```bash
npx tsc --noEmit
```

### Build errors
```bash
rm -rf dist node_modules/.vite
npm run build
```

## 📚 Documentation Files

- `README.md` - Project overview
- `INSTALLATION.md` - Setup guide
- `GETTING_STARTED.md` - Usage guide
- `PROJECT_SUMMARY.md` - Complete summary
- `QUICK_REFERENCE.md` - This file

## 🎓 Key Concepts

**Atomic Design:**
Atoms → Molecules → Organisms → Templates → Pages

**State Flow:**
UI → Hook → Service → API → Response → State → UI

**Routing:**
URL → Router → Layout → Page → Components

**Data Fetching:**
Component → Hook → React Query → Service → API

**i18n:**
Component → useTranslation → t('key') → Translation

---

**Quick Tip:** Keep this file open while developing! 🚀

