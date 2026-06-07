# SHAMFLIX — MASTER CONTEXT FILE
### Version: 1.8 | Status: ALL SHIFTS COMPLETE + POST-SHIFT IMPROVEMENTS
### Created by: Sattvik | For: Sham (birthday gift)
### Last updated: May 2025
### Instructions for AI: Read this ENTIRE file before writing a single line of code. This is the source of truth. When you complete a shift, update the STATUS fields and the COMPLETED SHIFTS log at the bottom. Then remind Sattvik to download the updated zip.

---

## HOW TO USE THIS FILE (FOR THE AI READING THIS)

1. Read this file top to bottom before doing anything.
2. Find the first shift that says `STATUS: PENDING`.
3. Build only that shift. Nothing more.
4. When done, update this file:
   - Mark the shift as `STATUS: COMPLETE`
   - Fill in the "Files created/modified" list for that shift
   - Add any notes or decisions made during the shift
   - Update the MASTER STATUS at the top to reflect current progress
5. Tell Sattvik: "Shift X complete. Please download the zip and send it with this file to continue."
6. Never skip ahead. Never assume a previous shift was done unless it says COMPLETE here.

---

## PROJECT OVERVIEW

**What:** A Netflix-style personal streaming platform called Shamflix — a birthday gift from Sattvik to his best friend Sham. Holds 3 years of friendship memories as seasons and episodes — photos, videos, galleries, text moments.

**Stack:** React 18 + Vite, Tailwind CSS, React Router v6, Framer Motion, Lucide React
**Deployment:** Vercel (free tier)
**No backend. No database. No auth.**
**Content source:** Single file `src/data/data.js` — Sattvik edits only this file forever.

**Key rule:** If any content (episode titles, descriptions, stats, jokes) is hardcoded in a component instead of coming from data.js — that is a bug. Fix it.

---

## NAMING CONVENTIONS — DO NOT DEVIATE

### Route names (React Router)
```
/                          → Home.jsx
/season/:seasonId          → SeasonPage.jsx
/timeline                  → Timeline.jsx
/stats                     → Stats.jsx
/extras/quiz               → Quiz.jsx
/extras/memory-jar         → MemoryJarPage.jsx
/extras/glossary           → Glossary.jsx
/letter                    → ConnorLetter.jsx
/secret-cats               → SecretCat.jsx
*                          → NotFound.jsx (Leon 404)
```

### Component names (exact — do not rename)
```
Navbar.jsx
Footer.jsx
IntroHero.jsx
SeasonRow.jsx
EpisodeCard.jsx
EpisodeModal.jsx
GalleryViewer.jsx
VideoPlayer.jsx
ClipReel.jsx
MomentCard.jsx
BirthdaySplash.jsx
CatMascot.jsx
SecretCatPage.jsx
FriendshipStats.jsx
MemoryJar.jsx
InsideJokesGlossary.jsx
FriendshipTimeline.jsx
JKKQuiz.jsx
LeonEasterEgg.jsx
ConnorLetterUnlock.jsx
Badge.jsx
ClassifiedStamp.jsx
RiyaBadge.jsx
ContentWarning.jsx
```

### Hook names
```
useBirthday.js             → checks if today is siteConfig.birthdayDate (MM-DD)
```

### Utility names
```
driveHelpers.js            → extractDriveId(), getDriveEmbedUrl(), getDriveImageUrl()
```

### Data exports from data.js (exact export names — do not rename)
```
siteConfig                 → object: site name, tagline, birthdayDate, introVideo etc.
seasons                    → array of season objects
insideJokes                → array of joke objects
friendshipStats            → array of stat objects
memoryJarEntries           → array of strings
jkkQuizQuestions           → array of question objects
jkkQuizResults             → object keyed by character name
connorLetter               → object: unlocked bool, subject, from, content
honoraryMentions           → array of special collection objects
```

### Season IDs (exact — used in routes)
```
season-0    → Origin story (2023)
season-1    → First times (Feb–Jun 2024)
season-2    → The main arc (Jul 2024–Jun 2025)
season-3    → Still going (Jul 2025–present)
```

### Episode type values (exact strings)
```
"moment"          → text only, no media
"video"           → single YouTube embed
"gallery"         → Drive folder / photos array
"clips"           → multiple YouTube clips array
"mixed"           → video + gallery
"clips+gallery"   → clips array + gallery
```

### CSS color variables (define in tailwind.config.js AND index.css)
```
--color-bg-primary:        #F0F8FF   (alice blue — main background)
--color-bg-secondary:      #E1F0FB   (slightly deeper — section backgrounds)
--color-bg-card:           #FFFFFF   (card backgrounds)
--color-accent-primary:    #5AADE2   (main blue — buttons, active)
--color-accent-secondary:  #7BC8F6   (lighter blue — hovers, borders)
--color-accent-deep:       #2E86C1   (deeper blue — headings, active nav)
--color-text-primary:      #1A2E3B   (near black with blue tint)
--color-text-secondary:    #4A6B82   (muted blue-grey)
--color-text-tertiary:     #8AAEC4   (very muted — timestamps)
--color-border:            #C8E3F5   (soft blue border)
--color-card-hover:        #D6EEFA   (card hover background)
--color-rating:            #F4C430   (gold for ratings)
--color-classified:        #E74C3C   (red for classified stamp)
--color-riya-badge:        #0D9488   (teal for Riya badge)
```

---

## FILE STRUCTURE (complete — every file that must exist)

```
shamflix/
├── public/
│   ├── favicon.svg                  ← paw print SVG favicon
│   └── cat-cursor.png               ← 32x32 paw cursor image
├── src/
│   ├── data/
│   │   └── data.js                  ← ONLY FILE SATTVIK EVER EDITS
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── home/
│   │   │   ├── IntroHero.jsx
│   │   │   ├── SeasonRow.jsx
│   │   │   └── EpisodeCard.jsx
│   │   ├── episode/
│   │   │   ├── EpisodeModal.jsx
│   │   │   ├── GalleryViewer.jsx
│   │   │   ├── VideoPlayer.jsx
│   │   │   ├── ClipReel.jsx
│   │   │   └── MomentCard.jsx
│   │   ├── features/
│   │   │   ├── BirthdaySplash.jsx
│   │   │   ├── CatMascot.jsx
│   │   │   ├── FriendshipStats.jsx
│   │   │   ├── MemoryJar.jsx
│   │   │   ├── InsideJokesGlossary.jsx
│   │   │   ├── FriendshipTimeline.jsx
│   │   │   ├── JKKQuiz.jsx
│   │   │   ├── LeonEasterEgg.jsx
│   │   │   └── ConnorLetterUnlock.jsx
│   │   └── ui/
│   │       ├── Badge.jsx
│   │       ├── ClassifiedStamp.jsx
│   │       ├── RiyaBadge.jsx
│   │       └── ContentWarning.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── SeasonPage.jsx
│   │   ├── FeaturesHub.jsx
│   │   ├── Timeline.jsx
│   │   ├── Stats.jsx
│   │   ├── Glossary.jsx
│   │   ├── Quiz.jsx
│   │   ├── MemoryJarPage.jsx
│   │   ├── SecretCat.jsx
│   │   ├── ConnorLetter.jsx
│   │   └── NotFound.jsx
│   ├── hooks/
│   │   └── useBirthday.js
│   ├── utils/
│   │   └── driveHelpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## PACKAGE.JSON DEPENDENCIES (exact versions to use)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.383.0",
    "canvas-confetti": "^1.9.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.1.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35"
  }
}
```

---

## DATA.JS — COMPLETE CONTENT

> The full data.js content is in `shamflix_build_prompt.md` (the companion file).
> The AI building this must copy it verbatim into `src/data/data.js`.
> All PASTE_X_HERE placeholders stay as-is — Sattvik fills them later.

Key reminder on structure:
- `siteConfig.birthdayDate = "06-10"` (June 10)
- `connorLetter.unlocked = false` (Sattvik sets to true when ready)
- All episode thumbnails/videos/galleries default to null or "PASTE_X_HERE"
- Season 0 has 5 episodes (all type: "moment")
- Season 1 has 6 episodes
- Season 2 has 19 episodes  
- Season 3 has 14 episodes
- honoraryMentions has 4 entries

---

## SHIFT BREAKDOWN

Each shift is designed to be completable in one AI session (~2000–4000 lines of code).
After each shift: AI updates this file, Sattvik downloads zip, continues in next session.

---

### SHIFT 1 — Project scaffold + data layer
**STATUS: COMPLETE**
**Goal:** Working Vite+React project that runs with no errors. Data layer complete. Routing set up. Base layout done.

**Tasks:**
- [ ] Init Vite + React project named `shamflix`
- [ ] Install all dependencies from package.json above
- [ ] Configure Tailwind with full custom color palette (all --color-* vars)
- [ ] Set up index.css with cat cursor, base font, color variables
- [ ] Create `src/data/data.js` with ALL content (full file from build prompt — all 4 seasons, all exports)
- [ ] Create `src/utils/driveHelpers.js` with extractDriveId, getDriveEmbedUrl, getDriveImageUrl
- [ ] Create `src/hooks/useBirthday.js`
- [ ] Create `App.jsx` with React Router — all routes defined (even if pages are placeholder)
- [ ] Create all page files as empty placeholder components (just return a div with the page name)
- [ ] Create `Navbar.jsx` — full implementation (logo + nav links + hamburger mobile + logo click counter for secret cat)
- [ ] Create `Footer.jsx` — full implementation
- [ ] Create `public/favicon.svg` — paw print SVG
- [ ] Verify: `npm run dev` runs with zero errors, all routes navigable, navbar works

**Files to create in this shift:**
```
package.json
vite.config.js
tailwind.config.js
postcss.config.js
index.html
src/main.jsx
src/App.jsx
src/index.css
src/data/data.js
src/utils/driveHelpers.js
src/hooks/useBirthday.js
src/components/layout/Navbar.jsx
src/components/layout/Footer.jsx
src/pages/Home.jsx              (placeholder)
src/pages/SeasonPage.jsx        (placeholder)
src/pages/Timeline.jsx          (placeholder)
src/pages/Stats.jsx             (placeholder)
src/pages/Quiz.jsx              (placeholder)
src/pages/MemoryJarPage.jsx     (placeholder)
src/pages/Glossary.jsx          (placeholder)
src/pages/ConnorLetter.jsx      (placeholder)
src/pages/SecretCat.jsx         (placeholder)
src/pages/NotFound.jsx          (placeholder)
public/favicon.svg
```

**Completion check:**
- `npm run dev` runs with no console errors
- Navbar renders with Shamflix logo and all nav links
- All routes load (even as placeholders)
- Tailwind colors work (put a test div with `bg-[#5AADE2]` and verify it renders)

**Files created:**
```
package.json, vite.config.js, tailwind.config.js, postcss.config.js, index.html
src/main.jsx, src/App.jsx, src/index.css
src/data/data.js (all 4 seasons, all exports, verbatim)
src/utils/driveHelpers.js
src/hooks/useBirthday.js
src/components/layout/Navbar.jsx (full — logo, nav, hamburger, logo-click counter)
src/components/layout/Footer.jsx (full)
src/pages/Home.jsx, SeasonPage.jsx, Timeline.jsx, Stats.jsx
src/pages/Quiz.jsx, MemoryJarPage.jsx, Glossary.jsx
src/pages/ConnorLetter.jsx, SecretCat.jsx, NotFound.jsx (all placeholders)
public/favicon.svg (paw print)
public/cat-cursor.png (32x32 paw cursor)
```
**Notes:** npm run build passes clean. All routes navigable. Navbar renders with logo click counter. Tailwind custom palette confirmed working. LogoClickContext shared between App and Navbar. 5 clicks on logo navigates to /secret-cats.

---

### SHIFT 2 — UI components: EpisodeCard + EpisodeModal + all episode type renderers
**STATUS: COMPLETE**
**Goal:** The core viewing experience works. You can see episode cards and open them.

**Tasks:**
- [ ] Create `src/components/ui/Badge.jsx`
- [ ] Create `src/components/ui/ClassifiedStamp.jsx`
- [ ] Create `src/components/ui/RiyaBadge.jsx`
- [ ] Create `src/components/ui/ContentWarning.jsx`
- [ ] Create `src/components/episode/VideoPlayer.jsx` (YouTube iframe embed, accepts `src` prop)
- [ ] Create `src/components/episode/ClipReel.jsx` (accepts `clips` array, renders each as embed with title)
- [ ] Create `src/components/episode/GalleryViewer.jsx` (accepts `gallery` folder URL OR `photos` array, renders Drive iframe OR photo grid with lightbox)
- [ ] Create `src/components/episode/MomentCard.jsx` (renders description + insiderNote for type:"moment")
- [ ] Create `src/components/home/EpisodeCard.jsx` (full implementation — thumbnail, badges, classified blur, hover effects, rating)
- [ ] Create `src/components/episode/EpisodeModal.jsx` (full implementation — renders correct content based on episode.type, prev/next navigation, close button)
- [ ] Test all 6 episode types render correctly in the modal

**Files to create in this shift:**
```
src/components/ui/Badge.jsx
src/components/ui/ClassifiedStamp.jsx
src/components/ui/RiyaBadge.jsx
src/components/ui/ContentWarning.jsx
src/components/episode/VideoPlayer.jsx
src/components/episode/ClipReel.jsx
src/components/episode/GalleryViewer.jsx
src/components/episode/MomentCard.jsx
src/components/home/EpisodeCard.jsx
src/components/episode/EpisodeModal.jsx
```

**Completion check:**
- EpisodeCard renders thumbnail (or placeholder), badges, rating
- Classified episodes show blurred thumbnail + red stamp
- Riya badge appears when riyaInvolved: true
- Modal opens on card click
- Modal renders correctly for each type: moment / video / gallery / clips / mixed / clips+gallery
- Prev/next navigation works inside modal
- Modal closes cleanly

**Files created:**
```
src/components/ui/Badge.jsx
src/components/ui/ClassifiedStamp.jsx
src/components/ui/RiyaBadge.jsx
src/components/ui/ContentWarning.jsx
src/components/episode/VideoPlayer.jsx
src/components/episode/ClipReel.jsx
src/components/episode/GalleryViewer.jsx
src/components/episode/MomentCard.jsx
src/components/home/EpisodeCard.jsx
src/components/episode/EpisodeModal.jsx
```
**Notes:** npm run build passes clean (325KB JS bundle). All 6 episode types render in EpisodeModal. Classified gate requires click-through to unlock. Prev/next nav + keyboard arrows work. GalleryViewer handles Drive folder embeds and photos arrays with lightbox. EpisodeCard has thumbnail, rating chip, badges, classified blur+stamp, hover animation. Click-outside and Escape close the modal.

---

### SHIFT 3 — Home page + Season rows + Season page
**STATUS: COMPLETE**
**Goal:** The main browsing experience is complete. All seasons and episodes are visible.

**Tasks:**
- [ ] Create `src/components/home/SeasonRow.jsx` (horizontal scrollable row, season header with host character quote, episode cards, "view all" link)
- [ ] Create `src/components/home/IntroHero.jsx` (YouTube embed of intro video, title, description)
- [ ] Complete `src/pages/Home.jsx`:
  - BirthdaySplash check at top
  - IntroHero section
  - All season rows from seasons array
  - Honorary mentions section (grid of 4 cards)
- [ ] Complete `src/pages/SeasonPage.jsx`:
  - Season banner with full details
  - Host character card
  - 3-column episode grid
  - All episodes openable via modal
- [ ] Create `src/components/features/BirthdaySplash.jsx` (full implementation — confetti, message, Enter button, sessionStorage flag)

**Files to create/complete in this shift:**
```
src/components/home/SeasonRow.jsx
src/components/home/IntroHero.jsx
src/components/features/BirthdaySplash.jsx
src/pages/Home.jsx              (full implementation)
src/pages/SeasonPage.jsx        (full implementation)
```

**Completion check:**
- Home page shows intro video hero at top
- All 4 seasons render as horizontal scroll rows
- Each season shows host character name and quote
- Clicking any episode card opens the modal
- "View all" links to /season/:seasonId
- Season page shows all episodes in grid
- Birthday splash shows if date matches (test by temporarily hardcoding the date check)
- Honorary mentions section renders at bottom of home

**Files created:**
```
src/components/features/BirthdaySplash.jsx
src/components/home/IntroHero.jsx
src/components/home/SeasonRow.jsx
src/pages/Home.jsx              (full implementation)
src/pages/SeasonPage.jsx        (full implementation)
```
**Notes:** npm run build passes clean (373KB JS bundle). Home shows BirthdaySplash on June 10 (once per session via sessionStorage + useBirthday hook), IntroHero with YouTube embed + graceful placeholder state, all 4 season rows as horizontal-scrollable cards with host character quotes and "View all" links, and Honorary Mentions grid at the bottom. SeasonPage shows full banner with host character card, season description, and 3-column staggered episode grid — all episodes open via EpisodeModal.

---

### SHIFT 4 — Feature pages: Stats, Timeline, Memory Jar, Glossary
**STATUS: COMPLETE**
**Goal:** All four content feature pages are fully functional.

**Tasks:**
- [ ] Complete `src/pages/Stats.jsx`:
  - Spotify Wrapped style cards for all friendshipStats entries
  - Hidden "Access memory file" link at the very bottom (subtle, muted text, links to /letter)
- [ ] Complete `src/pages/Timeline.jsx`:
  - Horizontal scroll on desktop, vertical on mobile
  - All major moments from seasons rendered chronologically
  - Clicking a node opens the episode modal for that episode
- [ ] Complete `src/pages/MemoryJarPage.jsx`:
  - Glass jar illustration (CSS/SVG)
  - "Pull a memory" button
  - Animated paper slip reveal
  - No-repeat logic until all entries shown
- [ ] Complete `src/pages/Glossary.jsx`:
  - Wikipedia-style layout
  - All insideJokes entries rendered
  - Page header with official title

**Files to complete in this shift:**
```
src/pages/Stats.jsx             (full implementation)
src/pages/Timeline.jsx          (full implementation)
src/pages/MemoryJarPage.jsx     (full implementation)
src/pages/Glossary.jsx          (full implementation)
```

**Completion check:**
- Stats page renders all stats as large visual cards
- Hidden /letter link exists at bottom of stats (subtle — not obvious)
- Timeline shows all key moments in order
- Timeline is horizontal on desktop, vertical on mobile
- Memory jar: Pull button works, no repeats, animation plays
- Glossary renders all jokes with Wikipedia-style formatting

**Files created:**
```
src/pages/Stats.jsx             (full implementation)
src/pages/Timeline.jsx          (full implementation)
src/pages/MemoryJarPage.jsx     (full implementation)
src/pages/Glossary.jsx          (full implementation)
```
**Notes:** npm run build passes clean (397KB JS bundle). Stats page renders all stats as large Spotify-Wrapped style color cards with lucide icons, cycling through 6 accent colors. Hidden /letter link at bottom (very subtle, low opacity, "access memory file"). Timeline renders all 44 episodes — horizontal scrolling alternating above/below on desktop, vertical on mobile — color-coded by season, each node/card opens EpisodeModal. Memory Jar has glass jar SVG illustration, animated paper slip reveal with spring physics, no-repeat logic until all entries shown, previously-pulled list, and refill option. Glossary is full Wikipedia-style layout with table of contents, search filter, metadata lines (first appearance, see also), and footer disclaimer.

---

### SHIFT 5 — Feature pages: JJK Quiz + Connor Letter + Secret Cat + NotFound
**STATUS: COMPLETE**
**Goal:** All special/hidden pages complete.

**Tasks:**
- [ ] Complete `src/pages/Quiz.jsx`:
  - One question at a time with animated transitions
  - Progress indicator (1/5, 2/5...)
  - Result card with character name, title, description, quote
  - Retake button
- [ ] Complete `src/pages/ConnorLetter.jsx`:
  - Detroit: Become Human aesthetic (exception — dark UI on this page only)
  - Locked state if connorLetter.unlocked === false
  - Typewriter animation sequence if unlocked
  - Letter renders inside terminal UI
- [ ] Complete `src/pages/SecretCat.jsx`:
  - Cat GIFs grid
  - Cat facts
  - Meow button with audio
  - "You found it" header
- [ ] Complete `src/pages/NotFound.jsx`:
  - Leon Kennedy themed
  - "Memory not found" + RE4 radio message quote
  - Go home button

**Files to complete in this shift:**
```
src/pages/Quiz.jsx              (full implementation)
src/pages/ConnorLetter.jsx      (full implementation)
src/pages/SecretCat.jsx         (full implementation)
src/pages/NotFound.jsx          (full implementation)
```

**Completion check:**
- Quiz: all 5 questions work, all 4 results render correctly
- Connor page shows locked state when unlocked=false
- Connor page shows typewriter + letter when unlocked=true
- Secret cat page accessible via /secret-cats URL
- 404 page shows for any unmatched route
- Leon quote and RE4 aesthetic present on 404

**Files created:**
```
src/pages/Quiz.jsx              (full implementation)
src/pages/ConnorLetter.jsx      (full implementation)
src/pages/SecretCat.jsx         (full implementation)
src/pages/NotFound.jsx          (full implementation)
```
**Notes:** npm run build passes clean (412KB JS bundle). Quiz: 5 questions with animated slide transitions, progress bar, per-answer character scoring, spring-animated result card with character-specific dark color scheme, emoji, quote, and retake button. ConnorLetter: locked state (CyberLife terminal aesthetic, dark blue) when unlocked=false; unlocked state has boot sequence animation then typewriter letter rendering inside terminal UI. SecretCat: meow button with floating "meow!" particles, random cat facts with pull button, 12-tile emoji catalogue with spring hover animations. NotFound: full RE4/Leon aesthetic — dark green palette, biohazard SVG, radio transmission terminal animation, Leon quotes, "bingo was his name-o" footer.

---

### SHIFT 6 — Easter eggs, Cat mascot, Leon button, polish + responsive fixes
**STATUS: COMPLETE**
**Goal:** All easter eggs working. App is fully responsive. Final polish pass.

**Tasks:**
- [ ] Create `src/components/features/CatMascot.jsx`:
  - Fixed bottom-right on all pages
  - Blinking animation (CSS keyframes)
  - Hover: tail wag animation
  - Click: random cat fact speech bubble
  - Tracks logo clicks (emit event or use context/state in Navbar)
- [ ] Create `src/components/features/LeonEasterEgg.jsx`:
  - Hidden biohazard/? button bottom-left of home page
  - Dark modal with RE4 radio message on click
- [ ] Create `src/components/features/ConnorLetterUnlock.jsx` (the button component on stats page that links to /letter)
- [ ] Full responsive audit:
  - Mobile navbar hamburger menu works
  - Season rows scroll horizontally on mobile
  - Episode modal is full-screen on mobile
  - All pages readable at 375px
  - Timeline switches to vertical on mobile
- [ ] Animation polish:
  - Page transitions (Framer Motion fade, 0.3s)
  - Card hover scale + border glow
  - Modal open/close animation
  - Memory jar paper flip
  - Birthday splash entrance
- [ ] Final checks:
  - Cat paw cursor applied in index.css
  - Favicon is paw print
  - All placeholder fields in data.js say PASTE_X_HERE (not fake URLs)
  - `npm run build` completes with no errors
  - No hardcoded content in components

**Files to create/complete in this shift:**
```
src/components/features/CatMascot.jsx         (full implementation)
src/components/features/LeonEasterEgg.jsx      (full implementation)
src/components/features/ConnorLetterUnlock.jsx (full implementation)
src/index.css                                  (cat cursor, animations)
```

**Completion check:**
- Cat mascot visible on all pages, blinks, shows fact on click
- Leon easter egg button on home page, modal opens
- Secret cat page reachable by clicking logo 5 times
- `npm run build` = zero errors
- App looks polished at 375px, 768px, 1440px
- All routes work, all features work end-to-end

**Notes after completion:** npm run build passes clean (422KB JS bundle). CatMascot: fixed bottom-right on all pages, SVG cat with blink loop, tail wag on hover, speech bubble with 15 rotating cat facts + auto-dismiss. LeonEasterEgg: hidden biohazard icon (0.18 opacity at bottom of Home), RE4-style dark modal with typewriter effect, 6 rotating Leon transmissions, NEXT MSG button. ConnorLetterUnlock: reusable subtle button for /letter. App.jsx renders CatMascot globally. Home.jsx includes LeonEasterEgg. Cat paw cursor, paw favicon, all PASTE_X_HERE placeholders intact. Responsive: hamburger drawer, horizontal season scroll, full-screen modal on mobile all confirmed.

---

### SHIFT 7 — Deployment prep + Vercel config + final handoff
**STATUS: COMPLETE**
**Goal:** App is deployed and live. Sattvik has the URL.

**Tasks:**
- [ ] Add `vercel.json` for SPA routing (all routes redirect to index.html):
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- [ ] Verify `npm run build` output is clean
- [ ] Create `SATTVIK_GUIDE.md` — simple plain-English guide for Sattvik covering:
  - How to add photos to an episode (Drive folder)
  - How to add a YouTube video to an episode
  - How to add a new episode (copy-paste template)
  - How to add a new season
  - How to unlock the Connor letter
  - How to update any description
  - How to deploy changes (git add, commit, push)
- [ ] Final data.js audit — confirm all PASTE_X_HERE placeholders are intact and clearly labelled
- [ ] README.md with project overview, how to run locally, how to deploy

**Files to create in this shift:**
```
vercel.json
SATTVIK_GUIDE.md
README.md
```

**Completion check:**
- `npm run build` is clean
- vercel.json present
- SATTVIK_GUIDE.md is clear enough for a non-technical user
- Project is ready to push to GitHub and connect to Vercel

**Notes after completion:** npm run build passes clean (422KB JS bundle). vercel.json added with SPA rewrite rule. SATTVIK_GUIDE.md covers all content operations in plain English: Drive/YouTube link formats, adding episodes/seasons, unlocking Connor letter, memory jar entries, glossary entries, local dev, and git deploy flow. README.md covers stack, structure, local setup, build, and Vercel deploy steps. All PASTE_X_HERE placeholders intact in data.js. Project is ready to push to GitHub and connect to Vercel.

---

## COMPLETED SHIFTS LOG

_(AI updates this section as shifts are completed)_

| Shift | Status | Completed on | Key files created | Notes |
|-------|--------|-------------|-------------------|-------|
| 1 | COMPLETE | May 2026 | package.json, vite.config.js, tailwind.config.js, postcss.config.js, index.html, src/main.jsx, src/App.jsx, src/index.css, src/data/data.js, driveHelpers.js, useBirthday.js, Navbar.jsx, Footer.jsx, all placeholder pages, favicon.svg, cat-cursor.png | Build passes clean. All routes navigable. |
| 2 | COMPLETE | May 2026 | Badge.jsx, ClassifiedStamp.jsx, RiyaBadge.jsx, ContentWarning.jsx, VideoPlayer.jsx, ClipReel.jsx, GalleryViewer.jsx, MomentCard.jsx, EpisodeCard.jsx, EpisodeModal.jsx | Build clean. All 6 episode types handled. Classified gate, prev/next nav, keyboard shortcuts, lightbox all working. |
| 3 | COMPLETE | May 2026 | BirthdaySplash.jsx, IntroHero.jsx, SeasonRow.jsx, Home.jsx (full), SeasonPage.jsx (full) | Build clean. Birthday splash, intro hero, all season rows, honorary mentions, season page with episode grid all working. |
| 4 | COMPLETE | May 2026 | Stats.jsx, Timeline.jsx, MemoryJarPage.jsx, Glossary.jsx | Build clean. Stats wrapped cards, timeline desktop H-scroll/mobile vertical, memory jar spring animation no-repeat, wikipedia-style glossary with search. |
| 5 | COMPLETE | May 2026 | Quiz.jsx, ConnorLetter.jsx, SecretCat.jsx, NotFound.jsx | Build clean. JJK quiz with result cards, Connor terminal UI (locked/unlocked), Secret Cat page, Leon 404. |
| 6 | COMPLETE | May 2026 | CatMascot.jsx, LeonEasterEgg.jsx, ConnorLetterUnlock.jsx, App.jsx (CatMascot global), Home.jsx (LeonEasterEgg) | Build clean 422KB. Cat mascot global, Leon easter egg on Home, ConnorLetterUnlock reusable component. |
| 7 | COMPLETE | May 2026 | vercel.json, SATTVIK_GUIDE.md, README.md | Build clean 422KB. SPA routing configured. Plain-English content guide written. README complete. Ready to deploy. |

---

## KNOWN DECISIONS & RULES (do not override these)

1. **Light blue theme only** — no dark backgrounds anywhere except the Connor Letter page.
2. **data.js is the only content file** — zero hardcoding in components.
3. **Drive folder embeds** use `https://drive.google.com/embeddedfolderview?id=FOLDER_ID#grid` format.
4. **Individual Drive images** use `https://drive.google.com/uc?id=FILE_ID` format.
5. **YouTube embeds** use `https://www.youtube.com/embed/VIDEO_ID` format.
6. **Birthday splash** only shows on June 10 AND only once per session (sessionStorage flag).
7. **Connor letter page** is locked until `connorLetter.unlocked = true` in data.js.
8. **Secret cat page** is only reachable by clicking the Shamflix logo 5 times in Navbar.
9. **Classified episodes** blur the thumbnail and show a red CLASSIFIED stamp until clicked.
10. **Riya badge** (teal, "Riya was there") auto-appears when `riyaInvolved: true`.
11. **All placeholder fields** must remain as "PASTE_DRIVE_IMAGE_LINK" / "PASTE_DRIVE_FOLDER_LINK" / "PASTE_YOUTUBE_LINK" — never fake URLs.
12. **Framer Motion animations** are tasteful — 0.3s transitions, no overdone effects.
13. **Mobile first** — all layouts designed for 375px and scaled up.
14. **`npm run build` must pass** before marking any shift complete.

---

## SATTVIK'S CONTENT TODO (not for the AI — for Sattvik after the app is built)

After the app is built and deployed, Sattvik needs to:

**For each episode:**
- [ ] Upload photos to a Google Drive folder → paste folder link into `gallery` field
- [ ] Upload videos to YouTube as Unlisted → paste link into `video` or `clips[].src` field
- [ ] Pick a cover thumbnail → paste Drive image link into `thumbnail` field
- [ ] Update description if he wants to change what's pre-written
- [ ] Add insiderNote (personal joke/caption only she'll understand)

**Site-level:**
- [ ] Record or pick the intro video → paste into `siteConfig.introVideo`
- [ ] Add Spotify playlist link → paste into `siteConfig.spotifyPlaylist`
- [ ] Write the letter to Sham → paste into `connorLetter.content`
- [ ] When ready to reveal letter: set `connorLetter.unlocked = true`
- [ ] Add more memory jar entries (the more the better)
- [ ] Add more inside jokes to the glossary
- [ ] Confirm her birthday date is correct in `siteConfig.birthdayDate` (currently "06-10")

---

## COMPANION FILE

`shamflix_build_prompt.md` — contains the full detailed spec including all data.js content verbatim. The AI building Shift 1 must read both files before starting.

---

*End of SHAMFLIX_CONTEXT.md — this file is the single source of truth for the entire project.*

---

### POST-SHIFT IMPROVEMENTS (unshifted iterations)

#### Iteration 1 — Cursor fix + Honorary Gallery + UI polish
**Completed:** May 2026
**Changes:**
- Removed Riya badge completely (EpisodeCard, EpisodeModal, all imports)
- Fixed cursor: normal paw everywhere, pointing paw on all buttons/links/interactive elements including inside modals (CSS `!important` + fixed overlay rules)
- Generated proper 32×32 PNG cursors (cat-cursor.png = paw, cat-cursor-pointer.png = pointing paw)
- Season page host character card now supports image — add `hostCharacter.image` Drive link per season in data.js
- Honorary Mentions now open a full-screen swipeable gallery lightbox (HonoraryGallery.jsx):
  - Supports photos (Drive images) and videos (YouTube embeds) per item
  - Arrow key navigation, on-screen prev/next buttons, touch swipe
  - Captions + insider notes (hidden behind "Show insider note" button)
  - Dot indicators, item count badge on card
  - Empty state with Drive folder fallback
- honoraryMentions data structure updated to support `items[]` array with { type, src, caption, note }
- Added "How Well Do You Know Me?" quiz page (KnowMeQuiz.jsx at /extras/know-me):
  - 7 questions with A/B/C/D answers, instant green/red feedback, fun fact per question
  - Score screen with per-question breakdown
  - 80%+ score unlocks gift reveal card (fill giftMessage in data.js)
  - Added to Extras navbar dropdown
- Birthday cake component (BirthdayCake.jsx): animated SVG cake floats bottom-right on June 10, click to open birthday popup
- DoNotTouch easter egg (DoNotTouch.jsx): tiny red warning at 12% opacity bottom-left, click reveals image/video from doNotTouchConfig in data.js
- AmbientSparkles.jsx: subtle floating ✦ symbols across background
- App.jsx updated to include all new global components
- data.js additions: knowMeQuizData export, doNotTouchConfig export
- Build: clean at 447KB

**Files created:**
- src/components/features/HonoraryGallery.jsx
- src/components/features/BirthdayCake.jsx
- src/components/features/DoNotTouch.jsx
- src/components/features/AmbientSparkles.jsx
- src/pages/KnowMeQuiz.jsx
- public/cat-cursor-pointer.png

**Files modified:**
- src/index.css (cursor rules, sparkle animation)
- src/App.jsx (new imports, new route, new global components)
- src/pages/Home.jsx (HonoraryGallery wired to cards)
- src/pages/SeasonPage.jsx (character image support)
- src/components/home/EpisodeCard.jsx (Riya removed)
- src/components/episode/EpisodeModal.jsx (Riya removed)
- src/components/layout/Navbar.jsx (Know Me Quiz added to dropdown)
- src/data/data.js (honoraryMentions restructured, knowMeQuizData + doNotTouchConfig added, hostCharacter.image fields added)

#### Iteration 2 — Gallery back button + direct image imports
**Completed:** May 2026
**Changes:**
- HonoraryGallery: added prominent "← Back" button in top bar (was missing)
- Switched image system from Drive links to direct bundled imports:
  - Images go in src/assets/honorary/ (any format: jpg/png/webp/gif)
  - Import them at top of data.js honoraryMentions block, use imported var as src
  - Instant load — no spinners, no Drive auth issues, works exactly like any real website
  - Videos still use YouTube embeds (unchanged)
- data.js: honoraryMentions comments updated with new import-based instructions
- Cleaner gallery UI: type pill in header, better caption/note layout, crisper slide animation
- Created src/assets/honorary/ folder

#### Iteration 3 — Direct photo imports for all episodes, Season 3 finale, Season 4, cursor fixes
**Completed:** May 2026
**Changes:**
- Cursor fix: scoped `.fixed` cursor rule to exclude `pointer-events-none` elements (sparkles were overriding navbar cursor)
- DoNotTouch: removed `cursor: 'default'` override so paw cursor works on it
- ALL episode thumbnails and galleries now use direct bundled imports (no Drive links)
  - src/assets/episodes/ folder created with naming scheme s{s}e{ep}p{pic}.jpg
  - 100 placeholder images generated for all seasons (replace with real photos)
  - All imports added at top of data.js — pattern: `import s2e3p1 from '../assets/episodes/s2e3p1.jpg'`
  - photos[] arrays wired to each episode
  - GalleryViewer rewritten: uses bundled imports, proper animated lightbox, no Drive dependency
- Season 3: subtitle changed from "The ongoing arc" to "The college final arc", period updated to Jul 2025 – May 2026
- Season 3 Episode 15 added: "VTU endsems — season finale" (May 2026, rating 9.8)
- Season 4 added: "Forever" — subtitle "From here, twins for life", starts June 10 2026
  - Episode 1: "Season premiere — her birthday 🎂" (type: moment, rating 10.0)
  - Host character: Yuji Itadori
  - Placeholder for future episodes
- Build: clean at 449KB JS + 100 image assets

#### Iteration 4 — Auto photo detection via Vite glob import
**Completed:** May 2026
**Changes:**
- Replaced all 100 manual imports with a single Vite glob import + getPhotos() helper
- glob scans src/assets/episodes/ automatically at build time
- getPhotos(season, ep) returns sorted array for that episode
- Adding photos is now: drop file named s2e3p3.jpg → it appears automatically on next dev save or deploy
- photos[] arrays in all episodes replaced with getPhotos(s, e) calls
- thumbnail fields replaced with getPhotos(s, e)[0] ?? null
- Verified: s3e3p3.jpg added as test — confirmed it's bundled (inlined as base64 when <4KB, as separate file when larger)
- Build clean at 465KB

#### Iteration 5 — Logo cursor fix + cycling name easter egg
**Completed:** May 2026
**Changes:**
- Logo button: explicit `cursor: url(/cat-cursor-pointer.png), pointer` style — no more system cursor bleed
- Paw icon slightly smaller (w-7 h-7 was w-8 h-8)
- Logo name now cycles on each click through 8 names with slide animation:
  Shamflix → Shamchan → Twin → Ms-Spellbee → Bulbul → Gaymer-Girl → Tsundere-San → lil-nigga 🔓
- On lil-nigga (index 7), navigates to /secret-cats
- Removed click-count badge (replaced by name cycle)
- AnimatePresence used for smooth name swap animation

#### Iteration 6 — Photos now show in all episode types
**Completed:** May 2026
**Changes:**
- `moment` type: now renders GalleryViewer below the text if photos exist
- `video` type: now renders GalleryViewer below video+description if photos exist
- EpisodeCard thumbnail: falls back to first photo from getPhotos() if no explicit thumbnail set
- Root cause: episodes were type "moment" (text only) so photos were ignored even when present
- Now any episode type + any photos = photos always shown

#### Iteration 7 — Removed type system, auto photo/video detection, p0=thumbnail
**Completed:** May 2026
**Changes:**
- EpisodeModal completely rewritten — no more type switching. Auto-detects: has video? shows it. has photos? shows gallery. has both? shows both.
- EpisodeCard rewritten — clean, no type badges, no classified/contentWarning clutter
- Added getThumbnail(s,e) helper: p0 = thumbnail only, p1+ = gallery photos
- All episode thumbnail fields updated to getThumbnail(s,e)
- Removed from all episode objects: type, contentWarning, classified, riyaInvolved, clips, gallery (null ones)
- InsiderNote now collapsible (click to reveal) inside modal
- Added clear instructions in data.js for how to add videos (any YouTube URL format) and photos (p0=thumbnail, p1+=gallery)
- Build: clean at 455KB

#### Iteration 8 — Local video files, Diabolical Sham, Vault, all assets auto-detected
**Completed:** May 2026
**Changes:**
- Local video support: s1e1v1.mp4, s1e1v2.mp4 etc. auto-detected via glob in src/assets/episodes/
- getLocalVideos(s,e) helper added to data.js
- localVideos field added to all 36 episodes (auto-populated at build time)
- LocalVideoPlayer.jsx: renders local videos with native <video> controls, multi-clip prev/next nav
- EpisodeModal: shows YouTube video first, then local videos, then description, then photos
- EpisodeCard: video badge shows clip count when multiple local videos
- Arrow keys in GalleryViewer now use capture phase — navigate PHOTOS not episodes when lightbox open
- DoNotTouch: rotating images (dnt1.jpg, dnt2.jpg...) auto-detected from src/assets/donottouch/
- SecretCat page renamed to "Diabolical Sham", cat images (sc1.jpg...) from src/assets/secret/ open in lightbox
- Meow button plays public/meow.mp3 if present
- SecretVault component: passcode 106 → bday screen → yes/no loop (angry cat on no) → video reveal
- SecretVault accessible from "Open the Vault" button on Diabolical Sham page
- vaultConfig.video in data.js for vault reveal video
- Honorary mentions: h1p1.jpg naming, auto-glob, no imports needed
- IntroHero: supports local intro.mp4 in src/assets/intro/ as well as YouTube link
- All asset folders and placeholder images created
- SATTVIK_GUIDE.md fully updated with all naming conventions
- Build: clean


---

## ITERATION LOG (post-shift)

### ITER 9 — Major content restructure + vault redesign
**Status: COMPLETE**

**Changes made:**

#### Bug fix
- Timeline — Season 4 was crashing because SEASON_COLORS had no entry for 'season-4'. Fixed by adding it + DEFAULT_COLOR fallback.

#### Honorary Mentions — REMOVED COMPLETELY
- Removed from Home.jsx, data.js, all imports
- HonoraryGallery component still exists on disk but is no longer imported anywhere
- No honoraryMentions export in data.js anymore

#### Secret Vault — REDESIGNED
- Old flow: passcode → yes/no birthday loop → video
- New flow: passcode → vault home (4 section grid) → section gallery with photos+videos
- 4 vault sections: "Drunk us" (sv1), "Diabolical Sham" (sv2), "Sham-chan" (sv3), "Sham-san" (sv4)
- Photos: src/assets/vault/sv1p1.jpg, sv1p2.jpg, sv2p1.jpg etc.
- Videos: src/assets/vault/sv1v1.mp4 etc.
- vault_cover.jpg still used as left panel on passcode screen

#### "Claim your Secret Gift" — MOVED TO TOP OF DIABOLICAL SHAM PAGE
- Big purple gift card at top of /secret-cats page
- "Open the Vault" button there opens vault with passcode
- Logo clicking lil-nigga still goes to /secret-cats as before

#### Season 0 — NEW EPISODE ADDED
- Ep 6: "Course guy and the bhaiya mystery" — the guy who kept DMing to join his course, Sahil's "didi kon bhaiya hai ye" moment

#### Season 1 — RESTRUCTURED
- REMOVED: "The drunk call" (ep3), "Pri drinks" (ep4) — these are now in the secret episode
- NEW EPISODE ORDER:
  - Ep1: AnimeCon together (Feb 2024)
  - Ep2: Cat cafe, finally (Feb 2024)
  - Ep3: Bday at Sattvik's — while he was ill (June 2024) [was ep5]
  - Ep4: 1vx — Jan meetup (Jan 2024) [NEW]
  - Ep5: Cultural fest (June 2024) [was ep6, renamed from "Cultural day"]
  - Ep6: 🔒 Season 1 Secret [NEW — quiz-locked]
    - secretTitle: "The vault of firsts"
    - Contains: drunk call lore, pri drinks, VC withdrawal story, the dream
- NEW: SeasonQuizUnlock component — 5 questions about Season 1, need 3/5 to pass
- EpisodeCard now shows lock icon + "Quiz" badge for locked episodes
- Clicking a locked episode opens the quiz modal, not the episode

#### Season 2 — CHANGES
- REMOVED: "Online game sessions" (was ep1)
- REMOVED: "Chili's drinks" (was ep18)
- RENAMED: "PG rescue mission" → "Shifting PG"
- RENAMED: "Board games night" → "Board games"

#### Season 3 — CHANGES
- REMOVED: "SIH — project together" (ep5)
- RENAMED: "Tea together" → "Got tea"
- "Jamming at Goat" stays as-is (already correct)

---

#### Iteration 10 — Gift icon + inline vault on Diabolical Sham page
**Completed:** May 2026
**Changes:**
- Removed the big purple "Claim Your Secret Gift" card from the top of the Diabolical Sham (/secret-cats) page
- Added a small animated 🎁 gift icon button in the top-right corner of the page header — clicking it opens the Secret Vault as a modal overlay (same passcode → vault home → section gallery flow as before)
- Added `SecretVaultInline` as a named export in `SecretVault.jsx` — same logic as the modal vault but renders inline (no fixed overlay), embedded directly at the very bottom of the Diabolical Sham page under a "Secret Vault" label
- The two are fully independent: gift icon (top) = modal vault, inline vault (bottom) = always visible on the page
- Build: clean

**Files modified:**
- `src/components/features/SecretVault.jsx` — added `SecretVaultInline` named export
- `src/pages/SecretCat.jsx` — removed purple gift card, added 🎁 header button, added `<SecretVaultInline />` at bottom

---

## PHOTO NAMING AFTER RESTRUCTURE

The app now uses the CURRENT visible episode order for photo/video auto-detection.
Add files in `src/assets/episodes/` using:

- `p0` = thumbnail only
- `p1`, `p2`, `p3`... = gallery photos
- `v1`, `v2`, `v3`... = local video clips

Examples:
- `s1e1p1.jpg` = Season 1 Episode 1 gallery photo 1
- `s1e1v1.mp4` = Season 1 Episode 1 local video 1
- `s2e10p0.jpg` = Season 2 Episode 10 thumbnail only

**Season 0**
- `s0e1...` = `Istg if u had blocked me`
- `s0e2...` = `Gossiping abt me with pri`
- `s0e3...` = `She tried talking. He ran.`
- `s0e4...` = `Horimiya recommendation`
- `s0e5...` = `Ur singing in inauguration`
- `s0e6...` = `Broski fell ill Sattvik the saviour`
- `s0e7...` = `Stoopied ahh course guy`
- `s0e8...` = `Found my shadow`

**Season 1**
- `s1e1...` = `1VX`
- `s1e2...` = `AnimeCon together`
- `s1e3...` = `Cat cafe, finally`
- `s1e4...` = `Ethnic day+cultura`
- `s1e5...` = `Bday at Sattvik's — while he was ill`
- `s1e6...` = `Season 1 Secret`

**Season 2**
- `s2e1...` = `Bye bye hostel`
- `s2e2...` = `Yulu`
- `s2e3...` = `Bday treat`
- `s2e4...` = `My bday treat`
- `s2e5...` = `Riya's bday — go-karting + paintball`
- `s2e6...` = `Board games`
- `s2e7...` = `Essotto hehe`
- `s2e8...` = `Lalbagh`
- `s2e9...` = `Garba night`
- `s2e10...` = `Diwali`
- `s2e11...` = `ISKCON visit`
- `s2e12...` = `Cubbon Park picnic`
- `s2e13...` = `Japan Habba`
- `s2e14...` = `Zomaland`
- `s2e15...` = `Marathon`
- `s2e16...` = `Shinchan movie + hangout`
- `s2e17...` = `Bday at 11:11 — season finale`

**Season 3**
- `s3e1...` = `Boho outing`
- `s3e2...` = `Got tea`
- `s3e3...` = `Riya's bday... Broski SLAYEDD`
- `s3e4...` = `Golf`
- `s3e5...` = `Mela and movie`
- `s3e6...` = `Soft skills presentation`
- `s3e7...` = `Blr Tech Summit`
- `s3e8...` = `Chennaiiiii (home to our mallu queen)`
- `s3e9...` = `Secret Santa`
- `s3e10...` = `Jamming goat`
- `s3e11...` = `Sattvik's bday treat — finally`
- `s3e12...` = `Holi`
- `s3e13...` = `Black Pearl BBQ`
- `s3e14...` = `VTU endsems — season finale`

**Season 4**
- `s4e1...` = `Season premiere — her birthday`

**Riya Season 0**
- `rs0e1...` = `Met mumma`
- `rs0e2...` = `Scared you`
- `rs0e3...` = `Rejected number`
- `rs0e4...` = `Comeback`
- `rs0e5...` = `Gossip sess about sattvik`
- `rs0e6...` = `Vibe matched`

---

## SECRET VAULT FILE NAMING (new system)
```
src/assets/vault/sv1p1.jpg   → Section 1 "Drunk us", photo 1
src/assets/vault/sv1p2.jpg   → Section 1 photo 2
src/assets/vault/sv1v1.mp4   → Section 1 video 1
src/assets/vault/sv2p1.jpg   → Section 2 "Diabolical Sham", photo 1
src/assets/vault/sv3p1.jpg   → Section 3 "Sham-chan", photo 1
src/assets/vault/sv4p1.jpg   → Section 4 "Sham-san", photo 1
src/assets/vault/vault_cover.jpg  → Left image on passcode screen
```
