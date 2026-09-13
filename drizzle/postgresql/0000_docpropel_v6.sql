CREATE TABLE IF NOT EXISTS "leads" (
  "id" bigserial PRIMARY KEY, "name" varchar(140) NOT NULL, "email" varchar(254) NOT NULL, "phone" varchar(40),
  "practice_name" varchar(180) NOT NULL, "specialty" varchar(100) NOT NULL, "location" varchar(180), "monthly_patients" varchar(60),
  "message" text, "source" varchar(120) NOT NULL DEFAULT 'website', "utm_source" varchar(160), "utm_medium" varchar(160), "utm_campaign" varchar(160),
  "status" varchar(30) NOT NULL DEFAULT 'new' CHECK ("status" IN ('new','contacted','qualified','closed')), "notes" text,
  "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "leads_status_idx" ON "leads" ("status");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "leads_created_at_idx" ON "leads" ("created_at");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "content_blocks" (
  "id" bigserial PRIMARY KEY, "route" varchar(120) NOT NULL, "section" varchar(100) NOT NULL, "key" varchar(100) NOT NULL, "value" text NOT NULL,
  "content_type" varchar(30) NOT NULL DEFAULT 'text' CHECK ("content_type" IN ('text','textarea','url')), "label" varchar(180) NOT NULL,
  "sort_order" integer NOT NULL DEFAULT 0, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "content_route_section_key_uq" UNIQUE ("route", "section", "key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "site_sections" (
  "id" bigserial PRIMARY KEY, "route" varchar(120) NOT NULL, "slug" varchar(100) NOT NULL, "title" varchar(180) NOT NULL,
  "enabled" boolean NOT NULL DEFAULT true, "sort_order" integer NOT NULL DEFAULT 0, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "sections_route_slug_uq" UNIQUE ("route", "slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "seo_records" (
  "route" varchar(120) PRIMARY KEY, "title" varchar(180) NOT NULL, "description" varchar(320) NOT NULL, "canonical_path" varchar(240) NOT NULL,
  "noindex" boolean NOT NULL DEFAULT false, "og_title" varchar(180) NOT NULL, "og_description" varchar(320) NOT NULL, "og_image" varchar(500) NOT NULL,
  "twitter_image" varchar(500) NOT NULL, "schema_json" jsonb, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now()
);
