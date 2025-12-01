import { Badge } from '@/components/ui/badge';
import { getDifficultyColor } from '@/utils';

interface DifficultyBadgeProps {
  difficulty: 'easy' | 'medium' | 'hard';
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  return (
    <Badge variant="outline" className={getDifficultyColor(difficulty)}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </Badge>
  );
};

