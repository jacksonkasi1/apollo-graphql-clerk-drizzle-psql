import { eq, sql } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

// ** import schema
import { tbl_users } from "@/db/user";

export const userService = {
  getUsers: async (db: NodePgDatabase, offset: number, limit: number) => {
    return await db.select().from(tbl_users).limit(limit).offset(offset);
  },
  getUserById: async (db: NodePgDatabase, id: number) => {
    return await db.select().from(tbl_users).where(eq(tbl_users.id, id));
  },
  addUser: async (
    db: NodePgDatabase,
    input: { name: string; email: string; profile: string }
  ) => {
    const result = await db
      .insert(tbl_users)
      .values({
        id: sql`(DEFAULT)`,
        name: input.name,
        email: input.email,
        profile: input.profile,
      })
      .returning();

    return result;
  },
  updateUser: async (
    db: NodePgDatabase,
    id: number,
    input: { name: string; email: string; profile: string }
  ) => {
    const result = await db
      .update(tbl_users)
      .set({
        name: input.name,
        email: input.email,
        profile: input.profile,
        updatedAt: sql`(CURRENT_TIMESTAMP)`,
      })
      .where(eq(tbl_users.id, id))
      .returning();

    return result;
  },
  deleteUser: async (db: NodePgDatabase, id: number) => {
    const isUserExist = await db
      .select()
      .from(tbl_users)
      .where(eq(tbl_users.id, id));

    if (!isUserExist) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const user = await db
      .delete(tbl_users)
      .where(eq(tbl_users.id, id))
      .returning();

    return {
      success: true,
      message: "User deleted successfully",
      data: {
        User: user,
      },
    };
  },
};
