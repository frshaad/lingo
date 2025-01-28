'use client';

import { Check, Loader } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
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
      type="button"
      disabled={disabled || isPending}
      className={cn(
        'flex h-full min-h-52 min-w-48 flex-col items-center justify-between',
        'rounded-xl border-2 border-b-4 p-3 pb-6',
        'hover:bg-black/5 active:border-b-2',
        (disabled || isPending) && 'pointer-events-none opacity-50'
      )}
      onClick={handleActiveCourse}
      aria-label={`Select ${title} course`}
    >
      <div className="flex min-h-6 w-full items-center justify-end">
        {active && (
          <div className="flex items-center justify-center rounded-md bg-green-600 p-1.5">
            <Check
              size={16}
              className="stroke-[4] text-white"
              aria-hidden="true"
            />
          </div>
        )}
        {isPending && (
          <Loader
            size={20}
            className="animate-spin text-neutral-500"
            aria-hidden="true"
          />
        )}
      </div>
      <Image
        src={imageSrc}
        alt={`${title} course image`}
        height={70}
        width={93.33}
        className="rounded-lg border object-cover drop-shadow-md"
        priority
      />
      <p className="mt-3 text-center font-bold text-neutral-700 capitalize">
        {title}
      </p>
    </button>
  );
}
