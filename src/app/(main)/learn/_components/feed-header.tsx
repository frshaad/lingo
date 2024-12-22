import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type FeedHeaderProps = {
  title: string;
};

export default function FeedHeader({ title }: FeedHeaderProps) {
  return (
    <div className="sticky top-0 mb-5 flex items-center justify-between border-b-2 bg-white pb-3 text-neutral-400 lg:z-50 lg:-mt-7 lg:pt-7">
      <Button size="sm" variant="ghost" asChild>
        <Link href="/courses">
          <ArrowLeft size={20} className="stroke-2 text-neutral-400" />
        </Link>
      </Button>
      <h1 className="text-lg font-bold">{title}</h1>
      <div className="w-6" />
    </div>
  );
}
