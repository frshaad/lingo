import Link from 'next/link';

import { ClerkLoaded, UserButton } from '@clerk/nextjs';

import { cn } from '@/lib/utils';

import ClerkLoadingSpinner from './clerk/clerk-loading';
import Logo from './logo';
import SidebarItem from './sidebar-item';

const SIDEBAR_ITEMS = [
  { id: 1, label: 'learn', path: '/learn', iconSrc: '/learn.svg' },
  {
    id: 2,
    label: 'leaderboard',
    path: '/leaderboard',
    iconSrc: '/leaderboard.svg',
  },
  { id: 3, label: 'quests', path: '/quests', iconSrc: '/quests.svg' },
  { id: 4, label: 'shop', path: '/shop', iconSrc: '/shop.svg' },
];

type Properties = React.ComponentPropsWithoutRef<'aside'> & {
  closeMobileSidebar?: () => void;
};

export default function Sidebar({ className, closeMobileSidebar }: Properties) {
  return (
    <aside
      className={cn(
        'left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-72',
        className,
      )}
    >
      <Link href="/learn">
        <Logo />
      </Link>

      <ul className="flex flex-1 flex-col gap-y-2">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            closeMobileSidebar={closeMobileSidebar}
            key={item.id}
            {...item}
          />
        ))}
      </ul>

      <div className="p-4">
        <ClerkLoadingSpinner />
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </div>
    </aside>
  );
}
