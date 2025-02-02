'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { X } from 'lucide-react';

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
              alt="sad mascot"
              height={80}
              src="/mascot_sad.svg"
              width={80}
            />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            Wait, Don&apos;t go!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You&apos;re about to leave the lesson. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-5 flex w-full gap-y-2 sm:flex-col">
          <DialogClose asChild>
            <Button className="w-full" size="lg" variant="primary">
              Keep Learning
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full"
              size="lg"
              variant="dangerGhost"
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
