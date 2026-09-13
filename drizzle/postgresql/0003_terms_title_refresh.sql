UPDATE "content_blocks"
SET
  "value" = 'Website Terms & Conditions',
  "updated_at" = now()
WHERE "route" = '/terms'
  AND "section" = 'hero'
  AND "key" = 'title';
