# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static small-business website template — no build step, no framework, no package manager. It deploys via GitHub Actions to GitHub Pages.

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

Three files, no dependencies:

- **`index.html`** — all page sections in order: navbar, hero, about, services, testimonials, contact, footer
- **`styles.css`** — CSS variables at the top (`:root`) control the entire color scheme and font; edit these to rebrand
- **`script.js`** — mobile nav toggle and contact form success message only

## Customizing for a Client

1. Replace all instances of `YourBrand` in `index.html` and the `<title>` tag
2. Update `--color-primary` and `--color-accent` in the `:root` block of `styles.css`
3. Swap emoji icons in `.card-icon` spans with the client's relevant icons or images
4. Replace the `.image-placeholder` div in the about section with a real `<img>` tag
5. Update contact details (address, phone, email) in the `#contact` section
6. Add/remove `.card` blocks in the services grid as needed
