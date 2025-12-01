import type { Question, UserAnswer, ExamResult, CategoryStats } from "@/types";

export const calculateScore = (
  questions: Question[],
  userAnswers: UserAnswer[]
): { score: number; totalPoints: number } => {
  let score = 0;
  let totalPoints = 0;

  questions.forEach((question) => {
    totalPoints += question.points;
    const userAnswer = userAnswers.find((a) => a.questionId === question.id);

    if (userAnswer && checkAnswer(question, userAnswer.answer)) {
      score += question.points;
    }
  });

  return { score, totalPoints };
};

export const checkAnswer = (question: Question, userAnswer: any): boolean => {
  switch (question.type) {
    case "single-choice":
    case "image-based":
    case "audio-based":
      return userAnswer === question.correctAnswer;

    case "true-false":
      return userAnswer === question.correctAnswer;

    case "multiple-choice":
      if (!Array.isArray(userAnswer)) return false;
      const correctAnswers = question.correctAnswers.sort();
      const sortedUserAnswer = [...userAnswer].sort();
      return (
        correctAnswers.length === sortedUserAnswer.length &&
        correctAnswers.every((val, idx) => val === sortedUserAnswer[idx])
      );

    case "fill-in-blank":
      const normalizedUserAnswer = userAnswer.toLowerCase().trim();
      return question.correctAnswers.some(
        (answer) => answer.toLowerCase().trim() === normalizedUserAnswer
      );

    case "matching":
      if (typeof userAnswer !== "object") return false;
      return Object.keys(question.correctMatches).every(
        (key) => question.correctMatches[Number(key)] === userAnswer[key]
      );

    case "ordering":
      if (!Array.isArray(userAnswer)) return false;
      return (
        userAnswer.length === question.correctOrder.length &&
        userAnswer.every((val, idx) => val === question.correctOrder[idx])
      );

    case "reading-comprehension":
      // For reading comprehension, check sub-questions
      return question.subQuestions.every((subQ) => {
        const subAnswer = userAnswer[subQ.id];
        return checkAnswer(subQ, subAnswer);
      });

    default:
      return false;
  }
};

export const calculateCategoryStats = (
  questions: Question[],
  userAnswers: UserAnswer[]
): CategoryStats[] => {
  const categoryMap = new Map<string, CategoryStats>();

  questions.forEach((question) => {
    const category = question.category;
    const userAnswer = userAnswers.find((a) => a.questionId === question.id);
    const isCorrect = userAnswer
      ? checkAnswer(question, userAnswer.answer)
      : false;

    if (!categoryMap.has(category)) {
      categoryMap.set(category, {
        category,
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0,
        averageTimeSpent: 0,
      });
    }

    const stats = categoryMap.get(category)!;
    stats.totalQuestions += 1;
    if (isCorrect) stats.correctAnswers += 1;
    if (userAnswer) {
      stats.averageTimeSpent += userAnswer.timeSpent;
    }
  });

  return Array.from(categoryMap.values()).map((stats) => ({
    ...stats,
    accuracy: (stats.correctAnswers / stats.totalQuestions) * 100,
    averageTimeSpent: stats.averageTimeSpent / stats.totalQuestions,
  }));
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
};

export const formatTimeSpent = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
};

export const getDifficultyColor = (
  difficulty: "easy" | "medium" | "hard"
): string => {
  switch (difficulty) {
    case "easy":
      return "text-green-600 bg-green-50 border-green-200";
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "hard":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

export const getScoreColor = (percentage: number): string => {
  if (percentage >= 80) return "text-green-600";
  if (percentage >= 60) return "text-yellow-600";
  return "text-red-600";
};
