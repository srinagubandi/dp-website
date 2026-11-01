# Refinement loop 19 — balanced five-group specialty rail

## Change

The homepage specialty rail now uses a six-column desktop grid: three equal cards in row one and two equal half-width cards across row two. This removes the prior empty third-column orphan while preserving exactly five practice groups. At tablet widths the same balance remains; at 390 px it is a clear 2 + 2 + 1 layout; at 320 px it becomes a safe one-column list.

## Review and validation

OpenRouter Claude and Qwen both approved this release with no critical issues. The final browser measurement confirmed five groups and no horizontal overflow at 1440, 1024, 390, and 320 px. Type check, production build, all 18 application tests, and the 26-state accessibility regression also passed.
