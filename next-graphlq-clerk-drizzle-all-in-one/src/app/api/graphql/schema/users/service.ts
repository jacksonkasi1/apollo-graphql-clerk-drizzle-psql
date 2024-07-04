import { eq, sql, or, ilike, and, asc } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

// ** import schema
import { tbl_users } from "@/db/schema";

export const userService = {
  getUsers: async (
    db: NodePgDatabase,
    offset: number,
    limit: number,
    search?: string
  ) => {
    let conditions = [];

    // Apply search filters
    if (search) {
      conditions.push(
        or(
          ilike(tbl_users.name, `%${search}%`),
          ilike(tbl_users.email, `%${search}%`)
        )
      );
    }

    const whereCondition =
      conditions.length > 0 ? and(...conditions) : undefined;

      // @ts-ignore
    const userData = await db.query.tbl_users.findMany({
      where: whereCondition,
      orderBy: asc(tbl_users.id),
      limit: limit,
      offset: offset, // Correct offset calculation
    });

    const totalCount: number = await db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(tbl_users)
      .where(whereCondition)
      .then((res) => res[0].count);

    return {
      userData,
      totalCount,
    };
  },
  getUserById: async (db: NodePgDatabase, id: number) => {
    const result = await db
      .select()
      .from(tbl_users)
      .where(eq(tbl_users.id, id));
    return result[0];
  },
  addUser: async (
    db: NodePgDatabase,
    input: { name: string; email: string; profile: string }
  ) => {
    const result = await db
      .insert(tbl_users)
      .values({
        name: input.name,
        email: input.email,
        profile: input.profile,
      })
      .returning();

    return result[0];
  },
  updateUser: async (
    db: NodePgDatabase,
    id: number,
    input: { name: string; email: string; profile: string }
  ) => {
    const result = await db
      .update(tbl_users)
      .set({
        ...input,
        updated_at: sql`NOW()`,
      })
      .where(eq(tbl_users.id, id))
      .returning();

    return result[0];
  },
  deleteUser: async (db: NodePgDatabase, id: number) => {
    // @ts-ignore
    const isUserExist = await db.query.tbl_users.findFirst({
      where: eq(tbl_users.id, id),
    });

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
        user: user[0],
      },
    };
  },
};
