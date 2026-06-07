# Shamflix 🎬🐾

A Netflix-style personal streaming platform built as a birthday gift. Three years of friendship, presented as seasons and episodes — photos, videos, memories, inside jokes, and secrets.

---

## What's Inside

- **4 seasons** of friendship memories (2023 – present)
- **Episode types:** text moments, YouTube videos, photo galleries, clip reels, and mixed
- **Extras:** JJK character quiz, friendship stats, memory jar, inside jokes glossary, secret cat page, Leon 404, a locked letter
- **Easter eggs:** 5 logo clicks → secret cats, hidden Leon easter egg on home page, classified episodes
- **Birthday surprise:** special splash screen on June 10

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS (custom blue palette) |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Confetti | canvas-confetti |
| Deployment | Vercel (free tier) |
| Backend | None |
| Database | None |
| Auth | None |

---

## Running Locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

---

## Building for Production

```bash
npm run build
```

Output goes to `dist/`. Bundle is ~422KB gzipped to ~129KB.

---

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Vite — no config needed
4. Click Deploy

`vercel.json` is already configured to handle SPA routing (all paths redirect to `index.html`).

Future deploys are automatic: push to `main` → Vercel rebuilds in ~30 seconds.

---

## Content Management

**All content lives in one file: `src/data/data.js`**

That file exports:
- `siteConfig` — site name, tagline, birthday date, intro video
- `seasons` — all 4 seasons with all episodes
- `insideJokes` — glossary entries
- `friendshipStats` — stats page data
- `memoryJarEntries` — memory jar strings
- `jkkQuizQuestions` + `jkkQuizResults` — quiz data
- `connorLetter` — the letter (locked until `unlocked: true`)
- `honoraryMentions` — special collection cards on home page

See `SATTVIK_GUIDE.md` for step-by-step instructions on adding photos, videos, new episodes, and deploying.

---

## Project Structure

```
shamflix/
├── public/
│   ├── favicon.svg          ← paw print favicon
│   └── cat-cursor.png       ← custom cat paw cursor
├── src/
│   ├── data/data.js         ← THE ONLY FILE TO EDIT FOR CONTENT
│   ├── components/
│   │   ├── layout/          ← Navbar, Footer
│   │   ├── home/            ← IntroHero, SeasonRow, EpisodeCard
│   │   ├── episode/         ← EpisodeModal, GalleryViewer, VideoPlayer, ClipReel, MomentCard
│   │   ├── features/        ← BirthdaySplash, CatMascot, LeonEasterEgg, ConnorLetterUnlock
│   │   └── ui/              ← Badge, ClassifiedStamp, RiyaBadge, ContentWarning
│   ├── pages/               ← Home, SeasonPage, Timeline, Stats, Quiz, MemoryJarPage,
│   │                           Glossary, ConnorLetter, SecretCat, NotFound
│   ├── hooks/useBirthday.js
│   ├── utils/driveHelpers.js
│   ├── App.jsx
│   └── index.css
├── vercel.json
├── tailwind.config.js
└── package.json
```

---

*Made with care. For Sham.*
