import { relations } from 'drizzle-orm';
import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { course } from '@/db/schema';
import { DEFAULT_HEARTS } from '@/lib/constants';

export const userProgress = pgTable('user_progress', {
  userId: text().primaryKey(),
  userName: varchar({ length: 255 }).notNull().default('user'),
  userImageSrc: text().notNull().default('/mascot.svg'),
  activeCourseId: integer().references(() => course.id, {
    onDelete: 'cascade',
  }),
  hearts: integer().notNull().default(DEFAULT_HEARTS),
  points: integer().notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(course, {
    fields: [userProgress.activeCourseId],
    references: [course.id],
  }),
}));
