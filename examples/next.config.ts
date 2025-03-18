import type { NextConfig } from 'next';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env.local') });

const baseConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ABLY_KEY: process.env.NEXT_PUBLIC_ABLY_KEY,
  },
};

export default baseConfig;
