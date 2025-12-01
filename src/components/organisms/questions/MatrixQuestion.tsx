import { useState, useEffect } from "react";
import type { MatrixQuestion as QuestionType } from "@/types";
import { Check, X, Circle, CheckCircle2 } from "lucide-react";

interface MatrixQuestionProps {
  question: QuestionType;
  value?: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
  showAnswer?: boolean;
}

export const MatrixQuestion = ({
  question,
  value = {},
  onChange,
  showAnswer = false,
}: MatrixQuestionProps) => {
  const [selections, setSelections] = useState<Record<string, number>>(value);

  useEffect(() => {
    if (value) {
      setSelections(value);
    }
  }, [value]);

  const handleSelect = (rowIndex: number, colIndex: number) => {
    if (showAnswer) return;

    const key = `${rowIndex}-${colIndex}`;
    const newSelections = { ...selections };
    
    // Store which column is selected for this row
    const rowKey = `row-${rowIndex}`;
    newSelections[rowKey] = colIndex;
    
    setSelections(newSelections);
    onChange(newSelections);
  };

  const isSelected = (rowIndex: number, colIndex: number): boolean => {
    const rowKey = `row-${rowIndex}`;
    return selections[rowKey] === colIndex;
  };

  const isCorrect = (rowIndex: number, colIndex: number): boolean | null => {
    if (!showAnswer) return null;
    const rowKey = `row-${rowIndex}`;
    if (selections[rowKey] === undefined) return null;
    
    const correctCol = question.correctAnswers[rowKey];
    const selectedCol = selections[rowKey];
    
    if (isSelected(rowIndex, colIndex)) {
      return selectedCol === correctCol;
    }
    return null;
  };

  const allAnswered = question.rows.every((_, idx) => {
    const rowKey = `row-${idx}`;
    return selections[rowKey] !== undefined;
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{question.question}</h3>

      {question.questionText && (
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border">
          {question.questionText}
        </p>
      )}

      {!showAnswer && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            💡 <strong>Instructions:</strong> Select one option for each row.
          </p>
        </div>
      )}

      {/* Matrix Table */}
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r">
                    {/* Empty corner cell */}
                  </th>
                  {question.columns.map((col, colIdx) => (
                    <th
                      key={colIdx}
                      className="px-4 py-3 text-center text-sm font-semibold text-gray-900"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {question.rows.map((row, rowIdx) => {
                  const rowKey = `row-${rowIdx}`;
                  const correctCol = question.correctAnswers[rowKey];
                  const selectedCol = selections[rowKey];
                  const isRowCorrect = showAnswer && selectedCol === correctCol;
                  const isRowIncorrect = showAnswer && selectedCol !== undefined && selectedCol !== correctCol;

                  return (
                    <tr
                      key={rowIdx}
                      className={`${
                        showAnswer
                          ? isRowCorrect
                            ? "bg-green-50"
                            : isRowIncorrect
                            ? "bg-red-50"
                            : ""
                          : "hover:bg-gray-50"
                      } transition-colors`}
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 border-r bg-gray-50">
                        <div className="flex items-center gap-2">
                          {showAnswer && (
                            <div className="flex-shrink-0">
                              {isRowCorrect ? (
                                <Check className="h-4 w-4 text-green-600" />
                              ) : isRowIncorrect ? (
                                <X className="h-4 w-4 text-red-600" />
                              ) : (
                                <div className="h-4 w-4" />
                              )}
                            </div>
                          )}
                          <span>{row}</span>
                        </div>
                      </td>
                      {question.columns.map((_, colIdx) => {
                        const cellSelected = isSelected(rowIdx, colIdx);
                        const cellCorrect = isCorrect(rowIdx, colIdx);

                        return (
                          <td
                            key={colIdx}
                            className="px-4 py-4 text-center"
                          >
                            <button
                              type="button"
                              onClick={() => handleSelect(rowIdx, colIdx)}
                              disabled={showAnswer}
                              className={`flex items-center justify-center p-2 rounded-full transition-all ${
                                showAnswer && cellSelected
                                  ? cellCorrect
                                    ? "bg-green-100"
                                    : "bg-red-100"
                                  : cellSelected
                                  ? "bg-blue-50"
                                  : "hover:bg-gray-100"
                              } ${showAnswer ? "cursor-default" : "cursor-pointer"}`}
                              aria-label={`Select ${row} - ${question.columns[colIdx]}`}
                            >
                              {cellSelected ? (
                                <CheckCircle2
                                  className={`h-5 w-5 ${
                                    showAnswer
                                      ? cellCorrect
                                        ? "text-green-600"
                                        : "text-red-600"
                                      : "text-blue-600"
                                  }`}
                                />
                              ) : (
                                <Circle className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      {!showAnswer && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium">
            Progress: {Object.keys(selections).length} / {question.rows.length} answered
          </span>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{
                width: `${(Object.keys(selections).length / question.rows.length) * 100}%`,
              }}
            />
          </div>
          {allAnswered && (
            <span className="text-green-600 font-medium flex items-center gap-1">
              <Check className="h-4 w-4" />
              Complete
            </span>
          )}
        </div>
      )}

      {/* Show Correct Answers */}
      {showAnswer && (
        <div className="space-y-3">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-900 mb-2">Correct Answers:</p>
            <div className="space-y-1">
              {question.rows.map((row, rowIdx) => {
                const rowKey = `row-${rowIdx}`;
                const correctCol = question.correctAnswers[rowKey];
                return (
                  <div key={rowIdx} className="text-sm text-green-800 flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span className="font-medium">{row}</span>
                    <span>→</span>
                    <span className="font-medium">{question.columns[correctCol]}</span>
                  </div>
                );
              })}
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

