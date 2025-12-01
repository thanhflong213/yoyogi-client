import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ShortAnswerQuestion as QuestionType } from "@/types";
import { Check, X } from "lucide-react";

interface ShortAnswerQuestionProps {
  question: QuestionType;
  value?: string;
  onChange: (value: string) => void;
  showAnswer?: boolean;
}

export const ShortAnswerQuestion = ({
  question,
  value,
  onChange,
  showAnswer = false,
}: ShortAnswerQuestionProps) => {
  const isCorrect = showAnswer && value && 
    question.correctAnswers.some(
      (correct) => correct.toLowerCase().trim() === value.toLowerCase().trim()
    );

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <h3 className="text-lg font-semibold flex-1">{question.question}</h3>
        {showAnswer && (
          <div className="flex-shrink-0">
            {isCorrect ? (
              <div className="flex items-center gap-1 text-green-600">
                <Check className="h-5 w-5" />
                <span className="text-sm font-medium">Correct</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600">
                <X className="h-5 w-5" />
                <span className="text-sm font-medium">Incorrect</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="short-answer" className="text-sm text-gray-600">
          Your Answer {question.maxLength && `(max ${question.maxLength} characters)`}
        </Label>
        <Input
          id="short-answer"
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          maxLength={question.maxLength}
          disabled={showAnswer}
          placeholder="Type your answer here..."
          className={`w-full ${
            showAnswer
              ? isCorrect
                ? "bg-green-50 border-green-300"
                : "bg-red-50 border-red-300"
              : ""
          }`}
        />
        {value && question.maxLength && (
          <p className="text-xs text-gray-500 text-right">
            {value.length} / {question.maxLength} characters
          </p>
        )}
      </div>

      {showAnswer && (
        <div className="space-y-3">
          {!isCorrect && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-semibold text-green-900">Correct Answer(s):</p>
              <ul className="mt-2 space-y-1">
                {question.correctAnswers.map((answer, index) => (
                  <li key={index} className="text-green-800 flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    {answer}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-blue-900">Explanation:</p>
            <p className="text-blue-800 mt-1">{question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

