import { useState } from "react";
import type { ReadingComprehensionQuestion as QuestionType } from "@/types";
import { Card } from "@/components/ui/card";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionRenderer } from "./QuestionRenderer";

interface ReadingComprehensionQuestionProps {
  question: QuestionType;
  value?: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
  showAnswer?: boolean;
}

export const ReadingComprehensionQuestion = ({
  question,
  value = {},
  onChange,
  showAnswer = false,
}: ReadingComprehensionQuestionProps) => {
  const [isPassageExpanded, setIsPassageExpanded] = useState(true);

  const handleSubQuestionChange = (subQuestionId: string, answer: number) => {
    const newValue = { ...value, [subQuestionId]: answer };
    onChange(newValue);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-2">
        <BookOpen className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
        <h3 className="text-lg font-semibold">{question.question}</h3>
      </div>

      {/* Reading Passage */}
      <Card className="overflow-hidden">
        <div
          className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b cursor-pointer hover:bg-blue-100 transition-colors"
          onClick={() => setIsPassageExpanded(!isPassageExpanded)}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Reading Passage</h4>
            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
              {question.passage.split(" ").length} words
            </span>
          </div>
          <Button variant="ghost" size="sm">
            {isPassageExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>

        {isPassageExpanded && (
          <div className="p-6 bg-white">
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {question.passage}
              </p>
            </div>
          </div>
        )}

        {!isPassageExpanded && (
          <div className="p-4 text-center text-sm text-gray-500">
            Click to expand passage
          </div>
        )}
      </Card>

      {/* Sub Questions */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-gray-900">
            Questions ({question.subQuestions.length})
          </h4>
          <span className="text-xs text-gray-500">
            Answer the following based on the passage above
          </span>
        </div>

        {question.subQuestions.map((subQuestion, index) => (
          <Card key={subQuestion.id} className="p-6 bg-gradient-to-br from-white to-gray-50">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <QuestionRenderer
                  question={subQuestion}
                  value={value[subQuestion.id]}
                  onChange={(answer) =>
                    handleSubQuestionChange(subQuestion.id, answer as number)
                  }
                  showAnswer={showAnswer}
                />
                <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {subQuestion.points} points
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                    {subQuestion.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Overall Explanation */}
      {showAnswer && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold text-blue-900">Passage Overview:</p>
          <p className="text-blue-800 mt-1">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

