import { relations } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';

import { course } from '@/db/schema';

export const userProgress = pgTable('user_progress', {
  userId: text('user_id').primaryKey(),
  userName: text('user_name').notNull().default('user'),
  userImageSrc: text('user_image_src').notNull().default('/macot.svg'),
  activeCourseId: integer('active_course_id').references(() => course.id, {
    onDelete: 'cascade',
  }),
  hearts: integer('hearts').notNull().default(5),
  points: integer('points').notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(course, {
    fields: [userProgress.activeCourseId],
    references: [course.id],
  }),
}));
