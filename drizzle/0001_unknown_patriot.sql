CREATE TYPE "public"."application_language" AS ENUM('de', 'en');--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "language" "application_language" DEFAULT 'de' NOT NULL;