import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  answeredQuestions: Set<string>;
  questionIds: string[];
}

export const QuestionNavigation = ({
  currentQuestion,
  totalQuestions,
  onNext,
  onPrevious,
  answeredQuestions,
  questionIds,
}: QuestionNavigationProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span className="text-sm font-medium">
          {currentQuestion + 1} / {totalQuestions}
        </span>
        <Button
          variant="outline"
          onClick={onNext}
          disabled={currentQuestion === totalQuestions - 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      
      <div className="grid grid-cols-10 gap-2">
        {questionIds.map((id, index) => (
          <button
            key={id}
            className={cn(
              'h-10 w-10 rounded-md border text-sm font-medium transition-colors',
              currentQuestion === index
                ? 'bg-primary text-primary-foreground border-primary'
                : answeredQuestions.has(id)
                ? 'bg-green-50 text-green-700 border-green-300'
                : 'bg-background hover:bg-muted'
            )}
            onClick={() => {
              // This will be handled by parent component
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

