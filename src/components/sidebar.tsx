import { cn } from '@/lib/utils';

type Props = React.ComponentPropsWithoutRef<'aside'>;

export default function Sidebar({ className }: Props) {
  return (
    <aside
      className={cn(
        'left-0 top-0 flex h-full flex-col border-r-2 bg-blue-300 px-4 lg:fixed lg:w-64',
        className,
      )}
    >
      Sidebar
    </aside>
  );
}
