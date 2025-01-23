import type { ChallengeOption } from '@/db/schema';
import { cn } from '@/lib/utils';
import type { ChallengeType } from '@/types/quiz';

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

type ChallengeOptionsProps = {
  options: ChallengeOption[];
  type: ChallengeType;
};

export default function ChallengeOptions({
  options,
  type,
}: ChallengeOptionsProps) {
  return (
    <div className={getGridClassName(type)}>
      {options.map((option, index) => (
        <OptionCard
          key={option.id}
          isDisabled={false}
          onClick={() => {
            /** */
          }}
          shortcut={`${index + 1}`}
          type={type}
          {...option}
        />
      ))}
    </div>
  );
}
