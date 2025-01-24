'use client';

import { cn } from '@/lib/utils';
import type { ChallengeType } from '@/types/quiz';
import { useQuizContext } from '../_context/quiz-context';
import OptionCard from './option-card';

const getGridClassName = (type: ChallengeType): string => {
  const baseClass = 'grid gap-4';
  if (type === 'ASSIST') {
    return cn(baseClass, 'grid-cols-1');
  }
  return cn(
    baseClass,
    'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]'
  );
};

export default function ChallengeOptions() {
  const { currentChallengeOptions, currentChallenge } = useQuizContext();

  return (
    <div className={getGridClassName(currentChallenge.type)}>
      {currentChallengeOptions.map((option, index) => (
        <OptionCard
          key={option.id}
          isDisabled={false}
          onClick={() => {
            /** */
          }}
          shortcut={`${index + 1}`}
          type={currentChallenge.type}
          {...option}
        />
      ))}
    </div>
  );
}
