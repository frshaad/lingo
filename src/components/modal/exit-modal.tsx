'use client';

import { X } from 'lucide-react';
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
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ExitModal() {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger>
        <X className="cursor-pointer text-slate-500 transition hover:opacity-75" />
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image
              src="/mascot_sad.svg"
              alt="sad mascot"
              width={80}
              height={80}
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Wait, Don&apos;t go!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You&apos;re about to leave the lesson. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-5 flex w-full gap-y-2 sm:flex-col">
          <DialogClose asChild>
            <Button size="lg" variant="primary" className="w-full">
              Keep Learning
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              size="lg"
              variant="dangerGhost"
              className="w-full"
              onClick={() => {
                router.push('/learn');
              }}
            >
              End Session
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
