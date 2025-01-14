import type { Challenge, ChallengeOption } from '@/db/schema';
import { cn } from '@/lib/utils';

import OptionCard from './option-card';

export type Status = 'correct' | 'wrong' | 'none';
export type ChallengeOptionType = Challenge['type'];

type Props = {
  options: ChallengeOption[];
  onSelect: (id: number) => void;
  status?: Status;
  selectedOption?: number;
  isDisabled?: boolean;
  type: ChallengeOptionType;
};

export default function ChallengeOptions({
  status = 'none',
  isDisabled = false,
  options,
  selectedOption,
  type,
}: Props) {
  return (
    <div
      className={cn(
        'grid gap-4',
        type === 'ASSIST' && 'grid-cols-1',
        type === 'SELECT' &&
          'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]',
      )}
    >
      {options.map((option, i) => (
        <OptionCard
          isDisabled={isDisabled}
          onClick={() => {}}
          key={option.id}
          shortcut={`${i + 1}`}
          isSelected={selectedOption === option.id}
          status={status}
          type={type}
          {...option}
        />
      ))}
    </div>
  );
}
