# Responsive refinement loop 13 — visible call action

**Branch:** `feature/20-loop-responsive-refinement`

## Implemented

Added a compact, tap-to-call header action on the desktop and compact/mobile headers:

- **Visible number:** `202 841 2941`
- **Link target:** `tel:+12028412941`
- **Icon:** coral phone icon, aligned inline with the visible number
- **Target height:** 48px at desktop, compact/tablet, standard mobile, and 320px narrow mobile
- **Breakpoints:** full navigation through 1081px; compact menu from 1080px down to prevent the visible phone number from crowding navigation.

The opened mobile menu retains a labeled call action with the same telephone target and accessible name. Every header/menu call action has an explicit high-contrast `:focus-visible` outline.

## External review and corrections

Claude’s OpenRouter visual review identified a stacked desktop phone treatment and an abrupt 981/980px handoff. The desktop call action was then made explicitly inline and the compact-header breakpoint moved to 1080px. A final Claude review returned `pass_with_non_blocking_fixes`. Qwen’s code review identified two valid accessibility hardening opportunities: an accessible name for the mobile-menu link and explicit focus-visible styles; both were added before the final gate.

## Final gates

- TypeScript check: passed
- Production build: passed
- Unit/integration suite: 15 passed
- Accessibility regression: 26 states, 0 violations, 0 scan/reflow/semantic/interaction errors
- Browser verification at 1081px, 1080px, 390px, and 320px: no horizontal overflow; visible inline call control; 48px rendered target; correct telephone link; visible keyboard focus outline
- Opened mobile menu: correct accessible name and telephone target
