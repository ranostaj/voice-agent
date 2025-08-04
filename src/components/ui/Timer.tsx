import React from 'react';
import { formatTime } from '../../utils/timeFormatter';
import clsx from 'clsx';

interface TimerProps {
  seconds: number;
  duration?: number; // Optional duration for displaying total time
  variant?: 'default' | 'playing' | 'recording';
  className?: string;
}

const Timer: React.FC<TimerProps> = ({
  seconds,
  duration = 0,
  variant = 'default',
  className = '' 
}) => {
  const baseClasses = 'px-4 rounded-bl-2xl rounded-tl-2xl py-3  h-full  font-mono text-sm flex items-center gap-2';
  
  const variantClasses = {
    default: 'bg-transparent text-white',
    playing: 'bg-primary/30 text-white',
    recording: 'bg-primary/30 text-white',
  };

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    className
  ].join(' ');


  const isRecordingOrPlaying = variant === 'recording' || variant === 'playing';

  return (
    <div className={combinedClasses}>
  

      <div className={clsx('w-2 h-2 rounded-full animate-pulse', {
        'bg-green-500': variant === 'playing',
        'bg-red-500': variant === 'recording',
        'bg-gray-500': variant === 'default',
      })}></div>
       {isRecordingOrPlaying ? formatTime(seconds) : formatTime(duration)}
    </div>
  );
};

export default Timer;
