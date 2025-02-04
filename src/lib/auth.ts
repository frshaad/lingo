import { auth } from '@clerk/nextjs/server';

import { AuthorizationError } from '@/actions/errors';

export async function authenticateUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new AuthorizationError();
  }
  return userId;
}
