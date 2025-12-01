import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { MultipleChoiceQuestion as QuestionType } from "@/types";

interface MultipleChoiceQuestionProps {
  question: QuestionType;
  value?: number[];
  onChange: (value: number[]) => void;
  showAnswer?: boolean;
}

export const MultipleChoiceQuestion = ({
  question,
  value = [],
  onChange,
  showAnswer = false,
}: MultipleChoiceQuestionProps) => {
  // Ensure value is always an array
  const currentValue = Array.isArray(value) ? value : [];

  const handleChange = (index: number, checked: boolean) => {
    if (checked) {
      onChange([...currentValue, index]);
    } else {
      onChange(currentValue.filter((i) => i !== index));
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{question.question}</h3>
      <p className="text-sm text-muted-foreground">Select all that apply</p>
      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt="Question"
          className="max-w-md rounded-lg border"
        />
      )}
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 p-3 rounded-lg border ${
              showAnswer
                ? question.correctAnswers.includes(index)
                  ? "bg-green-50 border-green-300"
                  : currentValue.includes(index)
                  ? "bg-red-50 border-red-300"
                  : ""
                : ""
            }`}
          >
            <Checkbox
              id={`option-${index}`}
              checked={currentValue.includes(index)}
              onCheckedChange={(checked) =>
                handleChange(index, checked as boolean)
              }
              disabled={showAnswer}
            />
            <Label
              htmlFor={`option-${index}`}
              className="flex-1 cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
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
