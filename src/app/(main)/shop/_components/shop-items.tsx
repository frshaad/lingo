'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { toast } from 'sonner';

import { addUserSubscription } from '@/actions/subscribe.action';
import { refillHearts } from '@/actions/user-progress.action';
import { Button } from '@/components/ui/button';
import { FULL_LIVES_COUNT, REFILL_HEARTS_COST } from '@/lib/global.constant';

type Properties = {
  points: number;
  hearts: number;
  hasActiveSubscription: boolean;
};

export default function ShopItems({
  hearts,
  points,
  hasActiveSubscription,
}: Properties) {
  const router = useRouter();
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

  const handleSubscribe = () => {
    startTransition(() => {
      addUserSubscription()
        .then((response) => {
          if (response.success) {
            toast.success('Subscription Activated!🎉');
            router.push('/shop');
          }
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <section className="w-full">
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

      <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
        <Image alt="Unlimited" height={60} src="/unlimited.svg" width={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Unlimited Hearts
          </p>
        </div>
        <Button disabled={pending} onClick={handleSubscribe}>
          {hasActiveSubscription ? 'settings' : 'upgrade'}
        </Button>
      </div>
    </section>
  );
}
