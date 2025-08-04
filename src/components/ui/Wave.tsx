import clsx from 'clsx';
import React from 'react';
import { WaveSize, WaveType } from '../../types';


const Wave = React.forwardRef(({size = 'sm', isRound, type = 'user'}: {size?: WaveSize, isRound?: boolean, type: WaveType}, ref: React.Ref<HTMLDivElement>) => {

  return (
    <div className={clsx('relative overflow-hidden flex justify-center items-center', {
      'h-12 w-12': size === 'sm',
      'h-20 w-20': size === 'md',
      'h-24 w-24': size === 'lg',
      'rounded-full': isRound,
      'bg-primary-60': type === 'agent',
      'bg-common-20': type === 'user',
      'flex items-center justify-center': !isRound,
      'flex-1 w-full h-full rounded-2xl': size === 'full' 
    })}>
      <div ref={ref} className={clsx(
        'overflow-hidden flex items-center justify-end p-1',
        {
          'h-10 w-10': size === 'sm',
          'h-18 w-18': size === 'md',
          'h-22 w-22': size === 'lg',
          'rounded-full p-2': isRound,
          'w-full h-full rounded-2xl':  size === 'full' 

        })} />
    </div>
  );
});

export default Wave;
