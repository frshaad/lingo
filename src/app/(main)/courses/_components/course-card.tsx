import { Check } from 'lucide-react';
import Image from 'next/image';

import { coursesTable } from '@/db/schema';
import { cn } from '@/lib/utils';

type Props = {
  disabled?: boolean;
  active?: boolean;
  // onClick: (id: number) => void;
} & typeof coursesTable.$inferSelect;

export default function CourseCard({
  imageSrc,
  title,
  active,
  disabled,
}: Props) {
  return (
    <div
      className={cn(
        'flex h-full min-h-52 min-w-48 cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-b-4 p-3 pb-6 hover:bg-black/5 active:border-b-2',
        disabled && 'pointer-events-none opacity-50',
      )}
    >
      <div className="flex min-h-6 w-full items-center justify-end">
        {active && (
          <div className="flex items-center justify-center rounded-md bg-green-600 p-1.5">
            <Check size={16} className="stroke-[4] text-white" />
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        height={70}
        width={93.33}
        className="rounded-lg border object-cover drop-shadow-md"
      />
      <p className="mt-3 text-center font-bold capitalize text-neutral-700">
        {title}
      </p>
    </div>
  );
}
