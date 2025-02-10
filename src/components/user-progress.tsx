'use client';

import Image from 'next/image';
import Link from 'next/link';

import { InfinityIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { UserProgressWithActiveCourse } from '@/types/user-progress';

type Properties = {
  hasActiveSubscription: boolean;
  userProgress: UserProgressWithActiveCourse;
};

export default function UserProgress({
  hasActiveSubscription,
  userProgress,
}: Properties) {
  const {
    hearts,
    points,
    activeCourse: { title, imageSrc },
  } = userProgress;

  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <Button variant="ghost" asChild>
        <Link href="/courses">
          <Image
            alt={title}
            className="rounded-md border"
            height={32}
            src={imageSrc}
            width={32}
          />
        </Link>
      </Button>

      <Button variant="ghost" asChild>
        <Link className="text-orange-500" href="/shop">
          <Image
            alt="points"
            className="mr-2"
            height={28}
            src="/points.svg"
            width={28}
          />
          {points}
        </Link>
      </Button>

      <Button variant="ghost" asChild>
        <Link className="text-rose-500" href="/shop">
          <Image
            alt="hearts"
            className="mr-2"
            height={22}
            src="/heart.svg"
            width={22}
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="stroke-[3]" size={16} />
          ) : (
            hearts
          )}
        </Link>
      </Button>
    </div>
  );
}
