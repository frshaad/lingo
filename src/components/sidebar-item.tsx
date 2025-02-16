'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

type Properties = {
  path: string;
  label: string;
  iconSrc: string;
};

export default function SidebarItem({ label, path, iconSrc }: Properties) {
  const pathname = usePathname();
  const isLinkActive = path === pathname;

  return (
    <li>
      <Button
        className="h-14 w-full justify-start"
        variant={isLinkActive ? 'sidebarGhost' : 'sidebar'}
        asChild
      >
        <Link href={path}>
          <Image
            alt={label}
            className="mr-5"
            height={32}
            src={iconSrc}
            width={32}
          />
          {label}
        </Link>
      </Button>
    </li>
  );
}
