import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

import env from '@/lib/validated-env';

import * as schema from './schema';

const sql = neon(env.DATABASE_URL);
// @ts-expect-error it's neon issue
const db = drizzle({ client: sql, schema });

export default db;
