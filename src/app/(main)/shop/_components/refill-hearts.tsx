'use client';

import Image from 'next/image';
import { useTransition } from 'react';

import { toast } from 'sonner';

import { refillHearts } from '@/actions/user-progress.action';
import { Button } from '@/components/ui/button';
import { FULL_LIVES_COUNT, REFILL_HEARTS_COST } from '@/lib/global.constant';

type Properties = {
  hearts: number;
  points: number;
};

export default function RefillHearts({ hearts, points }: Properties) {
  const [pending, startTransition] = useTransition();

  const isRefillHeartsDisabled =
    pending || hearts === FULL_LIVES_COUNT || points < REFILL_HEARTS_COST;

  const handleRefillHearts = () => {
    if (isRefillHeartsDisabled) {
      return;
    }

    startTransition(() => {
      refillHearts().catch(() =>
        toast.error('Refilling Hearts: Something went wrong!')
      );
    });
  };

  return (
    <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
      <Image alt="hearts" height={60} src="/heart.svg" width={60} />
      <div className="flex-1">
        <p className="text-base font-bold text-neutral-700 lg:text-xl">
          Refill Hearts
        </p>
      </div>
      <Button disabled={isRefillHeartsDisabled} onClick={handleRefillHearts}>
        {hearts === FULL_LIVES_COUNT ? (
          'full'
        ) : (
          <div className="flex items-center">
            <Image alt="points" height={20} src="/points.svg" width={20} />
            <p>{REFILL_HEARTS_COST}</p>
          </div>
        )}
      </Button>
    </div>
  );
}
