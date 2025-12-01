import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FillInBlankQuestion as QuestionType } from "@/types";

interface FillInBlankQuestionProps {
  question: QuestionType;
  value?: string;
  onChange: (value: string) => void;
  showAnswer?: boolean;
}

export const FillInBlankQuestion = ({
  question,
  value = "",
  onChange,
  showAnswer = false,
}: FillInBlankQuestionProps) => {
  const isCorrect = showAnswer
    ? question.correctAnswers.some(
        (answer) => answer.toLowerCase().trim() === value.toLowerCase().trim()
      )
    : false;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{question.question}</h3>
      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt="Question"
          className="max-w-md rounded-lg border"
        />
      )}
      <div>
        <Label htmlFor="answer">Your Answer</Label>
        <Input
          id="answer"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your answer here..."
          disabled={showAnswer}
          className={
            showAnswer
              ? isCorrect
                ? "border-green-500 bg-green-50"
                : "border-red-500 bg-red-50"
              : ""
          }
        />
      </div>
      {showAnswer && (
        <>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-900">Correct Answer(s):</p>
            <p className="text-green-800 mt-1">
              {question.correctAnswers.join(", ")}
            </p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-blue-900">Explanation:</p>
            <p className="text-blue-800 mt-1">{question.explanation}</p>
          </div>
        </>
      )}
    </div>
  );
};
