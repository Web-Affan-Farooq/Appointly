import "dotenv/config";

export const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://affan:secret@localhost:5432/appointly";

export const betterauthURL =
  process.env.BETTER_AUTH_URL || "http://localhost:3000";
