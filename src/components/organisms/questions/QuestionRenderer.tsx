import type { Question, AnswerValue } from "@/types";
import { SingleChoiceQuestion } from "./SingleChoiceQuestion";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";
import { FillInBlankQuestion } from "./FillInBlankQuestion";
import { ShortAnswerQuestion } from "./ShortAnswerQuestion";
import { EssayQuestion } from "./EssayQuestion";
import { DragDropQuestion } from "./DragDropQuestion";
import { MatchingQuestion } from "./MatchingQuestion";
import { ReadingComprehensionQuestion } from "./ReadingComprehensionQuestion";
import { MatrixQuestion } from "./MatrixQuestion";

interface QuestionRendererProps {
  question: Question;
  value?: AnswerValue;
  onChange: (value: AnswerValue) => void;
  showAnswer?: boolean;
}

export const QuestionRenderer = ({
  question,
  value,
  onChange,
  showAnswer = false,
}: QuestionRendererProps) => {
  switch (question.type) {
    case "single-choice":
      if (question.type === "single-choice") {
        return (
          <SingleChoiceQuestion
            question={question}
            value={value as number | undefined}
            onChange={(val: number) => onChange(val)}
            showAnswer={showAnswer}
          />
        );
      }
      break;

    case "image-based":
    case "audio-based":
      // Image and audio-based use single choice component
      return (
        <SingleChoiceQuestion
          question={
            question as unknown as import("@/types").SingleChoiceQuestion
          }
          value={value as number | undefined}
          onChange={(val: number) => onChange(val)}
          showAnswer={showAnswer}
        />
      );

    case "multiple-choice":
      if (question.type === "multiple-choice") {
        return (
          <MultipleChoiceQuestion
            question={question}
            value={value as number[] | undefined}
            onChange={(val: number[]) => onChange(val)}
            showAnswer={showAnswer}
          />
        );
      }
      break;

    case "true-false":
      if (question.type === "true-false") {
        return (
          <TrueFalseQuestion
            question={question}
            value={value as boolean | undefined}
            onChange={(val: boolean) => onChange(val)}
            showAnswer={showAnswer}
          />
        );
      }
      break;

    case "fill-in-blank":
      if (question.type === "fill-in-blank") {
        return (
          <FillInBlankQuestion
            question={question}
            value={value as string | undefined}
            onChange={(val: string) => onChange(val)}
            showAnswer={showAnswer}
          />
        );
      }
      break;

    case "short-answer":
      if (question.type === "short-answer") {
        return (
          <ShortAnswerQuestion
            question={question}
            value={value as string | undefined}
            onChange={(val: string) => onChange(val)}
            showAnswer={showAnswer}
          />
        );
      }
      break;

    case "essay":
      if (question.type === "essay") {
        return (
          <EssayQuestion
            question={question}
            value={value as string | undefined}
            onChange={(val: string) => onChange(val)}
            showAnswer={showAnswer}
          />
        );
      }
      break;

    case "ordering":
      // Ordering uses drag-drop component
      return (
        <DragDropQuestion
          question={question as unknown as import("@/types").DragDropQuestion}
          value={value as string[] | undefined}
          onChange={(val: string[]) => onChange(val)}
          showAnswer={showAnswer}
        />
      );

    case "drag-drop":
      if (question.type === "drag-drop") {
        return (
          <DragDropQuestion
            question={question}
            value={value as string[] | undefined}
            onChange={(val: string[]) => onChange(val)}
            showAnswer={showAnswer}
          />
        );
      }
      break;

    case "matching":
      if (question.type === "matching") {
        return (
          <MatchingQuestion
            question={question}
            value={value as Record<number, number> | undefined}
            onChange={(val: Record<number, number>) => onChange(val)}
            showAnswer={showAnswer}
          />
        );
      }
      break;

    case "reading-comprehension":
      if (question.type === "reading-comprehension") {
        return (
          <ReadingComprehensionQuestion
            question={question}
            value={value as Record<string, number> | undefined}
            onChange={(val: Record<string, number>) => onChange(val)}
            showAnswer={showAnswer}
          />
        );
      }
      break;

    case "matrix":
      if (question.type === "matrix") {
        return (
          <MatrixQuestion
            question={question}
            value={value as Record<string, number> | undefined}
            onChange={(val: Record<string, number>) => onChange(val)}
            showAnswer={showAnswer}
          />
        );
      }
      break;

    default:
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            Question type "{(question as Question).type}" is not yet supported.
          </p>
        </div>
      );
  }

  // Fallback return (should never reach here)
  return null;
};
