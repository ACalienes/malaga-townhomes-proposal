# Cinematic Scroll Template

Starter template for Kameha pitch deck proposals. React + Vite + Tailwind CSS v4 + Framer Motion.

## Quick Start: New Build

```bash
# 1. Copy template to builds/
cp -r templates/cinematic-scroll/ builds/CLIENT-SLUG/
cd builds/CLIENT-SLUG/

# 2. Generate theme.js from a build brief (optional)
node ../../scripts/brief-to-theme.js brief-YYYY-MM-DD-client-slug > src/theme.js

# 3. Fill in TODO fields in theme.js (creative copy, images, colors)

# 4. Install and run
npm install
npm run dev
```

## Project Structure

```
src/
  theme.js              <- Single source of truth. All content lives here.
  App.jsx               <- Section composition. Remove/reorder sections here.
  main.jsx              <- Entry point. Calls applyTheme().
  index.css             <- Tailwind v4 config, base styles, utilities.
  components/
    Navbar.jsx           <- Fixed nav, scroll-aware, mobile hamburger menu.
    LoadingOverlay.jsx   <- Brand reveal loading screen.
    ScrollProgress.jsx   <- Top progress bar with spring physics.
    SectionWrapper.jsx   <- Consistent section padding + entrance animation.
    PricingCard.jsx      <- Tier cards with feature lists and CTA.
    ExpandableCard.jsx   <- Click-to-expand cards for scope/approach.
    AnimatedCounter.jsx  <- Count-up animation for stats.
    ParallaxImage.jsx    <- Scroll-driven parallax for hero/divider images.
  sections/
    Hero.jsx             <- Full-viewport hero with choreographed entrance.
    Opportunity.jsx      <- Problem/opportunity framing.
    Approach.jsx         <- How We Work cards.
    Scope.jsx            <- Deliverable cards (expandable).
    Timeline.jsx         <- Phase timeline with line-draw animation.
    Investment.jsx       <- Pricing tiers, add-on toggles, live totals.
    Proof.jsx            <- Credibility stats + Kameha capabilities.
    NextSteps.jsx        <- CTA + contact + personal closing.
public/
  images/                <- Client photos, portfolio images. Never stock.
  kameha-logo.png        <- Kameha logo (provide white version).
```

## Customizing Sections

Not every build needs all 8 sections. Edit `App.jsx` to remove or reorder.

**Minimum viable deck:** Hero + Scope + Investment + NextSteps (4 sections).

To remove a section, delete its import and JSX line in `App.jsx`. No other changes needed.

## Adding Custom Interactions

For premium builds ($10K+), add signature interactions:

1. Create a new component in `src/components/`
2. Import it in the relevant section
3. Reference `references/ANIMATION-PLAYBOOK.md` for pattern implementations
4. Keep interactions driven by theme.js data, not hardcoded content

## Deployment

**Vercel (standard):**
1. Create a separate repo: `ACalienes/CLIENT-SLUG-proposal`
2. Push the build directory contents
3. Connect to Vercel for auto-deploy
4. URL: `https://CLIENT-SLUG-proposal.vercel.app`

**Static hosting:**
```bash
npm run build
# Upload dist/ to any static host
```

## Key Rules

- **theme.js is the single source of truth.** Never hardcode content in components.
- **No stock photos.** Use Kameha portfolio work or client-provided assets.
- **Mobile responsive.** Test on real devices, not just DevTools.
- **prefers-reduced-motion.** All animations respect this media query.
- **No em dashes.** Use periods, commas, or restructure sentences.
