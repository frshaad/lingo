import type { UserProgressType } from '@/db/queries';

export type UserProgressWithActiveCourse = Omit<
  NonNullable<UserProgressType>,
  'activeCourse'
> & {
  activeCourse: NonNullable<NonNullable<UserProgressType>['activeCourse']>;
};
