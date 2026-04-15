import "dotenv/config";

export const googleCreds = {
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
};

export const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://affan:secret@localhost:5432/appointly";

export const betterauthURL =
  process.env.NEXT_PUBLIC_SERVER_URL; // express js development server