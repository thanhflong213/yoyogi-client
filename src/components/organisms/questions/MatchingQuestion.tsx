import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { MatchingQuestion as QuestionType } from "@/types";
import { ArrowRight, Check, X, RefreshCw } from "lucide-react";

interface MatchingQuestionProps {
  question: QuestionType;
  value?: Record<number, number>;
  onChange: (value: Record<number, number>) => void;
  showAnswer?: boolean;
}

export const MatchingQuestion = ({
  question,
  value,
  onChange,
  showAnswer = false,
}: MatchingQuestionProps) => {
  const [matches, setMatches] = useState<Record<number, number>>(value || {});
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);

  useEffect(() => {
    if (value) {
      setMatches(value);
    }
  }, [value]);

  const handleLeftClick = (leftIndex: number) => {
    if (showAnswer) return;
    setSelectedLeft(leftIndex);
  };

  const handleRightClick = (rightIndex: number) => {
    if (showAnswer || selectedLeft === null) return;

    const newMatches = { ...matches };
    
    // Remove any existing match for this right item
    Object.keys(newMatches).forEach((key) => {
      if (newMatches[Number(key)] === rightIndex) {
        delete newMatches[Number(key)];
      }
    });

    // Add new match
    newMatches[selectedLeft] = rightIndex;
    setMatches(newMatches);
    onChange(newMatches);
    setSelectedLeft(null);
  };

  const clearMatch = (leftIndex: number) => {
    if (showAnswer) return;
    const newMatches = { ...matches };
    delete newMatches[leftIndex];
    setMatches(newMatches);
    onChange(newMatches);
  };

  const clearAll = () => {
    if (showAnswer) return;
    setMatches({});
    onChange({});
    setSelectedLeft(null);
  };

  const isCorrect = (leftIndex: number): boolean | null => {
    if (!showAnswer) return null;
    if (matches[leftIndex] === undefined) return null;
    return matches[leftIndex] === question.correctMatches[leftIndex];
  };

  const allMatched = Object.keys(matches).length === question.leftItems.length;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold flex-1">{question.question}</h3>
        {!showAnswer && allMatched && (
          <Button
            onClick={clearAll}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {!showAnswer && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            💡 <strong>How to match:</strong> Click an item on the left, then click its match on the right.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
        {/* Left Column */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-600 mb-3">Match these items:</h4>
          {question.leftItems.map((item, index) => {
            const matchStatus = isCorrect(index);
            const isMatched = matches[index] !== undefined;
            const isSelected = selectedLeft === index;

            return (
              <Card
                key={index}
                onClick={() => handleLeftClick(index)}
                className={`p-4 cursor-pointer transition-all relative ${
                  showAnswer
                    ? matchStatus === true
                      ? "bg-green-50 border-green-300 cursor-default"
                      : matchStatus === false
                      ? "bg-red-50 border-red-300 cursor-default"
                      : "bg-gray-50 cursor-default"
                    : isSelected
                    ? "bg-blue-100 border-blue-400 shadow-md"
                    : isMatched
                    ? "bg-gray-50 border-gray-300"
                    : "hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{item}</span>
                  {showAnswer && matchStatus !== null && (
                    <div className="flex-shrink-0">
                      {matchStatus ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  )}
                  {!showAnswer && isMatched && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearMatch(index);
                      }}
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                {isMatched && (
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-white rounded-full p-1 border-2 border-blue-400 shadow-sm">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Center Line (Desktop only) */}
        <div className="hidden md:flex items-center justify-center h-full">
          <div className="w-px bg-gray-300 h-full"></div>
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-600 mb-3">With these answers:</h4>
          {question.rightItems.map((item, index) => {
            const isMatchedTo = Object.entries(matches).find(
              ([, right]) => right === index
            );
            const leftIndex = isMatchedTo ? Number(isMatchedTo[0]) : null;
            const matchStatus = leftIndex !== null ? isCorrect(leftIndex) : null;

            return (
              <Card
                key={index}
                onClick={() => handleRightClick(index)}
                className={`p-4 transition-all ${
                  showAnswer
                    ? matchStatus === true
                      ? "bg-green-50 border-green-300 cursor-default"
                      : matchStatus === false
                      ? "bg-red-50 border-red-300 cursor-default"
                      : isMatchedTo
                      ? "bg-gray-100 border-gray-300 cursor-default"
                      : "bg-gray-50 cursor-default"
                    : selectedLeft !== null && !isMatchedTo
                    ? "cursor-pointer hover:bg-blue-50 hover:border-blue-400"
                    : isMatchedTo
                    ? "bg-gray-100 border-gray-300 cursor-default"
                    : "cursor-not-allowed opacity-60"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{item}</span>
                  {showAnswer && matchStatus !== null && (
                    <div className="flex-shrink-0">
                      {matchStatus ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator */}
      {!showAnswer && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium">
            Progress: {Object.keys(matches).length} / {question.leftItems.length} matched
          </span>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{
                width: `${(Object.keys(matches).length / question.leftItems.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {showAnswer && (
        <div className="space-y-3">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-900 mb-2">Correct Matches:</p>
            <div className="space-y-2">
              {Object.entries(question.correctMatches).map(([leftIdx, rightIdx]) => (
                <div key={leftIdx} className="flex items-center gap-2 text-sm text-green-800">
                  <span className="font-medium">{question.leftItems[Number(leftIdx)]}</span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="font-medium">{question.rightItems[Number(rightIdx)]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-blue-900">Explanation:</p>
            <p className="text-blue-800 mt-1">{question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

