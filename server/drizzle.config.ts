import { defineConfig } from "drizzle-kit";
import { databaseUrl } from "./src/env"

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schemas/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
