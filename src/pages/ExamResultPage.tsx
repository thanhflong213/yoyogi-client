import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResult, useExam, useExamQuestions } from '@/hooks/useExams';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScoreDisplay } from '@/components/atoms/ScoreDisplay';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuestionRenderer } from '@/components/organisms/questions/QuestionRenderer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { calculateCategoryStats, formatTimeSpent } from '@/utils';
import { Trophy, Clock, Target, TrendingUp, RotateCcw, Home } from 'lucide-react';
import { StatCard } from '@/components/molecules/StatCard';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ExamResultPage = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: result, isLoading: resultLoading } = useResult(resultId!);
  const { data: exam } = useExam(result?.examId || '');
  const { data: questions } = useExamQuestions(result?.examId || '');

  if (resultLoading || !result) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const categoryStats = questions ? calculateCategoryStats(questions, result.answers) : [];

  const accuracyData = categoryStats.map((stat) => ({
    category: stat.category,
    accuracy: stat.accuracy,
    correct: stat.correctAnswers,
    total: stat.totalQuestions,
  }));

  const scoreData = [
    { name: 'Correct', value: result.score },
    { name: 'Incorrect', value: result.totalPoints - result.score },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {result.passed ? (
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                <Trophy className="h-10 w-10 text-green-600" />
              </div>
            ) : (
              <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                <Target className="h-10 w-10 text-red-600" />
              </div>
            )}
          </div>
          <CardTitle className="text-3xl">
            {result.passed ? t('exam.result.passed') : t('exam.result.failed')}
          </CardTitle>
          <CardDescription className="text-lg">
            {exam?.title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <ScoreDisplay
              score={result.score}
              totalPoints={result.totalPoints}
              percentage={result.percentage}
              size="lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title={t('exam.result.score')}
          value={`${result.percentage.toFixed(1)}%`}
          icon={Trophy}
        />
        <StatCard
          title={t('exam.result.correctAnswers')}
          value={`${result.answers.filter((a) => a.isCorrect).length}/${result.answers.length}`}
          icon={Target}
        />
        <StatCard
          title={t('exam.result.timeSpent')}
          value={formatTimeSpent(result.timeSpent)}
          icon={Clock}
        />
        <StatCard
          title={t('exam.result.accuracy')}
          value={`${result.percentage.toFixed(0)}%`}
          icon={TrendingUp}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Question Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Score Distribution</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={scoreData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {scoreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Category Breakdown</h4>
                  <div className="space-y-2">
                    {categoryStats.map((stat) => (
                      <div key={stat.category} className="flex items-center justify-between p-2 rounded bg-muted">
                        <span className="text-sm font-medium capitalize">{stat.category}</span>
                        <Badge variant={stat.accuracy >= 70 ? 'default' : 'destructive'}>
                          {stat.accuracy.toFixed(0)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={() => navigate('/exams')} className="flex-1">
              <Home className="h-4 w-4 mr-2" />
              {t('exam.result.backToList')}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/exams/${result.examId}`)}
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {t('exam.result.retakeExam')}
            </Button>
          </div>
        </TabsContent>

        {/* Question Details Tab */}
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>{t('exam.result.viewExplanations')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {questions?.map((question, index) => {
                  const userAnswer = result.answers.find((a) => a.questionId === question.id);
                  const isCorrect = userAnswer?.isCorrect || false;

                  return (
                    <AccordionItem key={question.id} value={question.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3 text-left">
                          <Badge variant={isCorrect ? 'default' : 'destructive'}>
                            {index + 1}
                          </Badge>
                          <span className="line-clamp-1">{question.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-4">
                          <QuestionRenderer
                            question={question}
                            value={userAnswer?.answer}
                            onChange={() => {}}
                            showAnswer={true}
                          />
                          <div className="mt-4 p-3 bg-muted rounded-lg">
                            <p className="text-sm">
                              <span className="font-semibold">Time spent:</span>{' '}
                              {formatTimeSpent(userAnswer?.timeSpent || 0)}
                            </p>
                            <p className="text-sm mt-1">
                              <span className="font-semibold">Points:</span> {question.points}
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('exam.result.categoryBreakdown')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="accuracy" fill="#8884d8" name="Accuracy %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryStats.map((stat) => (
                  <div key={stat.category} className="p-4 border rounded-lg">
                    <h4 className="font-semibold capitalize mb-2">{stat.category}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Questions</p>
                        <p className="font-semibold">{stat.totalQuestions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Correct</p>
                        <p className="font-semibold text-green-600">{stat.correctAnswers}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Accuracy</p>
                        <p className="font-semibold">{stat.accuracy.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Time</p>
                        <p className="font-semibold">{stat.averageTimeSpent.toFixed(0)}s</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamResultPage;

