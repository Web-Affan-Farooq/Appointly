import 'dotenv/config'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as Schema from "./schemas";
const connectionString = process.env.DATABASE_URL!

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false })
const db = drizzle(client,{schema:Schema});
export default db;