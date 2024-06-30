import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const tbl_users = pgTable("tbl_users", {
  id: serial("id").notNull().primaryKey().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  profile: text("profile"), // profile image link
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
