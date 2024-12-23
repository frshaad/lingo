import { drizzle } from 'drizzle-orm/neon-http';

import env from '@/lib/validated-env';

const db = drizzle(env.DATABASE_URL);
export default db;
