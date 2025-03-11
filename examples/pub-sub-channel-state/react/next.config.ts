const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });
import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_ABLY_KEY: process.env.NEXT_PUBLIC_ABLY_KEY,
  },
};

export default nextConfig;
