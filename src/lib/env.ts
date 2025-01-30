import '@/env-config';
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string({
    required_error: 'Clerk public key is required',
  }),
  CLERK_SECRET_KEY: z.string({
    required_error: 'Clerk secret key is required',
  }),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string({
    required_error: 'Clerk sign in url is required',
  }),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string({
    required_error: 'Clerk sign up url is required',
  }),
  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z.string({
    required_error: 'Clerk sign in fallback redirect url is required',
  }),
  NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: z.string({
    required_error: 'Clerk sign up fallback redirect url is required',
  }),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL: z.string({
    required_error: 'Clerk after sign out url is required',
  }),
  DATABASE_URL: z.string({ required_error: 'Database url is required' }),
});

const env = envSchema.parse(process.env);
export default env;
