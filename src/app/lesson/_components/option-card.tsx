import Image from 'next/image';

import { useAudio, useKey } from 'react-use';

import type { challengeOption } from '@/db/schema';
import { cn } from '@/lib/utils';
import type { QuizStatus } from '@/types/quiz';

import { useQuizContext } from '../_context/quiz-context';

type OptionCardProperties = typeof challengeOption.$inferSelect & {
  shortcut: string;
};

type CardStatus = QuizStatus;
type GetButtonStylesParameters = {
  isSelected: boolean;
  status: CardStatus;
  isDisabled: boolean;
  isAssistType: boolean;
};

const KeyShortcut = ({
  shortcut,
  isSelected,
  status,
}: {
  shortcut: string;
  isSelected: boolean;
  status: CardStatus;
}) => (
  <span
    className={cn(
      'flex size-5 items-center justify-center rounded-lg border-2 font-semibold text-neutral-400 max-lg:text-xs lg:size-7',
      isSelected && 'border-sky-300 text-sky-500',
      isSelected && status === 'correct' && 'border-green-500 text-green-500',
      isSelected && status === 'wrong' && 'border-rose-500 text-rose-500',
    )}
  >
    {shortcut}
  </span>
);

const OptionImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative mb-4 aspect-square max-h-20 w-full lg:max-h-36">
    <Image alt={alt} src={src} fill />
  </div>
);

const getButtonStyles = ({
  isAssistType,
  isDisabled,
  isSelected,
  status,
}: GetButtonStylesParameters) => {
  return cn(
    'h-full rounded-xl border-2 border-b-4 p-4 hover:bg-black/5 active:border-b-2 lg:p-6',
    isSelected && 'border-sky-300 bg-sky-100 hover:bg-sky-100',
    isSelected &&
      status === 'correct' &&
      'border-green-300 bg-green-100 hover:bg-green-100',
    isSelected &&
      status === 'wrong' &&
      'border-rose-300 bg-rose-100 hover:bg-rose-100',
    isDisabled && 'pointer-events-none hover:bg-white',
    isAssistType && 'w-full lg:p-3',
  );
};

export default function OptionCard({
  imageSrc,
  text,
  shortcut,
  audioSrc,
  id,
}: OptionCardProperties) {
  const {
    pending: isDisabled,
    selectChoice,
    selectedOption,
    activeChallenge,
    status,
  } = useQuizContext();
  const [audio, , controls] = useAudio({ src: audioSrc || '' });

  const isSelected = selectedOption === id;
  const isAssistType = activeChallenge.type === 'ASSIST';
  const cardStatus = status as CardStatus;

  const handleClick = () => {
    if (isDisabled) {
      return;
    }

    if (audioSrc) {
      controls.play();
    }

    selectChoice(id);
  };

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <button
      className={getButtonStyles({
        isAssistType,
        isDisabled,
        isSelected,
        status: cardStatus,
      })}
      type="button"
      onClick={handleClick}
    >
      {Boolean(audioSrc) && audio}
      {imageSrc ? <OptionImage alt={text} src={imageSrc} /> : undefined}
      <div
        className={cn(
          'flex items-center justify-between',
          isAssistType && 'flex-row-reverse',
        )}
      >
        {isAssistType ? <div /> : undefined}
        <p
          className={cn(
            'text-neutral-600 text-lg font-medium max-lg:text-sm',
            isSelected && 'text-sky-500',
            isSelected && status === 'correct' && 'text-green-500',
            isSelected && status === 'wrong' && 'text-rose-500',
          )}
        >
          {text}
        </p>
        <KeyShortcut
          isSelected={isSelected}
          shortcut={shortcut}
          status={cardStatus}
        />
      </div>
    </button>
  );
}
