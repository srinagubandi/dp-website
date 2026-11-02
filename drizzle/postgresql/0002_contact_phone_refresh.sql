UPDATE "content_blocks"
SET
  "value" = '202 841 2941',
  "updated_at" = now()
WHERE "route" = '/contact'
  AND "section" = 'contact-channels'
  AND "key" = 'phone';
