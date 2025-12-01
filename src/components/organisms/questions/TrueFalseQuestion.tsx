import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import type { TrueFalseQuestion as QuestionType } from "@/types";

interface TrueFalseQuestionProps {
  question: QuestionType;
  value?: boolean;
  onChange: (value: boolean) => void;
  showAnswer?: boolean;
}

export const TrueFalseQuestion = ({
  question,
  value,
  onChange,
  showAnswer = false,
}: TrueFalseQuestionProps) => {
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
      <div className="flex gap-4">
        <Button
          variant={value === true ? "default" : "outline"}
          className={`flex-1 h-20 ${
            showAnswer && question.correctAnswer === true
              ? "bg-green-500 hover:bg-green-600"
              : showAnswer && value === true
              ? "bg-red-500 hover:bg-red-600"
              : ""
          }`}
          onClick={() => onChange(true)}
          disabled={showAnswer}
        >
          <Check className="h-6 w-6 mr-2" />
          True
        </Button>
        <Button
          variant={value === false ? "default" : "outline"}
          className={`flex-1 h-20 ${
            showAnswer && question.correctAnswer === false
              ? "bg-green-500 hover:bg-green-600"
              : showAnswer && value === false
              ? "bg-red-500 hover:bg-red-600"
              : ""
          }`}
          onClick={() => onChange(false)}
          disabled={showAnswer}
        >
          <X className="h-6 w-6 mr-2" />
          False
        </Button>
      </div>
      {showAnswer && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold text-blue-900">Explanation:</p>
          <p className="text-blue-800 mt-1">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
