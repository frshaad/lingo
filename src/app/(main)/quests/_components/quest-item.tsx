import Image from 'next/image';

import { Progress } from '@/components/ui/progress';
import type { Quest } from '@/types/quest';

type QuestProperties = {
  userPoints: number;
  quest: Quest;
};

export default function QuestItem({ quest, userPoints }: QuestProperties) {
  const progress = (userPoints / quest.value) * 100;

  return (
    <article
      className="flex w-full items-center gap-x-4 border-t-2 p-4"
      key={quest.id}
    >
      <Image alt="points" height={60} src="/points.svg" width={60} />
      <div className="flex w-full flex-col gap-y-2">
        <p className="text-xl font-bold text-neutral-700">{quest.title}</p>
        <Progress className="h-3" value={progress} />
      </div>
    </article>
  );
}
