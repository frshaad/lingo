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
  const { activeChallengeChoices, activeChallenge } = useQuizContext();

  return (
    <div className={getGridClassName(activeChallenge.type)}>
      {activeChallengeChoices.map((opt, i) => (
        <OptionCard key={opt.id} shortcut={`${i + 1}`} {...opt} />
      ))}
    </div>
  );
}
