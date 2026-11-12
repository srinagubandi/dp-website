# Refinement loop 21 — Team card portrait scale

The Team overview cards now use compact supporting portraits rather than full-card photography. At desktop widths, each portrait is 120 × 150px; on mobile it scales between 72 × 90px and 86 × 107px. Images remain left-aligned with the card copy and preserve their 4:5 aspect ratio and top-centred face framing.

Cards are flex columns, which pins all “View full profile” links to the same desktop baseline regardless of bio length. Each link has a measured 44px-high interactive box on desktop and mobile, while retaining the quiet text-link presentation. The card grid was checked at 1440px, 900px, 390px, and 320px with no horizontal overflow.

OpenRouter Claude’s final visual review approved the treatment and confirmed that portrait scale is supporting rather than dominant, card hierarchy is cohesive, mobile spacing is clear, and profile links remain suitably tappable.
