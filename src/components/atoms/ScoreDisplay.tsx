import { cn } from '@/lib/utils';
import { getScoreColor } from '@/utils';

interface ScoreDisplayProps {
  score: number;
  totalPoints: number;
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ScoreDisplay = ({
  score,
  totalPoints,
  percentage,
  size = 'md',
  className,
}: ScoreDisplayProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  return (
    <div className={cn('text-center', className)}>
      <div className={cn('font-bold', sizeClasses[size], getScoreColor(percentage))}>
        {score} / {totalPoints}
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        {percentage.toFixed(1)}%
      </div>
    </div>
  );
};

