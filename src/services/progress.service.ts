import { eq } from 'drizzle-orm';

import database from '@/db';
import { challengeProgress, userProgress } from '@/db/schema';
import {
  FULL_LIVES_COUNT,
  REFILL_HEARTS_COST,
  SCORE_PER_CORRECT_ANSWER,
} from '@/lib/global.constant';

type UpdateProgressParameters = {
  userId: string;
  hearts?: number;
  points?: number;
  activeCourseId?: number;
  userName?: string;
  userImageSrc?: string;
};

export const ProgressService = {
  async updateUserProgress(parameters: UpdateProgressParameters) {
    const { userId, ...updateData } = parameters;
    return database
      .update(userProgress)
      .set(updateData)
      .where(eq(userProgress.userId, userId));
  },

  async addUserProgress(parameters: UpdateProgressParameters) {
    const { userId, activeCourseId, userName, userImageSrc } = parameters;
    return database
      .insert(userProgress)
      .values({ userId, activeCourseId, userName, userImageSrc });
  },

  async incrementHearts(userId: string, currentHearts: number) {
    return this.updateUserProgress({
      userId,
      hearts: Math.min(currentHearts + 1, FULL_LIVES_COUNT),
    });
  },

  async decrementHearts(userId: string, currentHearts: number) {
    return this.updateUserProgress({
      userId,
      hearts: Math.max(currentHearts - 1, 0),
    });
  },

  async addPoints(userId: string, currentPoints: number) {
    return this.updateUserProgress({
      userId,
      points: currentPoints + SCORE_PER_CORRECT_ANSWER,
    });
  },

  async markChallengeComplete(userId: string, challengeId: number) {
    return database.insert(challengeProgress).values({
      challengeId,
      userId,
      isCompleted: true,
    });
  },

  async refillHeartsCount(userId: string, points: number) {
    return await database
      .update(userProgress)
      .set({
        hearts: FULL_LIVES_COUNT,
        points: points - REFILL_HEARTS_COST,
      })
      .where(eq(userProgress.userId, userId));
  },
};
