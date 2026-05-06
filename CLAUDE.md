# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static small-business website template — no build step, no framework, no package manager. It deploys via GitHub Actions to GitHub Pages at `https://majoras-ip.github.io/website-template`.

## Development

Open `index.html` directly in a browser to preview. No server required.

For a local dev server with live reload:
```bash
npx serve .
# or
python3 -m http.server 8080
```

Deployment is automatic on every push to `main` via the GitHub Actions workflow (`.github/workflows/`).

## Architecture

Four files, no dependencies:

- **`index.html`** — all page sections in order: CTA banner, navbar, hero, logo bar, about, services, gallery, testimonials, FAQ, contact + map, footer, back-to-top button
- **`styles.css`** — CSS variables at the top (`:root`) control the entire color scheme and font; edit these to rebrand
- **`script.js`** — mobile nav toggle, contact form, FAQ accordion, CTA banner dismiss, back-to-top button
- **`404.html`** — standalone branded error page, links back to `index.html`
- **`favicon.svg`** — browser tab icon; edit the `fill` color and `<text>` letter to match the client's brand

## Customizing for a Client

**Rebrand:**
1. Replace all instances of `YourBrand` in `index.html`, `404.html`, and the `<title>` tags
2. Update `--color-primary` and `--color-accent` in the `:root` block of `styles.css`
3. Change the letter and `fill` color in `favicon.svg`

**Content:**
4. Update the phone number in the CTA banner (`href="tel:..."` and display text)
5. Replace `.logo-placeholder` divs with real `<img>` tags for partner/client logos
6. Replace the `.image-placeholder` div in the about section with a real `<img>` tag
7. Replace `.gallery-placeholder` divs with `<img>` tags — see the comment in `styles.css` for the correct `object-fit` snippet
8. Update contact details (address, phone, email) and business hours in the `#contact` section
9. Swap the Google Maps `<iframe src="...">` with the client's embed URL (Google Maps → Share → Embed a map)
10. Add/remove `.card` blocks in the services grid as needed
11. Add/remove `.faq-item` blocks as needed
