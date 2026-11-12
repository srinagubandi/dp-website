# Refinement loop 20 — individual profile portrait scale

The individual Team profile portrait treatment was reduced without changing public copy, metadata, page structure, links, or the Growth Brief action.

The prior rendered portrait respected its width constraint but inherited a fixed intrinsic height of 1200px. The repair sets `height: auto` and gives the portrait figure explicit responsive width constraints. At 1440px the portrait now renders at 320 × 400px; at 390px it renders at 117 × 146px. The profile hero now maintains visible text hierarchy, does not horizontally overflow, and the portrait remains within normal responsive document flow.

Validation completed: TypeScript check, production build, 24 unit/regression tests, the 26-state accessibility scan with zero violations/errors, and browser QA across the Rakesh, Mike, and Sri profiles at 1440px and 390px. The desktop and mobile rendered views were reviewed against the supplied scale brief and OpenRouter Claude’s visual direction.