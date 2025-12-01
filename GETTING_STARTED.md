# Getting Started Guide

This guide will help you get the Yoyogi Exam Platform up and running quickly.

## Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:

- React 19 + TypeScript
- TailwindCSS 4
- Zustand, React Query, React Router v7
- shadcn/ui components
- JSON Server for mock backend

### Step 2: Start the Development Servers

Open two terminal windows:

**Terminal 1 - Frontend (Vite)**

```bash
npm run dev
```

**Terminal 2 - Backend (JSON Server)**

```bash
npm run server
```

### Step 3: Open Your Browser

Navigate to:

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001

That's it! You should now see the Yoyogi Exam Platform running.

## First-Time Walkthrough

### 1. Explore the Home Page

- View featured exams
- See quick statistics
- Navigate using the sidebar

### 2. Browse Exams

- Click "Exams" in the sidebar
- Filter by category
- Search for specific exams

### 3. Take an Exam

- Click "Start Exam" on any exam card
- Answer questions
- Use the question navigator at the bottom
- Watch the timer countdown
- Submit when ready

### 4. View Results

- See your score and performance
- Review correct/incorrect answers
- Analyze category breakdown
- View detailed explanations

### 5. Check History & Statistics

- View all past exam attempts
- Track progress over time
- Identify strengths and weaknesses

## Project Structure Overview

```
src/
├── components/
│   ├── atoms/          # Basic UI elements
│   ├── molecules/      # Composite components
│   ├── organisms/      # Complex features
│   ├── templates/      # Page layouts
│   └── ui/             # shadcn/ui components
├── pages/              # Main pages
├── stores/             # Zustand state management
├── services/           # API services
├── hooks/              # Custom hooks
├── i18n/               # Translations
└── types/              # TypeScript types
```

## Customization Guide

### Adding a New Language

1. Create translation file: `src/i18n/locales/[lang].json`
2. Add to `src/i18n/index.ts`:

```typescript
import newLang from "./locales/newLang.json";

i18n.use(initReactI18next).init({
  resources: {
    // ... existing
    newLang: { translation: newLang },
  },
});
```

3. Update `LanguageSwitcher.tsx` with new language option

### Adding a New Question Type

1. Create type in `src/types/exam.ts`
2. Create component in `src/components/organisms/questions/`
3. Add to `QuestionRenderer.tsx` switch statement
4. Add sample question to `db.json`

### Creating New Pages

1. Create page component in `src/pages/`
2. Add route in `src/router/index.tsx`
3. Add navigation link in `src/components/organisms/Sidebar.tsx`
4. Add translations in all language files

### Styling Customization

Edit `src/index.css` for global styles or use TailwindCSS utility classes directly in components.

## Mock Data

The `db.json` file contains sample data:

- **Users**: 1 test user
- **Exams**: 3 sample exams (Math, English, Science)
- **Questions**: 17 questions covering all types
- **Results**: 1 sample result

### Adding More Exams

Edit `db.json`:

```json
{
  "exams": [
    {
      "id": "exam-new",
      "title": "Your Exam Title",
      "description": "Description",
      "category": "mathematics",
      "duration": 45,
      "totalPoints": 100,
      "passingScore": 70,
      "questionIds": ["q1", "q2"],
      "difficulty": "medium",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

## Troubleshooting

### Port Already in Use

If port 5173 or 3001 is in use:

**Frontend:**

```bash
npm run dev -- --port 3000
```

**Backend:**

```bash
npx json-server --watch db.json --port 3002
```

Then update `VITE_API_BASE_URL` in `.env`

### Dependencies Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Check TypeScript
npx tsc --noEmit

# Check linting
npm run lint
```

## Development Tips

### Hot Reload

Both Vite and JSON Server support hot reload. Changes are reflected immediately.

### React Query DevTools

Add React Query DevTools for debugging:

```typescript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// In App.tsx
<ReactQueryDevtools initialIsOpen={false} />;
```

### State Debugging

Zustand stores can be debugged using Redux DevTools extension.

### API Testing

Use tools like Postman or curl to test JSON Server endpoints:

```bash
curl http://localhost:3001/exams
curl http://localhost:3001/questions?examId=exam-1
```

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist/` directory.

## Next Steps

1. **Customize the design** to match your brand
2. **Add more exams and questions** to `db.json`
3. **Implement authentication** (replace mock user)
4. **Connect to real backend** (replace JSON Server)
5. **Deploy** to your hosting platform

## Resources

- [React Documentation](https://react.dev)
- [TailwindCSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://tanstack.com/query)
- [React Router](https://reactrouter.com)

## Support

For issues or questions:

1. Check the README.md
2. Review the code comments
3. Check browser console for errors
4. Verify both servers are running

Happy coding! 🚀
