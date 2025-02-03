import { eq } from 'drizzle-orm';

import db from '@/db';
import { challengeProgress, userProgress } from '@/db/schema';
import {
  INITIAL_LIVES_COUNT,
  SCORE_PER_CORRECT_ANSWER,
} from '@/lib/global.constant';

type UpdateProgressParams = {
  userId: string;
  hearts?: number;
  points?: number;
  activeCourseId?: number;
  userName?: string;
  userImageSrc?: string;
};

export class ProgressService {
  static async updateUserProgress(params: UpdateProgressParams) {
    const { userId, ...updateData } = params;
    return db
      .update(userProgress)
      .set(updateData)
      .where(eq(userProgress.userId, userId));
  }

  static async incrementHearts(userId: string, currentHearts: number) {
    return this.updateUserProgress({
      userId,
      hearts: Math.min(currentHearts + 1, INITIAL_LIVES_COUNT),
    });
  }

  static async decrementHearts(userId: string, currentHearts: number) {
    return this.updateUserProgress({
      userId,
      hearts: Math.max(currentHearts - 1, 0),
    });
  }

  static async addPoints(userId: string, currentPoints: number) {
    return this.updateUserProgress({
      userId,
      points: currentPoints + SCORE_PER_CORRECT_ANSWER,
    });
  }

  static async markChallengeComplete(userId: string, challengeId: number) {
    return db.insert(challengeProgress).values({
      challengeId,
      userId,
      isCompleted: true,
    });
  }
}
