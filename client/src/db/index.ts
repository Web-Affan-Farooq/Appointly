import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as Schema from "./schemas";
import { databaseUrl } from "@/shared/constants/env";

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(databaseUrl, { prepare: false });
const db = drizzle(client, { schema: Schema });
export default db;
