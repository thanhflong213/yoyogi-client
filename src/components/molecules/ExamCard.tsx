import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "@/components/atoms/DifficultyBadge";
import { CategoryTag } from "@/components/atoms/CategoryTag";
import { Clock, FileText, TrendingUp, Users } from "lucide-react";
import type { Exam } from "@/types";
import { useTranslation } from "react-i18next";
import { formatDuration } from "@/utils";

interface ExamCardProps {
  exam: Exam;
}

export const ExamCard = ({ exam }: ExamCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className="hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-blue-300 overflow-hidden">
      <div className="relative">
        {exam.imageUrl && (
          <div className="w-full h-52 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
            <img
              src={exam.imageUrl}
              alt={exam.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <DifficultyBadge difficulty={exam.difficulty} />
        </div>
        {/* Popular Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-yellow-500 text-white border-0 shadow-lg">
            <TrendingUp className="h-3 w-3 mr-1" />
            {t("exam.list.popular") || "人気"}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <CardTitle className="line-clamp-2 text-xl group-hover:text-blue-600 transition-colors">
            {exam.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-base">
            {exam.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <CategoryTag category={exam.category} />
          {exam.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="bg-blue-100 p-1.5 rounded">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{t("exam.list.duration")}</p>
              <p className="font-semibold text-gray-900">
                {formatDuration(exam.duration)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <div className="bg-green-100 p-1.5 rounded">
              <FileText className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">
                {t("exam.list.questions")}
              </p>
              <p className="font-semibold text-gray-900">
                {exam.questionIds.length}
                {t("exam.list.questionsUnit") || "問"}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>1,234{t("exam.list.participants")}</span>
          </div>
          <div>
            {t("exam.list.passingLine")}: {exam.passingScore}
            {t("exam.list.points")}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
          onClick={() => {
            // Open exam in new tab
            window.open(`/exams/${exam.id}`, "_blank");
          }}
          size="lg"
        >
          {t("exam.list.startExam")}
        </Button>
      </CardFooter>
    </Card>
  );
};
