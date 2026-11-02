# Refinement loop 22 — profile and Team portrait balance

This final pass aligns portrait scale across the Team overview and individual profile pages. Dedicated profile heroes now render a 220 × 275px desktop portrait and a 104–117px wide mobile portrait with `height: auto`; the earlier 1200px intrinsic-height behavior is eliminated. The profile portrait remains in normal layout flow, keeps the face visible, and no longer competes with the name or Growth Brief action.

All visual changes were checked at desktop, tablet, mobile, and narrow mobile widths across the Rakesh, Mike, and Sri profile routes. The browser confirmed no horizontal overflow and consistent shared-profile-link baselines. The final TypeScript, production build, 24-test regression suite, and 26-state accessibility scan passed. OpenRouter Claude approved the final individual profile and Team overview visual states; OpenRouter Qwen approved the responsive CSS implementation.
