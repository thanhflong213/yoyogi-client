import { api } from "./api";
import type { Exam, Question, ExamResult } from "@/types";

export const examService = {
  // Get all exams
  getExams: async (): Promise<Exam[]> => {
    const response = await api.get("/exams");
    return response.data;
  },

  // Get exam by ID
  getExamById: async (id: string): Promise<Exam> => {
    const response = await api.get(`/exams/${id}`);
    return response.data;
  },

  // Get questions for an exam
  getExamQuestions: async (examId: string): Promise<Question[]> => {
    const response = await api.get(`/questions?examId=${examId}`);
    return response.data;
  },

  // Get question by ID
  getQuestionById: async (id: string): Promise<Question> => {
    const response = await api.get(`/questions/${id}`);
    return response.data;
  },

  // Submit exam result
  submitExamResult: async (
    result: Omit<ExamResult, "id">
  ): Promise<ExamResult> => {
    const response = await api.post("/results", {
      ...result,
      id: `result-${Date.now()}`,
    });
    return response.data;
  },

  // Get exam results by user
  getUserResults: async (userId: string): Promise<ExamResult[]> => {
    const response = await api.get(`/results?userId=${userId}`);
    return response.data;
  },

  // Get exam results by exam ID
  getExamResults: async (examId: string): Promise<ExamResult[]> => {
    const response = await api.get(`/results?examId=${examId}`);
    return response.data;
  },

  // Get specific result
  getResultById: async (id: string): Promise<ExamResult> => {
    const response = await api.get(`/results/${id}`);
    return response.data;
  },
};
