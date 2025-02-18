import type { Quest } from '@/types/quest';

// Game Mechanics
export const FULL_LIVES_COUNT = 5;
export const SCORE_PER_CORRECT_ANSWER = 10;
export const REFILL_HEARTS_COST = 10;

export const DAY_IN_MS = 86_400_000;

export const QUESTS: Quest[] = [
  {
    id: 1,
    title: 'Earn 20 XP',
    value: 20,
  },
  {
    id: 2,
    title: 'Earn 50 XP',
    value: 50,
  },
  {
    id: 3,
    title: 'Earn 100 XP',
    value: 100,
  },
  {
    id: 4,
    title: 'Earn 500 XP',
    value: 500,
  },
  {
    id: 5,
    title: 'Earn 1000 XP',
    value: 1000,
  },
];
