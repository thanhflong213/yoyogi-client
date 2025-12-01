import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Exam, Question, UserAnswer } from "@/types";

interface ExamState {
  currentExam: Exam | null;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  startTime: number | null;
  timeRemaining: number | null;
  savedExams: Record<
    string,
    {
      exam: Exam;
      questions: Question[];
      currentQuestionIndex: number;
      userAnswers: UserAnswer[];
      startTime: number;
      timeRemaining: number;
    }
  >;

  // Actions
  setCurrentExam: (exam: Exam) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  saveAnswer: (answer: UserAnswer) => void;
  startExam: (exam: Exam, questions: Question[], duration: number) => void;
  submitExam: () => void;
  resetExam: () => void;
  updateTimeRemaining: (time: number) => void;
  saveExamForLater: () => void;
  loadSavedExam: (examId: string) => boolean;
  hasSavedExam: (examId: string) => boolean;
  clearSavedExam: (examId: string) => void;
}

export const useExamStore = create<ExamState>()(
  persist(
    (set, get) => ({
      currentExam: null,
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],
      startTime: null,
      timeRemaining: null,
      savedExams: {},

      setCurrentExam: (exam) => set({ currentExam: exam }),

      setQuestions: (questions) => set({ questions }),

      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

      nextQuestion: () => {
        const { currentQuestionIndex, questions } = get();
        if (currentQuestionIndex < questions.length - 1) {
          set({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
      },

      previousQuestion: () => {
        const { currentQuestionIndex } = get();
        if (currentQuestionIndex > 0) {
          set({ currentQuestionIndex: currentQuestionIndex - 1 });
        }
      },

      saveAnswer: (answer) => {
        set((state) => {
          const existingIndex = state.userAnswers.findIndex(
            (a) => a.questionId === answer.questionId
          );

          if (existingIndex >= 0) {
            const newAnswers = [...state.userAnswers];
            newAnswers[existingIndex] = answer;
            return { userAnswers: newAnswers };
          }

          return { userAnswers: [...state.userAnswers, answer] };
        });
      },

      startExam: (exam, questions, duration) => {
        const state = get();
        // Check if there's a saved exam to resume
        if (state.savedExams[exam.id]) {
          const saved = state.savedExams[exam.id];
          set({
            currentExam: saved.exam,
            questions: saved.questions,
            currentQuestionIndex: saved.currentQuestionIndex,
            userAnswers: saved.userAnswers,
            startTime: saved.startTime,
            timeRemaining: saved.timeRemaining,
          });
        } else {
          set({
            currentExam: exam,
            questions,
            currentQuestionIndex: 0,
            userAnswers: [],
            startTime: Date.now(),
            timeRemaining: duration * 60, // convert minutes to seconds
          });
        }
      },

      submitExam: () => {
        // This will be handled by the component
      },

      resetExam: () => {
        set({
          currentExam: null,
          questions: [],
          currentQuestionIndex: 0,
          userAnswers: [],
          startTime: null,
          timeRemaining: null,
        });
      },

      updateTimeRemaining: (time) => set({ timeRemaining: time }),

      saveExamForLater: () => {
        const {
          currentExam,
          questions,
          currentQuestionIndex,
          userAnswers,
          startTime,
          timeRemaining,
          savedExams,
        } = get();

        if (currentExam && startTime && timeRemaining !== null) {
          set({
            savedExams: {
              ...savedExams,
              [currentExam.id]: {
                exam: currentExam,
                questions,
                currentQuestionIndex,
                userAnswers,
                startTime,
                timeRemaining,
              },
            },
          });
        }
      },

      loadSavedExam: (examId: string) => {
        const { savedExams } = get();
        if (savedExams[examId]) {
          const saved = savedExams[examId];
          set({
            currentExam: saved.exam,
            questions: saved.questions,
            currentQuestionIndex: saved.currentQuestionIndex,
            userAnswers: saved.userAnswers,
            startTime: saved.startTime,
            timeRemaining: saved.timeRemaining,
          });
          return true;
        }
        return false;
      },

      hasSavedExam: (examId: string) => {
        const { savedExams } = get();
        return !!savedExams[examId];
      },

      clearSavedExam: (examId: string) => {
        const { savedExams } = get();
        const newSavedExams = { ...savedExams };
        delete newSavedExams[examId];
        set({ savedExams: newSavedExams });
      },
    }),
    {
      name: "exam-storage",
      partialize: (state) => ({ savedExams: state.savedExams }),
    }
  )
);
