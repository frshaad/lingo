import type { NextConfig } from 'next';

import { validateEnv } from '@/lib/env';

validateEnv();

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
