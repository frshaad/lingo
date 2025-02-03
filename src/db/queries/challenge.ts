import { cache } from 'react';

import { eq } from 'drizzle-orm';

import db from '@/db';
import { challenge } from '@/db/schema';

export const getCurrentChallenge = cache(async (challengeId: number) => {
  return db.query.challenge.findFirst({
    where: eq(challenge.id, challengeId),
  });
});
