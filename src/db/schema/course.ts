import { relations } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { unit, userProgress } from '@/db/schema';

export const course = pgTable('course', {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  imageSrc: text().notNull(),
});

export const courseRelations = relations(course, ({ many }) => ({
  userProgresses: many(userProgress),
  units: many(unit),
}));

export const courseInsertSchema = createInsertSchema(course);
export const courseSelectSchema = createSelectSchema(course);
export type CourseSelectSchema = z.infer<typeof courseSelectSchema>;
export type CourseInsertSchema = z.infer<typeof courseInsertSchema>;
