# SEASHORE FIBERGLASS LLC — Project Context

> This file captures the full project requirements extracted from the 54-page Website Brief and the 117-page Master Technical Manual. It also includes client feedback from Phase 1, Phase 2 task assignments, and the current project state.

---

## Table of Contents

1. [Business Identity](#1-business-identity)
2. [Brand Guidelines](#2-brand-guidelines)
3. [Technical Standards & Platform](#3-technical-standards--platform)
4. [Complete Sitemap](#4-complete-sitemap)
5. [Page-by-Page Content Requirements](#5-page-by-page-content-requirements)
6. [Technical Manual Summary](#6-technical-manual-summary)
7. [SEO & Schema Requirements](#7-seo--schema-requirements)
8. [Client Feedback — Phase 1 Issues](#8-client-feedback--phase-1-issues)
9. [Current Project State](#9-current-project-state)
10. [Phase 2 Task Assignments (60% Milestone)](#10-phase-2-task-assignments-60-milestone)

---

## 1. Business Identity

- **Business Name:** Seashore Fiberglass LLC
- **Industry:** Residential fiberglass deck installation, repair, and restoration (NOT boats)
- **Founded:** 2014
- **Owner:** Francisco Ruiz
- **Type:** Family-owned and operated
- **Location:** 406 Asbury Ave, Ocean City, NJ 08226
- **Phone:** (609) 338-4505
- **Email:** info@seashorefiberglass.com
- **Hours:** Monday–Saturday 7am–6pm, Sunday by appointment
- **Credentials:** Licensed & Insured (NJ contractor license, liability + workers' comp)
- **Reviews:** 50+ 5-Star Google Reviews
- **Service Region:** South Jersey Shore — 13 towns

### Core Services (Exact 6)

1. **Fiberglass Deck Repair** — `/services/fiberglass-deck-repair`
2. **Fiberglass Deck New Construction** — `/services/fiberglass-deck-new-constructions`
3. **Fiberglass Deck Resurfacing (Reglass)** — `/services/fiberglass-deck-resurfacing`
4. **Fiberglass Deck Recolor (Re-Gelcoating)** — `/services/fiberglass-deck-recolor`
5. **Composite Decks & Deck Steps** — `/services/composite-decks`
6. **Vinyl Railing** — `/services/vinyl-railing`

### Service Areas (Exact 13)

| # | Town | URL Slug | Primary Challenge |
|---|------|----------|-------------------|
| 1 | Ocean City NJ (home base) | ocean-city-nj | Boardwalk winds, bay humidity, intense summer UV |
| 2 | Long Beach Island | long-beach-island | Most intense barrier island salt spray and wind |
| 3 | Brigantine NJ | brigantine-nj | Bayfront humidity, salt from ocean and bay sides |
| 4 | Atlantic City NJ | atlantic-city-nj | Boardwalk-adjacent, urban shore, rental properties |
| 5 | Ventnor City NJ | ventnor-city-nj | Residential boardwalk homes, year-round occupancy |
| 6 | Margate City NJ | margate-city-nj | Upscale beachfront, luxury waterproofing needs |
| 7 | Longport NJ | longport-nj | Exclusive waterfront, elevated decks, premium finishes |
| 8 | Strathmere NJ | strathmere-nj | Rural dune character, wind-driven salt exposure |
| 9 | Sea Isle City NJ | sea-isle-city-nj | Vacation rental homes, heavy seasonal use |
| 10 | Avalon NJ | avalon-nj | Upscale oceanfront, elevated decks, UV intensity |
| 11 | Stone Harbor NJ | stone-harbor-nj | Family summer homes, seasonal use patterns |
| 12 | Wildwood NJ | wildwood-nj | High tourist traffic, boardwalk exposure, rental durability |
| 13 | Cape May NJ | cape-may-nj | Historic Victorian homes, bay/ocean convergence, highest salt |

---

## 2. Brand Guidelines

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Navy Blue | `#1B3A5C` | Primary — headers, backgrounds, footer |
| Turquoise | `#2A7DA6` | Accent — links, hover states, section labels |
| Orange | `#E87C2B` | CTA buttons, highlights, urgency |
| White | `#FFFFFF` | Backgrounds, hero text |
| Light Gray | `#F8FAFC` (slate-50) | Alternating section backgrounds |

### Typography

- **Heading font:** Montserrat (modern sans-serif)
- **Body font:** Inter (or Open Sans / Roboto as alternatives)
- Both loaded via `next/font/google`

### CTAs (Exact Text)

- Primary: **"Get Your FREE Inspection & Quote"**
- Secondary: **"Call / Text (609) 338-4505"**

### Trust Badges (Exact Text)

1. Licensed & Insured
2. 50+ 5-Star Google Reviews
3. Family-Owned in Ocean City NJ
4. Work Guaranteed

### Design Direction

- Mobile-first execution
- Premium coastal aesthetic — not generic contractor
- Smooth scrolling, subtle entrance animations, hover states, refined transitions
- Service pages: waterproofing concepts, before/after emphasis, fiberglass surface visual cues
- Service area pages: coastal references, subtle ocean-inspired design accents per town
- Blog: animated article cards, related-post recommendations
- Gallery: engaging grid or carousel with lightbox, hover effects, project captions
- Chatbot/guided assistant (future phase)

---

## 3. Technical Standards & Platform

- **Framework:** Next.js 14 (App Router) — chosen as "equivalent CMS" per brief
- **Monorepo:** pnpm workspaces + Turborepo
- **Styling:** Tailwind CSS 3.4
- **Animation:** Framer Motion
- **Performance targets:** PageSpeed 90+, page load under 3 seconds
- **Image optimization:** All images compressed under 200 KB where practical
- **Forms:** Must support email confirmation and CRM integration capability
- **Analytics:** Google Analytics 4 + Google Search Console (future phase)
- **All project photos:** keyword-rich descriptive alt text
- **Click-to-call / click-to-text:** Required on all mobile pages

---

## 4. Complete Sitemap

```
/                                          Home
/about-us                                  About Us
/services                                  Services (parent)
  /services/fiberglass-deck-repair         Fiberglass Deck Repair
  /services/fiberglass-deck-new-constructions  Fiberglass Deck New Construction
  /services/fiberglass-deck-resurfacing    Fiberglass Deck Resurfacing (Reglass)
  /services/fiberglass-deck-recolor        Fiberglass Deck Recolor (Re-Gelcoating)
  /services/composite-decks                Composite Decks & Deck Steps
  /services/vinyl-railing                  Vinyl Railing
/service-areas                             Service Areas (parent)
  /service-areas/ocean-city-nj             Ocean City NJ
  /service-areas/long-beach-island         Long Beach Island
  /service-areas/brigantine-nj             Brigantine NJ
  /service-areas/atlantic-city-nj          Atlantic City NJ
  /service-areas/ventnor-city-nj           Ventnor City NJ
  /service-areas/margate-city-nj           Margate City NJ
  /service-areas/longport-nj               Longport NJ
  /service-areas/strathmere-nj             Strathmere NJ
  /service-areas/sea-isle-city-nj          Sea Isle City NJ
  /service-areas/avalon-nj                 Avalon NJ
  /service-areas/stone-harbor-nj           Stone Harbor NJ
  /service-areas/wildwood-nj               Wildwood NJ
  /service-areas/cape-may-nj               Cape May NJ
/blog                                      Blog (parent)
  /blog/common-deck-problems-ocean-city-nj
  /blog/why-fiberglass-decks-outlast-other-options-jersey-shore
  /blog/deck-maintenance-guide-south-jersey
  /blog/re-gelcoating-vs-resurfacing-south-jersey
  /blog/flashings-door-pans-prevent-leaks-living-spaces
  /blog/composite-decks-coastal-areas-jersey-shore
/faqs                                      FAQs
/contact                                   Contact
/gallery                                   Gallery
```

---

## 5. Page-by-Page Content Requirements

### HOME PAGE — `/`

**Meta Title:** Fiberglass Decks Ocean City NJ | Repair, Reglass & Installation Experts
**Meta Description:** Family-owned fiberglass deck contractors in Ocean City NJ & South Jersey Shore. Expert repair, reglass restoration, resurfacing & recolor maintenance. 50+ 5-star reviews. Free inspections — call (609) 338-4505!

**Hero Section:**
- H1: "Fiberglass Decks Built for the Jersey Shore — Ocean City NJ & Beyond"
- Subheadline: "Over 10 years of family-owned expertise installing, reglassing, and repairing fiberglass decks that stand up to salt air, UV exposure, high humidity, and winter freeze-thaw cycles. Waterproof. Non-slip. Built to last."
- CTA 1: "Get Your FREE Inspection & Quote"
- CTA 2: "Call / Text (609) 338-4505"
- Trust badges row: Licensed & Insured | 50+ 5-Star Google Reviews | Family-Owned in Ocean City NJ | Work Guaranteed
- Background: real finished project photo — brilliant gelcoat, coastal backdrop, natural light

**Built for the Jersey Shore Section:**
Full paragraph about salt spray, humidity (80-90% summer), UV, freeze-thaw. Technical specs: dual-layer plywood (3/4" CDX + 1/2" ACX, glued and screwed), 2-oz fiberglass mat, wall flashings min 12", post flashings min 6", door transition systems, PVC drip edges, 1/4" per foot pitch.

**Our Services Section:**
All 6 services with brief descriptions (see Business Identity section above).

**Service Areas Section:**
All 13 towns as clickable links to service area pages. Include interactive map or clickable town list.

**What Our Neighbors Say Section:**
Embed Google Reviews widget + 6 featured reviews:

1. "Francisco and his crew replaced our rotted structural posts, re-secured the entire plywood substrate, and reglassed the deck in four days. Professional from start to finish." — Michael K., Ocean City NJ
2. "We had soft spots and nail pops everywhere. Seashore fixed the root cause — not just the surface. The deck is completely solid now. Highly recommend." — Resident, Brigantine NJ
3. "Honest quote, clean work, on time. They fixed our puddling issue by correcting the pitch properly. No more standing water." — Homeowner, Margate City NJ
4. "They did an exceptional job. Identified missing flashings we didn't even know were the problem. No more leaks." — Client, Avalon NJ
5. "Francisco explained the whole process clearly — why the deck was failing, exactly what they would do, and why. Our deck is perfect for summer now." — Resident, Ventnor City NJ
6. "Upgraded our old drip edge to PVC and sealed everything properly. Everything they do is technically correct and built to last." — Homeowner, Cape May NJ

**Final CTA + Lead Form:**
- Title: "Ready to Get Your Deck Shore-Ready?"
- Form fields: Name, Phone, Email, City/Area, Brief Message, "Send Free Quote Request" button

---

### ABOUT US — `/about-us`

**Meta Title:** About Seashore Fiberglass | Family-Owned Deck Experts – Ocean City NJ
**Meta Description:** Learn about Seashore Fiberglass — family-owned in Ocean City NJ since 2014. 10+ years of fiberglass deck repair, reglass restoration & coastal deck expertise across the South Jersey Shore. 50+ 5-star reviews.

**H1:** About Seashore Fiberglass — Protecting Jersey Shore Homes Since 2014

**Content sections:**
- Introduction: Not a large national company. Family business started in Ocean City NJ. 10+ years as local choice for fiberglass deck systems done correctly.
- Our Story — Why We Started and Why We Stay: Francisco Ruiz founded company after recognizing consistent pattern of preventable deck failures. Details: wall flashings too short or missing, door thresholds without transition systems, railing posts without flashing, plywood with nails-only loosening, wooden drip edges rotting. Francisco's approach: dual-layer plywood, correct pitch, full flashings, PVC drip edges, etc.
- What Makes Us Different (6 differentiators):
  1. Local, Not Corporate
  2. Licensed & Fully Insured
  3. 50+ Five-Star Google Reviews
  4. No High-Pressure Sales
  5. Technical Precision
  6. Clean, Respectful Job Sites
- Our Commitment to the South Jersey Shore: All 13 service areas listed.

---

### SERVICES OVERVIEW — `/services`

**Meta Title:** Fiberglass Deck Services Ocean City NJ | Repair, Reglass & Installation
**Meta Description:** Expert fiberglass deck services across the South Jersey Shore: repair, reglass restoration, resurfacing, recolor maintenance, composite decks & vinyl railing. Licensed & insured. 50+ 5-star reviews. Free quotes — (609) 338-4505

**H1:** Fiberglass Deck Services — Engineered for the South Jersey Shore

---

### SERVICE: Fiberglass Deck Repair — `/services/fiberglass-deck-repair`

**Meta Title:** Fiberglass Deck Repair Ocean City NJ | South Jersey Shore Specialists
**Meta Description:** Professional fiberglass deck repair across South Jersey Shore. Fix soft spots, water puddling, missing flashings, structural rot & more. Expert diagnosis, permanent repair. 50+ 5-star reviews — call (609) 338-4505

**H1:** Fiberglass Deck Repair — Permanent Solutions for South Jersey Shore Decks

**Content:**
- Introduction about transition failures being root cause of most problems
- Common Problems We Diagnose and Repair (8 items):
  1. Water Puddling After Rain — insufficient pitch (requires 1/4" per foot)
  2. Soft Spots Underfoot — plywood deterioration from moisture beneath membrane
  3. Missing or Short Wall Flashings — must extend minimum 12" up vertical surfaces
  4. Missing or Failed Door Transition System — critical transition point
  5. Railing Post Leaks — need 6" vertical flashing
  6. Structural Posts Inside Columns — hidden flashing failures
  7. Deteriorated Wood Drip Edge — water infiltrates behind fascia to joists
  8. Nail Pops & Plywood Seams — substrate movement from nail-only fastening
- Our Diagnostic Approach: visual examination, walk-test, transition inspection, drip edge evaluation
- Three repair levels: Recolor Maintenance, Reglass Restoration, Structural Reconstruction
- Standard Repair Process (Reglass-Level) — 14 steps:
  1. Railing System Removal
  2. Full Structural Inspection
  3. Structural Repairs
  4. Pitch Correction (sister joists, 1/4"/foot)
  5. Plywood Re-Securing (screws every 6" along joists)
  6. Drip Edge Replacement (PVC/Azek)
  7. Flashing Installation/Correction (12" walls, 6" posts, door transitions)
  8. Surface Grinding
  9. Fill Screw Heads & Seams (Bondo)
  10. New Fiberglass Layer (2-oz mat with resin)
  11. Post-Cure Grinding
  12. Acetone Clean
  13. Textured Gelcoat Application (UV-resistant, pumice-infused)
  14. Railing Reinstallation & Walkthrough
- Timeline: Most repairs 2-5 days. Full reglass 4-7 days.

---

### SERVICE: Fiberglass Deck New Construction — `/services/fiberglass-deck-new-constructions`

**Meta Title:** Fiberglass Deck Installation Ocean City NJ | New Construction South Jersey Shore
**Meta Description:** New fiberglass deck installation across South Jersey Shore. Engineered systems with correct pitch, PVC drip edges, full flashings & marine-grade gelcoat. Built to last 20+ years — free quotes (609) 338-4505

**H1:** Fiberglass Deck New Construction — Engineered Right From Day One

**Content — Our New Construction System (15+ components):**
1. Deck Framing — pressure-treated lumber (2x10 or 2x12 joists)
2. Deck Pitch — 1/4" per foot slope during framing stage
3. Packer Boards — 5/4 pressure-treated (~1-3/4" wide) around perimeter on joists
4. Perimeter Metal Flashing — after packer boards, before plywood
5. Plywood Layer 1 — 3/4" CDX, glued + nailed with 3-1/4" galvanized nails
6. Plywood Layer 2 — 1/2" ACX, glued and screwed
7. Chamfer Strips — 45-degree at all wall-to-deck transitions
8. PVC Drip Edge — 1x4 (~3.5" wide), rot-proof, wider than packer board
9. Surface Grinding
10. Screw/Seam Filling (Bondo)
11. Fiberglass Membrane — 2-oz mat, resin saturated, continuous
12. Wall Flashings — min 12" up vertical surfaces, before siding
13. Post Flashings — min 6" vertically around all posts
14. Door Transition System — custom-fabricated, integrated with building envelope
15. Post-Cure Grinding & Acetone Clean
16. Marine-Grade Textured Gelcoat

---

### SERVICE: Fiberglass Deck Resurfacing (Reglass) — `/services/fiberglass-deck-resurfacing`

**Meta Title:** Fiberglass Deck Resurfacing & Reglass South Jersey NJ | Membrane Renewal
**Meta Description:** Professional fiberglass deck resurfacing and reglass restoration across South Jersey Shore. New waterproof membrane over existing deck — fix nail pops, aging fiberglass, drip edges & flashings. Free quotes (609) 338-4505

**H1:** Fiberglass Deck Resurfacing & Reglass Restoration — Complete Membrane Renewal

**Content:**
- When Reglass Is Right: widespread cracking, multiple previous patches, nail pops/seams, deteriorated drip edges, missing/improper flashings
- Important: Reglass vs. Recolor distinction
- Professional Reglass Process — 12 steps
- Timeline: 4-7 days. Resets membrane life — recolor in ~5 years, reglass in ~10 years

---

### SERVICE: Fiberglass Deck Recolor (Re-Gelcoating) — `/services/fiberglass-deck-recolor`

**Meta Title:** Fiberglass Deck Re-Gelcoating & Recolor Ocean City NJ | Maintenance Service
**Meta Description:** Professional fiberglass deck recolor and re-gelcoating service across South Jersey Shore. Restore UV protection, appearance & slip resistance. Recommended every 5 years — free quotes (609) 338-4505

**H1:** Fiberglass Deck Recolor & Re-Gelcoating — Surface Maintenance & UV Restoration

**Content:**
- When Recolor Is Right: faded/chalking gelcoat, minor cosmetic wear, no soft spots, ~3-5 years since last application
- Professional Recolor Process — 5 steps
- Timeline: 1-2 days. Ready for light use next day.
- Maintenance intervals: Recolor every ~5 years, Reglass every ~10 years

---

### SERVICE: Composite Decks & Deck Steps — `/services/composite-decks`

**Meta Title:** Composite Deck Installation South Jersey Shore | Wolf Decking Ocean City NJ
**Meta Description:** Professional composite deck installation using Wolf decking & Azek PVC fascias across South Jersey Shore. Salt-resistant, UV-stable, zero-rot. Low maintenance for coastal homes — free quotes (609) 338-4505

**H1:** Composite Decks & Deck Steps — Low-Maintenance Performance for Coastal Homes

**Content:**
- Why Wolf Decking: 100% PVC (no wood fibers), marine-grade salt protection, 25-30 year warranty, minimal thermal expansion
- Paired with Azek PVC fascias and steps
- When composite is right vs. when fiberglass is better (elevated decks over living spaces need fiberglass)

---

### SERVICE: Vinyl Railing — `/services/vinyl-railing`

**Meta Title:** Vinyl Railing Installation South Jersey Shore | Ocean City NJ Railing Experts
**Meta Description:** Professional vinyl railing installation & repair across South Jersey Shore. Rust-free, code-compliant, zero-maintenance in salt air. New systems, repairs & upgrades — free quotes (609) 338-4505

**H1:** Vinyl Railing — Rust-Free, Code-Compliant Safety for the Shore

**Content:**
- Benefits: zero rust, no maintenance, code-compliant, wind/impact resistant
- Technical note: railing post penetrations must have 6" fiberglass flashing
- Conversion option: structural mount posts to 4x4 pressure-treated with blocking

---

### SERVICE AREA PAGES (13 pages)

Each page follows same structure:
- Town-specific H1
- Unique local challenge paragraph
- "Services Available in [Town]" — all 6 services listed
- CTA: "[Town] homeowners — get a free quote. Call (609) 338-4505"

(Full content for each town is in the Website Brief, Section 6, pages 25-33.)

---

### BLOG — `/blog` + 6 posts

**Meta Title:** Fiberglass Deck Blog | Tips & Guides for Ocean City NJ — Seashore Fiberglass
**Meta Description:** Expert fiberglass deck blog for South Jersey Shore homeowners. Learn deck repair, reglass vs. recolor, maintenance tips, coastal deck systems & more from Ocean City NJ contractors. 50+ 5-star reviews.

**H1:** Seashore Fiberglass Blog — Technical Advice for Decks on the Jersey Shore

**6 Blog Posts (full article content in brief pages 35-46):**

1. `/blog/common-deck-problems-ocean-city-nj` — "The Most Common Deck Problems We See in Ocean City NJ (And How to Fix Them)" — covers puddling, soft spots, flashings, door transitions, drip edges, nail pops
2. `/blog/why-fiberglass-decks-outlast-other-options-jersey-shore` — "Why Fiberglass Decks Outlast Other Options on the Jersey Shore" — technical comparison (monolithic membrane, salt resistance, UV, freeze-thaw, non-slip, maintenance efficiency)
3. `/blog/deck-maintenance-guide-south-jersey` — "Year-Round Deck Maintenance Guide" — seasonal checklists (spring inspection, summer maintenance, fall preparation, winter protection), warning signs
4. `/blog/re-gelcoating-vs-resurfacing-south-jersey` — "Recolor vs. Reglass — Choosing the Right Service" — indicators for each, why correct diagnosis matters
5. `/blog/flashings-door-pans-prevent-leaks-living-spaces` — "Flashings & Door Transitions — The Most Common Source of Fiberglass Deck Failures" — wall flashings (12"), door transitions, post/column flashings (6"), drip edge
6. `/blog/composite-decks-coastal-areas-jersey-shore` — "Composite Decks in Coastal Areas — What Actually Works on the Jersey Shore" — material selection, Wolf decking, when composite is right/wrong

---

### FAQs — `/faqs`

**Meta Title:** Fiberglass Deck FAQs Ocean City NJ | Repair, Reglass & Maintenance Questions
**Meta Description:** Frequently asked questions about fiberglass deck repair, reglass restoration, recolor maintenance & more in Ocean City NJ & South Jersey Shore. Expert answers — call (609) 338-4505

**H1:** Frequently Asked Questions — Fiberglass Decks & Coastal Services

**Categories and questions:**

**General:**
- What makes fiberglass decks better than wood or composite for coastal homes?
- How long does a fiberglass deck last?
- Do fiberglass decks need to be above living spaces to be worth the investment?

**Repair & Maintenance:**
- How do I know if my deck needs repair?
- What is the difference between recolor maintenance and reglass restoration?
- What is structural reconstruction, and when is it needed?
- How long do repairs typically take? (Recolor: 1-2 days, Soft spot: 2-4 days, Reglass: 4-7 days, Structural: 7-14 days)

**Technical:**
- Why do leaks sometimes appear far from where the deck meets the wall?
- Why do structural posts inside columns cause so many problems?
- Why is deck pitch so important?
- Can fiberglass be applied over an existing deck?

**Working With Us:**
- Are you licensed and insured?
- Do you offer free inspections?
- How do we get started?

---

### CONTACT — `/contact`

**Meta Title:** Contact Seashore Fiberglass | Ocean City NJ Deck Experts — Free Quotes
**Meta Description:** Contact your local fiberglass deck contractors in Ocean City NJ & South Jersey Shore. Free inspections & quotes for repair, reglass, installation & recolor. Call/text (609) 338-4505 — fast response!

**H1:** Contact Us — Let's Protect Your Deck the Right Way

**Contact Info:**
- Phone: (609) 338-4505 — 7 days a week
- Email: info@seashorefiberglass.com
- Address: 406 Asbury Ave, Ocean City, NJ 08226
- Hours: Monday–Saturday 7am–6pm, Sunday by appointment

**Quick Action Buttons:** Call Now | Text Us | Schedule Free Inspection Online

**Form Fields:**
- Full Name
- Phone Number (required)
- Email Address
- City / Area (dropdown: all 13 service areas + Other)
- Best Time to Contact (Morning / Afternoon / Evening / Anytime)
- Message / Project Details (placeholder text about deck issues)
- Checkbox: "Yes — I'd like a free inspection & quote"
- Submit: "Send Message & Get My Free Quote"

**How We Work (6 steps):**
1. Contact Us
2. Fast Response (same day / next morning)
3. Free Inspection
4. Honest Quote
5. Quality Work (daily cleanup, professional standards)
6. Final Walkthrough

**Embed Google Map:** centered on 406 Asbury Ave, Ocean City, NJ 08226

---

### GALLERY — `/gallery`

**Meta Title:** Gallery | Fiberglass Deck Projects Ocean City NJ & South Jersey Shore — Seashore Fiberglass
**Meta Description:** Real before & after fiberglass deck repairs, reglass restoration, new construction & more in Ocean City NJ, Brigantine, Margate, Avalon & across the South Jersey Shore. 50+ 5-star reviews.

**H1:** Gallery — Real Fiberglass Deck Projects on the Jersey Shore

**Layout:** Grid or carousel with lightbox click-to-enlarge. Project captions. Alt text keyword-rich.

**10 Project Entries:**

1. **Ocean City NJ — Bayfront Reglass + Pitch Correction**
   Before: standing water, soft spots at post bases, missing wall flashings, rotted drip edge.
   After: sister joists, new PVC drip edge, 12" wall flashings, plywood re-secured, new membrane + gelcoat.

2. **Brigantine NJ — Full Reglass with Post Flashing**
   Before: nail pops, soft spots near columns, structural post never flashed.
   After: plywood re-secured, post flashings, full reglass, new gelcoat.

3. **Margate City NJ — Recolor Maintenance**
   Before: chalky faded gelcoat, minor UV cracking, structure intact.
   After: full grind, hairline crack repair, acetone clean, new textured gelcoat.

4. **Avalon NJ — Reglass with Door Transition & Post Flashings**
   Before: peeling gelcoat, soft spots at post bases, missing door transition.
   After: door transition fabricated/installed, post flashings, full reglass.

5. **Wildwood NJ — High-Traffic Reglass**
   Before: extensive nail pops, plywood seams visible, heavy rental wear.
   After: full screw re-securing, reglass, non-slip textured gelcoat.

6. **Cape May NJ — Historic Home Drip Edge Reconstruction + Reglass**
   Before: rotted wooden drip edge, water behind fascia, short flashings.
   After: packer board, new 1x6 PVC drip edge, extended flashings, full reglass.

7. **Sea Isle City NJ — New Construction**
   New: sister joist pitch correction, dual-layer plywood, chamfer strips, PVC perimeter, flashings, 2-oz membrane, textured gelcoat.

8. **Longport NJ — New Waterfront Construction**
   Complete elevated deck: dual-layer plywood, full flashing system, marine-grade gelcoat.

9. **Stone Harbor NJ — Wolf Composite + Azek Renovation**
   Old wood deck replaced with Wolf PVC composite + Azek fascias/steps.

10. **Ventnor City NJ — Vinyl Railing Upgrade with Post Flashing**
    New vinyl railing with 6" fiberglass post flashings at each penetration. Code-compliant, rust-free.

---

## 6. Technical Manual Summary

The Master Technical Manual (117 pages, 6 volumes) contains the engineering standards that all website content must reflect.

### Key Technical Specifications

| Component | Specification |
|-----------|--------------|
| Deck pitch | 1/4" per foot minimum slope |
| Plywood Layer 1 | 3/4" CDX, glued to framing, fastened with 3-1/4" galvanized nails |
| Plywood Layer 2 | 1/2" ACX, glued and screwed to Layer 1 |
| Fiberglass mat | 2-ounce, fully saturated with resin |
| Wall flashings | Minimum 12" up vertical surfaces |
| Post flashings | Minimum 6" vertically around post |
| Packer boards | 5/4 pressure-treated (~1-3/4" wide) on joists at perimeter |
| Drip edge | 1x4 PVC (~3.5" wide), extends beyond packer board |
| Chamfer strips | 45-degree at all wall-to-deck transitions |
| Gelcoat | Marine-grade, UV-resistant, textured (pumice-infused) |
| Pitch correction method | Sister joists preferred over sleepers |
| Re-securing spacing | Screws every ~6" along each joist |
| Surface prep | Grinding + acetone clean before every fiberglass/gelcoat application |
| Body filler | Bondo or equivalent over screw heads and plywood seams |

### Three Service Categories

1. **Recolor Maintenance** (~every 5 years) — gelcoat surface only, membrane intact
2. **Reglass Restoration** (~every 10 years) — new fiberglass reinforcement layer
3. **Structural Reconstruction** — plywood substrate and/or framing compromised

### Volume Breakdown

- **Volume 1 (12 chapters):** Fiberglass Deck Engineering & Construction — system overview, structural design, perimeter edge, membrane installation, flashing systems, restoration systems (reglass/recolor), soft spot repair, joist repair, railing post systems, door transitions, wall caps/parapets, demolition/prep
- **Volume 2 (5 chapters):** Inspection & Diagnostics — professional inspection method, leak source identification, water travel patterns beneath membrane, advanced techniques (cracking patterns, column inspection, hidden wall flashing problems, drip edge diagnosis), common failure scenarios
- **Volume 3 (6 chapters):** Repair Systems — professional reglass (10-step), professional recolor (5-step), soft spot repair (9-step), structural column repair, railing post structural repair, drip edge reconstruction
- **Volume 4 (5 chapters):** Operations — professional deck evaluation for estimates, determining correct service, field work planning, safety procedures, client communication
- **Volume 5 (5 chapters):** Knowledge Base — understanding systems, why they fail, common misconceptions, recommended maintenance, professional standards
- **Volume 6 (13 chapters):** Expert Q&A — general, leaks, repairs, maintenance, construction, edges/drainage, flashings, posts/columns, structural damage, professional services, advanced technical, contractor mistakes, coastal challenges

### Critical Concept: Water Travel

Water infiltrating through failed flashings at walls/doors (high elevation) travels beneath the membrane following the 1/4" per foot slope. Damage appears far from the original entry point. This is why correct diagnosis requires inspecting ALL transition points, not just where visible damage appears.

---

## 7. SEO & Schema Requirements

### Schema Types Required

- **LocalBusiness** — Home page (implemented)
- **Service** — Each service page
- **FAQPage** — FAQs page
- **BreadcrumbList** — All pages

### Primary Keywords

- fiberglass deck repair Ocean City NJ
- fiberglass deck resurfacing South Jersey
- fiberglass deck contractor NJ
- fiberglass deck installation NJ

### Secondary Keywords

- reglass deck NJ
- recolor deck NJ
- composite deck South Jersey Shore
- vinyl railing NJ
- soft spot deck repair
- fiberglass deck leak repair

### Additional SEO Requirements

- Every service area page individually optimized for town name + fiberglass deck service
- Blog posts target long-tail educational keywords and interlink with service pages
- XML sitemap submitted to Google Search Console
- Domain verified in Bing Webmaster Tools
- Google Reviews widget on Home and Contact pages
- Click-to-call and click-to-text on all mobile pages

---

## 8. Client Feedback — Phase 1 Issues

The client identified 10 critical issues with Phase 1 delivery. All have been verified against the codebase and the brief.

### Issues FIXED in This Revision

| # | Issue | Status | What Was Fixed |
|---|-------|--------|----------------|
| 1 | Wrong business identity ("Boat Repair") | FIXED | Corrected all content in `@seashore/content` — hero heading, subheading, tagline. Fixed meta title/description in `layout.tsx`. |
| 2 | Logo not used | VERIFIED | `logoo.png` exists in `apps/web/public/` and is referenced in Navbar. File needs to be committed to git. |
| 3 | All 6 services wrong (boat services) | FIXED | Replaced all 6 services with correct deck services from brief (slugs, titles, descriptions). |
| 4 | Fabricated customer reviews | FIXED | Replaced with exact 6 reviews from brief (Michael K., Resident Brigantine, Homeowner Margate, Client Avalon, Resident Ventnor, Homeowner Cape May). |
| 5 | Service areas incorrect (Marmora, Somers Point) | FIXED | Removed Marmora and Somers Point. Added Long Beach Island and Strathmere NJ. All 13 towns now match brief exactly. |
| 6 | Hero counters showing "0" | FIXED | Fixed `AnimatedCounter` — lowered IntersectionObserver threshold, added fallback for already-visible elements, shows actual number instead of 0 before animation starts. |
| 7 | No dynamic design | VERIFIED | Framer Motion animations ARE present in code (fadeUp, stagger, hover states, floating orbs). Enhanced to be more reliable. |
| 8 | Brand colors not followed | VERIFIED | Colors correctly configured in Tailwind (`#1B3A5C`, `#2A7DA6`, `#E87C2B`). Applied across hero, CTAs, sections. |
| 9 | Interactive map missing | PARTIAL | Google Maps iframe exists. Town chips link to service area pages. Enhanced map/interactive features are Phase 2. |
| 10 | Trust badges & CTAs wrong text | FIXED | Corrected to exact text from brief ("Get Your FREE Inspection & Quote", "Call / Text (609) 338-4505", "Licensed & Insured", etc.). |

### Additional Fixes Made

- `SHORE_SECTION_BODY` rewritten with exact brief content about coastal conditions
- `SHORE_SPECS` replaced with exact technical specifications from brief
- `FINAL_CTA_TITLE` and `FINAL_CTA_BODY` updated to match brief
- Services overview page description updated (removed generic text)
- Service area detail page text updated (deck services, not generic repair)
- About page placeholder text updated (deck company, not generic repair)
- Contact page placeholder text updated with proper context

### Note on "Different Theme" in Brief

The brief specifies WordPress with themes like Astra/GeneratePress as the original platform recommendation. The project uses Next.js instead, which is a valid "equivalent CMS" as the brief allows and actually delivers better performance. The real "theme" issue was content identity — the entire content was written for a boat repair business instead of a residential fiberglass deck business. This has been corrected.

---

## 9. Current Project State

### Tech Stack

- **Monorepo:** pnpm workspaces + Turborepo
- **Web app:** Next.js 14.2.18 (App Router), React 18.3, TypeScript 5.3
- **Styling:** Tailwind CSS 3.4, PostCSS, Autoprefixer
- **Animation:** Framer Motion ^11
- **Fonts:** Montserrat + Inter (via next/font/google)
- **API:** NestJS 10 (boilerplate only, not integrated)
- **Shared packages:** `@seashore/content` (copy/constants), `@seashore/ui` (Navbar/Footer), `@seashore/types` (Service, Review interfaces)

### Implemented Pages

| Page | Route | Status |
|------|-------|--------|
| Home | `/` | Full layout with all sections, Framer Motion animations, lead form UI (not wired) |
| About | `/about-us` | Placeholder with brief description |
| Services Index | `/services` | Grid of 6 services from content package |
| Service Detail (x6) | `/services/[slug]` | SSG scaffolded, placeholder content |
| Areas Index | `/service-areas` | Town list with links |
| Service Area Detail (x13) | `/service-areas/[slug]` | SSG scaffolded, placeholder content |
| Blog | `/blog` | "Coming soon" placeholder |
| Contact | `/contact` | Phone + email only (no form) |

### Not Yet Implemented

- FAQs page (`/faqs`)
- Gallery page (`/gallery`)
- Blog posts (`/blog/[slug]`)
- Full content on all service detail pages
- Full content on all service area pages
- Full content on About page
- Full contact form with backend
- Per-page SEO metadata
- Service / FAQPage / BreadcrumbList schemas
- XML sitemap / robots.txt
- Working form API
- Chatbot
- Google Reviews widget
- Analytics integration
- Error/loading/not-found pages

---

## 10. Phase 2 Task Assignments (60% Milestone)

These tasks build on the corrected Phase 1 foundation. They should be completed in this order.

### Task 1: Content Infrastructure

**Files:** `packages/content/src/`

- Add all page-specific content data to the content package:
  - FAQ items (12+ questions organized by category)
  - Blog post metadata and content (6 posts)
  - Gallery project entries (10 items with before/after descriptions)
  - Service area detail data (13 towns with unique challenge descriptions)
  - Full service descriptions (process steps, timelines)
- Update `packages/types/` with interfaces: `FAQ`, `BlogPost`, `GalleryItem`, `ServiceAreaDetail`

### Task 2: About Page — Full Content

**Route:** `/about-us`
**File:** `apps/web/src/app/about/page.tsx` (rewrite)

- Hero with team photo recommendation
- Our Story section (Francisco Ruiz founding story)
- What Makes Us Different (6 differentiators with icons)
- Our Commitment section with 13 service areas
- CTA: "Get Your FREE Inspection & Quote" + phone
- Meta title + description from brief

### Task 3: FAQs Page (NEW)

**Route:** `/faqs`
**File:** `apps/web/src/app/faqs/page.tsx` (create)

- 12+ Q&A items organized by category
- Accordion/expandable UI
- FAQPage schema markup (JSON-LD)
- Meta title + description from brief

### Task 4: Contact Page — Full Form

**Route:** `/contact`
**File:** `apps/web/src/app/contact/page.tsx` (rewrite)

- Full form with all fields from brief
- "How We Work" 6-step process section
- Google Map embed (406 Asbury Ave)
- Quick action buttons (Call / Text / Schedule)
- Meta title + description from brief

### Task 5: Gallery Page (NEW)

**Route:** `/gallery`
**File:** `apps/web/src/app/gallery/page.tsx` (create)

- Grid/masonry layout with lightbox
- 10 project entries with before/after descriptions
- Keyword-rich alt text per brief
- Hover effects, project captions
- Meta title + description from brief

### Task 6: Service Detail Pages (6 pages)

**Route:** `/services/[slug]`
**File:** `apps/web/src/app/services/[slug]/page.tsx` (rewrite)

Each page needs full content from brief:
- Fiberglass Deck Repair — 8 common problems, diagnostic approach, 14-step process
- New Construction — 15+ component system
- Resurfacing (Reglass) — when to reglass, 12-step process
- Recolor (Re-Gelcoating) — when to recolor, 5-step process
- Composite Decks — Wolf decking, right/wrong applications
- Vinyl Railing — benefits, post waterproofing note

Each with: meta title, meta description, H1, full content, CTAs, Service schema

### Task 7: Service Area Pages (13 pages)

**Route:** `/service-areas/[slug]`
**File:** `apps/web/src/app/service-areas/[slug]/page.tsx` (rewrite)

Each page needs:
- Town-specific H1
- Unique local challenge paragraph from brief
- All 6 services listed
- CTA with town name
- Meta title + description optimized for town + fiberglass deck

### Task 8: Blog System + 6 Posts

**Routes:** `/blog` + `/blog/[slug]`
**Files:** Blog index rewrite + new blog post template + 6 post data files

- Blog index with animated article cards
- Blog post template layout
- 6 full articles with complete content from brief
- Meta titles + descriptions per post
- Internal links to relevant service pages

### Task 9: SEO & Schema

- Per-page meta titles/descriptions on ALL pages
- Service schema on service pages
- FAQPage schema on FAQs page
- BreadcrumbList schema on all pages
- XML sitemap generation (next-sitemap)
- robots.txt

### Task 10: Contact Form Backend

- Wire up lead form on home page + contact page
- Next.js API route or NestJS endpoint for form submission
- Email notification
- Client + server-side validation

---

### What Remains After Phase 2 (Future Phases)

- Chatbot/guided assistant
- Google Reviews widget integration (live)
- Google Analytics 4 + Google Search Console setup
- Performance optimization (PageSpeed 90+, image compression, caching)
- Click-to-call and click-to-text mobile features
- Advanced animations and polish
- End-to-end and unit testing
- Domain, hosting, and deployment
- Bing Webmaster Tools verification
- Cookie consent
- Real project photography (replacing placeholders)
- CRM integration
- Custom error, loading, and not-found pages

---

## Footer (All Pages)

**Content:** Licensed & Insured · 50+ 5-Star Google Reviews · Family-Owned & Operated in Ocean City NJ · Serving the South Jersey Shore Since 2014 · (609) 338-4505 · info@seashorefiberglass.com
