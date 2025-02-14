import { relations } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

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
