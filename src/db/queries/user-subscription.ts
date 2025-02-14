import { cache } from 'react';

import { eq } from 'drizzle-orm';

import db from '@/db';
import { userSubscription } from '@/db/schema';
import { authenticateUser } from '@/lib/auth';

export const getUserSubscription = cache(async () => {
  const userId = await authenticateUser();

  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  });
  if (!data) {
    return;
  }

  const isSubscriptionActive = data.userId === userId;

  return { ...data, isSubscriptionActive };
});
