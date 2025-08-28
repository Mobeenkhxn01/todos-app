import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

export const todo = sqliteTable("todo", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	text: text("text").notNull(),
	completed: integer("completed", { mode: "boolean" }).default(false).notNull(),
  userId: text("user_id").notNull().references(() => user.id)
});

export const todoRelation = relations(todo, ({one}) => ({
  user: one(user, {
    fields: [todo.id],
    references: [user.id]
  })
}))
