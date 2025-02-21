import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeedHeaderSkeleton() {
  return (
    <div className="sticky top-0 mb-5 flex items-center justify-between border-b-2 bg-white pb-3 text-neutral-400 lg:z-50 lg:-mt-7 lg:pt-7">
      <Button size="sm" variant="ghost" asChild>
        <Link href="/courses">
          <ArrowLeft className="stroke-2 text-neutral-400" size={20} />
        </Link>
      </Button>
      <Skeleton className="h-[28px] w-[70px] rounded-full" />

      <div className="w-6" />
    </div>
  );
}
