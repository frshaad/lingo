import { getTableName } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';
import { exit } from 'node:process';

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

async function clearTable(table: PgTable) {
  try {
    await db.delete(table);
    console.info(`✓ Cleared ${getTableName(table)}`);
  } catch (error) {
    console.error(`✗ Failed to clear ${getTableName(table)}:`, error);
    throw error;
  }
}

async function seedTable<T>(table: PgTable, data: T[]) {
  try {
    await db.insert(table).values(data);
    console.info(`✔️ Seeded ${getTableName(table)} (${data.length} records)`);
  } catch (error) {
    console.error(`✖️ Failed to seed ${getTableName(table)}:`, error);
    throw error;
  }
}

async function clearTables() {
  console.info('🧹 Clearing existing data...');
  for (const table of TABLES_TO_CLEAR) {
    await clearTable(table);
  }
}

async function seedTables() {
  console.info('🌱 Seeding tables...');

  await seedTable(schema.course, COURSES);
  await seedTable(schema.unit, UNITS);
  await seedTable(schema.lesson, LESSONS);
  await seedTable(schema.challenge, CHALLENGES);
  await seedTable(schema.challengeOption, CHALLENGE_OPTIONS);
}

export async function seed() {
  try {
    console.info('📦 Starting database seed...');
    await clearTables();
    await seedTables();
    console.info('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    exit(1);
  }
}

// eslint-disable-next-line unicorn/prefer-top-level-await
seed();
