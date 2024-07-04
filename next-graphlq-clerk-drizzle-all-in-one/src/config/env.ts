import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    DATABASE_CERT: z.string().min(1, "DATABASE_CERT is required"),
  },
  client: {
    NEXT_PUBLIC_GRAPHQL_API_URL: z.string().min(1, "NEXT_PUBLIC_GRAPHQL_API_URL is required"),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_CERT: process.env.DATABASE_CERT,
    NEXT_PUBLIC_GRAPHQL_API_URL: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  },
});