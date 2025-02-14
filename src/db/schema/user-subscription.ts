import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const userSubscription = pgTable('user_subscription', {
  id: serial().primaryKey(),
  userId: text().notNull().unique(),
});
