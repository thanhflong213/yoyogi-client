import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { examService } from "@/services";
import type { ExamResult } from "@/types";

export const useExams = () => {
  return useQuery({
    queryKey: ["exams"],
    queryFn: examService.getExams,
  });
};

export const useExam = (id: string) => {
  return useQuery({
    queryKey: ["exam", id],
    queryFn: () => examService.getExamById(id),
    enabled: !!id,
  });
};

export const useExamQuestions = (examId: string) => {
  return useQuery({
    queryKey: ["exam-questions", examId],
    queryFn: () => examService.getExamQuestions(examId),
    enabled: !!examId,
  });
};

export const useSubmitExamResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (result: Omit<ExamResult, "id">) =>
      examService.submitExamResult(result),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["results"] });
    },
  });
};

export const useUserResults = (userId: string) => {
  return useQuery({
    queryKey: ["results", userId],
    queryFn: () => examService.getUserResults(userId),
    enabled: !!userId,
  });
};

export const useExamResults = (examId: string) => {
  return useQuery({
    queryKey: ["exam-results", examId],
    queryFn: () => examService.getExamResults(examId),
    enabled: !!examId,
  });
};

export const useResult = (resultId: string) => {
  return useQuery({
    queryKey: ["result", resultId],
    queryFn: () => examService.getResultById(resultId),
    enabled: !!resultId,
  });
};
