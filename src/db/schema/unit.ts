import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

import { course, lesson } from '@/db/schema';

export const unit = pgTable('unit', {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  courseId: integer()
    .references(() => course.id, { onDelete: 'cascade' })
    .notNull(),
  order: integer().notNull(),
});

export const unitRelations = relations(unit, ({ one, many }) => ({
  course: one(course, {
    fields: [unit.courseId],
    references: [course.id],
  }),
  lessons: many(lesson),
}));

export type Unit = typeof unit.$inferSelect;
