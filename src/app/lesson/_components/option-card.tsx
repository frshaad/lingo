/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';

import { type ChallengeOption } from '@/db/schema';
import { cn } from '@/lib/utils';

import type { ChallengeOptionType, Status } from './challenge-options';

type Props = ChallengeOption & {
  isDisabled: boolean;
  onClick: () => void;
  shortcut: string;
  isSelected?: boolean;
  status?: Status;
  type: ChallengeOptionType;
};

export default function OptionCard({
  onClick,
  isSelected,
  status,
  isDisabled,
  type,
  imageSrc,
  audioSrc,
  text,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-full rounded-xl border-2 border-b-4 p-4 hover:bg-black/5 active:border-b-2 lg:p-6',
        isSelected && 'border-sky-300 bg-sky-100 hover:bg-sky-100',
        isSelected &&
          status === 'correct' &&
          'border-green-300 bg-green-100 hover:bg-green-100',
        isSelected &&
          status === 'wrong' &&
          'border-rose-300 bg-rose-100 hover:bg-rose-100',
        isDisabled && 'pointer-events-none hover:bg-white',
        type === 'ASSIST' && 'w-full lg:p-3',
      )}
    >
      {imageSrc && (
        <div className="relative mb-4 aspect-square max-h-20 w-full lg:max-h-36">
          <Image src={imageSrc} alt={text} fill />
        </div>
      )}
    </button>
  );
}
