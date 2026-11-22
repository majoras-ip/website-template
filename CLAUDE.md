# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static website template for **local service businesses**: electricians, roofers, landscapers, and similar trades. Each client site is a copy of this repo. It deploys via GitHub Actions to GitHub Pages at `https://majoras-ip.github.io/website-template`.

The site has one job: **get a homeowner to call.** Most visitors are on a phone, often with an urgent problem. Every decision serves that.

## Rules for every site built from this template

These rules are fixed. Follow them on every new client site unless the user explicitly says otherwise.

**Stack**
- Plain HTML, CSS and JS only. No build step, framework, package manager, Tailwind, or bundler.
- The only external scripts allowed are GSAP and ScrollTrigger from cdnjs, pinned to an exact version (currently 3.12.5) and loaded with `defer`. Don't add other libraries.
- Google Fonts is the only external stylesheet. Load at most two families and only the weights you use, with `display=swap`.

**Phone number / click-to-call**
- The sticky amber `.call-bar` at the very top of every page (including 404) is required. It links with `href="tel:+1XXXXXXXXXX"` (E.164 format) and shows the formatted number in large type.
- Repeat the click-to-call button in the hero and next to the estimate form.
- `--signal` (the amber) is used **only** for call buttons, so it always means "call."
- When the number changes, update every `tel:` link, the displayed text, and the `telephone` field in the JSON-LD. Search for `555` to find them all.

**Animation**
- Subtle fade-ins on sections only: add `data-reveal` to a section's inner `.container`. `script.js` fades each one up 24px over 0.7s, once.
- Don't animate the hero or header. They're above the fold, and animating them causes a flash on load.
- Nothing flashy: no parallax, pinning, scroll-scrubbing, text splitting, counters, or hover effects on every card.
- Animations must be skipped under `prefers-reduced-motion` (handled by `gsap.matchMedia`). Content must stay fully visible if GSAP fails to load, so never hide elements in CSS waiting for JS.

**Performance**
- Images: compressed JPG/WebP, roughly 1600px wide at most, with `width`/`height` attributes set. Use `loading="lazy"` on everything below the hero.
- No video backgrounds, sliders, carousels, or icon fonts. Use inline SVG for icons.
- Load scripts at the end of `<body>` with `defer`.

**Mobile**
- Design at 390px first. Tap targets are at least 44px tall, and buttons are at least 52px.
- Form inputs use 16px or larger text (stops iOS from zooming in) and the correct `type`/`autocomplete` (`tel`, `name`, `street-address`).
- No horizontal scroll at any width.

**Content and honesty**
- Placeholder reviews, license numbers, years in business, and ratings are for layout only. **Never launch with made-up reviews or credentials.** Use the client's real Google reviews and real license number, or remove the section.
- Write plainly from the homeowner's side: what the job is, what it costs to get a quote, how fast they'll hear back. Use sentence case, no all-caps labels, and no hype.
- Caption work photos with the job and the town ("Roof replacement, Boone"). Town names help local search.

**Accessibility**
- Keep the skip link, visible `:focus-visible` outlines, real `<label>`s, and `aria-expanded` on the menu toggle.
- Text contrast must meet WCAG AA. Check any new `--brand` color against white text.

## Development

Open `index.html` directly in a browser, or serve locally:
```bash
python3 -m http.server 8080
```
Pushing to `main` deploys automatically via `.github/workflows/`.

To check mobile layout with headless Chrome, render the page inside a 390px-wide `<iframe>`. Chrome won't make a headless window narrower than about 500px.

## Architecture

- **`index.html`**: sections in order: call bar → masthead (nav + hero + credentials row) → services → how a job works → recent jobs → reviews → service area + hours + map → FAQ → estimate form → footer. Includes `LocalBusiness` JSON-LD in `<head>`.
- **`styles.css`**: theme tokens in `:root` at the top, with commented trade presets below them. Uses Barlow Condensed for headlines and Barlow for body text.
- **`script.js`**: mobile menu toggle, demo form handler, footer year, and GSAP section reveals.
- **`404.html`**: branded error page with the call bar.
- **`favicon.svg`**: brand-color square with the client's initial.

Design decisions to keep:
- Services are a ruled two-column list, not icon cards.
- Only the "How a job works" steps are numbered, because they're a real sequence. Don't number other content.
- The credentials row in the hero (license, insurance, years in business, free estimates) is the one bold element. Keep the rest of the page quiet.
- The FAQ uses native `<details>`/`<summary>` and needs no JS.

## Customizing for a client

**Rebrand**
1. Replace every `YourBrand` in `index.html` and `404.html`, including `<title>`, meta tags, and JSON-LD.
2. Copy the matching trade preset (electrician, roofer, landscaper) from `styles.css` into `:root`, or set `--brand` to the client's truck or logo color. Update `theme-color` in both HTML files and the `fill` in `favicon.svg`.
3. Change the JSON-LD `@type` to match the trade: `Electrician`, `RoofingContractor`, or `LandscapingBusiness` (or the generic `HomeAndConstructionBusiness`).

**Content**
4. Phone number: update every `tel:` link, the displayed number, and JSON-LD (see the phone rules above).
5. Hero: write a headline naming the trade and the service area. Fill in the real license number, insurance, and year founded.
6. Services: rewrite the six `.service-list` items for the trade. Starting points:
   - Electrician: panel upgrades, outlets and circuits, lighting, EV chargers, generators, repairs
   - Roofer: roof replacement, repairs and leaks, storm and hail damage, insurance claims help, gutters, inspections
   - Landscaper: lawn care, landscape design, patios and retaining walls, planting and mulch, irrigation, snow removal
7. Replace `.placeholder` divs with real `<img>` tags (examples are in the HTML comments).
8. Replace placeholder reviews with real ones and update the rating and review count.
9. Update the towns list, hours, address, and email. Swap the map `src` for the client's Google Maps embed URL.
10. Rewrite the FAQ for the trade (e.g. roofers: insurance claims, warranties, how long a replacement takes).
11. Connect the estimate form to a real service such as Formspree (set `action` and `method="POST"`), then remove the demo submit handler in `script.js`. Don't launch with the demo handler, because it shows "Request sent" without sending anything.
