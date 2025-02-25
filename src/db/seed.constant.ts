import * as schema from '@/db/schema';

import {
  GermanChallengeOptions,
  GermanChallenges,
  GermanLessons,
  GermanUnits,
} from './seed.german.constant';
import {
  SpanishChallengeOptions,
  SpanishChallenges,
  SpanishLessons,
  SpanishUnits,
} from './seed.spanish.constant';

export const TABLES_TO_CLEAR = [
  schema.course,
  schema.lesson,
  schema.unit,
  schema.userProgress,
  schema.challenge,
  schema.challengeOption,
  schema.challengeProgress,
  schema.userSubscription,
];

export const COURSES: (typeof schema.course.$inferInsert)[] = [
  { id: 1, title: 'Spanish', imageSrc: '/es.svg' },
  { id: 2, title: 'German', imageSrc: '/de.svg' },
  { id: 3, title: 'French', imageSrc: '/fr.svg' },
  { id: 4, title: 'Italian', imageSrc: '/it.svg' },
];
export const UNITS = [...SpanishUnits, ...GermanUnits];
export const LESSONS = [...SpanishLessons, ...GermanLessons];
export const CHALLENGES = [...SpanishChallenges, ...GermanChallenges];
export const CHALLENGE_OPTIONS = [
  ...SpanishChallengeOptions,
  ...GermanChallengeOptions,
];
