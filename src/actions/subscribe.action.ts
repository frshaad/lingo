'use server';

import db from '@/db';
import { userSubscription } from '@/db/schema';
import { authenticateUser } from '@/lib/auth';

export async function addUserSubscription() {
  const userId = await authenticateUser();

  try {
    await db.insert(userSubscription).values({ userId });
    return { success: true };
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.includes('duplicate key value violates unique constraint')
    ) {
      return { success: false, error: 'User is already subscribed' };
    }
    console.error('Subscription error:', error);
    return { success: false, error: 'Failed to subscribe user' };
  }
}
