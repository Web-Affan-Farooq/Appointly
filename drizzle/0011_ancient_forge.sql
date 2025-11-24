-- DROP TYPE "public"."appointment_status";--> statement-breakpoint
-- CREATE TYPE "public"."appointment_status" AS ENUM('PENDING', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
ALTER TABLE "appointments" RENAME COLUMN "started_time" TO "start_time";--> statement-breakpoint
ALTER TABLE "appointments" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "appointments" ALTER COLUMN "status" SET DEFAULT 'PENDING'::text;--> statement-breakpoint

ALTER TABLE "appointments" ALTER COLUMN "status" SET DEFAULT 'PENDING'::"public"."appointment_status";--> statement-breakpoint
-- ALTER TABLE "appointments" ALTER COLUMN "status" SET DATA TYPE "public"."appointment_status" USING "status"::"public"."appointment_status";--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "booked" boolean DEFAULT false;