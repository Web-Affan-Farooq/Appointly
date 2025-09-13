CREATE TYPE "public"."role" AS ENUM('USER', 'PROVIDER', 'ADMIN');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'USER' NOT NULL;