import './env-config';
import { type Env, envSchema } from './schema';

export function validateEnv(): Env {
  // eslint-disable-next-line n/no-process-env
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors
    );
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

const env = validateEnv();
export default env;
