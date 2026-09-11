# DocPropel Front-End Design System

## Role

Build and maintain DocPropel as a focused, high-trust healthcare growth brand. Every visual and interaction should make the performance-based model feel specific, measurable, and credible.

## Non-negotiable visual direction

- Use only this palette: Midnight `#071829`, Deep navy `#0F2740`, Ink `#0A2033`, Signal orange `#F58220`, Electric blue `#57D7FF`, Teal `#18B69B`, White `#F6F8FB`, Muted `#A5B3C2`.
- Use `DM Sans` for interface/body copy and `DM Mono` for labels, data, and numerical signals.
- Prefer a high-contrast editorial dashboard aesthetic: strong grid lines, flat panels, restrained glow, data-like labels, and deliberate whitespace.
- Avoid generic SaaS gradients, blob shapes, stock-style medical imagery, oversized rounded cards, default component-library appearance, and arbitrary colors.
- Use orange only for primary actions and decisive highlights. Use electric blue and teal as secondary data/status accents.

## Layout and components

- Use clear visual hierarchy with section labels, direct headlines, short copy, and purposeful calls to action.
- Build with reusable design primitives: `.section-shell`, `.signal-label`, `.signal-panel`, `.signal-button`, `.grid-lines`, `.metric-value`, and `.eyebrow`.
- Cards should feel constructed, not soft: mostly 0–4px radius, visible fine borders, and hover elevation limited to 2–4px.
- Design mobile first. At mobile sizes, preserve the content hierarchy, give all targets at least 44px height, and avoid clipped comparison tables.

## Interaction direction

- Every primary button needs a tactile mechanical press state (shift down, shadow collapses, then returns).
- Use entrance motion for meaningful sections only; it must respect `prefers-reduced-motion`.
- Use hover states to reveal utility or confidence, not decoration. Do not add animation that competes with reading.

## Content and trust

- Keep claims clear and supportable. Avoid unverified claims, fabricated testimonials, and invented clinical outcomes.
- Clarify the process and the value exchange. Form calls to action should state what happens next.
- Preserve the existing phone number, primary navigation, routes, logo, and growth-brief intake trigger.
