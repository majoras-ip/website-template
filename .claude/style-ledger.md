# Style ledger

Every site `/new-client` builds gets one row in the table at the bottom. Before designing a new site, read every row: each one is a look that's already taken. The goal is that no two client sites look like the same template in different colors, including two sites in the same trade or genre.

This is the one file in the template repo a build is allowed to change: append one row at the end of a build. Never edit or delete an existing row to make room for a new site.

---

## The rules

**1. Differ from every site on at least 7 of the 10 visual dimensions.** Check the planned site against each row separately, not on average. The dimensions are the columns of the table: palette, ground, type, shape, top bar, nav, hero, content layout, close and footer, signature. "Differ" means a reader comparing two screenshots would call them different, not a tweak (a 4px vs 6px radius is the same shape; navy vs a slightly bluer navy is the same palette).

**2. No streaks.** If the last two sites in the table share a choice on any dimension, the next site can't use it. (Example: the last two both have a dark top bar with a button and call link, so the next one needs a different top bar.)

**3. Never reuse:**
- a font pairing (display + body) from any row, or a display face from the last five rows;
- a brand hue within about 30° of any site in the same genre, or of the last three sites in any genre (a clearly different lightness or saturation family also counts as different, e.g. pale sage vs deep forest);
- a hero layout used by any site in the same genre.

**4. Required elements stay, their look changes.** The sticky top bar, the click-to-call link, the primary action, the H1 naming the business type and city, the hours, the FAQ and the contact path are requirements. How they look is free, within the accessibility and phone rules in `CLAUDE.md`.

**5. Variety never beats the rules.** Contrast, 52px buttons, 16px inputs, no sideways scroll, honesty and speed on phones all still apply. Trades sites keep their quiet motion; their variety comes from layout, type, color and shape, not animation.

If a plan fails, change the plan, not the ledger.

---

## Options for each dimension

These are starting menus, not the only choices. Invent new options freely; add them here when they work.

**Palette.** Name the brand hue, the signal hue and the ground. Rotate through hue families instead of defaulting to the trade's obvious color: navy, cobalt, teal, forest, olive, sage, ochre, rust, brick, oxblood, plum, charcoal, warm black, sand, chalk. Avoid cream with brass and espresso unless the brand names them.

**Ground.** Light; dark; mid-tone (a saturated brand color as the main ground); alternating light and dark sections; one color with tonal steps.

**Type.** Mix the category of display face: condensed grotesk, wide or extended grotesk, slab serif, high-contrast serif, soft or rounded sans, humanist sans, geometric sans, mono for data only, a single variable family used at two widths or optical sizes. Don't default to Inter, Barlow or the last site's face.

**Shape.** Sharp (0 to 2px) with hairline rules; soft cards (8 to 14px) with shadows; pill buttons; outlined and flat; heavy borders (2 to 3px); cut corners or tabs; a printed or textured feel made with CSS only (no image textures).

**Top bar.**
- full-width signal-colored bar with the number in big type
- dark bar with a signal button and a call link
- brand-colored bar with a signal button
- split bar: two halves, primary action and call
- slim bar with the hours today and a call button
- bar with the logo inside it (the nav merges into the top bar)

**Nav.**
- logo left, links right
- logo centered, links split on both sides
- logo and one "Menu" button at every width, opening a full-screen menu
- links set as an index inside the hero
- vertical side nav on wide screens
- no nav links at all on a short one-page site, just the top bar and anchors in the content

**Hero.**
- split: text left, picture right
- split reversed: picture left, text right
- centered headline over a full-bleed photo with a scrim behind the text only
- stacked: a huge headline, then a wide photo band under it
- type only, poster style
- object-led: one labelled object or illustration
- overlap: photo bleeding off one edge with a text panel overlapping it
- grid: the headline sits in one cell of a photo grid
- a hero with the hours, address and primary action as a big fact block (good for shops)

**Content layout** (services, menu, prices, classes, work).
- ruled list (one or two columns)
- price table
- photo tiles
- horizontal rail
- tabs that switch the list
- accordion
- one big feature plus a short list
- numbered steps (only for real sequences)
- timeline
- masonry or uneven gallery

**Close and footer.**
- inverted plate in the brand color
- label or ticket style plate
- big phone number close
- map-led close with the address set large
- split close with a form on one side
- oversized wordmark footer
- minimal one-line footer
- footer as a hours-and-address card
- a light footer instead of the usual dark one

Also vary the smaller patterns that make sites look related: how the FAQ opens (plus sign, chevron, Q and A columns, numbered for long lists only), how hours show (table, big text block, a "today" line), and how the map appears (a lightweight link card is faster on phones than an embedded Google map).

---

## The registry

| Site | Genre | Palette (brand / signal) | Ground | Type (display + body) | Shape | Top bar | Nav | Hero | Content layout | Close and footer | Signature |
|---|---|---|---|---|---|---|---|---|---|---|---|
| jaspering-electric (2026-11-22) | Electrician (trades) | Cobalt navy #1C3A5E / Romex yellow #FFC629 | Light, brand-color masthead | Archivo condensed + Archivo | Soft 6px, hairline rules | Full-width signal bar, big number | Logo left, links right, on the brand masthead | Split: text left, photo right, credentials row under | Ruled 2-column services, numbered steps, 3-column photo grid | Estimate form split with call button; dark 3-column footer | None (quiet section fades) |
| copper-pole-barbers (2026-11-22) | Barber | Oxblood #6B1E24 + navy / marigold #F2B33D | Light cool paper, white alternate sections | Alfa Slab One + Public Sans | Sharp 4px, heavy top rules | Dark bar with signal button and call link | Logo left, links right, plus a fixed side pole as folio | Split: text left, layered art right (block, photo, line art) | Ruled price board, 3-column portrait grid, 3-column reveal gallery | Inverted oxblood plate; dark 3-column footer | Barber pole that turns with scroll |
| fernhollow-coffee (2026-11-22) | Coffee shop | Olive #3B4726 on sage / brick #A93E27 | Light sage, olive menu band | Bricolage Grotesque only | Soft 14px cards, pill buttons, shadows | Dark bar with signal pill and call link | Logo left, links right | Split: text left, labelled cup card right | Horizontal menu rail of label cards, 2-column about, uneven photo grid | Label-style "Come by" plate; dark 3-column footer | Menu cards drop onto a counter as the shelf pans |

**Currently taken by streak (rule 2), so the next site can't use these:**
- Top bar: dark bar with a signal button and call link
- Nav: logo left, links right
- Hero: split with text left
- Footer: dark 3-column footer
- FAQ: plus-sign accordion; hours table beside an embedded map
