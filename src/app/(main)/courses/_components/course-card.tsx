'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Check, Loader } from 'lucide-react';
import { toast } from 'sonner';

import { upsertUserProgress } from '@/actions/user-progress.action';
import type { course } from '@/db/schema';
import { cn } from '@/lib/utils';

type CourseCardProps = {
  disabled?: boolean;
  active?: boolean;
} & typeof course.$inferSelect;

export default function CourseCard({
  id,
  imageSrc,
  title,
  active,
  disabled,
}: CourseCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleActiveCourse = () => {
    if (isPending || disabled) {
      return;
    }

    if (active) {
      router.push('/learn');
      return;
    }

    startTransition(async () => {
      try {
        await upsertUserProgress(id);
      } catch (error) {
        if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
          toast.error('Failed to activate course. Please try again.');
        }
      }
    });
  };

  return (
    <button
      aria-label={`Select ${title} course`}
      className={cn(
        'flex h-full min-h-52 min-w-48 flex-col items-center justify-between',
        'rounded-xl border-2 border-b-4 p-3 pb-6',
        'hover:bg-black/5 active:border-b-2',
        (disabled || isPending) && 'pointer-events-none opacity-50'
      )}
      disabled={disabled || isPending}
      type="button"
      onClick={handleActiveCourse}
    >
      <div className="flex min-h-6 w-full items-center justify-end">
        {active ? (
          <div className="flex items-center justify-center rounded-md bg-green-600 p-1.5">
            <Check
              aria-hidden="true"
              className="stroke-[4] text-white"
              size={16}
            />
          </div>
        ) : undefined}
        {isPending ? (
          <Loader
            aria-hidden="true"
            className="animate-spin text-neutral-500"
            size={20}
          />
        ) : undefined}
      </div>
      <Image
        alt={`${title} course image`}
        className="rounded-lg border object-cover drop-shadow-md"
        height={70}
        src={imageSrc}
        width={93.33}
        priority
      />
      <p className="mt-3 text-center font-bold capitalize text-neutral-700">
        {title}
      </p>
    </button>
  );
}
