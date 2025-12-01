import { useEffect, useRef } from 'react';
import { useExamStore } from '@/stores';

export const useTimer = (onTimeUp?: () => void) => {
  const { timeRemaining, updateTimeRemaining } = useExamStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeRemaining === 0 && onTimeUp) {
        onTimeUp();
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      updateTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeRemaining, updateTimeRemaining, onTimeUp]);

  const formatTime = (seconds: number): string => {
    if (seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining || 0),
  };
};

