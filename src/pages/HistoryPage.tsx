import { useTranslation } from 'react-i18next';
import { useUserResults } from '@/hooks/useExams';
import { useExams } from '@/hooks/useExams';
import { ResultHistoryCard } from '@/components/molecules/ResultHistoryCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { History, TrendingUp, Award } from 'lucide-react';
import { StatCard } from '@/components/molecules/StatCard';

const HistoryPage = () => {
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
  const passedExams = results?.filter((r) => r.passed).length || 0;

  const getExamTitle = (examId: string) => {
    return exams?.find((e) => e.id === examId)?.title || 'Unknown Exam';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('history.title')}</h1>
        <p className="text-muted-foreground">
          {t('history.subtitle')}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title={t('statistics.totalExams')}
          value={totalExams}
          icon={History}
        />
        <StatCard
          title={t('statistics.averageScore')}
          value={`${averageScore.toFixed(1)}%`}
          icon={TrendingUp}
        />
        <StatCard
          title={t('history.passedExams')}
          value={`${passedExams}/${totalExams}`}
          icon={Award}
        />
      </div>

      {/* History List */}
      <Card>
        <CardHeader>
          <CardTitle>{t('history.title')}</CardTitle>
          <CardDescription>
            All your completed exams in chronological order
          </CardDescription>
        </CardHeader>
        <CardContent>
          {results && results.length > 0 ? (
            <div className="space-y-4">
              {results
                .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                .map((result) => (
                  <ResultHistoryCard
                    key={result.id}
                    result={result}
                    examTitle={getExamTitle(result.examId)}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('history.noHistory')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;

