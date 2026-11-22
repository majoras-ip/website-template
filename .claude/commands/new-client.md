---
description: Build a new client site from this template (name, city, phone, business type)
argument-hint: <business name>, <city>, <phone>, <type of business>
---

Build a new local-business website from this template for:

**$ARGUMENTS**

Expected format: `<business name>, <city>, <phone>, <type of business>`
Example: `Mike's Roofing, Ames, (515) 555-0123, roofer`

Follow the rules in this repo's `CLAUDE.md` (stack, call bar, animation, performance, mobile, accessibility) for everything below.

## 0. Check the input before building anything

Split the arguments on commas: business name, city, phone, business type. The business name may itself contain a comma (e.g. "Smith & Sons, Inc."), so use judgment: the phone is the part that looks like a phone number, and the business type is what comes after it.

Stop and ask me, and build nothing yet, if:
- any of the four values is missing or empty
- the phone number doesn't have 10 digits (US)
- the state for the city is unclear. If a city name is shared by more than one state and nothing points to one, ask. If it's clear from context (e.g. Ames → IA, since this business is based in Ames, Iowa), use it and say so in your summary.
- the destination folder (step 1) already exists. Never overwrite it.

## 1. Copy the template into a new sibling folder

- Folder name: the business name in kebab-case. Lowercase it, drop apostrophes, turn `&` into `and`, replace every other run of non-alphanumeric characters with one hyphen, and trim hyphens from the ends. `Mike's Roofing` → `mikes-roofing`, `A&B Lawn Care` → `a-and-b-lawn-care`.
- Create it next to this repo: `../<folder-name>`.
- Copy with `rsync -a --exclude .git --exclude .claude ./ ../<folder-name>/`. This keeps `.github/` (the Pages deploy workflow) and `CLAUDE.md`, and leaves out this repo's git history and the slash command.
- **Never edit any file in the template repo.** From here on, every edit happens inside `../<folder-name>/`. Before each edit, check the path.

## 2. Business name, city and phone

- Replace every `YourBrand` with the business name in `index.html` and `404.html`, including `<title>`, meta tags, the logo, the footer, and the JSON-LD.
- Phone: the display format is `(515) 555-0123` and the link format is `tel:+15155550123` (E.164). Update the call bar, hero button, estimate-section button, address block, FAQ text, footer, the JSON-LD `telephone` field (`+1-515-555-0123`), and the 404 page. Then search the new folder for `555` and `000-0000`; nothing left over from the template should remain.
- Replace the template's sample city (Ames) and towns with the client's city and real nearby towns. Use real places within roughly 30 minutes' drive. If you're not confident which towns are nearby, list the city alone plus a TODO.
- Update the JSON-LD `address` (city and state, with TODOs for street and ZIP), `areaServed`, and `@type`. Use the closest schema.org type: `Electrician`, `Plumber`, `RoofingContractor`, `HVACBusiness`, `HousePainter`, `GeneralContractor`, `Locksmith`. For trades without their own type (landscaping, lawn care, gutters, etc.) use `HomeAndConstructionBusiness`.

## 3. Write real copy for this trade

Write plainly from the homeowner's point of view, in sentence case with no hype (see "Content and honesty" in `CLAUDE.md`).

- **Hero:** a headline naming the trade and the city or area, e.g. "Roof repair and replacement in Ames and nearby towns". Add one supporting sentence about the kind of work and how they handle a job. Keep both buttons: call, and request an estimate.
- **Services:** 3 to 6 services that this trade really offers, each with a one-sentence description. Use the starting lists in `CLAUDE.md` where they fit. Add `<!-- TODO: confirm services with owner -->` above the list.
- **About:** add a short about section after services (2 to 3 sentences, plus `TODO` placeholders for the owner's name, how long they've been in business, and anything that makes them different). Style it to match the rest of the page using the existing tokens. Don't invent the story.
- **How a job works:** rewrite the four steps for this trade. Keep them general enough to be true for any honest business in it.
- **Service area:** the city plus the nearby towns from step 2. Put `TODO` placeholders in the hours table.
- **FAQ:** 3 to 5 questions people really ask this trade (e.g. roofers: insurance claims, how long a replacement takes). Answers must not state facts you don't know. Use `TODO` for specifics like payment methods or warranty terms.
- **Contact:** keep the estimate form and the call button. Use a `TODO` for email and street address.

**No made-up facts.** Remove these, or replace them with clearly marked placeholders:
- **The reviews section:** delete it entirely, along with its nav link. Leave `<!-- TODO: add real Google reviews here once the owner has some -->` where it was.
- **The hero credentials row:** values become placeholders like `TODO: license #`, `TODO: insured?`, `TODO: year founded`. If a credential doesn't apply to the trade (e.g. no state license for lawn care), drop that item. "Free estimates" may stay only with `<!-- TODO: confirm with owner -->` next to it.
- **The "Recent jobs" captions:** make them generic placeholders (`TODO: job, town`), since you don't know their jobs.
- No years in business, review counts, star ratings, awards, certifications, warranties, or response-time promises unless I gave them to you.

Every TODO must start with `TODO:` so `grep -rn "TODO" .` lists everything left to do.

## 4. Color and design

Use the frontend-design skill. Give this client its own look within the template's structure, rather than reusing the template's spruce and amber.

- Start from the trade's preset in `styles.css` if one exists, then adjust it. Otherwise choose a `--brand` that fits the trade and region: deep slate or charcoal for roofers, navy for electricians, forest or olive for landscapers, water blue for plumbers, and so on. Give it a slight twist so two clients in the same trade don't look identical.
- `--signal` stays high-visibility (amber, orange or yellow) and is only used for call buttons. Check that `--ink` text on `--signal`, and white text on `--brand`, both meet WCAG AA.
- Update `theme-color` in both HTML files, and the `fill` and letter in `favicon.svg` (the business's first initial, in `--signal` color on a `--brand` square).
- You may change the heading font if the trade calls for it, keeping the two-family limit. Keep the layout, the call bar, and the subtle fade-ins.

## 5. Local SEO

- `<title>`: `<Trade> in <City>, <ST> | <Business Name>`, e.g. `Roofer in Ames, IA | Mike's Roofing`. On the 404 page: `Page not found | <Business Name>`.
- Meta description (about 150 characters): trade, city, 2 or 3 main services, and the phone number. Update `og:title` and `og:description` to match.
- The H1 names the trade and city. Work photo captions include town names.

## 6. Check your work, then git

- Open the page in headless Chrome at desktop width, and at mobile width inside a 390px iframe (see the Development section of `CLAUDE.md`). Fix anything broken: overflow, leftover template text, broken links.
- Search the new folder for any remaining `YourBrand`, `Ames` (unless the client is in Ames), `555-000`, `00000`, `Since 1998`, and `4.9`.
- In `../<folder-name>/`, run `git init -b main`, then `git add -A`, then commit with the message `Initial site for <Business Name>`. If git has no `user.name`/`user.email` configured, reuse the author of the template repo's latest commit (`git -C <template path> log -1 --format='%an|%ae'`) via `git -c user.name=... -c user.email=...` for this commit only. Don't change the global git config.
- Don't create a GitHub repo and don't push.

## 7. Finish with a checklist

Print a short summary first: the folder path, the color choice and why, and any assumptions (e.g. the state you picked, the nearby towns). Then print this checklist, filled in for this client:

**Still needed before launch**
- [ ] Owner photos: hero (crew, truck or a finished job) and 6 job photos with the town for each
- [ ] Logo (SVG or high-res PNG). Update the favicon to match.
- [ ] Real services list and business hours
- [ ] Street address, ZIP, and the email the contact form should send to
- [ ] Hook up the contact form (e.g. Formspree) and remove the demo handler in `script.js`
- [ ] License number, insurance, year founded, and whether estimates are free
- [ ] Real Google reviews, once they exist
- [ ] Google Maps embed URL for their address
- [ ] GitHub repo (`majoras-ip/<folder-name>`), push, and turn on GitHub Pages or other hosting
- [ ] Custom domain and DNS
- [ ] Google Business Profile: create or claim it, verify, and match the name, address, phone and hours to the site exactly
- [ ] Every remaining `TODO:` in the files (give the count from `grep -rc "TODO:"`)
