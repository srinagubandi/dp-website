INSERT INTO "content_blocks" (
  "route",
  "section",
  "key",
  "value",
  "content_type",
  "label",
  "sort_order"
)
VALUES
  ('/team', 'profiles', 'profile-1-name', 'Rakesh Mittapelly', 'text', 'Profile 1 name', 0),
  ('/team', 'profiles', 'profile-1-role', 'Performance & growth marketing', 'text', 'Profile 1 role', 1),
  ('/team', 'profiles', 'profile-1-bio', 'Rakesh brings more than 13 years of performance marketing leadership across agency, platform, and brand environments. His work connects acquisition strategy, media efficiency, and measurable revenue outcomes across healthcare and other growth-focused categories.', 'textarea', 'Profile 1 bio', 2),
  ('/team', 'profiles', 'profile-1-image', '/images/team-rakesh-mittapelly.webp', 'url', 'Profile 1 image URL', 3),
  ('/team', 'profiles', 'profile-2-name', 'Mike Tomasiello', 'text', 'Profile 2 name', 4),
  ('/team', 'profiles', 'profile-2-role', 'Founder, Propel Dental', 'text', 'Profile 2 role', 5),
  ('/team', 'profiles', 'profile-2-bio', 'Mike has spent more than a decade in marketing, including five years dedicated to dental practices. He helps teams pair patient trust, stronger internal workflows, and practical measurement to build sustainable growth.', 'textarea', 'Profile 2 bio', 6),
  ('/team', 'profiles', 'profile-2-image', '/images/team-mike-tomasiello.webp', 'url', 'Profile 2 image URL', 7),
  ('/team', 'profiles', 'profile-3-name', 'Sri Nagubandi', 'text', 'Profile 3 name', 8),
  ('/team', 'profiles', 'profile-3-role', 'Strategy & client partnership', 'text', 'Profile 3 role', 9),
  ('/team', 'profiles', 'profile-3-bio', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada, arcu quis consequat dignissim, nibh libero posuere sem, vitae posuere enim lectus vel eros.', 'textarea', 'Profile 3 bio', 10),
  ('/team', 'profiles', 'profile-3-image', '/images/team-sri-nagubandi.webp', 'url', 'Profile 3 image URL', 11)
ON CONFLICT ("route", "section", "key") DO UPDATE
SET
  "value" = EXCLUDED."value",
  "content_type" = EXCLUDED."content_type",
  "label" = EXCLUDED."label",
  "sort_order" = EXCLUDED."sort_order",
  "updated_at" = now();

DELETE FROM "content_blocks"
WHERE "route" = '/team'
  AND "section" = 'profiles'
  AND "key" IN (
    'profile-4-name',
    'profile-4-role',
    'profile-4-bio',
    'profile-4-image'
  );
