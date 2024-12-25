import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

import { unit } from '@/db/schema';

export const lesson = pgTable('lessons', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  unitId: integer('unit_id')
    .references(() => unit.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  order: integer('order').notNull(),
});

export const lessonsRelations = relations(lesson, ({ one }) => ({
  unit: one(unit, {
    fields: [lesson.id],
    references: [unit.id],
  }),
}));
