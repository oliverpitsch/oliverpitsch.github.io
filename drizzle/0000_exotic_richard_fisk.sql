CREATE TYPE "public"."application_focus" AS ENUM('Design', 'Product', 'AI Builder', 'Hybrid');--> statement-breakpoint
CREATE TYPE "public"."application_status" AS ENUM('Draft', 'Published', 'Archived');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"job_url" text,
	"job_description" text DEFAULT '' NOT NULL,
	"focus" "application_focus" DEFAULT 'Hybrid' NOT NULL,
	"status" "application_status" DEFAULT 'Draft' NOT NULL,
	"headline" text,
	"intro" text,
	"about" text,
	"experience_overrides" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"highlighted_projects" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"skills" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"cover_letter" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "applications_slug_unique" UNIQUE("slug")
);
