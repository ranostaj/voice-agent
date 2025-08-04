import { useEffect, useRef, useState } from 'react';

interface UseTimerOptions {
  autoStart?: boolean;
  interval?: number;
}

interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  pause: () => void;
  resume: () => void;
}

/**
 * Custom hook for managing timer functionality
 * @param options - Configuration options for the timer
 * @returns Timer state and control functions
 */
export const useTimer = (options: UseTimerOptions = {}): UseTimerReturn => {
  const { autoStart = false, interval = 1000 } = options;
  
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const timerRef = useRef<number | null>(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stop = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const resume = () => {
    setIsRunning(true);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, interval);
    } else if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, interval]);

  return {
    time,
    isRunning,
    start,
    stop,
    reset,
    pause,
    resume,
  };
};
