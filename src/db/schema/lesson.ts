import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

import { unit } from '@/db/schema';

export const lesson = pgTable('lessons', {
  id: serial().primaryKey(),
  title: text().notNull(),
  unitId: integer()
    .references(() => unit.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  order: integer().notNull(),
});

export const lessonsRelations = relations(lesson, ({ one }) => ({
  unit: one(unit, {
    fields: [lesson.unitId],
    references: [unit.id],
  }),
}));
