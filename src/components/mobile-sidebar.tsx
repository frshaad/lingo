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
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="z-[100] p-0" side="left">
        <SheetHeader>
          <SheetTitle />
        </SheetHeader>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
