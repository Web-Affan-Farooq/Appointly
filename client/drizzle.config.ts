import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { databaseUrl } from "@/shared/constants/env";

export default defineConfig({
  out: "./src/db/migrations",
  // schema: './src/db/schema.ts',
  schema: "./src/db/schemas/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
