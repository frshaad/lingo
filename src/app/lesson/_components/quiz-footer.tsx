'use client';

import { CheckCircle, type LucideIcon, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useKey, useMedia } from 'react-use';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { QuizStatus } from '@/types/quiz';
import { useQuizContext } from '../_context/quiz-context';

type LocalStatus = QuizStatus | 'completed';

function FooterStatusMessage({
  status,
  lessonId,
  isMobile,
}: { status: LocalStatus; lessonId: number; isMobile: boolean }) {
  const router = useRouter();

  if (status === 'none') {
    return null;
  }

  if (status === 'completed') {
    return (
      <Button
        variant="default"
        size={isMobile ? 'sm' : 'lg'}
        onClick={() => router.push(`/lesson/${lessonId}`)}
      >
        Practice Again
      </Button>
    );
  }

  let Icon: LucideIcon;
  if (status === 'correct') {
    Icon = CheckCircle;
  } else {
    Icon = XCircle;
  }

  return (
    <div
      className={cn(
        'flex items-center font-bold text-base capitalize lg:text-2xl',
        status === 'correct' ? 'text-green-500 ' : 'text-rose-500 '
      )}
    >
      <Icon className="mr-4 size-6 lg:size-10" />
      {status === 'correct' ? 'Nicely Done!' : 'Try Again.'}
    </div>
  );
}

export default function QuizFooter() {
  const isMobile = useMedia('(max-width: 1024px)');
  const { selectedOption, status, lessonId } = useQuizContext();
  const localStatus = status as LocalStatus;

  const onCheck = () => {
    /** */
  };
  const handleClick = () => {
    /** */
  };

  useKey('Enter', onCheck, {}, [onCheck]);

  return (
    <footer
      className={cn(
        'h-24 border-t-2 lg:h-36',
        status === 'correct' && 'border-transparent bg-green-100',
        status === 'wrong' && 'border-transparent bg-rose-100'
      )}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 lg:px-10">
        <FooterStatusMessage
          status={localStatus}
          lessonId={lessonId}
          isMobile={isMobile}
        />
        <Button
          size={isMobile ? 'sm' : 'lg'}
          variant={status === 'wrong' ? 'danger' : 'secondary'}
          onClick={handleClick}
          disabled={!selectedOption}
          className="ml-auto capitalize"
        >
          {localStatus === 'none' && 'Check'}
          {localStatus === 'correct' && 'Next'}
          {localStatus === 'wrong' && 'Retry'}
          {localStatus === 'completed' && 'Continue'}
        </Button>
      </div>
    </footer>
  );
}
