UPDATE "content_blocks"
SET
  "value" = CASE "key"
    WHEN 'title' THEN 'The disciplines behind a coordinated growth program.'
    WHEN 'body' THEN 'DocPropel connects strategy, patient-path experience, local demand, and performance review so the practice sees one accountable operating picture.'
  END,
  "updated_at" = now()
WHERE "route" = '/team'
  AND "section" = 'hero'
  AND "key" IN ('title', 'body');
