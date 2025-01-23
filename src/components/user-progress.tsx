import { InfinityIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { course } from '@/db/schema';

type Props = {
  activeCourse: typeof course.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export default function UserProgress({
  activeCourse,
  hasActiveSubscription,
  hearts,
  points,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <Button variant="ghost" asChild>
        <Link href="/courses">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            width={32}
            height={32}
            className="rounded-md border"
          />
        </Link>
      </Button>

      <Button variant="ghost" asChild>
        <Link href="/shop" className="text-orange-500">
          <Image
            src="/points.svg"
            alt="points"
            width={28}
            height={28}
            className="mr-2"
          />
          {points}
        </Link>
      </Button>

      <Button variant="ghost" asChild>
        <Link href="/shop" className="text-rose-500">
          <Image
            src="/heart.svg"
            alt="hearts"
            width={22}
            height={22}
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <InfinityIcon size={16} className="stroke-[3]" />
          ) : (
            hearts
          )}
        </Link>
      </Button>
    </div>
  );
}
