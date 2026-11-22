# Genre library for /new-client

`/new-client` reads this file to decide how a site should look, move and be organized for each kind of business. Add a genre by copying the blank entry at the bottom.

Each entry's **Style** is a starting direction, not a fixed look, and its **Sections** list is what the page must include, not a fixed order (the top bar comes first and the primary action closes the page). Two sites in the same genre must still look different: `/new-client` checks every site against `.claude/style-ledger.md`.

Pick the entry whose **Matches** list fits the business type best. Business types often have several names ("barbershop", "barber", "men's grooming"), so use judgment. If nothing fits, invent a new entry in the same shape (see "When nothing matches" at the end).

---

## Rules every genre follows

These come from the template's `CLAUDE.md` and never change per genre.

**Stack.** Plain HTML, CSS and JS, no build step and no package manager in the client folder. At most two Google Font families. No video backgrounds, no icon fonts, no other libraries.
- **Genre sites** use the scroll-craft engine: copy `~/.claude/skills/scroll-craft/engine/scrollcraft.js` and `scrollcraft.css` into the client folder unmodified, and remove the template's GSAP `<script>` tags (never load both). Drive motion with the engine's `data-sc-*` attributes, and write the signature moment as page JS in `script.js` reading the act's `--sc-p` progress. Where an entry below says "scrub", "pin" or "parallax", it means the engine's acts and devices (`data-sc-act`, `data-sc-parallax`, `data-sc-pan`, `data-sc-reveal`, `data-sc-in`).
- **Trades and the dentist / medical entry** (and other trust-first professions) keep the template's GSAP + ScrollTrigger 3.12.5 setup and its quiet section fades. No engine.

**One signature moment, one peak.** Each site gets exactly one loud, memorable animated element, chosen from its genre below. In scroll-craft terms it's the page's peak and the site's signature move. Other sections stay quieter: plain flow sections with a fade-in on entry (`data-sc-in`), plus at most two light devices elsewhere (a `reveal` wipe on a gallery, a `pan` row, a gentle `parallax` layer), never the same device twice in a row. If a genre's ideas list more than one moment, pick one.

**Motion safety.** The signature moment and every other device must:
- Show a finished, static version under `prefers-reduced-motion` (the engine and `gsap.matchMedia` both handle this; check your own page JS too).
- Keep content readable if JS never runs or the engine fails. The engine's CSS starts `data-sc-in`, `data-sc-stagger` children and `data-sc-cue` elements at `opacity: 0`, and the engine adds `sc-ready` to `<html>` once it's running. So every genre site's `styles.css` includes:
  `html:not(.sc-ready) :is([data-sc-in], [data-sc-stagger] > *, [data-sc-cue]) { opacity: 1 !important; transform: none !important; }`
  `data-sc-stagger` only works on an element that also has `data-sc-in` (the engine watches `data-sc-in` and staggers that element's children); on its own, the children stay invisible. Never put `data-sc-in` on anything above the fold (it would flash), and use `data-sc-cue` only on headings and decoration, never on prices, hours, menus or forms.
- Start the engine from `script.js` with `ScrollCraft.mount(document.body)`, after the code that adds `data-sc-act` for wide screens. On GSAP sites, set start states from JS (`gsap.set` or `gsap.from`), never in the stylesheet.
- Be decorative or duplicated elsewhere. Text people need, like prices, hours or show dates, is never only inside an animation. Mark purely decorative SVG with `aria-hidden="true"`.
- Not trap scrolling on phones. Pinned or horizontal scroll sections only pin at 900px and wider. The engine pins on phones too, so don't hard-code `data-sc-act="pin"` or `"pan"` in the HTML: add it in `script.js` before `ScrollCraft.mount()` runs (the engine reads attributes at mount), only when `matchMedia('(min-width: 900px)')` matches. Below that, the section stays a native horizontal swipe row (`overflow-x: auto` with `scroll-snap-type: x mandatory`) or a plain stacked list.
- Not cause layout shift or horizontal page scroll at any width.
- Use transforms and opacity only (no animating `width`, `top`, etc.), so it stays smooth on mid-range phones.

**Top action bar.** Every page (including 404) keeps a sticky bar at the very top, like the trades' `.call-bar`, but its action matches the genre's **Primary action** below: call, book, order, get directions, or see shows. `--signal` is used only for that primary action, everywhere it appears. If the action needs a link I don't have yet (a booking page, an online ordering page, a ticket link), point it at `#` with a `TODO:` comment and keep a `tel:` link next to it when there's a phone number.

**Honesty.** No made-up reviews, ratings, prices, menu items presented as real, stats, years in business, awards, client names or show dates. Prices are `TODO: price`. Counters only count real numbers the owner has given; until then, don't use a counter. Sample menu items, services or shows can fill out the layout only if each list has a `<!-- TODO: replace with the real ... -->` comment above it and the item names are generic ("Latte", "Skin fade"), never specific claims ("Voted best latte in Iowa").

**Copy.** Sentence case, plain language, written from the customer's side. No hype.

---

## Trades (electrician, roofer, plumber, HVAC, landscaper, painter, handyman, etc.)

- **Matches:** electrician, roofer, plumber, HVAC, heating and cooling, landscaper, lawn care, painter, handyman, contractor, remodeler, concrete, fencing, gutters, pest control, locksmith, garage doors, cleaning, moving, tree service, snow removal
- **Setup:** use the template exactly as it is and follow the trades path in `/new-client`. No signature moment beyond the existing quiet section fades.

---

## Barber / hair salon / nail salon

- **Matches:** barber, barbershop, hair salon, salon, stylist, nail salon, nails, lash, brow, spa, men's grooming
- **Schema type:** `HairSalon` (barbers and hair salons), `NailSalon`, `DaySpa`, or `BeautySalon`
- **Primary action:** "Book an appointment" (to the booking link, `TODO:` until known). Keep a call link beside it.
- **Style:** bold and characterful. Barbers lean retro (condensed slab or grotesk headlines, deep oxblood, bottle green or navy with cream and a brass or red accent). Salons and nail salons lean editorial (a high-contrast serif paired with a clean sans, muted blush, clay, sage or ink). Generous type sizes and a confident, short headline.
- **Signature moment, pick one:**
  - *Barber pole:* an inline-SVG barber pole in the hero whose stripes scroll with the page (page JS reading the hero act's `--sc-p`, translating a repeating stripe pattern inside an SVG `clipPath`). Static stripes under reduced motion.
  - *Scissor snip:* section dividers drawn as a dashed cut line. A small SVG pair of scissors travels along the line and the blades close as each section enters, once per section.
- **Sections:** top bar → hero (name, trade and city, book + call) → services and prices (a ruled price list: service name, one line, `TODO: price`, `TODO: time`) → the chairs or team (`TODO:` names and photos) → gallery of cuts or nails (photo grid, `TODO:` captions) → hours, address and map → walk-ins vs appointments, cancellation and payment FAQ → booking section (book button, call button, and a short contact form only if there's no booking system) → footer.
- **FAQ ideas:** do you take walk-ins, how far ahead should I book, what's your cancellation policy, do you cut kids' hair, what forms of payment do you take. Answers are `TODO:` unless I gave the facts.

## Coffee shop / bakery / café

- **Matches:** coffee shop, café, cafe, coffee, bakery, donut shop, tea house, juice bar, ice cream, dessert
- **Schema type:** `CafeOrCoffeeShop`, `Bakery`, or `IceCreamShop`
- **Primary action:** "Get directions" (Google Maps link to the address, `TODO:` until known) or "Order ahead" if they have online ordering. Keep a call link beside it.
- **Style:** warm and cozy. Toasted neutrals (crema, oat, cocoa, espresso) with one fresh accent (sage, tomato, butter yellow). A friendly serif or rounded display face with a readable sans. Rounded corners and a slightly hand-made feel, but keep it clean.
- **Signature moment, pick one:**
  - *Steam:* two or three soft SVG steam wisps rising and fading above a cup illustration in the hero, looping slowly (6 to 8 seconds, low opacity). A still cup under reduced motion.
  - *Menu carousel:* a horizontal menu strip. At 900px and wider, the section pins and vertical scrolling slides the menu cards sideways (engine `pan` act, added in `script.js` before mount at 900px+; follow scroll-craft's `pan` notes on measuring overflow and card headings). Below 900px, a native swipe row with scroll snap. Every item and price is also readable without the animation.
- **Sections:** top bar → hero (what they serve and where, directions + call) → menu (grouped: coffee, tea, food or pastries; item, one line, `TODO: price`) → about the place (`TODO:` story, roaster, baker) → photo strip of the space and food → hours (prominent, near the top on phones) and address with map → FAQ (wifi, seating, dietary options, catering) → visit section → footer.
- **FAQ ideas:** do you have wifi and outlets, do you have dairy-free or gluten-free options, can I order ahead, do you cater, is there parking. Answers are `TODO:` unless known.

## Restaurant / bar

- **Matches:** restaurant, diner, pizza, taco, bar, pub, brewery, winery, grill, bistro, steakhouse, sushi
- **Schema type:** `Restaurant`, `BarOrPub`, `Brewery`, or `Winery`
- **Primary action:** "Reserve a table" (`TODO:` link) or "Order online" or "Call to order", whichever fits.
- **Style:** depends on the place: dark and moody for bars and steakhouses, bright and loud for tacos and pizza. Big food photography placeholders.
- **Signature moment:** a menu where category tabs slide an underline and cross-fade the list (user-triggered, so it's welcome), or a slow scale-in of the hero photo on load. Pick one.
- **Sections:** top bar → hero → menu by category with `TODO: price` → about → photos → hours and map → private events or catering → FAQ → footer.

## Gym / personal trainer / studio

- **Matches:** gym, fitness, personal trainer, CrossFit, yoga, pilates, martial arts, boxing, dance studio, climbing gym
- **Schema type:** `ExerciseGym`, `SportsActivityLocation`, or `HealthClub`
- **Primary action:** "Book a free class" or "Start a trial" (only if I confirmed it's free; otherwise "Book a class") to a `TODO:` link.
- **Style:** high energy. Heavy condensed or extended sans headlines, high-contrast colors (electric blue, volt, red or orange on near-black or white). Tight, punchy copy. Yoga and pilates go calmer: soft neutrals, light weights, more space.
- **Signature moment, pick one:**
  - *Lift bar:* a thick progress bar fixed to the side or top that fills as you scroll, with a small barbell or plate icon riding its end. Hidden under reduced motion or shown full.
  - *Counters:* numbers count up when they enter view. Only allowed with real numbers I gave you (members, classes per week, years open). Without real numbers, use the lift bar instead.
- **Sections:** top bar → hero → classes or programs (name, one line, who it's for) → schedule (`TODO:` table) → coaches (`TODO:` names, photos, certifications) → membership and pricing (`TODO: price` per plan) → photos → FAQ (first visit, what to bring, contracts) → location and hours → footer.

## Photographer / artist / designer

- **Matches:** photographer, videographer, wedding photographer, artist, painter (fine art), illustrator, designer, florist, studio
- **Schema type:** `ProfessionalService` with a `Person` or `LocalBusiness` as fits
- **Primary action:** "Check availability" or "Book a session" (to the contact form or a `TODO:` booking link).
- **Style:** the work is the hero. Lots of whitespace, a refined serif or a quiet grotesk, near-monochrome palette that doesn't fight the photos. Big images, small type.
- **Signature moment, pick one:**
  - *Horizontal gallery:* at 900px and wider, a pinned section where vertical scroll moves a row of large images sideways. Below 900px, a swipe row with scroll snap.
  - *Image reveals:* each gallery image is unmasked once with a `clip-path` wipe as it enters.
- **Sections:** top bar → hero (one striking image placeholder and a short line) → gallery (`TODO:` captions with place) → services or packages (`TODO: price`) → about the artist (`TODO:`) → process → FAQ → inquiry form (date, type of session, message) → footer.

## Food truck

- **Matches:** food truck, food trailer, mobile kitchen, pop-up, catering truck
- **Schema type:** `FoodEstablishment`
- **Primary action:** "Where we are this week" (jumps to the schedule), plus "Book us for an event". Keep a call link.
- **Style:** loud and fun. Bold display type, a bright two-color palette drawn from the truck wrap, playful but legible.
- **Signature moment:** a simple SVG truck that drives across the hero or a divider once as you scroll past (page JS reading `--sc-p`: the truck translates on `x` and the wheels rotate). A parked truck under reduced motion.
- **Sections:** top bar → hero → this week's schedule (`TODO:` days, places, times; tell people where updates are posted) → menu on a chalkboard-style panel (dark board color, chalk-like font only if it stays readable, `TODO: price`) → book the truck for events (form) → photos → FAQ (payment, catering minimums, dietary options) → footer.

## Church / nonprofit / community group

- **Matches:** church, ministry, parish, temple, synagogue, mosque, nonprofit, charity, foundation, community center, club, library
- **Schema type:** `Church`, `PlaceOfWorship`, `NGO`, or `Organization`
- **Primary action:** "Plan a visit" (church) or "Donate" / "Get involved" (nonprofit), to a `TODO:` link or the contact section.
- **Style:** calm, warm and welcoming. A gentle serif headline with a friendly sans, warm light colors, real-people photography placeholders. Nothing slick or salesy.
- **Signature moment:** a calm parallax hero: the background photo moves at most about 15% slower than the page (engine `data-sc-parallax`), only at 900px and wider, off under reduced motion. Or an events timeline whose line draws down as you scroll.
- **Sections:** top bar → hero (service times or mission, prominent) → what to expect on a first visit / what we do → upcoming events timeline (`TODO:` dates) → ministries or programs → leadership (`TODO:` names) → give or volunteer → location, times and map → FAQ (parking, kids, what to wear, accessibility) → footer.

## Band / musician / DJ

- **Matches:** band, musician, singer, DJ, choir, orchestra, music teacher, performer
- **Schema type:** `MusicGroup` or `Person` (solo), with `Event` entries only for real show dates
- **Phone:** optional (`none` is fine).
- **Primary action:** "See upcoming shows" or "Book us" (for wedding and event bands).
- **Style:** pulled from the music's genre: grainy and loud for punk, glossy for pop, warm and analog for folk and jazz. Big type, strong color.
- **Signature moment, pick one:**
  - *Spinning vinyl:* an SVG record in the hero that rotates with scroll (page JS reading `--sc-p`, setting `rotate`). Still under reduced motion.
  - *Equalizer:* a row of SVG bars that bounce gently in the hero, looping, with randomized heights.
- **Sections:** top bar → hero → listen (links to Spotify, Apple Music, Bandcamp, YouTube as `TODO:` links; no third-party embeds unless I ask) → upcoming shows (`TODO:` date, venue, city, ticket link; an empty state that says where shows get announced) → about the band (`TODO:`) → photos → booking inquiry form → footer.

## Real estate agent / property manager

- **Matches:** real estate agent, realtor, broker, property management, home builder, apartments
- **Schema type:** `RealEstateAgent`
- **Primary action:** "Call" plus "Get a home value estimate" or "Schedule a showing".
- **Style:** clean and premium. A refined serif or elegant sans, deep navy, charcoal or forest with warm white and a quiet metallic accent. Large property photos, wide margins.
- **Signature moment:** featured listings that slide in from the side one after another as the section enters, or a map-style section with an SVG outline of the service area whose neighborhood labels fade in. Pick one.
- **Sections:** top bar → hero (agent name, area) → featured listings (cards with `TODO:` address, price, beds, baths, photo; no fake listings presented as real) → neighborhoods served → buying / selling process steps → about the agent (`TODO:` brokerage, license) → FAQ → contact form → footer with brokerage name and equal housing notice (`TODO:` confirm wording with the brokerage).

## Tattoo / piercing shop

- **Matches:** tattoo, tattoo shop, tattoo parlor, piercing, body art
- **Schema type:** `TattooParlor`
- **Primary action:** "Book a consult" (`TODO:` link or the form).
- **Style:** dark and edgy. Near-black or deep ink backgrounds, bone or parchment text, one sharp accent (blood red, acid green, gold). Blackletter or heavy display type used sparingly for headlines, readable sans for everything else.
- **Signature moment:** ink that draws itself: an SVG line-art flourish (rose, dagger, swallow, or something abstract) whose stroke draws in as you scroll (`stroke-dasharray` / `stroke-dashoffset` driven by `--sc-p`; the svg-animation skill covers the draw-on technique). Fully drawn under reduced motion.
- **Sections:** top bar → hero → artists (`TODO:` names, styles, photos, Instagram links) → portfolio gallery (`TODO:` captions) → how booking works (consult, deposit, appointment, aftercare) → shop policies (age, ID, deposits as `TODO:`) → aftercare → hours and location → FAQ → booking form → footer.

## Dentist / doctor / medical / therapy

- **Matches:** dentist, orthodontist, doctor, clinic, chiropractor, physical therapy, optometrist, counselor, therapist, veterinarian, med spa
- **Schema type:** `Dentist`, `Physician`, `MedicalClinic`, `Optometric`, `Physiotherapy`, `VeterinaryCare`
- **Primary action:** "Call to book" or "Request an appointment".
- **Style:** clean and trustworthy. Soft blues, teals or greens with plenty of white, a humanist sans for everything (one family is fine), rounded but not bubbly. Real staff photos, never stock smiles presented as patients.
- **Signature moment:** none. Gentle motion only: the template's quiet section fades. No gimmicks; it has to feel professional.
- **Sections:** top bar → hero → services → new patients (what to bring, forms as `TODO:` links) → insurance accepted (`TODO:` list) → meet the team (`TODO:` names, credentials) → hours, location and map → FAQ → appointment request form (no health details in the form; add a note telling people not to share medical information) → footer.

## Personal portfolio

- **Matches:** portfolio, personal site, resume, freelancer, developer, writer, consultant, student
- **Schema type:** `Person`
- **Phone:** optional (`none` is fine). City is still used for "based in".
- **Primary action:** "Get in touch" (email `TODO:` or the contact form).
- **Style:** a reflection of the person. A distinctive display face, an unexpected color, an interesting layout. This is the genre where the site itself is the sample work.
- **Signature moment, pick one:**
  - *Intro:* a short, once-only load sequence on the name (under 1.2 seconds total, skipped under reduced motion and on repeat visits via `sessionStorage`). This is the one exception to "don't animate the hero."
  - *Project cards:* cards that expand to show details on click or tap (user-triggered, using `<details>` or a button with `aria-expanded`), or flip on hover with a tap fallback.
- **Sections:** top bar (slim) → intro → selected work (`TODO:` project names, roles, links) → about → skills or services → contact → footer.

## Event / wedding / conference

- **Matches:** event, wedding, conference, festival, fundraiser, reunion, tournament, launch
- **Schema type:** `Event` (with real date and location only; `TODO:` otherwise)
- **Phone:** optional (`none` is fine).
- **Primary action:** "RSVP" or "Get tickets" (`TODO:` link).
- **Style:** fits the occasion: romantic serif and soft color for weddings, bold and clean for conferences, loud for festivals.
- **Signature moment:** a countdown to the date (only with a real date; it counts down live and shows a "this event has happened" state afterwards), or a schedule whose times light up in sequence as you scroll.
- **Sections:** top bar → hero (name, date, place) → schedule (`TODO:` times) → venue and travel → speakers, lineup or wedding party (`TODO:`) → FAQ → RSVP or tickets → footer.

---

## When nothing matches

Invent a new entry in the same shape: matches, schema type, primary action, style, one signature moment (following the motion safety rules), sections, and FAQ ideas. Base the style and moment on the most characteristic object or action in that business's world (a dog groomer: a wagging tail or bubbles; a bookstore: pages that turn). Professional services where trust matters most (lawyers, accountants, insurance, financial advisors) get the dentist treatment: clean, quiet, no gimmicks.

Don't add the new entry to this file during a build. Print it at the end of the summary so I can add it.

## Blank entry

```
## <Genre name>

- **Matches:**
- **Schema type:**
- **Phone:** (only if optional)
- **Primary action:**
- **Style:**
- **Signature moment:**
- **Sections:**
- **FAQ ideas:**
```
