import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { challenge } from '@/db/schema';

export const challengeProgress = pgTable('challenge_progress', {
  id: serial().primaryKey(),
  userId: text().notNull(),
  challengeId: integer()
    .notNull()
    .references(() => challenge.id, { onDelete: 'cascade' }),
  isCompleted: boolean().notNull().default(false),
});

export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenge, {
      fields: [challengeProgress.challengeId],
      references: [challenge.id],
    }),
  }),
);

export const challengeProgressInserSchema =
  createInsertSchema(challengeProgress);
export type ChallengeProgressInsertSchema = z.infer<
  typeof challengeProgressInserSchema
>;
