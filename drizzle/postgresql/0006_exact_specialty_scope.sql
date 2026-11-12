UPDATE "seo_records"
SET
  "description" = 'Growth planning for doctors and physicians, dental practices, independent pharmacies, PT/OT clinics, and ABA and pediatric clinics.',
  "og_description" = 'Growth planning for doctors and physicians, dental practices, independent pharmacies, PT/OT clinics, and ABA and pediatric clinics.',
  "updated_at" = now()
WHERE
  "route" = '/specialties'
  AND "description" = 'Growth planning for physician, dental, pharmacy, PT/OT, ABA and pediatric, and urgent care practices.'
  AND "og_description" = 'Growth planning for physician, dental, pharmacy, PT/OT, ABA and pediatric, and urgent care practices.';
