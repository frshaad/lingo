'use client';

import { usePathname } from 'next/navigation';

import MobileSidebar from './mobile-sidebar';

export default function MobileHeader() {
  const pathname = usePathname();
  const showMobileSidebar = pathname !== '/courses';

  if (!showMobileSidebar) {
    return;
  }

  return (
    <nav className="fixed top-0 z-50 flex h-12 w-full items-center border-b bg-green-500 px-6 lg:hidden">
      <MobileSidebar />
    </nav>
  );
}
