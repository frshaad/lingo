import { Check, Crown, type LucideIcon, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  isCompleted: boolean;
  isLast: boolean;
  isLockedLesson: boolean;
};

export default function LessonIcon({
  isCompleted,
  isLast,
  isLockedLesson,
}: Props) {
  let Icon: LucideIcon;
  if (isCompleted) {
    Icon = Check;
  } else if (isLast) {
    Icon = Crown;
  } else {
    Icon = Star;
  }

  return (
    <Button
      size="rounded"
      variant={isLockedLesson ? 'locked' : 'secondary'}
      className="size-16 border-b-8"
    >
      <Icon
        size={10}
        className={cn(
          isLockedLesson
            ? 'fill-neutral-400 stroke-neutral-400 text-neutral-400'
            : 'fill-primary-foreground text-primary-foreground',
          isCompleted && 'fill-none stroke-[4]'
        )}
      />
    </Button>
  );
}
