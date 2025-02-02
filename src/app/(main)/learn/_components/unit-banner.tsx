import Link from 'next/link';

import { NotebookText } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface UnitBannerProps {
  title: string;
  description: string;
  isCompleted?: boolean;
}

export default function UnitBanner({
  title,
  description,
  isCompleted = false,
}: UnitBannerProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-green-500 p-5 text-white">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
      {!isCompleted && (
        <Link href="/lesson">
          <Button
            className="hidden border-2 border-b-4 active:border-b-2 xl:flex"
            size="lg"
            variant="secondary"
          >
            <NotebookText className="mr-2" />
            Continue
          </Button>
        </Link>
      )}
    </div>
  );
}
