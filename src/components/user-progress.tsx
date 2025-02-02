'use client';

import Image from 'next/image';
import Link from 'next/link';

import { InfinityIcon } from 'lucide-react';

import { useLearnContext } from '@/app/(main)/learn/_context/learn-context';
import { Button } from '@/components/ui/button';

type Props = {
  hasActiveSubscription: boolean;
};

export default function UserProgress({ hasActiveSubscription }: Props) {
  const { userProgress } = useLearnContext();
  const { hearts, points } = userProgress;

  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <Button variant="ghost" asChild>
        <Link href="/courses">
          <Image
            alt={userProgress.activeCourse.title}
            className="rounded-md border"
            height={32}
            src={userProgress.activeCourse.imageSrc}
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
