# DocPropel Website Rebuild Plan

## Design objective

The rebuild translates the video’s recommended sequence of **layout, design, animations, and code** into a focused marketing experience. The goal is not a generic dark-theme refresh. The website should communicate a measurable, performance-based growth system for healthcare practices through a distinct visual language and a clear conversion path.

## Chosen layout

The homepage will use a **signal-console layout** rather than a stack of equal cards. The first screen pairs an editorial promise with a compact growth-system panel. This panel will visualize the relationship between demand, patient inquiries, and booked appointments without making outcome claims. A specialty selector will let visitors immediately see that the offering is designed for doctors, dentists, pharmacies, and PT/OT clinics.

The page will then move from credibility to method: a specialty strip, a three-step operating system, a capability grid, a transparent comparison, a practical growth calculator, and a final consultation call to action. This gives each section one job and avoids repeating the hero copy.

## Design tokens

The implementation will use a fixed palette: Midnight `#071829`, Deep navy `#0F2740`, Ink `#0A2033`, Signal orange `#F58220`, Electric blue `#57D7FF`, Teal `#18B69B`, White `#F6F8FB`, and Muted `#A5B3C2`. DM Sans will carry prose and interface content. DM Mono will distinguish operational labels, data, and system status. The design uses fine technical grid lines, restrained blue/orange glow, flat high-contrast panels, and visible border rhythm.

## Reusable interface primitives

The rebuild establishes `section-shell`, `signal-label`, `signal-panel`, `signal-button`, `grid-lines`, `metric-value`, and `eyebrow` primitives. These will be used by the homepage and made available to secondary pages through the shared global stylesheet. The site will avoid default rounded component-library patterns in favor of purposeful 0–4px corners and controlled hover elevation.

## Motion and accessibility

The primary buttons will use a tactile press interaction. Major homepage sections will use short entrance motion only when they become visible. The motion system will honor `prefers-reduced-motion`, maintain keyboard focus visibility, and preserve semantic headings and accessible labels.

## Validation plan

The implementation will pass TypeScript checks and a production build. The rebuilt site will be inspected at desktop and mobile widths for navigation, responsive hierarchy, contrast, input target size, and working calls to action. The changed source will then be committed, pushed, and deployed as a new Railway project according to the project deployment preference.
