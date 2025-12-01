import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/components/templates/MainLayout';
import HomePage from '@/pages/HomePage';
import ExamListPage from '@/pages/ExamListPage';
import TakeExamPage from '@/pages/TakeExamPage';
import ExamResultPage from '@/pages/ExamResultPage';
import HistoryPage from '@/pages/HistoryPage';
import StatisticsPage from '@/pages/StatisticsPage';
import ProfilePage from '@/pages/ProfilePage';
import NotFoundPage from '@/pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'exams',
        element: <ExamListPage />,
      },
      {
        path: 'exams/:examId',
        element: <TakeExamPage />,
      },
      {
        path: 'results/:resultId',
        element: <ExamResultPage />,
      },
      {
        path: 'history',
        element: <HistoryPage />,
      },
      {
        path: 'statistics',
        element: <StatisticsPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

