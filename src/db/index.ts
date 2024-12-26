import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import env from '@/lib/validated-env';

import * as schema from './schema';

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, { schema, casing: 'snake_case' });
export default db;
