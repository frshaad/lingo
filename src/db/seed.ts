import db from '@/db';
import * as schema from '@/db/schema';
import {
  CHALLENGE_OPTIONS,
  CHALLENGES,
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
  await db.insert(schema.course).values(COURSES);
  await db.insert(schema.unit).values(UNITS);
  await db.insert(schema.lesson).values(LESSONS);
  await db.insert(schema.challenge).values(CHALLENGES);
  await db.insert(schema.challengeOption).values(CHALLENGE_OPTIONS);
}

export async function seed() {
  try {
    console.log('🌱 Starting database seed...');

    console.log('Clearing existing data...');
    await clearTables();

    console.log('Seeding tables...');
    await seedTables();

    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seed();
}
