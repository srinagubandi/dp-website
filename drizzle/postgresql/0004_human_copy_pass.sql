UPDATE "content_blocks"
SET
  "value" = CASE
    WHEN "route" = '/' AND "section" = 'no-pressure-process' AND "key" = 'body' THEN 'Tell us what is working, what is not, and what the practice can handle. You do not need to commit before you have a clear view of the options.'
    WHEN "route" = '/' AND "section" = 'no-pressure-process' AND "key" = 'step-1-body' THEN 'Tell us your priorities, constraints, capacity, and current growth challenge.'
    WHEN "route" = '/' AND "section" = 'no-pressure-process' AND "key" = 'step-2-body' THEN 'We look at your market and patient path, then bring back practical questions and options.'
    WHEN "route" = '/' AND "section" = 'no-pressure-process' AND "key" = 'step-3-body' THEN 'You decide whether any next step fits your practice.'
    WHEN "route" = '/' AND "section" = 'proof' AND "key" = 'body' THEN 'Before we publish a case study, we review the baseline, timeframe, specialty, service mix, measurement method, and approval together. Until that review is complete, this site does not publish performance figures or client claims.'
    WHEN "route" = '/contact' AND "section" = 'hero' AND "key" = 'body' THEN 'Let’s talk about your practice, your market, your capacity, and the patient path you want to improve.'
    WHEN "route" = '/contact' AND "section" = 'what-happens-next' AND "key" = 'body' THEN 'Tell us what is working, what is not, and what the practice can handle. You do not need to commit before you have a clear view of the options.'
    WHEN "route" = '/contact' AND "section" = 'what-happens-next' AND "key" = 'step-1-body' THEN 'Tell us your priorities, constraints, capacity, and current growth challenge.'
    WHEN "route" = '/contact' AND "section" = 'what-happens-next' AND "key" = 'step-2-body' THEN 'We look at your market and patient path, then bring back practical questions and options.'
    WHEN "route" = '/contact' AND "section" = 'what-happens-next' AND "key" = 'step-3-body' THEN 'You decide whether any next step fits your practice.'
    ELSE "value"
  END,
  "updated_at" = now()
WHERE
  ("route" = '/' AND "section" = 'no-pressure-process' AND "key" = 'body' AND "value" = 'Start with the context that matters. There is no pressure to commit before the practice has a useful view of the options.')
  OR ("route" = '/' AND "section" = 'no-pressure-process' AND "key" = 'step-1-body' AND "value" = 'Share your priorities, constraints, capacity, and current growth challenge.')
  OR ("route" = '/' AND "section" = 'no-pressure-process' AND "key" = 'step-2-body' AND "value" = 'We consider the market and patient path, then organize practical questions and options.')
  OR ("route" = '/' AND "section" = 'no-pressure-process' AND "key" = 'step-3-body' AND "value" = 'You decide whether any proposed direction makes sense for your practice.')
  OR ("route" = '/' AND "section" = 'proof' AND "key" = 'body' AND "value" = 'Before a case study is published, its baseline, timeframe, specialty, service mix, measurement method, and approval are reviewed together. Until that review is complete, this site does not publish performance figures or client claims.')
  OR ("route" = '/contact' AND "section" = 'hero' AND "key" = 'body' AND "value" = 'Let’s discuss the practice, the market, your capacity, and the patient path you want to improve.')
  OR ("route" = '/contact' AND "section" = 'what-happens-next' AND "key" = 'body' AND "value" = 'Start with the context that matters. There is no pressure to commit before the practice has a useful view of the options.')
  OR ("route" = '/contact' AND "section" = 'what-happens-next' AND "key" = 'step-1-body' AND "value" = 'Share your priorities, constraints, capacity, and current growth challenge.')
  OR ("route" = '/contact' AND "section" = 'what-happens-next' AND "key" = 'step-2-body' AND "value" = 'We consider the market and patient path, then organize practical questions and options.')
  OR ("route" = '/contact' AND "section" = 'what-happens-next' AND "key" = 'step-3-body' AND "value" = 'You decide whether any proposed direction makes sense for your practice.');
