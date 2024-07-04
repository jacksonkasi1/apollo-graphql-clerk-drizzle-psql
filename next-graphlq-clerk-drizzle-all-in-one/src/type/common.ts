import { NextRequest } from "next/server";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export interface Context {
  req: NextRequest;
  db: NodePgDatabase;
  auth: { userId: string } | null;
}
