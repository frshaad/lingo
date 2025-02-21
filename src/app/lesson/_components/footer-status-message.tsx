'use client';

import { useRouter } from 'next/navigation';

import { CheckCircle, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { LocalStatus } from './quiz-footer';

export default function FooterStatusMessage({
  status,
  lessonId,
  isMobile,
}: {
  status: LocalStatus;
  lessonId: number;
  isMobile: boolean;
}) {
  const router = useRouter();

  if (status === 'none') {
    return;
  }

  if (status === 'completed') {
    return (
      <Button
        size={isMobile ? 'sm' : 'lg'}
        variant="default"
        onClick={() => router.push(`/lesson/${lessonId}`)}
      >
        Practice Again
      </Button>
    );
  }

  const Icon = status === 'correct' ? CheckCircle : XCircle;

  return (
    <div
      className={cn(
        'flex items-center text-base font-bold capitalize lg:text-2xl',
        status === 'correct' ? 'text-green-500' : 'text-rose-500',
      )}
    >
      <Icon className="mr-4 size-6 lg:size-10" />
      {status === 'correct' ? 'Nicely Done!' : 'Try Again.'}
    </div>
  );
}
