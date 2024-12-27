import { relations } from 'drizzle-orm';
import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { course } from '@/db/schema';

export const userProgress = pgTable('user_progress', {
  userId: text().primaryKey(),
  userName: varchar({ length: 255 }).notNull().default('user'),
  userImageSrc: text().notNull().default('/macot.svg'),
  activeCourseId: integer().references(() => course.id, {
    onDelete: 'cascade',
  }),
  hearts: integer().notNull().default(5),
  points: integer().notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(course, {
    fields: [userProgress.activeCourseId],
    references: [course.id],
  }),
}));

export const userProgressInsertSchema = createInsertSchema(userProgress);
export const userProgressSelectSchema = createSelectSchema(userProgress);
export type UserProgressInsertSchema = z.infer<typeof userProgressInsertSchema>;
export type UserProgressSelectSchema = z.infer<typeof userProgressSelectSchema>;
