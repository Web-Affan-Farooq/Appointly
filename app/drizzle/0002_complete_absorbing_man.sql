ALTER TABLE "services" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "services" ALTER COLUMN "provider_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "services" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "services" ALTER COLUMN "is_active" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "services" ALTER COLUMN "ratings" SET NOT NULL;