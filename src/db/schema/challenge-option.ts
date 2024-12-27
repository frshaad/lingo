import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

import { challenge } from '@/db/schema';

export const challengeOption = pgTable('challenge_option', {
  id: serial().primaryKey(),
  challengeId: integer()
    .notNull()
    .references(() => challenge.id, { onDelete: 'cascade' }),
  text: text().notNull(),
  isCorrect: boolean().notNull(),
  imageSrc: text(),
  audioSrc: text(),
});

export const challengeOptionRelations = relations(
  challengeOption,
  ({ one }) => ({
    challenge: one(challenge, {
      fields: [challengeOption.challengeId],
      references: [challenge.id],
    }),
  }),
);

export type ChallengeOption = typeof challengeOption.$inferSelect;
