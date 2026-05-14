# PoolConnection Design System
**Version 1.0 · April 2025**

This document is the single source of truth for all visual and interaction decisions across PoolConnection — the marketing site (`poolconnection.com.au`), the web app (`app.poolconnection.com.au`), and any future surfaces.

---

## 1. Design Philosophy

**Calm authority.** PoolConnection is a tool for homeowners who are not experts. The design should never feel technical, complicated, or anxious. It should feel like a knowledgeable friend who happens to know a lot about pools — clear, direct, unhurried.

**Show, don't decorate.** Every visual element earns its place by communicating something real. The Health Score ring is meaningful. The colour coding of parameters is functional. Decoration for its own sake is removed.

**Notion-influenced utility aesthetic.** The app UI borrows the editorial calm of Notion — generous whitespace, muted greys, serif headlines, border-based structure rather than shadow-based depth. This is a deliberate choice: users who use productivity tools will feel immediately oriented.

**Light mode first.** The app is used outdoors in Australian sunlight. High contrast on white is a functional requirement, not a preference.

---

## 2. Colour Tokens

All colours are defined as CSS custom properties. Use token names in code — never hardcode hex values.

### Core Neutrals
```css
--black:       #191919;   /* primary text, buttons */
--near-black:  #252525;   /* hover state for black elements */
--gray-dark:   #37352F;   /* body text */
--gray-mid:    #6B6B6B;   /* secondary text, labels */
--gray-light:  #9B9A97;   /* placeholder text, eyebrows */
--gray-line:   #E9E9E7;   /* borders, dividers, table lines */
--gray-bg:     #F7F7F5;   /* page backgrounds, row hovers */
--white:       #FFFFFF;   /* card backgrounds, inputs */
```

### Water Brand Palette
The brand colours are used **sparingly** — for the logo, the Health Score ring, the spots progress bar, and water-themed accents. They do not dominate layouts.
```css
--water-deep:  #0A3554;   /* logo background, darkest brand */
--water-mid:   #1565A0;   /* score ring, progress bars, links */
--water-light: #4A90C4;   /* secondary accents */
--water-pale:  #E8F4FA;   /* chip backgrounds, tinted surfaces */
```

### Semantic Colours
Used for status indicators, callouts, and tags. Never use raw hex — always use these tokens.
```css
--green:       #0F7B6C;   /* good/pass status */
--green-bg:    #EDFAF7;   /* good status background */
--amber:       #C17D39;   /* warning/attention status */
--amber-bg:    #FBF3E4;   /* warning background, callouts */
--red:         #C73535;   /* critical/fail status */
--red-bg:      #FEF3F2;   /* critical background */
--blue:        #2383E2;   /* informational, links */
--blue-light:  #EBF3FD;   /* informational background */
```

### Colour Usage Rules
- **Never** use `--water-deep` or `--water-mid` as a large background
- **Never** use more than two brand colours in the same component
- Status colours must always be paired: foreground token on background token (e.g. `--green` text on `--green-bg` background)
- The Health Score ring is always `--water-mid` stroke on `--gray-line` track

---

## 3. Typography

### Font Stack
```css
--font-ui:    'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-read:  'Newsreader', Georgia, serif;
```

**Inter** is the UI font — used for all functional text: navigation, labels, buttons, table data, body copy, input fields. Weights used: 300, 400, 500, 600.

**Newsreader** is the editorial/display font — used for page titles, section headings, the hero headline, the price display, and the Health Score number. Weights used: 300, 400. Italic variant used in marketing headlines only.

### Type Scale
```
Display (hero H1):    clamp(42px, 6.5vw, 72px)  Newsreader 300  line-height: 1.1   letter-spacing: -0.5px
H2 (section heads):   clamp(28px, 3.5vw, 44px)  Newsreader 300  line-height: 1.18  letter-spacing: -0.3px
H3 (card titles):     22–28px                    Newsreader 400  line-height: 1.2
Page title (in-app):  28px                       Newsreader 400  line-height: 1.2
Body large:           18px                       Inter 300       line-height: 1.65
Body:                 15–16px                    Inter 400       line-height: 1.6
Body small:           13–14px                    Inter 400       line-height: 1.55
Label/eyebrow:        12px                       Inter 500       uppercase  letter-spacing: 1px
Caption/meta:         11–12px                    Inter 400–500   color: --gray-light
```

### Typography Rules
- Headlines in marketing use italic `<em>` for the emotionally resonant word — always in `--gray-mid` not black
- Never use font-weight above 600
- Never use `--black` for body text — use `--gray-dark` (#37352F)
- Avoid centred text beyond the hero section

---

## 4. Spacing & Layout

### Base Unit
All spacing is derived from an 8px base grid.

```
4px   — micro gaps (icon-to-label, tag padding)
8px   — tight component spacing (gap between chips)
12px  — internal component padding (callout, tag)
16px  — standard component padding
20px  — card padding small
24px  — standard section padding, card body
32px  — larger card padding
40px  — section breathing room
56–80px — between major sections
```

### Max Widths
```
Content reading width:  680px   (FAQ, long-form)
Centered hero:          760px
Main layout:            1100px
```

### Border Radius
```
4px  — buttons, tags, chips, table cells, callouts, input fields
6px  — small cards, spots block
8px  — standard cards, feature lists, how-it-works
12px — app preview browser frame
```

### Elevation (shadows)
Prefer borders over shadows. Use shadows only when an element needs to float above the page.
```css
/* Standard card — use sparingly */
box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);

/* Floating/sticky element */
box-shadow: 0 4px 8px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08);

/* Modal / overlay */
box-shadow: 0 24px 64px rgba(0,0,0,0.2);
```

---

## 5. Components

### Buttons

**Primary (CTA)**
```css
background: var(--black);
color: var(--white);
font-size: 15px; font-weight: 500;
padding: 11px 22px; border-radius: 4px;
transition: background 0.12s, transform 0.12s;
/* hover */ background: var(--near-black); transform: translateY(-1px);
```

**Ghost / Secondary**
```css
background: none;
border: 1px solid var(--gray-line);
color: var(--gray-mid);
font-size: 14px; padding: 10px 18px; border-radius: 4px;
/* hover */ border-color: var(--gray-dark); color: var(--black);
```

**Nav button**
```css
background: var(--black); color: var(--white);
font-size: 14px; font-weight: 500;
padding: 7px 14px; border-radius: 4px;
```

**Destructive / disabled states**
- Disabled: `opacity: 0.45`, `cursor: not-allowed`, no transform
- Never use red for a button background in normal flows

### Tags & Status Chips
```css
/* Base */
font-size: 11px; font-weight: 500;
padding: 3px 8px; border-radius: 4px;

/* Good */  background: var(--green-bg);  color: var(--green);
/* Warn */  background: var(--amber-bg);  color: var(--amber);
/* Bad */   background: var(--red-bg);    color: var(--red);
/* Info */  background: var(--blue-light); color: var(--blue);
/* Neutral */ background: var(--gray-bg); color: var(--gray-mid); border: 1px solid var(--gray-line);
```

### Callout Block (Notion-style)
Used for the primary recommended action — the most important output of every Health Score.
```css
display: flex; align-items: flex-start; gap: 10px;
background: var(--amber-bg);
border-radius: 4px; padding: 12px 14px;

/* Emoji icon: 16px, flex-shrink: 0 */
/* Text: 13px, color: --gray-dark, line-height: 1.55 */
/* Strong: font-weight: 600 */
```
For informational callouts (not action): use `--blue-light` background.
For critical alerts: use `--red-bg` background with `border-left: 3px solid --red`.

### Cards
Default card:
```css
background: var(--white);
border: 1px solid var(--gray-line);
border-radius: 8px;
/* Use shadow only for floating cards (price card, modals) */
```

Hover interaction on rows:
```css
transition: background 0.1s;
/* hover */ background: var(--gray-bg);
```

### Data Tables
```css
/* Header row */
font-size: 11px; font-weight: 500; color: var(--gray-light);
text-transform: uppercase; letter-spacing: 0.5px;
padding: 6px 12px; border-bottom: 1px solid var(--gray-line);

/* Data cells */
font-size: 13px; padding: 8px 12px;
border-bottom: 1px solid var(--gray-bg);
```
- Last row has no bottom border
- Status column always uses tag component (never raw text)

### Navigation (App)
App-side navigation follows the sidebar pattern established in the marketing preview:
```
Sidebar width: 220px
Section label: 11px Inter 500, uppercase, --gray-light, letter-spacing: 0.8px
Item: 13px Inter 400, --gray-mid, padding: 5px 12px, border-radius: 4px
Active item: background --gray-line, color --black, font-weight: 500
Icon column: 18px wide, font-size 14px
Badge (alerts): --amber-bg / --amber, 10px, font-weight: 600
```

### Health Score Ring
The signature visual. SVG circle with animated stroke.
```
Outer radius: 35px (SVG 88×88 viewport)
Track stroke: 8px, color --gray-line
Fill stroke: 8px, color --water-mid, stroke-linecap: round
Animation: stroke-dasharray 220, dashoffset from 220 to calculated value
Score number: Newsreader 28px 400, --black
"/100" label: 10px Inter, --gray-light
```
Score to dashoffset formula: `dashoffset = 220 - (score / 100 * 220)`
Score 87 → dashoffset ≈ 43

Score colour thresholds (ring fill):
```
80–100: --water-mid  (good)
50–79:  --amber      (watch)
0–49:   --red        (act)
```

### Input Fields
```css
background: var(--white);
border: 1px solid var(--gray-line);
border-radius: 4px;
padding: 8px 12px;
font-size: 14px; font-family: var(--font-ui);
color: var(--gray-dark);
transition: border-color 0.12s;
/* focus */ border-color: var(--water-mid); outline: none;
/* placeholder */ color: var(--gray-light);
```

### Modal / Overlay
```css
/* Backdrop */
background: rgba(0,0,0,0.5);
/* Panel */
background: var(--white); border-radius: 8px;
padding: 48px 40px; max-width: 420px;
box-shadow: 0 24px 64px rgba(0,0,0,0.2);
animation: fadeUp 0.3s ease both;
```

---

## 6. Motion & Animation

**Principle:** Animations serve orientation, not entertainment. One well-timed entrance is worth more than constant motion.

### Scroll Reveal (marketing page)
```css
.reveal {
  opacity: 0; transform: translateY(14px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.reveal.in { opacity: 1; transform: none; }
/* Stagger delays: 0.08s, 0.16s, 0.24s */
```
Implementation: `IntersectionObserver`, threshold 0.1, unobserve after trigger.

### Page Load (hero)
Hero elements animate in with `fadeUp` on page load, not scroll:
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Chip: 0.5s delay 0s */
/* H1: 0.6s delay 0.1s */
/* Sub: 0.6s delay 0.2s */
/* Actions: 0.6s delay 0.3s */
/* Preview: 0.8s delay 0.45s */
```

### Health Score Ring
```css
animation: scoreFill 1.8s 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
```
Delay of 0.8s lets the page settle before the ring draws. The ease gives a satisfying deceleration.

### Hover Transitions
All hover states: `transition: 0.12s` — fast enough to feel snappy, not jarring.
Row hovers (`background` only): `transition: background 0.1s`.

### Loading States
Three-dot pulsing loader for async operations:
```css
.dot-loader span { animation: pulseDot 1s ease-in-out infinite; }
/* nth-child(2): delay 0.15s */
/* nth-child(3): delay 0.3s */
```

---

## 7. Icons

Use emoji icons for contextual, warm moments (sidebar navigation, callout leading icons, section page emoji). Do not use emoji in data-dense tables or status chips.

For structural icons (checkboxes, arrows, security badges) use inline SVG only — no icon library dependency.

Icon sizes:
```
Sidebar nav:   14px (emoji)
Callout lead:  16px (emoji)
Page header:   28px (emoji, decorative)
Inline SVG:    16–18px
```

---

## 8. Page Structure (App)

The app shell follows a two-column layout:

```
┌─────────────────────────────────────────────────┐
│  Nav bar (52px fixed)                           │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│ Sidebar  │  Main content area                   │
│  220px   │  padding: 28px 32px                  │
│          │                                      │
│          │  Page title (Newsreader 28px)        │
│          │  Page subtitle (13px --gray-light)   │
│          │                                      │
│          │  Content blocks...                   │
│          │                                      │
└──────────┴──────────────────────────────────────┘
```

Content block ordering on the Health Score page:
1. Score ring + summary row
2. Primary action callout (if any)
3. Readings table
4. Secondary recommendations (if any)

---

## 9. Responsive Breakpoints

```
< 600px:   Mobile — hide nav text links, stack hero actions, single column score row
< 860px:   Tablet — hide sidebar, single column layouts, static price card
≥ 860px:   Desktop — full two-column layouts, sticky price card
```

---

## 10. Voice & Copy Standards

These are design decisions, not just writing guidelines.

**Headlines:** Short. Often incomplete sentences. The Newsreader italic carries the emotional weight — use it on the transformation word, not a random word.
```
✓ "Your pool, finally under control."
✓ "One price. Paid once. Yours forever."
✗ "Manage your pool water efficiently with AI-powered insights"
```

**Body copy:** Written at reading level of a confident adult homeowner. No jargon without explanation. Numbers and specifics over generalisations.
```
✓ "Add 450g of sodium bicarbonate"
✓ "One prevented algae bloom pays for this app five times over"
✗ "Our advanced algorithm calculates optimal chemical dosing"
```

**Status copy:**
```
Good:     "✓ Good"        — paired with green tag
Warning:  "↑ Low" / "↓ High"  — paired with amber tag
Critical: "⚠ Act now"    — paired with red tag
```

**Empty states:** Always explain what will appear here and what action creates it. Never show a blank space with no instruction.

**CTA buttons:** Action-first, specific. Never generic.
```
✓ "Claim founding access"
✓ "Log water test"
✓ "Scan test results"
✗ "Submit" / "Continue" / "Click here"
```

---

## 11. App Component Alignment Checklist

Areas of the app that should be updated to match this design system:

- [ ] **Global CSS variables** — replace any existing colour/font tokens with those defined in Section 2–3
- [ ] **HealthScore component** — ring should use `--water-mid` / `--gray-line`, score number in Newsreader 400
- [ ] **Chemical parameter tags** — use semantic colour token pairs from Section 5
- [ ] **Callout/recommendation blocks** — replace any existing alert styles with amber callout pattern
- [ ] **Data tables** — align to table spec in Section 5
- [ ] **Navigation sidebar** — align label, item, active, badge styles to Section 5
- [ ] **Input fields** — align to input spec, focus ring uses `--water-mid`
- [ ] **Buttons** — consolidate to primary/ghost variants; remove any other button styles
- [ ] **Page titles** — Newsreader 400 28px for all in-app page headings
- [ ] **Body font** — confirm Inter is loaded and applied globally
- [ ] **Loading states** — use dot-loader pattern for all async waits
- [ ] **Empty states** — add instructional copy to all zero-data views

---

## 12. File References

| File | Purpose |
|------|---------|
| `index.html` | Marketing/landing page — canonical source for all design tokens |
| `src/index.css` or `src/App.css` | App global styles — should import/mirror tokens from this doc |
| `src/components/HealthScore.jsx` | Health Score ring component |
| `src/components/ParameterTag.jsx` | Reusable status tag |
| `src/components/Callout.jsx` | Recommendation callout block |
| `DESIGN.md` | This file |

---

*Last updated: April 2025. Update version number when tokens change.*
