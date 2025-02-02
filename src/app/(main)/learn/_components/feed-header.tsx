'use client';

import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useLearnContext } from '../_context/learn-context';

export default function FeedHeader() {
  const { userProgress } = useLearnContext();

  return (
    <div className="sticky top-0 mb-5 flex items-center justify-between border-b-2 bg-white pb-3 text-neutral-400 lg:z-50 lg:-mt-7 lg:pt-7">
      <Button size="sm" variant="ghost" asChild>
        <Link href="/courses">
          <ArrowLeft className="stroke-2 text-neutral-400" size={20} />
        </Link>
      </Button>
      <h1 className="text-lg font-bold capitalize">
        {userProgress.activeCourse.title}
      </h1>
      <div className="w-6" />
    </div>
  );
}
