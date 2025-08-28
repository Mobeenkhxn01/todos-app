import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema/index";

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.DATABASE_ACCESS_TOKEN!,
});

export const db = drizzle({ client, schema });
