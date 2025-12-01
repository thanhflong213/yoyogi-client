// Question Types
export type QuestionType =
  | "single-choice"
  | "multiple-choice"
  | "true-false"
  | "fill-in-blank"
  | "matching"
  | "ordering"
  | "reading-comprehension"
  | "image-based"
  | "audio-based"
  | "short-answer"
  | "essay"
  | "drag-drop"
  | "matrix";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  explanation: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: "single-choice";
  options: string[];
  correctAnswer: number; // index of correct option
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  options: string[];
  correctAnswers: number[]; // indices of correct options
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false";
  correctAnswer: boolean;
}

export interface FillInBlankQuestion extends BaseQuestion {
  type: "fill-in-blank";
  correctAnswers: string[]; // array of acceptable answers
}

export interface MatchingQuestion extends BaseQuestion {
  type: "matching";
  leftItems: string[];
  rightItems: string[];
  correctMatches: Record<number, number>; // left index -> right index
}

export interface OrderingQuestion extends BaseQuestion {
  type: "ordering";
  items: string[];
  correctOrder: number[]; // correct sequence of indices
}

export interface ReadingComprehensionQuestion extends BaseQuestion {
  type: "reading-comprehension";
  passage: string;
  subQuestions: SingleChoiceQuestion[];
}

export interface ImageBasedQuestion extends BaseQuestion {
  type: "image-based";
  options: string[];
  correctAnswer: number;
}

export interface AudioBasedQuestion extends BaseQuestion {
  type: "audio-based";
  options: string[];
  correctAnswer: number;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: "short-answer";
  correctAnswers: string[]; // array of acceptable answers
  maxLength: number; // maximum character length
}

export interface EssayQuestion extends BaseQuestion {
  type: "essay";
  minWords: number;
  maxWords: number;
  rubric: {
    criterion: string;
    points: number;
  }[];
}

export interface DragDropQuestion extends BaseQuestion {
  type: "drag-drop";
  items: string[];
  correctOrder?: number[]; // for ordering drag-drop
  dropZones?: {
    id: string;
    label: string;
    acceptedItems: string[];
  }[]; // for categorization drag-drop
  matchTargets?: string[]; // for matching drag-drop
}

export interface MatrixQuestion extends BaseQuestion {
  type: "matrix";
  rows: string[]; // row headers
  columns: string[]; // column headers
  correctAnswers: Record<string, number>; // "row-col" -> columnIndex mapping
  questionText?: string; // optional text shown for each cell
}

export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillInBlankQuestion
  | MatchingQuestion
  | OrderingQuestion
  | ReadingComprehensionQuestion
  | ImageBasedQuestion
  | AudioBasedQuestion
  | ShortAnswerQuestion
  | EssayQuestion
  | DragDropQuestion
  | MatrixQuestion;

// Exam Types
export interface Exam {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number; // in minutes
  totalPoints: number;
  passingScore: number;
  questionIds: string[];
  createdAt: string;
  updatedAt: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  imageUrl?: string;
}

// User Answer Types
export type AnswerValue =
  | number // single-choice
  | number[] // multiple-choice
  | boolean // true-false
  | string // fill-in-blank, short-answer, essay
  | string[] // drag-drop ordering
  | Record<string, string[]> // drag-drop with zones
  | Record<string, number> // matrix, reading-comprehension, matching
  | Record<number, number>; // matching left-right indices

export interface UserAnswer {
  questionId: string;
  answer: AnswerValue;
  timeSpent: number; // in seconds
  isCorrect?: boolean;
}

// Result Types
export interface ExamResult {
  id: string;
  userId: string;
  examId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  answers: UserAnswer[];
  timeSpent: number;
  completedAt: string;
  passed: boolean;
}

// Statistics Types
export interface CategoryStats {
  category: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  averageTimeSpent: number;
}

export interface ExamHistory {
  examId: string;
  examTitle: string;
  results: ExamResult[];
  averageScore: number;
  bestScore: number;
  attemptsCount: number;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  preferences: {
    language: "en" | "jp" | "vn";
    theme: "light" | "dark";
  };
}
