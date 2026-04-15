import "dotenv/config"

export const googleCreds = {
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
}

export const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://affan:secret@localhost:5432/appointly";

export const clientURL = process.env.CLIENT_URL as string; // nextjs development server

export const PORT = Number(process.env.PORT as string)