import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useExams } from "@/hooks/useExams";
import { ExamCard } from "@/components/molecules/ExamCard";
import {
  BookOpen,
  TrendingUp,
  Clock,
  Award,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { StatCard } from "@/components/molecules/StatCard";

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: exams, isLoading } = useExams();

  const featuredExams = exams?.slice(0, 3) || [];

  return (
    <div className="space-y-0">
      {/* Hero Section - Large and Engaging */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-12 md:py-20 px-4 -mx-6 -mt-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t("home.welcome")}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-blue-100">
                {t("home.subtitle")}
              </p>
              <p className="text-base md:text-lg text-blue-50 leading-relaxed">
                {t("home.heroDesc")}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto w-full sm:w-auto"
                  onClick={() => navigate("/exams")}
                >
                  <BookOpen className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  {t("home.startExam")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto w-full sm:w-auto transition-all"
                  onClick={() => navigate("/history")}
                >
                  {t("home.viewHistory")}
                </Button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="bg-white/20 p-2 md:p-3 rounded-lg">
                      <CheckCircle2 className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-base md:text-lg">
                        {t("home.achievements")}
                      </p>
                      <p className="text-sm md:text-base text-blue-100">
                        {t("home.achievementsDesc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="bg-white/20 p-2 md:p-3 rounded-lg">
                      <Users className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-base md:text-lg">
                        {t("home.students")}
                      </p>
                      <p className="text-sm md:text-base text-blue-100">
                        {t("home.studentsDesc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="bg-white/20 p-2 md:p-3 rounded-lg">
                      <Award className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-base md:text-lg">
                        {t("home.support")}
                      </p>
                      <p className="text-sm md:text-base text-blue-100">
                        {t("home.supportDesc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats - Eye-catching */}
      <section className="mb-8 md:mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          <StatCard
            title={t("statistics.availableExams")}
            value={exams?.length || 0}
            icon={BookOpen}
            description={`${t("home.various")}${t("home.levelsDesc")}`}
            className="border-l-4 border-blue-500"
          />
          <StatCard
            title={t("statistics.yourProgress")}
            value="75%"
            icon={TrendingUp}
            description={t("statistics.progressDesc")}
            trend={{ value: 12, isPositive: true }}
            className="border-l-4 border-green-500"
          />
          <StatCard
            title={t("statistics.studyTimeWeek")}
            value="4.5h"
            icon={Clock}
            description={t("statistics.studyTimeDesc") + "+2h"}
            trend={{ value: 15, isPositive: true }}
            className="border-l-4 border-purple-500"
          />
          <StatCard
            title={t("statistics.monthlyGoal")}
            value="85%"
            icon={Target}
            description={t("statistics.achievementRate")}
            className="border-l-4 border-orange-500"
          />
        </div>
      </section>

      {/* Featured Exams - More Prominent */}
      <section className="mb-8 md:mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t("home.featuredExams")}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              {t("home.featuredExamsDesc")}
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-blue-600 hover:text-blue-700 w-full sm:w-auto"
            onClick={() => navigate("/exams")}
          >
            {t("home.viewAll")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-40 md:h-48 bg-gray-200 rounded-lg mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featuredExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section - Value Proposition */}
      <section className="mb-8 md:mb-12 bg-gradient-to-r from-gray-50 to-blue-50 -mx-6 px-6 py-8 md:py-12 rounded-2xl">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 md:mb-4">
            {t("home.whyChooseUs")}
          </h2>
          <p className="text-center text-sm md:text-base text-gray-600 mb-8 md:mb-12">
            {t("home.whyChooseDesc")}
          </p>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Target className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">
                  {t("home.aiAnalysis")}
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  {t("home.aiAnalysisDesc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-green-500 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">
                  {t("home.richContent")}
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  {t("home.richContentDesc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg md:text-xl">
                  {t("home.teacherSupport")}
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  {t("home.teacherSupportDesc")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
          {t("home.startNow")}
        </h2>
        <p className="text-base md:text-xl text-blue-100 mb-6 md:mb-8">
          {t("home.startNowDesc")}
        </p>
        <Button
          size="lg"
          className="bg-white text-blue-600 hover:bg-blue-50 text-base md:text-lg px-8 md:px-12 py-4 md:py-6 h-auto w-full sm:w-auto"
          onClick={() => navigate("/exams")}
        >
          {t("home.startFree")}
          <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
