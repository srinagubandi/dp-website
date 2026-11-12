# Responsive refinement loop 16 — human-copy pass one

**Branch:** `feature/20-loop-responsive-refinement`

## Scope

This pass makes the homepage process, pathway, proof, and Contact-page supporting copy more direct and conversational. It retains the approved homepage hero sentence, the phrase **“A simple, no-pressure process.”**, the visible phone number, all five required practice groups, the existing PHI boundary, and the site’s limitations on outcome and case-study claims.

## Changes

The revised process starts with the visitor’s real operating context instead of a generic “context that matters” framing. The three steps now use plain verbs: tell us, we look, and you decide. The homepage pathway moves from abstract phrasing to clearer explanations of being found, understanding services, and reviewing evidence. Contact language now begins with “Let’s talk,” without adding promises. The proof copy retains its review requirements while using an active, accountable voice.

Editable defaults and fallback copy match. Migration `0004_human_copy_pass.sql` only updates CMS blocks when their value still matches the prior default; it does not overwrite administrator-edited content.

## Quality gates

Claude was used through OpenRouter for the copy critique. Qwen Coder independently reviewed the runtime/default/migration diff and returned `safe` with no critical issues. The release passed TypeScript, production build, 16 unit and integration tests, and the 26-state accessibility regression with zero reported violations, scan errors, reflow errors, semantic errors, or interaction errors. Desktop and mobile captures were reviewed for homepage and Contact copy flow.
