'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

type Props = {
  path: string;
  label: string;
  iconSrc: string;
};
export default function SidebarItem({ label, path, iconSrc }: Props) {
  const pathname = usePathname();
  const isLinkActive = path === pathname;

  return (
    <li>
      <Button
        variant={isLinkActive ? 'sidebarGhost' : 'sidebar'}
        className="h-14 w-full justify-start"
        asChild
      >
        <Link href={path}>
          <Image
            src={iconSrc}
            alt={label}
            className="mr-5"
            height={32}
            width={32}
          />
          {label}
        </Link>
      </Button>
    </li>
  );
}
