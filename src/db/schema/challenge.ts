import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';

import { challengeOption, challengeProgress, lesson } from '@/db/schema';

const challengeEnum = pgEnum('type', ['SELECT', 'ASSIST']);

export const challenge = pgTable('challenge', {
  id: serial().primaryKey(),
  lessonId: integer()
    .notNull()
    .references(() => lesson.id, { onDelete: 'cascade' }),
  type: challengeEnum().notNull(),
  question: text().notNull(),
  order: integer().notNull(),
});

export const challengeRelations = relations(challenge, ({ one, many }) => ({
  lesson: one(lesson, {
    fields: [challenge.lessonId],
    references: [lesson.id],
  }),
  challengeOptions: many(challengeOption),
  challengeProgresses: many(challengeProgress),
}));
