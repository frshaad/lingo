import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const coursesTable = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  imageSrc: text('image_src').notNull(),
});

export const coursesRelations = relations(coursesTable, ({ many }) => ({
  userProgress: many(userProgressTable),
}));

export const userProgressTable = pgTable('user_progress', {
  userId: text('user_id').primaryKey(),
  userName: text('user_name').notNull().default('user'),
  userImageSrc: text('user_image_src').notNull().default('/macot.svg'),
  activeCourseId: integer('active_course_id').references(
    () => coursesTable.id,
    { onDelete: 'cascade' },
  ),
  hearts: integer('hearts').notNull().default(5),
  points: integer('points').notNull().default(0),
});

export const userProgressRelations = relations(
  userProgressTable,
  ({ one }) => ({
    activeCourse: one(coursesTable, {
      fields: [userProgressTable.activeCourseId],
      references: [coursesTable.id],
    }),
  }),
);
