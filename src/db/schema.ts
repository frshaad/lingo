import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const coursesTable = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  imageSrc: text('image_src').notNull(),
});

export const coursesRelations = relations(coursesTable, ({ many }) => ({
  userProgress: many(userProgressTable),
  units: many(unitsTable),
}));

export const unitsTable = pgTable('units', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  courseId: integer('course_id')
    .references(() => coursesTable.id, { onDelete: 'cascade' })
    .notNull(),
  order: integer('order').notNull(),
});

export const unitsRelations = relations(unitsTable, ({ one }) => ({
  course: one(coursesTable, {
    fields: [unitsTable.courseId],
    references: [coursesTable.id],
  }),
}));

export const lessonsTable = pgTable('lessons', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  unitId: integer('unit_id')
    .references(() => unitsTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  order: integer('order').notNull(),
});

export const lessonsRelations = relations(lessonsTable, ({ one }) => ({
  unit: one(unitsTable, {
    fields: [lessonsTable.id],
    references: [unitsTable.id],
  }),
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
