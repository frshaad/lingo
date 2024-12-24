import 'dotenv/config';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import env from '@/lib/validated-env';

import * as schema from './schema';

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, { schema });
export default db;

async function seed() {
  try {
    console.log('Seeding Database...');

    await db.delete(schema.coursesTable);
    await db.delete(schema.userProgressTable);

    await db.insert(schema.coursesTable).values([
      { title: 'spanish', imageSrc: '/es.svg' },
      { title: 'german', imageSrc: '/de.svg' },
      { title: 'french', imageSrc: '/fr.svg' },
      { title: 'italian', imageSrc: '/it.svg' },
    ]);

    console.log('Seeding Finished!');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to seed the database');
  }
}

seed();
