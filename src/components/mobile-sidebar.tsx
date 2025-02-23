'use client';

import { useCallback, useState } from 'react';

import { Menu } from 'lucide-react';

import Sidebar from '@/components/sidebar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeMobileSidebar = useCallback(() => {
    setIsOpen((previous) => !previous);
  }, []);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => {
        closeMobileSidebar();
      }}
    >
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="z-[100] p-0" side="left">
        <SheetHeader>
          <SheetTitle />
        </SheetHeader>
        <Sidebar closeMobileSidebar={closeMobileSidebar} />
      </SheetContent>
    </Sheet>
  );
}
