import { cache } from 'react';

import { eq } from 'drizzle-orm';

import db from '@/db';
import { userSubscription } from '@/db/schema';
import { authenticateUser } from '@/lib/auth';
import { DAY_IN_MS } from '@/lib/global.constant';

export const getUserSubscription = cache(async () => {
  const userId = await authenticateUser();

  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  });
  if (!data) {
    return;
  }

  const isSubscriptionActive =
    !!data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

  return { ...data, isSubscriptionActive };
});
