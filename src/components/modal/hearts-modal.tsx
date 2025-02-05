'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useHeartsModal } from '@/hooks/use-hearts-modal';

export default function HeartsModal() {
  const router = useRouter();
  const { open, setOpen } = useHeartsModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>
        <X className="cursor-pointer text-slate-500 transition hover:opacity-75" />
      </DialogTrigger> */}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image
              alt="sad mascot"
              height={80}
              src="/mascot_bad.svg"
              width={80}
            />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            You ran out of hearts!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Go Pro for unlimited hearts, or purchase them in the store
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-5 flex w-full gap-y-2 sm:flex-col">
          <DialogClose asChild>
            <Button
              className="w-full"
              size="lg"
              variant="primary"
              onClick={() => {
                router.push('/store');
              }}
            >
              Get unlimited hearts
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="w-full" size="lg" variant="primaryGhost">
              No thanks
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
