import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

import { course } from '@/db/schema';

export const unit = pgTable('unit', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  courseId: integer('course_id')
    .references(() => course.id, { onDelete: 'cascade' })
    .notNull(),
  order: integer('order').notNull(),
});

export const unitsRelations = relations(unit, ({ one }) => ({
  course: one(course, {
    fields: [unit.courseId],
    references: [course.id],
  }),
}));
