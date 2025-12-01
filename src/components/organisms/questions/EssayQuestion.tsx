import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { EssayQuestion as QuestionType } from "@/types";
import { BookOpen, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EssayQuestionProps {
  question: QuestionType;
  value?: string;
  onChange: (value: string) => void;
  showAnswer?: boolean;
}

export const EssayQuestion = ({
  question,
  value,
  onChange,
  showAnswer = false,
}: EssayQuestionProps) => {
  const wordCount = value ? value.trim().split(/\s+/).filter(Boolean).length : 0;
  const isWithinRange = wordCount >= question.minWords && wordCount <= question.maxWords;
  const isTooShort = wordCount > 0 && wordCount < question.minWords;
  const isTooLong = wordCount > question.maxWords;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <BookOpen className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
        <h3 className="text-lg font-semibold">{question.question}</h3>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="essay-answer" className="text-sm text-gray-600">
            Your Essay ({question.minWords}-{question.maxWords} words required)
          </Label>
          <span
            className={`text-sm font-medium ${
              !isWithinRange && wordCount > 0
                ? isTooShort
                  ? "text-orange-600"
                  : "text-red-600"
                : wordCount > 0
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            {wordCount} / {question.minWords}-{question.maxWords} words
          </span>
        </div>

        <Textarea
          id="essay-answer"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={showAnswer}
          placeholder="Write your essay here... Be clear, organized, and provide specific examples."
          className={`min-h-[300px] w-full text-base ${
            showAnswer
              ? "bg-gray-50"
              : isTooShort
              ? "border-orange-300 focus:border-orange-500"
              : isTooLong
              ? "border-red-300 focus:border-red-500"
              : isWithinRange
              ? "border-green-300"
              : ""
          }`}
        />

        {!showAnswer && (
          <>
            {isTooShort && (
              <Alert variant="default" className="bg-orange-50 border-orange-200">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  Your essay is too short. Please write at least {question.minWords - wordCount} more words.
                </AlertDescription>
              </Alert>
            )}
            {isTooLong && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Your essay exceeds the maximum word count. Please reduce by {wordCount - question.maxWords} words.
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
      </div>

      {/* Rubric Display */}
      {question.rubric && question.rubric.length > 0 && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Grading Rubric:</h4>
          <div className="space-y-2">
            {question.rubric.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 bg-white rounded border border-gray-200"
              >
                <span className="text-sm text-gray-700">{item.criterion}</span>
                <span className="text-sm font-medium text-blue-600">
                  {item.points} points
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded border border-blue-200 font-semibold">
              <span className="text-sm text-blue-900">Total</span>
              <span className="text-sm text-blue-900">
                {question.rubric.reduce((sum, item) => sum + item.points, 0)} points
              </span>
            </div>
          </div>
        </div>
      )}

      {showAnswer && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold text-blue-900">Evaluation Guidance:</p>
          <p className="text-blue-800 mt-1">{question.explanation}</p>
          
          {wordCount > 0 && (
            <div className="mt-3 pt-3 border-t border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>Word Count Status:</strong>{" "}
                {isWithinRange ? (
                  <span className="text-green-600">✓ Meets requirements ({wordCount} words)</span>
                ) : isTooShort ? (
                  <span className="text-orange-600">⚠ Too short (needs {question.minWords - wordCount} more words)</span>
                ) : (
                  <span className="text-red-600">✗ Too long (exceeds by {wordCount - question.maxWords} words)</span>
                )}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

