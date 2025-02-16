'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { toast } from 'sonner';

import { addUserSubscription } from '@/actions/subscribe.action';
import { Button } from '@/components/ui/button';

type Properties = {
  hasActiveSubscription: boolean;
};

export default function Subscription({ hasActiveSubscription }: Properties) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

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
    <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
      <Image alt="Unlimited" height={60} src="/unlimited.svg" width={60} />
      <div className="flex-1">
        <p className="text-base font-bold text-neutral-700 lg:text-xl">
          Unlimited Hearts
        </p>
      </div>
      <Button disabled={pending} onClick={handleSubscribe}>
        {hasActiveSubscription ? 'settings' : pending ? 'wait...' : 'upgrade'}
      </Button>
    </div>
  );
}
