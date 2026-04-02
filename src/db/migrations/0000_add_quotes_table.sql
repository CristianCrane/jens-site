CREATE TABLE "quotes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_type" varchar NOT NULL,
	"address" varchar NOT NULL,
	"address_2" varchar,
	"city" varchar NOT NULL,
	"zip" varchar NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar,
	"phone_number" varchar NOT NULL,
	"email" varchar NOT NULL,
	"job_description" varchar,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "quotes" USING btree ("email");