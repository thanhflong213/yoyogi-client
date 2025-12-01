import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { SingleChoiceQuestion as QuestionType } from "@/types";

interface SingleChoiceQuestionProps {
  question: QuestionType;
  value?: number;
  onChange: (value: number) => void;
  showAnswer?: boolean;
}

export const SingleChoiceQuestion = ({
  question,
  value,
  onChange,
  showAnswer = false,
}: SingleChoiceQuestionProps) => {
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
      <RadioGroup
        value={value?.toString()}
        onValueChange={(val) => onChange(Number(val))}
        disabled={showAnswer}
      >
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 p-3 rounded-lg border ${
              showAnswer
                ? index === question.correctAnswer
                  ? "bg-green-50 border-green-300"
                  : value === index
                  ? "bg-red-50 border-red-300"
                  : ""
                : ""
            }`}
          >
            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
            <Label
              htmlFor={`option-${index}`}
              className="flex-1 cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {showAnswer && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold text-blue-900">Explanation:</p>
          <p className="text-blue-800 mt-1">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
