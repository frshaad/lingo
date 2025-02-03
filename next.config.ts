import type { NextConfig } from 'next';

import { validateEnvironment } from '@/lib/env';

validateEnvironment();

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
