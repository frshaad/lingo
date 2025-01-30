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
    await db.delete(table);
  }
}

async function seedTables() {
  await Promise.all([
    db.insert(schema.course).values(COURSES),
    db.insert(schema.unit).values(UNITS),
    db.insert(schema.lesson).values(LESSONS),
    db.insert(schema.challenge).values(CHALLENGES),
    db.insert(schema.challengeOption).values(CHALLENGE_OPTIONS),
  ]);
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

if (require.main === module) {
  seed();
}
