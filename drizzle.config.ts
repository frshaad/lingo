import { defineConfig } from 'drizzle-kit';

import env from '@/lib/env';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
