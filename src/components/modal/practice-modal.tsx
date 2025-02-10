'use client';

import Image from 'next/image';

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
import { usePracticeModal } from '@/hooks/use-practice-modal';

export default function PracticeModal() {
  const { isOpen, close } = usePracticeModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image alt="heart" height={100} src="/heart.svg" width={100} />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            Practice the lesson
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Use practice to regain hearts and points. You won&apos;t lose hearts
            or points in a practice.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-5 flex w-full gap-y-2 sm:flex-col">
          <DialogClose asChild>
            <Button className="w-full" size="lg" variant="primary">
              I understand
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
