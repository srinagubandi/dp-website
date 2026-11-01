-- Preserve a deliberate Administrator-provided portrait URL. Repair only the
-- legacy empty value that prevents the approved Sri portrait asset from rendering.
UPDATE "content_blocks"
SET
  "value" = '/images/team-sri-nagubandi.webp',
  "updated_at" = now()
WHERE "route" = '/team'
  AND "section" = 'profiles'
  AND "key" = 'profile-3-image'
  AND btrim("value") = '';
