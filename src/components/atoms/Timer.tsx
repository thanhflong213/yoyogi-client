import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerProps {
  time: string;
  isWarning?: boolean;
  className?: string;
}

export const Timer = ({ time, isWarning = false, className }: TimerProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg border',
        isWarning
          ? 'bg-red-50 border-red-200 text-red-600'
          : 'bg-blue-50 border-blue-200 text-blue-600',
        className
      )}
    >
      <Clock className="h-5 w-5" />
      <span className="font-mono font-semibold text-lg">{time}</span>
    </div>
  );
};

