'use client';

import { useRouter } from 'next/navigation';

import { useKey, useMedia } from 'react-use';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { QuizStatus } from '@/types/quiz';

import { useQuizContext } from '../_context/quiz-context';
import FooterStatusMessage from './footer-status-message';

export type LocalStatus = QuizStatus | 'completed';
type QuizFooterProperties = {
  status: LocalStatus;
};

export default function QuizFooter({ status }: QuizFooterProperties) {
  const router = useRouter();
  const isMobile = useMedia('(max-width: 1024px)');
  const {
    selectedOption,
    lessonId,
    proceedToNextStep,
    correctAudio,
    incorrectAudio,
  } = useQuizContext();

  const handleProceedToNextStep = () => {
    if (status === 'completed') {
      router.push('/learn');
      return;
    }
    proceedToNextStep();
  };

  useKey('Enter', handleProceedToNextStep, {}, [handleProceedToNextStep]);

  return (
    <>
      {incorrectAudio}
      {correctAudio}

      <footer
        className={cn(
          'h-24 border-t-2 lg:h-36',
          status === 'correct' && 'border-transparent bg-green-100',
          status === 'wrong' && 'border-transparent bg-rose-100',
        )}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 lg:px-10">
          <FooterStatusMessage
            isMobile={isMobile}
            lessonId={lessonId}
            status={status}
          />
          <Button
            className="ml-auto capitalize"
            disabled={status === 'none' && !selectedOption} // Change this line
            size={isMobile ? 'sm' : 'lg'}
            variant={status === 'wrong' ? 'danger' : 'secondary'}
            onClick={handleProceedToNextStep}
          >
            {status === 'none' && 'Check'}
            {status === 'correct' && 'Next'}
            {status === 'wrong' && 'Retry'}
            {status === 'completed' && 'Continue'}
          </Button>
        </div>
      </footer>
    </>
  );
}
