import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreDisplay } from "@/components/atoms/ScoreDisplay";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import type { ExamResult } from "@/types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatTimeSpent } from "@/utils";

interface ResultHistoryCardProps {
  result: ExamResult;
  examTitle: string;
}

export const ResultHistoryCard = ({
  result,
  examTitle,
}: ResultHistoryCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{examTitle}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(result.completedAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge variant={result.passed ? "default" : "destructive"}>
            {result.passed ? t("exam.result.passed") : t("exam.result.failed")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <ScoreDisplay
            score={result.score}
            totalPoints={result.totalPoints}
            percentage={result.percentage}
            size="sm"
          />
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatTimeSpent(result.timeSpent)}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/results/${result.id}`)}
          >
            {t("history.viewDetails")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
