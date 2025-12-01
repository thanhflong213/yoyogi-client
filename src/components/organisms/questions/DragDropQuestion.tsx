import { useState, useEffect } from "react";
import type { DragDropQuestion as QuestionType } from "@/types";
import { GripVertical, Check, X, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DragDropQuestionProps {
  question: QuestionType;
  value?: any;
  onChange: (value: any) => void;
  showAnswer?: boolean;
}

export const DragDropQuestion = ({
  question,
  value,
  onChange,
  showAnswer = false,
}: DragDropQuestionProps) => {
  // Initialize with value or default order
  const [currentOrder, setCurrentOrder] = useState<string[]>(
    value || [...question.items]
  );
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  
  // For drop zones: track which items are in which zones
  const [zoneItems, setZoneItems] = useState<Record<string, string[]>>(() => {
    if (question.dropZones && typeof value === 'object' && !Array.isArray(value)) {
      return value as Record<string, string[]>;
    }
    return {};
  });
  
  // Available items (not yet placed in any zone)
  const [availableItems, setAvailableItems] = useState<string[]>(() => {
    if (question.dropZones) {
      const placedItems = Object.values(zoneItems).flat();
      return question.items.filter(item => !placedItems.includes(item));
    }
    return [];
  });

  useEffect(() => {
    if (value) {
      setCurrentOrder(value);
    }
  }, [value]);

  const handleDragStart = (e: React.DragEvent, item: string) => {
    if (!showAnswer) {
      setDraggedItem(item);
      e.dataTransfer.effectAllowed = "move";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetItem: string) => {
    e.preventDefault();
    if (!draggedItem || showAnswer) return;

    const newOrder = [...currentOrder];
    const draggedIndex = newOrder.indexOf(draggedItem);
    const targetIndex = newOrder.indexOf(targetItem);

    // Swap items
    newOrder[draggedIndex] = targetItem;
    newOrder[targetIndex] = draggedItem;

    setCurrentOrder(newOrder);
    onChange(newOrder);
    setDraggedItem(null);
  };

  const moveUp = (index: number) => {
    if (index === 0 || showAnswer) return;
    const newOrder = [...currentOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setCurrentOrder(newOrder);
    onChange(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === currentOrder.length - 1 || showAnswer) return;
    const newOrder = [...currentOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setCurrentOrder(newOrder);
    onChange(newOrder);
  };

  // Check if answer is correct (for ordering type)
  const isCorrect =
    showAnswer &&
    question.correctOrder &&
    currentOrder.every(
      (item, idx) =>
        question.items[question.correctOrder![idx]] === item
    );

  // For matching type with drop zones
  if (question.dropZones) {
    const handleDropToZone = (e: React.DragEvent, zoneId: string) => {
      e.preventDefault();
      if (!draggedItem || showAnswer) return;

      const newZoneItems = { ...zoneItems };
      const newAvailableItems = [...availableItems];

      // Remove item from its current location
      Object.keys(newZoneItems).forEach(zone => {
        newZoneItems[zone] = newZoneItems[zone].filter(item => item !== draggedItem);
      });
      const availableIndex = newAvailableItems.indexOf(draggedItem);
      if (availableIndex > -1) {
        newAvailableItems.splice(availableIndex, 1);
      }

      // Add item to new zone
      if (!newZoneItems[zoneId]) {
        newZoneItems[zoneId] = [];
      }
      newZoneItems[zoneId].push(draggedItem);

      setZoneItems(newZoneItems);
      setAvailableItems(newAvailableItems);
      onChange(newZoneItems);
      setDraggedItem(null);
    };

    const handleDropToAvailable = (e: React.DragEvent) => {
      e.preventDefault();
      if (!draggedItem || showAnswer) return;

      const newZoneItems = { ...zoneItems };
      const newAvailableItems = [...availableItems];

      // Remove from zones
      Object.keys(newZoneItems).forEach(zone => {
        newZoneItems[zone] = newZoneItems[zone].filter(item => item !== draggedItem);
      });

      // Add back to available if not already there
      if (!newAvailableItems.includes(draggedItem)) {
        newAvailableItems.push(draggedItem);
      }

      setZoneItems(newZoneItems);
      setAvailableItems(newAvailableItems);
      onChange(newZoneItems);
      setDraggedItem(null);
    };

    const isCorrectPlacement = (zoneId: string, item: string): boolean | null => {
      if (!showAnswer) return null;
      const zone = question.dropZones!.find(z => z.id === zoneId);
      return zone ? zone.acceptedItems.includes(item) : false;
    };

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">{question.question}</h3>

        {!showAnswer && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              💡 <strong>Tip:</strong> Drag items from the available pool into the correct categories below.
            </p>
          </div>
        )}

        {/* Available Items Pool */}
        {availableItems.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">
              Available Items ({availableItems.length}):
            </h4>
            <div
              className="min-h-[80px] p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50"
              onDragOver={handleDragOver}
              onDrop={handleDropToAvailable}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableItems.map((item) => (
                  <Card
                    key={item}
                    draggable={!showAnswer}
                    onDragStart={(e) => handleDragStart(e, item)}
                    className={`p-3 text-sm text-center font-medium transition-all ${
                      draggedItem === item
                        ? "opacity-50 cursor-grabbing"
                        : "cursor-move hover:shadow-md hover:scale-105"
                    }`}
                  >
                    {item}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Drop Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {question.dropZones.map((zone) => {
            const itemsInZone = zoneItems[zone.id] || [];
            const allCorrect = showAnswer && itemsInZone.every(item => zone.acceptedItems.includes(item));
            const hasIncorrect = showAnswer && itemsInZone.some(item => !zone.acceptedItems.includes(item));

            return (
              <div key={zone.id} className="space-y-2">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  {zone.label}
                  {showAnswer && (
                    <span className="text-xs text-gray-500">
                      ({itemsInZone.length} items)
                    </span>
                  )}
                </h4>
                <div
                  className={`min-h-[120px] p-4 border-2 border-dashed rounded-lg transition-all ${
                    showAnswer
                      ? allCorrect && itemsInZone.length > 0
                        ? "border-green-400 bg-green-50"
                        : hasIncorrect
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 bg-gray-50"
                      : draggedItem
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropToZone(e, zone.id)}
                >
                  {itemsInZone.length > 0 ? (
                    <div className="space-y-2">
                      {itemsInZone.map((item) => {
                        const isCorrect = isCorrectPlacement(zone.id, item);
                        return (
                          <Card
                            key={item}
                            draggable={!showAnswer}
                            onDragStart={(e) => handleDragStart(e, item)}
                            className={`p-3 text-sm font-medium transition-all ${
                              showAnswer
                                ? isCorrect
                                  ? "bg-green-100 border-green-300"
                                  : "bg-red-100 border-red-300"
                                : "bg-white cursor-move hover:shadow-md"
                            } ${draggedItem === item ? "opacity-50" : ""}`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span>{item}</span>
                              {showAnswer && (
                                <div className="flex-shrink-0">
                                  {isCorrect ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <X className="h-4 w-4 text-red-600" />
                                  )}
                                </div>
                              )}
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      Drop items here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {showAnswer && (
          <div className="space-y-3">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-semibold text-green-900 mb-2">Correct Categories:</p>
              {question.dropZones.map((zone) => (
                <div key={zone.id} className="mb-2">
                  <p className="font-medium text-green-800">{zone.label}:</p>
                  <p className="text-sm text-green-700 ml-4">
                    {zone.acceptedItems.join(", ")}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-semibold text-blue-900">Explanation:</p>
              <p className="text-blue-800 mt-1">{question.explanation}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // For matching type with targets
  if (question.matchTargets) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{question.question}</h3>
        
        <div className="space-y-3">
          {question.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white border rounded-lg"
            >
              <div className="flex-1 font-medium">{item}</div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
              <div className="flex-1 text-gray-600">
                {question.matchTargets![index]}
              </div>
            </div>
          ))}
        </div>

        {showAnswer && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-blue-900">Explanation:</p>
            <p className="text-blue-800 mt-1">{question.explanation}</p>
          </div>
        )}
      </div>
    );
  }

  // Default: Ordering type
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <h3 className="text-lg font-semibold flex-1">{question.question}</h3>
        {showAnswer && question.correctOrder && (
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

      {!showAnswer && (
        <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
          💡 <strong>Tip:</strong> Drag items or use the arrow buttons to arrange them in the correct order.
        </p>
      )}

      <div className="space-y-2">
        {currentOrder.map((item, index) => {
          const originalIndex = question.items.indexOf(item);
          const correctPosition = question.correctOrder
            ? question.correctOrder.indexOf(originalIndex)
            : -1;
          const isInCorrectPosition = showAnswer && correctPosition === index;
          const isInWrongPosition = showAnswer && correctPosition !== index && correctPosition !== -1;

          return (
            <div
              key={item}
              draggable={!showAnswer}
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item)}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                showAnswer
                  ? isInCorrectPosition
                    ? "bg-green-50 border-green-300"
                    : isInWrongPosition
                    ? "bg-red-50 border-red-300"
                    : "bg-gray-50 border-gray-200"
                  : draggedItem === item
                  ? "bg-blue-100 border-blue-400 opacity-50"
                  : "bg-white border-gray-300 hover:border-blue-400 cursor-move"
              }`}
            >
              {!showAnswer && (
                <GripVertical className="h-5 w-5 text-gray-400 flex-shrink-0 cursor-grab" />
              )}
              
              <div className="flex items-center gap-2 flex-1">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                  {index + 1}
                </span>
                <span className="font-medium">{item}</span>
              </div>

              {showAnswer && correctPosition !== -1 && correctPosition !== index && (
                <span className="text-sm text-gray-600 bg-yellow-100 px-3 py-1 rounded-full">
                  Should be #{correctPosition + 1}
                </span>
              )}

              {!showAnswer && (
                <div className="flex gap-1">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === currentOrder.length - 1}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showAnswer && question.correctOrder && (
        <div className="space-y-3">
          {!isCorrect && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-semibold text-green-900 mb-2">Correct Order:</p>
              <ol className="space-y-1">
                {question.correctOrder.map((itemIndex, position) => (
                  <li key={position} className="text-green-800 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-200 text-xs font-semibold">
                      {position + 1}
                    </span>
                    {question.items[itemIndex]}
                  </li>
                ))}
              </ol>
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

