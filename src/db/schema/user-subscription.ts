import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const userSubscription = pgTable('user_subscription', {
  id: serial().primaryKey(),
  userId: text().notNull().unique(),
  stripeCustomerId: text().notNull().unique(),
  stripeSubscriptionId: text().notNull().unique(),
  stripePriceId: text().notNull(),
  stripeCurrentPeriodEnd: timestamp().notNull(),
});
