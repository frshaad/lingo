import db from '@/db';
import * as schema from '@/db/schema';
import {
  CHALLENGES,
  CHALLENGE_OPTIONS,
  COURSES,
  LESSONS,
  TABLES_TO_CLEAR,
  UNITS,
} from '@/db/seed.constant';

async function clearTables() {
  for (const table of TABLES_TO_CLEAR) {
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await db.delete(table);
  }
}

async function seedTables() {
  await db.insert(schema.course).values(COURSES);
  await db.insert(schema.unit).values(UNITS);
  await db.insert(schema.lesson).values(LESSONS);
  await db.insert(schema.challenge).values(CHALLENGES);
  await db.insert(schema.challengeOption).values(CHALLENGE_OPTIONS);
}

export async function seed() {
  try {
    console.info('🌱 Starting database seed...');

    console.info('Clearing existing data...');
    await clearTables();

    console.info('Seeding tables...');
    await seedTables();

    console.info('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// eslint-disable-next-line unicorn/prefer-module
if (require.main === module) {
  // eslint-disable-next-line unicorn/prefer-top-level-await
  seed();
}
