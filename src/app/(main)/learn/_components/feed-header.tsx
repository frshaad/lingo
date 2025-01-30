'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useLearnContext } from '../_context/learn-context';

export default function FeedHeader() {
  const { activeCourse } = useLearnContext();

  return (
    <div className="lg:-mt-7 sticky top-0 mb-5 flex items-center justify-between border-b-2 bg-white pb-3 text-neutral-400 lg:z-50 lg:pt-7">
      <Button size="sm" variant="ghost" asChild>
        <Link href="/courses">
          <ArrowLeft size={20} className="stroke-2 text-neutral-400" />
        </Link>
      </Button>
      <h1 className="font-bold text-lg capitalize">{activeCourse.title}</h1>
      <div className="w-6" />
    </div>
  );
}
