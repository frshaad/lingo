import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { unit } from '@/db/schema';

export const lesson = pgTable('lesson', {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  unitId: integer()
    .references(() => unit.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  order: integer().notNull(),
});

export const lessonRelations = relations(lesson, ({ one }) => ({
  unit: one(unit, {
    fields: [lesson.unitId],
    references: [unit.id],
  }),
}));

export const lessonInsertSchema = createInsertSchema(lesson);
export type LessonInsertSchema = z.infer<typeof lessonInsertSchema>;
