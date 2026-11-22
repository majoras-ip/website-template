---
description: Build a new client site from this template (name, city, phone, business type)
argument-hint: <business name>, <city>, <phone or none>, <type of business>
---

Build a new website from this template for:

**$ARGUMENTS**

Expected format: `<business name>, <city>, <phone>, <type of business>`
Examples:
- `Mike's Roofing, Ames, (515) 555-0123, roofer`
- `Copper Pole Barbers, Ames, (515) 555-0147, barber`
- `The Fernwood Band, Des Moines, none, band`

The business type can be anything: a trade, a barber, a coffee shop, a gym, a church, a band, a portfolio, an event, and so on.

## How the guides fit together

Four sources shape every site. When they disagree, the higher one wins:

1. **My rules:** this repo's `CLAUDE.md` and this command. No fake reviews or made-up facts, `TODO:` for anything only the owner knows, fast on phones, accessible, plain HTML/CSS/JS with no build step.
2. **The genre library**, `.claude/genres.md`: sections, primary action, style direction, and the one signature moment for each kind of business.
3. **The scroll-craft skill** (`~/.claude/skills/scroll-craft`): how to plan the page (journey, feeling curve, one peak, page grammar, signature move), its engine for scroll motion on genre sites, its taste rules, and its screenshot harness for checking the result. Load it with the Skill tool on every build.
4. **The frontend-design skill:** palette, type and layout decisions, and the self-critique pass. Load it with the Skill tool on every build.

**Every site must look different.** `.claude/style-ledger.md` records the look of every site built so far, and each new site has to clear its rules (see "Plan a look nobody else has" in step 2). That includes two sites in the same trade or genre, and it ranks with my rules above: no reusing a previous site's layout in new colors.

How scroll-craft is adapted for client sites (these override the skill's defaults):
- **No interview.** Running `/new-client` is explicit creative delegation. Write scroll-craft's `BRIEF.md` yourself, marked `Self-authored under explicit creative delegation`, from my arguments and the genre entry. Keep assumptions labeled as assumptions, and never invent facts about the business in it.
- **Its files stay out of the client repo.** The brief and screenshots live in the scroll-craft workspace, `~/.claude/scroll-craft-lab` (`builds/<folder-name>/`). Run every scroll-craft script with that folder as the working directory, because that's where `playwright-core` and the workspace config live. Never run `npm` inside a client folder.
- **No generated or stock imagery posing as the business.** Don't call `kie.mjs` or any paid generation without asking me first, and never generate photos of the client's premises, staff, customers, work or food. Use labeled placeholders with `TODO:` and say in the checklist which photos the owner should supply.
- **No scroll-scrubbed video or image sequences** unless I supply footage and ask for it. They're the heaviest thing a page can carry, and phones come first.
- **The dimensional hero** is built from layers we can make honestly: type, SVG illustration, color fields and the placeholder photo frame, moving at slightly different rates. Note in the client's `CLAUDE.md` which layer each owner photo should replace.
- **The peak is the genre's signature moment.** Follow the library's limits on everything else (at most two other light devices, nothing twice in a row). Its "eight to fourteen viewport-heights" pacing doesn't apply. A small business site stays short.
- **Trades and trust-first genres** (dentist, medical, legal, financial) skip the engine and the planning. Use scroll-craft only for its taste rules and screenshot harness.
- **Its fingerprint gate is replaced by the style ledger**, which covers the same structural ground plus the visual details (top bar, nav, hero, footer, type, color) that made earlier sites look alike. Don't use the workspace's `FINGERPRINTS.md`.
- Its hard rules all apply (no visible em dashes, no scroll cues, no section counters on content that isn't a sequence, no counters without real numbers, no gradient text), except where they conflict with mine.

The svg-animation, accessible-animation and 60fps-animation skills are installed too. Load them when the signature moment needs SVG drawing, reduced-motion tiers or performance help.

## 0. Check the input before building anything

Split the arguments on commas: business name, city, phone, business type. The business name may itself contain a comma (e.g. "Smith & Sons, Inc."), so use judgment: the phone is the part that looks like a phone number (or the word `none`), and the business type is what comes after it.

Read `.claude/genres.md` now and find the genre entry for the business type (see step 2). Read `.claude/style-ledger.md` too.

Stop and ask me, and build nothing yet, if:
- any of the four values is missing or empty
- the phone number doesn't have 10 digits (US). `none` is accepted only for genres whose entry says the phone is optional (band, portfolio, event). For anything else, ask.
- the state for the city is unclear. If a city name is shared by more than one state and nothing points to one, ask. If it's clear from context (e.g. Ames → IA, since this business is based in Ames, Iowa), use it and say so in your summary.
- the destination folder (step 1) already exists. Never overwrite it.

## 1. Copy the template into a new sibling folder

- Folder name: the business name in kebab-case. Lowercase it, drop apostrophes, turn `&` into `and`, replace every other run of non-alphanumeric characters with one hyphen, and trim hyphens from the ends. `Mike's Roofing` → `mikes-roofing`, `A&B Lawn Care` → `a-and-b-lawn-care`.
- Create it next to this repo: `../<folder-name>`.
- Copy with `rsync -a --exclude .git --exclude .claude ./ ../<folder-name>/`. This keeps `.github/` (the Pages deploy workflow) and `CLAUDE.md`, and leaves out this repo's git history, the slash command and the genre library.
- **Never edit any file in the template repo**, with one exception: appending this site's row to `.claude/style-ledger.md` at the end (step 10). Every other edit happens inside `../<folder-name>/`. Before each edit, check the path.

## 2. Pick the genre

- Match the business type to an entry in `.claude/genres.md` using its **Matches** list and judgment.
- **Trades** (electrician, roofer, plumber, landscaper and the rest of that entry's list): follow the **trades path**, steps 3T to 5T. The template's sections and quiet motion are built for them; the layout and look still change per site (see the look plan below).
- **Any other listed genre:** follow the **genre path**, steps 3G to 5G, using that entry.
- **Nothing fits:** invent an entry in the same shape, following "When nothing matches" in the library, and follow the genre path with it. Don't edit `genres.md`; print the new entry in the summary.
- Say which genre you used in the summary.

### Plan a look nobody else has

Before writing any markup, on both paths, write down this site's choice for each of the ledger's 10 visual dimensions (palette, ground, type, shape, top bar, nav, hero, content layout, close and footer, signature). Pick from the ledger's option menus or invent new options. Then check the plan against the ledger's rules:
- it differs from **every** existing row on at least 7 of the 10 dimensions;
- it uses nothing on the "currently taken by streak" list;
- it reuses no font pairing, no recent display face, no too-close brand hue, and no hero layout from the same genre.

If it fails, change the plan. Put the plan and the check (which rows it was compared to, and the score against each) in the summary. On the genre path, also put it in `BRIEF.md`, and let it inform scroll-craft's page grammar.

---

# Trades path

## 3T. Business name, city and phone

- Replace every `YourBrand` with the business name in `index.html` and `404.html`, including `<title>`, meta tags, the logo, the footer, and the JSON-LD.
- Phone: the display format is `(515) 555-0123` and the link format is `tel:+15155550123` (E.164). Update the call bar, hero button, estimate-section button, address block, FAQ text, footer, the JSON-LD `telephone` field (`+1-515-555-0123`), and the 404 page. Then search the new folder for `555` and `000-0000`; nothing left over from the template should remain.
- Replace the template's sample city (Ames) and towns with the client's city and real nearby towns. Use real places within roughly 30 minutes' drive. If you're not confident which towns are nearby, list the city alone plus a TODO.
- Update the JSON-LD `address` (city and state, with TODOs for street and ZIP), `areaServed`, and `@type`. Use the closest schema.org type: `Electrician`, `Plumber`, `RoofingContractor`, `HVACBusiness`, `HousePainter`, `GeneralContractor`, `Locksmith`. For trades without their own type (landscaping, lawn care, gutters, etc.) use `HomeAndConstructionBusiness`.

## 4T. Write real copy for this trade

Write plainly from the homeowner's point of view, in sentence case with no hype (see "Content and honesty" in `CLAUDE.md`).

- **Hero:** a headline naming the trade and the city or area, e.g. "Roof repair and replacement in Ames and nearby towns". Add one supporting sentence about the kind of work and how they handle a job. Keep both buttons: call, and request an estimate.
- **Services:** 3 to 6 services that this trade really offers, each with a one-sentence description. Use the starting lists in `CLAUDE.md` where they fit. Add `<!-- TODO: confirm services with owner -->` above the list.
- **About:** add a short about section after services (2 to 3 sentences, plus `TODO` placeholders for the owner's name, how long they've been in business, and anything that makes them different). Style it to match the rest of the page using the existing tokens. Don't invent the story.
- **How a job works:** rewrite the four steps for this trade. Keep them general enough to be true for any honest business in it.
- **Service area:** the city plus the nearby towns from step 3T. Put `TODO` placeholders in the hours table.
- **FAQ:** 3 to 5 questions people really ask this trade (e.g. roofers: insurance claims, how long a replacement takes). Answers must not state facts you don't know. Use `TODO` for specifics like payment methods or warranty terms.
- **Contact:** keep the estimate form and the call button. Use a `TODO` for email and street address.
- The template's markup is a starting point, not a fixed layout. Rebuild the sections in the shape your look plan calls for (step 2). The content requirements above stay the same.
- Don't promise anything unconfirmed anywhere on the page, including the call bar label ("Call for a free estimate" only if free estimates are confirmed) and the form's success message.

**No made-up facts.** Remove these, or replace them with clearly marked placeholders:
- **The reviews section:** delete it entirely, along with its nav link and its CSS. Leave `<!-- TODO: add real Google reviews here once the owner has some -->` where it was.
- **The hero credentials row:** values become placeholders like `TODO: license #`, `TODO: insured?`, `TODO: year founded`. If a credential doesn't apply to the trade (e.g. no state license for lawn care), drop that item. "Free estimates" may stay only with `<!-- TODO: confirm with owner -->` next to it.
- **The "Recent jobs" captions:** make them generic placeholders (`TODO: job, town`), since you don't know their jobs.
- No years in business, review counts, star ratings, awards, certifications, warranties, or response-time promises unless I gave them to you.

## 5T. Color and design

Use the frontend-design skill. Build the look plan from step 2: this client gets its own palette, type, shape, top bar, nav, hero, content layout and footer, not the template's layout recolored.

- The trade presets in `styles.css` are hints, not defaults. Choose a `--brand` that suits the trade and clears the ledger's hue rule; if another site in the same trade already used the obvious color (navy for electricians, charcoal for roofers), go somewhere else (teal, rust, ochre, plum, forest, and so on).
- `--signal` stays high-visibility and is only used for call buttons. It doesn't have to be amber.
- Choose fonts from the ledger's type menu, keeping the two-family limit. The call bar stays at the top of every page and the motion stays quiet (subtle fade-ins only), but the bar's look comes from your plan.

Then continue at step 6.

---

# Genre path

## 3G. Business name, city and phone

- Replace every `YourBrand` with the business name in `index.html` and `404.html`, including `<title>`, meta tags, the logo, the footer, and the JSON-LD.
- Phone (if given): display `(515) 555-0123`, link `tel:+15155550123`, JSON-LD `telephone` `+1-515-555-0123`. Use it in the top bar (beside the primary action), the contact section, the footer and the 404 page. If the phone is `none`, remove every `tel:` link and the `telephone` field.
- Use the client's city. Add nearby towns only where the genre has a service area (trainers who travel, photographers, food trucks, real estate). Use real places within about 30 minutes' drive, or the city alone plus a TODO.
- JSON-LD: set `@type` from the genre entry's **Schema type**, the `address` (city and state, `TODO:` for street and ZIP), and `openingHours` as a `TODO:` where the genre has hours. Remove fields that don't apply (e.g. `areaServed` for a coffee shop, `address` for a band with no venue).

## 4G. Plan with scroll-craft, then restructure the page

Load the scroll-craft and frontend-design skills and use them for this whole step and the next. Start from the template's files, but the genre decides the sections and the look.

**Plan first** (scroll-craft Steps 0 to 2, adapted as described in "How the guides fit together"):
- From `~/.claude/scroll-craft-lab`, run `node ~/.claude/skills/scroll-craft/scripts/doctor.mjs` and `node ~/.claude/skills/scroll-craft/scripts/workspace.mjs --ensure`. A missing `KIE_AI_API_KEY` is expected and fine.
- Write `~/.claude/scroll-craft-lab/builds/<folder-name>/BRIEF.md`: the eight topics answered from the genre entry, the journey (4 to 6 beats, mapped onto the genre's sections), the feeling curve, the peak (the signature moment), the "It's the site where ___" sentence, and the chosen page grammar with one line on why.
- Include the look plan from step 2 and its ledger check in `BRIEF.md`. That replaces scroll-craft's fingerprint gate.

**Then build:**
- **Engine:** copy `~/.claude/skills/scroll-craft/engine/scrollcraft.js` and `scrollcraft.css` into the client folder unmodified, and link them in place of the template's GSAP scripts (`scrollcraft.css` before `styles.css`, `scrollcraft.js` deferred before `script.js`). Map the engine's `--sc-*` tokens to the site's own tokens in `styles.css`. Remove the template's GSAP reveal code from `script.js` and use `data-sc-in` for quiet section reveals. Add the `sc-ready` fallback rule and the `ScrollCraft.mount` call from the library's motion safety rules.

- **Sections:** rebuild `index.html` with the genre entry's **Sections** list. The top bar comes first and the primary action closes the page; the order in between can change if the journey reads better. Remove template sections that don't belong (e.g. "How a job works" and the credentials row for a coffee shop) along with their CSS and nav links. Lay each section out the way your look plan says, not the way the last site did.
- **Top bar:** keep the sticky bar at the very top of every page, including 404, with the genre's **Primary action** in `--signal`. Rename `.call-bar` only if it no longer calls; keep it big, tappable (at least 52px tall on phones) and always visible. Repeat the primary action in the hero and in the final contact or booking section.
- **Nav:** links only to sections that exist. Keep the mobile menu toggle with `aria-expanded`.
- **Signature moment:** build the one moment from the genre entry as scroll-craft's bespoke signature move: page JS in `script.js` driven by the engine's `--sc-p` progress or its devices, never by editing the engine. Follow "Motion safety" in the library, so reduced motion and a script failure both leave a finished, static page. Remove nothing from the template's skip link, focus styles or form labels.
- **Copy:** write plainly from the customer's side, in sentence case with no hype. The hero headline names what the business is and the city ("Barbershop in Ames", "Coffee and pastries in Story City"). One supporting sentence about what they do. 3 to 5 FAQ questions from the entry's ideas, answered only with facts I gave you; use `TODO:` for the rest.
- **No made-up facts:** delete the template's reviews section, its nav link and its CSS, and leave `<!-- TODO: add real Google reviews here once the owner has some -->` where it was. Prices, menu items, show dates, staff names, listings, years open, counts and ratings are `TODO:` placeholders or generic layout fillers with a `<!-- TODO: replace with the real ... -->` comment above them, as the library's honesty rules describe. The form's success message must not promise anything unconfirmed.
- **Forms:** if the genre has a form, it uses real `<label>`s, 16px+ inputs and the right `type`/`autocomplete`. Keep the template's demo handler pattern, with a `TODO:` to connect a real service.

## 5G. Color, type and design

- Follow the look plan from step 2, the genre entry's **Style** as a starting direction, scroll-craft's `references/taste.md`, and frontend-design's plan, review and critique process. Choose a palette of 4 to 6 named colors and up to two Google Font families (only the weights you use, `display=swap`).
- Put all colors in the `:root` tokens in `styles.css` and rewrite the token comments for this client. Delete the trade presets comment block, since it doesn't apply.
- `--signal` is reserved for the primary action. It doesn't have to be amber; it has to stand out against the palette.

Then continue at step 6.

---

# Both paths

## 6. Contrast, favicon and theme color

- Check with a quick script that body text on its background, white (or light) text on `--brand`, and the text color on `--signal` all meet WCAG AA (4.5:1 for normal text).
- Update `theme-color` in both HTML files, and the `fill` and letter in `favicon.svg` (the business's first initial, in the accent or signal color on a `--brand` square).

## 7. Local SEO

- `<title>`: `<What they are> in <City>, <ST> | <Business Name>`, e.g. `Roofer in Ames, IA | Mike's Roofing` or `Coffee shop in Story City, IA | Ember & Oat`. For a band or portfolio: `<Name> | <what they are> from <City>, <ST>`. On the 404 page: `Page not found | <Business Name>`.
- Meta description (about 150 characters): what they are, the city, 2 or 3 main offerings, and the phone number if there is one. Update `og:title` and `og:description` to match.
- The H1 names what they are and the city. Photo captions include town names where it makes sense.

## 8. Update the client's CLAUDE.md (genre path only)

The copied `CLAUDE.md` describes a trades site. Rewrite its Overview, Architecture and "Design decisions to keep" sections to describe this client: the genre, the primary action, the section order, and the signature moment (what it is, where its code lives, and its reduced-motion and mobile fallbacks), so a later session doesn't "fix" it back to the trades setup. Leave the trades-specific "Customizing for a client" steps out.

## 9. Check your work, then git

- Serve the folder (`python3 -m http.server <port>`, run from the client folder).
- Run scroll-craft's harness (all sites) from `~/.claude/scroll-craft-lab`, writing into `builds/<folder-name>/`:
  `node ~/.claude/skills/scroll-craft/scripts/shoot.mjs --url http://localhost:<port> --out builds/<folder-name>/shots`, again with `--width 390 --height 844` into `mobile`, and with `--reduced-motion` into `reduced`. Read each `sheet.png` and fix anything it reports: dead scroll, cues that never reach full opacity, failing contrast. Genre sites: then run scroll-craft's feel check against `BRIEF.md`. For a `pan` act, measure `rail.scrollWidth - innerWidth` by hand, as scroll-craft's `pan` notes say.
- All sites: screenshot it in headless Chrome:
  - desktop at 1440px wide;
  - mobile inside a 390px `<iframe>` (see the Development section of `CLAUDE.md`), with the iframe tall enough to show the whole page;
  - with `--force-prefers-reduced-motion`, to see the finished static state;
  - with JavaScript off (`--blink-settings=scriptEnabled=false`), to confirm all content is still visible (on trades sites, blocking cdnjs with `--host-resolver-rules="MAP cdnjs.cloudflare.com 127.0.0.1"` tests the same thing).
- For a scroll-driven signature moment, also take a viewport-sized screenshot partway down the page with motion on, to confirm it actually moves.
- Fix anything broken: overflow, leftover template text, broken anchors, invisible content, console errors.
- Compare the desktop and phone screenshots of the hero, top bar and footer with the last few sites in the ledger (their folders are siblings of this repo). If a stranger could mistake them for the same template, change the look until they couldn't.
- Validate that the JSON-LD parses.
- Check that no visible text contains an em dash (scroll-craft's rule), and no `.sc-*` engine file was edited (`diff` against `~/.claude/skills/scroll-craft/engine/`).
- Search the new folder for any remaining `YourBrand`, `Ames` (unless the client is in Ames), `555-000`, `00000`, `Since 1998`, `4.9`, `Story County` (unless it applies), `estimate` (genre path, unless it applies), and `electric` (unless it applies).
- In `../<folder-name>/`, run `git init -b main`, then `git add -A`, then commit with the message `Initial site for <Business Name>`. If git has no `user.name`/`user.email` configured, reuse the author of the template repo's latest commit (`git -C <template path> log -1 --format='%an|%ae'`) via `git -c user.name=... -c user.email=...` for this commit only. Don't change the global git config.
- Don't create a GitHub repo and don't push.

## 10. Finish with a checklist

Append this site's row to `.claude/style-ledger.md` in the template repo (all sites), and update its "currently taken by streak" list for the last two rows. Commit that one file in the template repo with the message `Add <folder-name> to the style ledger`. Don't push.

Print a short summary first: the folder path, the genre used, the page grammar, the color and type choices and why, the signature moment and how it degrades on phones and under reduced motion, the look plan and its ledger check, what the harness checked and anything it couldn't (a real phone), and any assumptions (e.g. the state you picked, the nearby towns). If you invented a genre, print its entry for `genres.md`. Then print this checklist, filled in for this client, dropping lines that don't apply and adding genre-specific ones (menu and prices, booking link, show dates, class schedule, artist bios, and so on):

**Still needed before launch**
- [ ] Owner photos for the hero and every placeholder, with the town or subject for each
- [ ] Logo (SVG or high-res PNG). Update the favicon to match.
- [ ] Real services, menu or offerings, with prices where the page shows them
- [ ] Business hours
- [ ] Street address, ZIP, and the email the contact form should send to
- [ ] Link for the primary action (booking system, online ordering, tickets, donations) if it's not a phone call
- [ ] Hook up the contact form (e.g. Formspree) and remove the demo handler in `script.js`
- [ ] License number, insurance, year founded (trades and licensed professions)
- [ ] Real Google reviews, once they exist
- [ ] Google Maps embed URL for their address
- [ ] GitHub repo (`majoras-ip/<folder-name>`), push, and turn on GitHub Pages or other hosting
- [ ] Custom domain and DNS
- [ ] Google Business Profile: create or claim it, verify, and match the name, address, phone and hours to the site exactly
- [ ] Every remaining `TODO:` in the files (give the count from `grep -rc "TODO:"`)
