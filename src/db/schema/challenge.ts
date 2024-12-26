import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { lesson } from '@/db/schema';

export const challengeEnum = pgEnum('type', ['SELECT', 'ASSIST']);

export const challenge = pgTable('challenge', {
  id: serial().primaryKey(),
  lessonId: integer()
    .notNull()
    .references(() => lesson.id, { onDelete: 'cascade' }),
  type: challengeEnum().notNull(),
  question: text().notNull(),
  order: integer().notNull(),
});

export const challengeRelations = relations(challenge, ({ one }) => ({
  lesson: one(lesson, {
    fields: [challenge.lessonId],
    references: [lesson.id],
  }),
}));

export const challengeInsertSchema = createInsertSchema(challenge);
export type ChallengeInsertSchema = z.infer<typeof challengeInsertSchema>;