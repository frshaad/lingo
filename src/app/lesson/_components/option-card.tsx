import Image from 'next/image';
import { useAudio, useKey } from 'react-use';

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
  text,
  shortcut,
  audioSrc,
}: Props) {
  const [audio, , controls] = useAudio({ src: audioSrc || '' });

  const handleClick = () => {
    if (isDisabled) return;

    controls.play();
    onClick();
  };

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <button
      onClick={handleClick}
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
      {audio}
      {imageSrc && (
        <div className="relative mb-4 aspect-square max-h-20 w-full lg:max-h-36">
          <Image src={imageSrc} alt={text} fill />
        </div>
      )}
      <div
        className={cn(
          'flex items-center justify-between',
          type === 'ASSIST' && 'flex-row-reverse',
        )}
      >
        {type === 'ASSIST' && <div />}
        <p
          className={cn(
            'text-neutral-600 max-lg:text-sm',
            isSelected && 'text-sky-500',
            isSelected && status === 'correct' && 'text-green-500',
            isSelected && status === 'wrong' && 'text-rose-500',
          )}
        >
          {text}
        </p>
        <span
          className={cn(
            'flex size-5 items-center justify-center rounded-lg border-2 font-semibold text-neutral-400 max-lg:text-xs lg:size-7',
            isSelected && 'border-sky-300 text-sky-500',
            isSelected &&
              status === 'correct' &&
              'border-green-500 text-green-500',
            isSelected && status === 'wrong' && 'border-rose-500 text-rose-500',
          )}
        >
          {shortcut}
        </span>
      </div>
    </button>
  );
}
