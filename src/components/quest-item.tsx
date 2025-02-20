import Image from 'next/image';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { Quest } from '@/types/quest';

type QuestProperties = {
  userPoints: number;
  quest: Quest;
  isLarge?: boolean;
};

export default function QuestItem({
  quest,
  userPoints,
  isLarge = false,
}: QuestProperties) {
  const progress = (userPoints / quest.value) * 100;

  return (
    <article
      className={cn(
        'flex w-full items-center',
        isLarge ? 'gap-x-4 border-t-2 p-4' : 'gap-x-3 pb-4',
      )}
      key={quest.id}
    >
      <Image
        alt="points"
        height={isLarge ? 60 : 40}
        src="/points.svg"
        width={isLarge ? 60 : 40}
      />
      <div className="flex w-full flex-col gap-y-2">
        <p
          className={cn(
            'font-bold text-neutral-700',
            isLarge ? 'text-xl' : 'text-sm',
          )}
        >
          {quest.title}
        </p>
        <Progress className={isLarge ? 'h-3' : 'h-2'} value={progress} />
      </div>
    </article>
  );
}
