import Link from 'next/link';

import { Button } from '@/components/ui/button';

import QuestItemSkeleton from './quest-item.skeleton';

export default function QuestsCardSkeleton() {
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
        <QuestItemSkeleton />
        <QuestItemSkeleton />
        <QuestItemSkeleton />
        <QuestItemSkeleton />
        <QuestItemSkeleton />
      </ul>
    </section>
  );
}
