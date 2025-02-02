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
            src={userProgress.activeCourse.imageSrc}
            alt={userProgress.activeCourse.title}
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
