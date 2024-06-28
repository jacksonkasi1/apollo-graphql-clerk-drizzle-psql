import type { Config } from 'drizzle-kit';

import { env } from "@/config";

export default {
  schema: "./src/db",
  out: "./drizzle",
  driver: 'pg',
  dialect: "postgresql",
  dbCredentials: {
    connectionString: env.DATABASE_URL!,
  },
} satisfies Config;
