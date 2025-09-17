ALTER TABLE "appointments" ALTER COLUMN "customer_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ALTER COLUMN "customer_email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "transfer_group" text NOT NULL;