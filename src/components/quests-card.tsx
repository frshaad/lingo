import Link from 'next/link';

import QuestItem from '@/components/quest-item';
import { Button } from '@/components/ui/button';
import { QUESTS } from '@/lib/global.constant';

type Properties = {
  points: number;
};

export default function QuestsCard({ points }: Properties) {
  return (
    <section className="space-y-4 rounded-xl border-2 p-4">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-bold">Quests</h3>
        <Link href="/quests">
          <Button size="sm" variant="primaryGhost">
            View All
          </Button>
        </Link>
      </div>
      <ul className="w-full space-y-4">
        {QUESTS.map((quest) => (
          <QuestItem key={quest.id} quest={quest} userPoints={points} />
        ))}
      </ul>
    </section>
  );
}
