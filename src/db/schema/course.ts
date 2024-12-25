import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

import { unit, userProgress } from '@/db/schema';

export const course = pgTable('course', {
  id: serial().primaryKey(),
  title: text().notNull(),
  imageSrc: text().notNull(),
});

export const courseRelations = relations(course, ({ many }) => ({
  userProgresses: many(userProgress),
  units: many(unit),
}));
