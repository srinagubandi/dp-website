UPDATE "content_blocks"
SET
  "value" = CASE
    WHEN "route" = '/services' AND "section" = 'hero' AND "key" = 'title' THEN 'Marketing services built around the patient path'
    WHEN "route" = '/services' AND "section" = 'hero' AND "key" = 'body' THEN 'Search, paid media, website experience, reputation, patient reactivation, and content work together. Each is planned around what the practice needs and can handle.'
    WHEN "route" = '/specialties' AND "section" = 'hero' AND "key" = 'title' THEN 'Marketing shaped by your specialty'
    WHEN "route" = '/specialties' AND "section" = 'hero' AND "key" = 'body' THEN 'Each care setting has its own patient questions, referral paths, service areas, and capacity limits. The plan should account for them.'
    WHEN "route" = '/how-it-works' AND "section" = 'hero' AND "key" = 'body' THEN 'DocPropel starts by learning the practice and its market. We tie each channel to patient actions that matter, then review the evidence before recommending next steps.'
    WHEN "route" = '/results' AND "section" = 'hero' AND "key" = 'title' THEN 'Results that are specific, supported, and reviewable'
    WHEN "route" = '/about' AND "section" = 'hero' AND "key" = 'title' THEN 'Healthcare marketing with accountability at the center'
    WHEN "route" = '/about' AND "section" = 'hero' AND "key" = 'body' THEN 'DocPropel helps healthcare practices make clearer marketing decisions while respecting patient trust and the realities of delivering care.'
    WHEN "route" = '/team' AND "section" = 'hero' AND "key" = 'title' THEN 'The disciplines behind a coordinated marketing program'
    WHEN "route" = '/team' AND "section" = 'hero' AND "key" = 'body' THEN 'DocPropel brings together strategy, patient-path experience, local demand, and performance review, so the practice has one accountable view of its marketing.'
    WHEN "route" = '/faq' AND "section" = 'hero' AND "key" = 'title' THEN 'Practical answers before the first conversation'
    WHEN "route" = '/faq' AND "section" = 'hero' AND "key" = 'body' THEN 'A short guide to how DocPropel works, where its limits are, and what a useful first step looks like for a healthcare practice.'
    ELSE "value"
  END,
  "updated_at" = now()
WHERE
  ("route" = '/services' AND "section" = 'hero' AND "key" = 'title' AND "value" = 'One coordinated system for the patient path.')
  OR ("route" = '/services' AND "section" = 'hero' AND "key" = 'body' AND "value" = 'Search, paid media, web experience, reputation, reactivation, and content should work together around the needs and capacity of the practice.')
  OR ("route" = '/specialties' AND "section" = 'hero' AND "key" = 'title' AND "value" = 'Healthcare growth shaped by specialty context.')
  OR ("route" = '/specialties' AND "section" = 'hero' AND "key" = 'body' AND "value" = 'Different care settings have different patient questions, referral paths, service areas, and capacity constraints. The plan should reflect them.')
  OR ("route" = '/how-it-works' AND "section" = 'hero' AND "key" = 'body' AND "value" = 'DocPropel starts with the practice and market, connects channels to useful patient actions, and reviews evidence before recommending what comes next.')
  OR ("route" = '/results' AND "section" = 'hero' AND "key" = 'title' AND "value" = 'Results should be specific, supported, and reviewable.')
  OR ("route" = '/about' AND "section" = 'hero' AND "key" = 'title' AND "value" = 'Healthcare growth with accountability at the center.')
  OR ("route" = '/about' AND "section" = 'hero' AND "key" = 'body' AND "value" = 'DocPropel exists to make marketing decisions clearer for healthcare practices while respecting patient trust and the realities of care delivery.')
  OR ("route" = '/team' AND "section" = 'hero' AND "key" = 'title' AND "value" = 'The disciplines behind a coordinated growth program.')
  OR ("route" = '/team' AND "section" = 'hero' AND "key" = 'body' AND "value" = 'DocPropel connects strategy, patient-path experience, local demand, and performance review so the practice sees one accountable operating picture.')
  OR ("route" = '/faq' AND "section" = 'hero' AND "key" = 'title' AND "value" = 'Practical answers before the first conversation.')
  OR ("route" = '/faq' AND "section" = 'hero' AND "key" = 'body' AND "value" = 'A concise guide to the model, its boundaries, and what a useful first step looks like for a healthcare practice.');
