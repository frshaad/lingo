import { NotebookText } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type Props = {
  title: string;
  description: string;
};

export default function UnitBanner({ title, description }: Props) {
  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-green-500 p-5 text-white">
      <div className="space-y-2.5">
        <h3 className="font-bold text-2xl">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
      {/* TODO: if challenge is completed, don't show the Continue button. */}
      <Link href="/lesson">
        <Button
          size="lg"
          variant="secondary"
          className="hidden border-2 border-b-4 active:border-b-2 xl:flex"
        >
          <NotebookText className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
}
