import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

import { course } from '@/db/schema';

export const unit = pgTable('unit', {
  id: serial().primaryKey(),
  title: text().notNull(),
  description: text().notNull(),
  courseId: integer()
    .references(() => course.id, { onDelete: 'cascade' })
    .notNull(),
  order: integer().notNull(),
});

export const unitsRelations = relations(unit, ({ one }) => ({
  course: one(course, {
    fields: [unit.courseId],
    references: [course.id],
  }),
}));
