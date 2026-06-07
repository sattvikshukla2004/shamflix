# SATTVIK'S GUIDE TO SHAMFLIX
### The only file you need to read after the app is built

---

## The Golden Rule

**You only ever edit one file: `src/data/data.js`**

Every piece of content in Shamflix — episode titles, descriptions, videos, photos, jokes, stats, the letter — comes from that file. You never touch any other file unless this guide tells you to.

---

## Setting Up (One Time)

Before you start adding content, you need two things:

**Google Drive** — for photos and photo galleries.
Make a folder called "Shamflix" in your Drive. Inside it, make a subfolder for each episode that has photos. Set every folder's sharing to **"Anyone with the link can view"**.

**YouTube** — for videos.
Upload each video as **Unlisted** (not Public, not Private). Unlisted means only people with the link can see it, which is what you want.

---

## How to Get the Right Links

### From a YouTube video
Your video URL looks like: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
The part after `v=` is the Video ID: `dQw4w9WgXcQ`
In data.js you'll write it as: `"https://www.youtube.com/embed/dQw4w9WgXcQ"`

### From a Google Drive photo
Right-click the photo → Get link → Copy link.
Your link looks like: `https://drive.google.com/file/d/1aBcDeFgHiJkLmN/view?usp=sharing`
The part between `/d/` and `/view` is the File ID: `1aBcDeFgHiJkLmN`
In data.js you'll write it as: `"https://drive.google.com/uc?id=1aBcDeFgHiJkLmN"`

### From a Google Drive folder
Right-click the folder → Get link → Copy link.
Your link looks like: `https://drive.google.com/drive/folders/1aBcDeFgHiJkLmN?usp=sharing`
The part after `folders/` is the Folder ID: `1aBcDeFgHiJkLmN`
In data.js you'll write it as: `"https://drive.google.com/embeddedfolderview?id=1aBcDeFgHiJkLmN#grid"`

---

## How to Add a Photo/Video to an Existing Episode

1. Open `src/data/data.js`
2. Find the episode by searching (Ctrl+F) for its title
3. Look for the field that says `"PASTE_X_HERE"` or `null`
4. Replace it with the correct link using the formats above
5. Save the file

**Example — adding a thumbnail:**
```js
// Before:
thumbnail: "PASTE_DRIVE_IMAGE_LINK",

// After:
thumbnail: "https://drive.google.com/uc?id=1aBcDeFgHiJkLmN",
```

**Example — adding a YouTube video:**
```js
// Before:
video: "PASTE_YOUTUBE_LINK",

// After:
video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
```

**Example — adding a photo gallery (Drive folder):**
```js
// Before:
gallery: "PASTE_DRIVE_FOLDER_LINK",

// After:
gallery: "https://drive.google.com/embeddedfolderview?id=1aBcDeFgHiJkLmN#grid",
```

---

## How to Update an Episode Description

Find the episode in data.js. Change the `description` field:
```js
description: "Whatever you want to say about this memory.",
```

Change the `insiderNote` for a private caption only she'll understand:
```js
insiderNote: "The inside joke goes here.",
```

---

## How to Add a New Episode to an Existing Season

Find the season in data.js (e.g. `// SEASON 2`). Copy this template and paste it inside the `episodes: [...]` array:

```js
{
  id: "s2-ep20",                          // Must be unique. Follow the pattern.
  title: "Episode Title Here",
  date: "Month Year",
  description: "What happened in this memory.",
  insiderNote: "The private joke only she'd get.",
  type: "video",                           // See type options below
  thumbnail: "PASTE_DRIVE_IMAGE_LINK",
  rating: "9.5",
  tags: ["tag1", "tag2"],
  classified: false,                       // true = blurred until she clicks
  riyaInvolved: false,                     // true = Riya badge appears
  video: "PASTE_YOUTUBE_LINK",
  gallery: null,
  clips: null,
  photos: null,
},
```

**Episode type options:**
- `"moment"` — text only, no media (just description + insiderNote)
- `"video"` — single YouTube video (fill in `video` field)
- `"gallery"` — Drive folder of photos (fill in `gallery` field)
- `"clips"` — multiple YouTube clips (fill in `clips` array — see existing examples)
- `"mixed"` — one video + one gallery (fill both `video` and `gallery`)
- `"clips+gallery"` — multiple clips + gallery (fill both)

---

## How to Add a New Season

Find the end of the `seasons` array in data.js. Copy this template:

```js
{
  id: "season-4",
  title: "Season 4",
  subtitle: "Whatever this chapter is called",
  year: "2026",
  description: "What this season is about.",
  hostCharacter: {
    name: "Character Name",
    quote: "A fun quote from this character.",
    emoji: "🎭",
  },
  episodes: [
    // Add episodes here following the template above
  ],
},
```

Then add a link to it in the Navbar if you want (though it auto-appears on the home page).

---

## How to Unlock the Connor Letter

When you're ready for her to read your letter:

1. Open `src/data/data.js`
2. Find `connorLetter` near the bottom
3. Change `unlocked: false` to `unlocked: true`
4. Also paste your letter text into the `content` field
5. Save, commit, and push (see deployment steps below)

---

## How to Add a Memory Jar Entry

Find `memoryJarEntries` in data.js. Add a new string to the array:
```js
"That time we stayed up until 4am doing absolutely nothing productive",
```

---

## How to Add an Inside Joke to the Glossary

Find `insideJokes` in data.js. Copy an existing entry and change the fields:
```js
{
  term: "The Joke Name",
  definition: "What it means / the story behind it.",
  firstAppearance: "When it first happened",
  usedBy: ["Sham", "You"],
  tags: ["classic", "food"],
},
```

---

## How to Deploy Changes to Vercel

Every time you make a change to data.js (or anything), do this:

```bash
git add .
git commit -m "Add photos for Season 2 / unlock letter / etc"
git push
```

Vercel automatically rebuilds and re-deploys within about 30 seconds. That's it.

**First-time setup** (only once):
1. Push this project to a GitHub repo (public or private)
2. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
3. Vercel auto-detects Vite. Click Deploy.
4. Done. You get a URL like `shamflix-sattvik.vercel.app`

---

## How to Run Locally (While You're Adding Content)

```bash
cd shamflix
npm install        # only needed once
npm run dev        # starts at http://localhost:5173
```

Every time you save data.js, the browser auto-refreshes.

---

## Quick Reference — Fields You'll Fill Most Often

| Field | What to paste |
|-------|---------------|
| `thumbnail` | Drive image link (`https://drive.google.com/uc?id=...`) |
| `video` | YouTube embed link (`https://www.youtube.com/embed/...`) |
| `gallery` | Drive folder embed (`https://drive.google.com/embeddedfolderview?id=...#grid`) |
| `siteConfig.introVideo` | YouTube embed link for the opening video |
| `siteConfig.spotifyPlaylist` | Your Spotify playlist URL |
| `connorLetter.content` | Your letter text (can use `\n` for new lines) |

---

*You built something really beautiful. She's going to love it.*

---

## UPDATED ASSET NAMING GUIDE (all auto-detected, no imports needed)

### Episode photos
| Name | What it does |
|------|-------------|
| `s2e5p0.jpg` | Thumbnail shown on the episode card |
| `s2e5p1.jpg`, `p2`, `p3`... | Gallery photos inside the episode |
Drop in: `src/assets/episodes/`

### Honorary Mentions photos
| Name | Which collection |
|------|-----------------|
| `h1p1.jpg`, `h1p2.jpg`... | Drinking chronicles |
| `h2p1.jpg`, `h2p2.jpg`... | Gym arc |
| `h3p1.jpg`, `h3p2.jpg`... | Random funny pics |
| `h4p1.jpg`, `h4p2.jpg`... | Game sessions |
Drop in: `src/assets/honorary/`

### Secret Cat page (Diabolical Sham)
| Name | What it does |
|------|-------------|
| `sc1.jpg`, `sc2.jpg`, `sc3.jpg`... | Cat images in the catalogue grid — click each to open lightbox |
Drop in: `src/assets/secret/`

### Do Not Touch — rotating images
| Name | What it does |
|------|-------------|
| `dnt1.jpg`, `dnt2.jpg`, `dnt3.jpg`... | Each touch cycles to the next image |
Drop in: `src/assets/donottouch/`

### Secret Vault
| Name | What it does |
|------|-------------|
| `vault_cover.jpg` | Full-height image shown on the left side of the passcode screen |
| `vault_angry.jpg` | Angry cat shown when she clicks "no" on the surprise prompt |
Drop in: `src/assets/vault/`

### Secret Vault video
In `data.js`, find `vaultConfig` and paste the YouTube URL:
```js
export const vaultConfig = {
  video: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
};
```

### Meow button audio
Add a file named `meow.mp3` directly to the `public/` folder.
The button will play it automatically when clicked.

### Intro video (homepage)
Two options — use whichever is easier:
1. **Local file**: Drop `intro.mp4` into `src/assets/intro/` — auto-detected
2. **YouTube link**: In `data.js`, set `siteConfig.introVideo` to any YouTube URL

### Arrow keys in photo gallery
When a photo lightbox is open, arrow keys navigate between photos.
When the lightbox is closed, arrow keys navigate between episodes as before.

---

## QUICK REFERENCE — all asset folders

| Folder | Files | Naming |
|--------|-------|--------|
| `src/assets/episodes/` | Episode photos | `s2e5p0.jpg` (thumb), `s2e5p1.jpg`, `p2`... |
| `src/assets/honorary/` | Honorary mention photos | `h1p1.jpg`, `h2p3.jpg`... |
| `src/assets/secret/` | Secret cat page images | `sc1.jpg`, `sc2.jpg`... |
| `src/assets/donottouch/` | Do not touch images | `dnt1.jpg`, `dnt2.jpg`... |
| `src/assets/vault/` | Vault cover + angry cat | `vault_cover.jpg`, `vault_angry.jpg` |
| `src/assets/intro/` | Homepage intro video | `intro.mp4` |
| `public/` | Meow audio | `meow.mp3` |

---

## DIRECT VIDEO FILES (s1e1v1.mp4 etc.)

You can now add video files directly to the project — no YouTube needed.

**Naming:** `s{season}e{ep}v{num}.mp4`
- `s1e1v1.mp4` → Season 1, Episode 1, Video 1
- `s1e1v2.mp4` → Season 1, Episode 1, Video 2 (second clip)
- `s3e9v1.mp4` → Season 3, Episode 9, Video 1

**Formats supported:** `.mp4` `.webm` `.mov`

**Where to put them:** `src/assets/episodes/` — same folder as photos

**Multiple clips per episode:** Add `v1`, `v2`, `v3`... — they show with Prev/Next clip buttons inside the episode.

**YouTube vs local — you can use both at once:**
- Set `video: "youtube-url"` in data.js for a YouTube video
- Drop `s2e5v1.mp4` in the folder for a local clip
- Both show up in the episode, YouTube first then local

**File size note:** Large video files will make the build slow and the app big. For long videos (>2 min), YouTube is better. For short clips (reactions, funny moments, short recordings) direct files are great.


---

## UPDATE — ITER 9 (major restructure)

### Secret Vault — new naming system
The vault now has 4 sections. Drop files in `src/assets/vault/`:

| File name | Where it shows |
|-----------|---------------|
| `vault_cover.jpg` | Left panel on passcode screen |
| `sv1p1.jpg`, `sv1p2.jpg`... | Section 1: "Drunk us" |
| `sv1v1.mp4`, `sv1v2.mp4`... | Section 1 videos |
| `sv2p1.jpg`, `sv2p2.jpg`... | Section 2: "Diabolical Sham" |
| `sv3p1.jpg`, `sv3p2.jpg`... | Section 3: "Sham-chan" |
| `sv4p1.jpg`, `sv4p2.jpg`... | Section 4: "Sham-san" |

Add more sections or rename them in `data.js` → `vaultSections` array.

### Season 1 secret episode
Episode 6 in Season 1 is locked. She has to pass a 5-question Season 1 quiz (need 3/5) to unlock it.
The quiz questions are in: `src/components/features/SeasonQuizUnlock.jsx` → `SEASON_QUIZZES[1]`
Edit the questions/answers there if you want to change them.
The secret episode content (title, description, insider note) is in `data.js` → Season 1, ep-s1-e6 → `secretTitle`, `secretDescription`, `secretInsiderNote`.
Photos for the secret ep: `s1e6p1.jpg`, `s1e6p2.jpg` etc. in `src/assets/episodes/`

### Honorary Mentions — REMOVED
Gone completely. All that content should now go in the vault sections.

### Season changes summary
- S0: now has 6 episodes (added "Course guy and the bhaiya mystery")
- S1: now 6 eps (removed drunk call + pri drinks → now in secret ep6; added 1vx ep4)
- S2: removed online game sessions + Chili's drinks. Renamed: "Shifting PG", "Board games"
- S3: removed SIH. Renamed: "Got tea"

