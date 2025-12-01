import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, FileText, History, BarChart3, User, Award, BookMarked } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

const navigationItems = [
  { path: '/', icon: Home, label: 'nav.home', color: 'text-blue-600' },
  { path: '/exams', icon: FileText, label: 'nav.exams', color: 'text-green-600' },
  { path: '/history', icon: History, label: 'nav.history', color: 'text-purple-600' },
  { path: '/statistics', icon: BarChart3, label: 'nav.statistics', color: 'text-orange-600' },
  { path: '/profile', icon: User, label: 'nav.profile', color: 'text-pink-600' },
];

export const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <aside className="w-72 border-r bg-gray-50/50 min-h-[calc(100vh-5rem)] p-4 space-y-6">
      {/* Main Navigation */}
      <nav className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
          {t('sidebar.menuTitle')}
        </p>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-white shadow-sm text-blue-600 border border-blue-100'
                    : 'text-gray-700 hover:bg-white hover:shadow-sm hover:text-gray-900'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn('h-5 w-5', isActive && 'text-blue-600')} />
                  {t(item.label)}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Progress Card */}
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Award className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">{t('sidebar.monthlyGoal')}</p>
            <p className="text-xs text-gray-600">{t('sidebar.examsGoal')}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">{t('sidebar.progress')}</span>
            <span className="font-semibold text-blue-600">3/5</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }} />
          </div>
        </div>
      </Card>

      {/* Quick Tips */}
      <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <BookMarked className="h-4 w-4 text-green-600" />
          <p className="font-semibold text-sm text-gray-900">{t('sidebar.learningTips')}</p>
        </div>
        <p className="text-xs text-gray-700 leading-relaxed">
          {t('sidebar.tipMessage')}
        </p>
      </Card>

      {/* Support */}
      <div className="pt-4 border-t">
        <p className="text-xs text-gray-500 mb-2">{t('sidebar.support')}</p>
        <div className="space-y-2 text-xs">
          <a href="#" className="text-blue-600 hover:underline block">
            {t('sidebar.faq')}
          </a>
          <a href="#" className="text-blue-600 hover:underline block">
            {t('sidebar.contact')}
          </a>
          <a href="#" className="text-blue-600 hover:underline block">
            {t('sidebar.userGuide')}
          </a>
        </div>
      </div>
    </aside>
  );
};
