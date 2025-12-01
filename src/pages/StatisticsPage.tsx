import { useTranslation } from 'react-i18next';
import { useUserResults } from '@/hooks/useExams';
import { useExams, useExamQuestions } from '@/hooks/useExams';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BookOpen, TrendingUp, Clock, Target } from 'lucide-react';
import { StatCard } from '@/components/molecules/StatCard';
import { calculateCategoryStats } from '@/utils';

const StatisticsPage = () => {
  const { t } = useTranslation();
  const { data: results, isLoading } = useUserResults('user-1'); // TODO: Get from auth
  const { data: exams } = useExams();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const totalExams = results?.length || 0;
  const averageScore = results?.length
    ? results.reduce((acc, r) => acc + r.percentage, 0) / results.length
    : 0;
  const totalTime = results?.reduce((acc, r) => acc + r.timeSpent, 0) || 0;
  const totalTimeHours = (totalTime / 3600).toFixed(1);

  // Progress over time
  const progressData = results
    ?.slice()
    .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime())
    .map((result, index) => ({
      attempt: index + 1,
      score: result.percentage,
      date: new Date(result.completedAt).toLocaleDateString(),
    })) || [];

  // Category performance (simplified - would need to fetch all questions for accurate stats)
  const categoryPerformance = [
    { category: 'Mathematics', accuracy: 85, count: 15 },
    { category: 'English', accuracy: 92, count: 12 },
    { category: 'Science', accuracy: 78, count: 10 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('statistics.title')}</h1>
        <p className="text-muted-foreground">
          Track your learning progress and identify areas for improvement
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title={t('statistics.totalExams')}
          value={totalExams}
          icon={BookOpen}
          description="Completed successfully"
        />
        <StatCard
          title={t('statistics.averageScore')}
          value={`${averageScore.toFixed(1)}%`}
          icon={Target}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title={t('statistics.totalTime')}
          value={`${totalTimeHours}h`}
          icon={Clock}
          description="Time invested"
        />
        <StatCard
          title="Current Streak"
          value="7 days"
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      {/* Progress Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>{t('statistics.progressOverTime')}</CardTitle>
          <CardDescription>Your performance trend across all exams</CardDescription>
        </CardHeader>
        <CardContent>
          {progressData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="attempt" label={{ value: 'Attempt', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#8884d8" name="Score %" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No data available yet. Complete some exams to see your progress.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>{t('statistics.accuracyByCategory')}</CardTitle>
          <CardDescription>Your performance across different subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="accuracy" fill="#8884d8" name="Accuracy %" />
              <Bar dataKey="count" fill="#82ca9d" name="Questions Attempted" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Strengths and Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('statistics.strongPoints')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryPerformance
                .filter((cat) => cat.accuracy >= 80)
                .map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="font-medium">{cat.category}</span>
                    <span className="text-green-600 font-semibold">{cat.accuracy}%</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('statistics.weakPoints')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryPerformance
                .filter((cat) => cat.accuracy < 80)
                .map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <span className="font-medium">{cat.category}</span>
                    <span className="text-orange-600 font-semibold">{cat.accuracy}%</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage;

