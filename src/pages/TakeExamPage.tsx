import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useExam,
  useExamQuestions,
  useSubmitExamResult,
} from "@/hooks/useExams";
import { useExamStore } from "@/stores";
import { useTimer } from "@/hooks/useTimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer } from "@/components/atoms/Timer";
import { QuestionRenderer } from "@/components/organisms/questions/QuestionRenderer";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { calculateScore, checkAnswer } from "@/utils/examUtils";
import type { UserAnswer } from "@/types";

const TakeExamPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: exam, isLoading: examLoading } = useExam(examId!);
  const { data: questions, isLoading: questionsLoading } = useExamQuestions(
    examId!
  );
  const submitResult = useSubmitExamResult();

  const {
    currentQuestionIndex,
    userAnswers,
    startExam,
    saveAnswer,
    nextQuestion,
    previousQuestion,
    setCurrentQuestionIndex,
    saveExamForLater,
    hasSavedExam,
    clearSavedExam,
  } = useExamStore();

  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  // Initialize showContinueDialog based on saved exam state
  const [showContinueDialog, setShowContinueDialog] = useState(() =>
    exam ? hasSavedExam(exam.id) : false
  );

  // Derive current answer from userAnswers
  const currentQuestionId = questions?.[currentQuestionIndex]?.id;
  const existingAnswer = React.useMemo(
    () => userAnswers.find((a) => a.questionId === currentQuestionId),
    [userAnswers, currentQuestionId]
  );

  const [currentAnswer, setCurrentAnswer] = useState<
    string | number | boolean | number[] | undefined
  >(() => existingAnswer?.answer);
  const [questionStartTime, setQuestionStartTime] = useState(() => Date.now());
  const submitExamRef = React.useRef<(() => void) | null>(null);

  const { formattedTime, timeRemaining } = useTimer(() => {
    if (submitExamRef.current) {
      submitExamRef.current();
    }
  });

  // Start exam if no saved progress
  useEffect(() => {
    if (exam && questions && !showContinueDialog) {
      startExam(exam, questions, exam.duration);
    }
  }, [exam, questions, showContinueDialog, startExam]);

  // Update answer when question changes (schedule with setTimeout to avoid cascading renders)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentAnswer(existingAnswer?.answer);
      setQuestionStartTime(Date.now());
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [currentQuestionIndex, existingAnswer]);

  // Save exam progress on beforeunload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (userAnswers.length > 0) {
        saveExamForLater();
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [userAnswers.length, saveExamForLater]);

  const handleAnswerChange = useCallback(
    (value: string | number | boolean | number[]) => {
      setCurrentAnswer(value);
    },
    []
  );

  const handleSaveAndNext = () => {
    if (questions && currentAnswer !== undefined) {
      const currentQuestion = questions[currentQuestionIndex];
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

      const answer: UserAnswer = {
        questionId: currentQuestion.id,
        answer: currentAnswer,
        timeSpent,
        isCorrect: checkAnswer(currentQuestion, currentAnswer),
      };

      saveAnswer(answer);
    }

    if (currentQuestionIndex < (questions?.length || 0) - 1) {
      nextQuestion();
    }
  };

  const handleSubmitExam = useCallback(async () => {
    if (!exam || !questions) return;

    // Save current answer if any
    if (currentAnswer !== undefined) {
      const currentQuestion = questions[currentQuestionIndex];
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

      saveAnswer({
        questionId: currentQuestion.id,
        answer: currentAnswer,
        timeSpent,
        isCorrect: checkAnswer(currentQuestion, currentAnswer),
      });
    }

    const { score, totalPoints } = calculateScore(questions, userAnswers);
    const percentage = (score / totalPoints) * 100;
    const totalTimeSpent = Math.floor(
      exam.duration * 60 - (timeRemaining || 0)
    );

    const result = {
      userId: "user-1", // TODO: Get from auth
      examId: exam.id,
      score,
      totalPoints,
      percentage,
      answers: userAnswers,
      timeSpent: totalTimeSpent,
      completedAt: new Date().toISOString(),
      passed: percentage >= (exam.passingScore / exam.totalPoints) * 100,
    };

    try {
      const submittedResult = await submitResult.mutateAsync(result);
      // Clear saved exam after successful submission
      clearSavedExam(exam.id);
      navigate(`/results/${submittedResult.id}`);
    } catch (error) {
      console.error("Failed to submit exam:", error);
    }
  }, [
    exam,
    questions,
    currentAnswer,
    currentQuestionIndex,
    questionStartTime,
    userAnswers,
    timeRemaining,
    saveAnswer,
    submitResult,
    clearSavedExam,
    navigate,
  ]);

  // Update ref when handleSubmitExam changes
  useEffect(() => {
    submitExamRef.current = handleSubmitExam;
  }, [handleSubmitExam]);

  const handleSaveForLater = () => {
    saveExamForLater();
    setShowSaveDialog(false);
    window.close(); // Close the tab
  };

  const handleContinueExam = () => {
    if (exam && questions) {
      startExam(exam, questions, exam.duration);
      setShowContinueDialog(false);
    }
  };

  const handleStartFresh = () => {
    if (exam) {
      clearSavedExam(exam.id);
      if (questions) {
        startExam(exam, questions, exam.duration);
      }
      setShowContinueDialog(false);
    }
  };

  if (examLoading || questionsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (!exam || !questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-lg font-medium text-muted-foreground mb-4">
            {t("exam.taking.noQuestions")}
          </p>
          <Button onClick={() => navigate("/exams")}>
            {t("exam.result.backToList")}
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-lg font-medium text-muted-foreground mb-4">
            {t("common.error")}
          </p>
          <Button onClick={() => navigate("/exams")}>
            {t("exam.result.backToList")}
          </Button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{exam.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {t("exam.taking.question")} {currentQuestionIndex + 1}{" "}
                {t("exam.taking.of")} {questions.length}
              </p>
            </div>
            <Timer
              time={formattedTime}
              isWarning={(timeRemaining || 0) < 300}
            />
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      {/* Question */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                {currentQuestion.category} • {currentQuestion.points} points
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {currentQuestion.difficulty}
              </span>
            </div>
          </div>

          <QuestionRenderer
            question={currentQuestion}
            value={currentAnswer}
            onChange={handleAnswerChange}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => {
                if (currentAnswer !== undefined) {
                  handleSaveAndNext();
                }
                previousQuestion();
              }}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              {t("common.previous")}
            </Button>

            <div className="flex gap-2">
              {isLastQuestion ? (
                <Button onClick={() => setShowSubmitDialog(true)}>
                  <Flag className="h-4 w-4 mr-2" />
                  {t("exam.taking.submitExam")}
                </Button>
              ) : (
                <Button onClick={handleSaveAndNext}>
                  {t("common.next")}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div className="grid grid-cols-10 gap-2 mt-6">
            {questions.map((q, index) => {
              const isAnswered = userAnswers.some((a) => a.questionId === q.id);
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    if (currentAnswer !== undefined) {
                      handleSaveAndNext();
                    }
                    setCurrentQuestionIndex(index);
                  }}
                  className={`h-10 rounded-md border text-sm font-medium transition-colors ${
                    currentQuestionIndex === index
                      ? "bg-primary text-primary-foreground border-primary"
                      : isAnswered
                      ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
                      : "bg-background hover:bg-muted border-border"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("exam.taking.submitExam")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("exam.taking.confirmSubmit")}
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  {t("exam.taking.answered")}: {userAnswers.length} /{" "}
                  {questions.length}
                </p>
                <p className="text-sm mt-1">
                  {t("exam.taking.unanswered")}:{" "}
                  {questions.length - userAnswers.length}
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitExam}>
              {t("common.submit")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Save for Later Dialog */}
      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("exam.taking.saveForLater")}</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be saved and you can continue later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveForLater}>
              {t("common.save")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Continue Exam Dialog */}
      <AlertDialog
        open={showContinueDialog}
        onOpenChange={setShowContinueDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("exam.taking.continueExam")}</AlertDialogTitle>
            <AlertDialogDescription>
              You have a saved progress for this exam. Would you like to
              continue where you left off or start fresh?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleStartFresh}>
              Start Fresh
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleContinueExam}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TakeExamPage;
