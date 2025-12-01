import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useExams } from '@/hooks/useExams';
import { ExamCard } from '@/components/molecules/ExamCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, BookOpen, TrendingUp, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const categories = [
  'all',
  'mathematics',
  'english',
  'science',
  'history',
  'geography',
  'language',
  'general',
];

const ExamListPage = () => {
  const { t } = useTranslation();
  const { data: exams, isLoading } = useExams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredExams = exams?.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exam.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || exam.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Hero Banner with Image - Yotsuya Gakuin Style */}
      <div className="relative bg-linear-to-br from-blue-600 via-indigo-600 to-blue-800 text-white rounded-3xl overflow-hidden -mx-6 -mt-6 mb-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDEuMzMzLTMgNC0zaDh2OGgtOGMtMi42NjcgMC00LTEtNC00ek0yIDJoOHY4SDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
        </div>
        
        {/* Content Container */}
        <div className="relative grid md:grid-cols-2 gap-6 p-6 md:p-10">
          {/* Left Side - Text Content */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
              <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
              <span className="text-sm font-medium">10,000+ {t('exam.list.participants')}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {t('exam.list.pageTitle')}
            </h1>
            
            <p className="text-base md:text-xl text-blue-50 leading-relaxed max-w-xl">
              {t('exam.list.pageDesc')}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl md:text-3xl font-bold">{exams?.length || 0}</div>
                <div className="text-xs md:text-sm text-blue-100 mt-1">{t('exam.list.allExams')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl md:text-3xl font-bold">92%</div>
                <div className="text-xs md:text-sm text-blue-100 mt-1">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl md:text-3xl font-bold">24/7</div>
                <div className="text-xs md:text-sm text-blue-100 mt-1">Support</div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Image */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-full min-h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop" 
                alt="Students studying"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-linear-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights - Yotsuya Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-linear-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-600 p-3 rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Comprehensive Exams</h3>
          </div>
          <p className="text-sm text-gray-600">Access a wide range of practice exams covering all subjects and difficulty levels</p>
        </div>
        
        <div className="bg-linear-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-600 p-3 rounded-xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Track Progress</h3>
          </div>
          <p className="text-sm text-gray-600">Monitor your performance with detailed analytics and identify areas for improvement</p>
        </div>
        
        <div className="bg-linear-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-600 p-3 rounded-xl">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Expert Content</h3>
          </div>
          <p className="text-sm text-gray-600">Questions crafted by professional educators aligned with exam standards</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 md:p-6 shadow-lg">
        <div className="flex flex-col gap-3 md:gap-4">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder={t('exam.list.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 md:pl-14 h-14 text-sm md:text-base border-2 focus:border-blue-500 rounded-xl shadow-sm"
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-2 gap-3 md:flex md:gap-4">
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-12 md:h-14 border-2 text-sm md:text-base rounded-xl">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t('exam.list.filterByCategory')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? t('exam.list.allCategories') : t(`category.${category}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Difficulty Filter */}
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="h-12 md:h-14 border-2 text-sm md:text-base rounded-xl">
                <SelectValue placeholder={t('exam.list.difficulty')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('exam.list.allLevels')}</SelectItem>
                <SelectItem value="easy">{t('difficulty.easy')}</SelectItem>
                <SelectItem value="medium">{t('difficulty.medium')}</SelectItem>
                <SelectItem value="hard">{t('difficulty.hard')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tabs for Different Views - Enhanced Design */}
      <Tabs defaultValue="all" className="space-y-6 md:space-y-8">
        <TabsList className="bg-linear-to-r from-gray-50 to-gray-100 p-2 h-auto w-full rounded-2xl border-2 border-gray-200 shadow-md">
          <TabsTrigger 
            value="all" 
            className="text-xs md:text-base px-4 md:px-8 py-3 md:py-4 flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all"
          >
            <BookOpen className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            <span className="hidden sm:inline">{t('exam.list.allExams')}</span>
            <span className="sm:hidden">{t('exam.list.allExamsShort')}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="popular" 
            className="text-xs md:text-base px-4 md:px-8 py-3 md:py-4 flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all"
          >
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            <span className="hidden sm:inline">{t('exam.list.popularExams')}</span>
            <span className="sm:hidden">{t('exam.list.popularShort')}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="recommended" 
            className="text-xs md:text-base px-4 md:px-8 py-3 md:py-4 flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all"
          >
            <Star className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            <span className="hidden sm:inline">{t('exam.list.recommendedExams')}</span>
            <span className="sm:hidden">{t('exam.list.recommendedShort')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 md:space-y-6">
          {/* Results Count */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm md:text-base text-gray-600">
              <span className="font-semibold text-gray-900">{filteredExams?.length || 0}</span>
              {t('exam.list.findExams')}
            </p>
            <Select defaultValue="latest">
              <SelectTrigger className="w-full sm:w-[180px] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">{t('exam.list.sortLatest')}</SelectItem>
                <SelectItem value="popular">{t('exam.list.sortPopular')}</SelectItem>
                <SelectItem value="difficulty">{t('exam.list.sortDifficulty')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Exam Grid */}
          {isLoading ? (
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-[250px] md:h-[300px] w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : filteredExams && filteredExams.length > 0 ? (
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16 bg-gray-50 rounded-xl border-2 border-dashed">
              <BookOpen className="h-12 w-12 md:h-16 md:w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-base md:text-lg font-medium text-gray-900 mb-2">
                {t('exam.list.noResults')}
              </p>
              <p className="text-sm md:text-base text-gray-500 mb-6">
                {t('exam.list.changeFilter')}
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                }}
              >
                {t('exam.list.resetFilter')}
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="popular">
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredExams?.slice(0, 6).map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredExams?.slice(0, 3).map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamListPage;
