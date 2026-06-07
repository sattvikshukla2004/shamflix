// ============================================================
// SHAMFLIX — src/data/data.js
// THE ONLY FILE SATTVIK EVER EDITS FOR CONTENT.
//
// HOW TO ADD PHOTOS:
//   1. Put image files in src/assets/episodes/
//      Name them: s{season}e{ep}p{pic}.jpg  e.g. s2e3p1.jpg
//   2. Import them below (copy the import pattern)
//   3. Use the imported variable as `src` in the episode's photos[] array
//
// HOW TO ADD VIDEOS:
//   Use YouTube embed links: "https://www.youtube.com/embed/VIDEO_ID"
//   Get VIDEO_ID from the URL: youtube.com/watch?v=VIDEO_ID
//
// SAVE + git push → Vercel redeploys in ~30s. That's it.
// ============================================================

// ============================================================
// PHOTOS — AUTO-LOADED FROM src/assets/episodes/
// Just drop files named s2e3p1.jpg, s2e3p2.jpg etc. into that folder.
// They are picked up automatically — no imports needed.
// ============================================================
const _allPhotos = import.meta.glob(
  ['../assets/episodes/*.jpg', '../assets/episodes/*.jpeg', '../assets/episodes/*.png', '../assets/episodes/*.webp', '../assets/episodes/*.gif'],
  { eager: true }
);

// Auto-detect local videos: s1e1v1.mp4, s1e1v2.mp4, s2e3v1.webm etc.
const _allVideos = import.meta.glob(
  ['../assets/episodes/*.mp4', '../assets/episodes/*.webm', '../assets/episodes/*.mov'],
  { eager: true, query: '?url', import: 'default' }
);

// ============================================================
// GUIDE IMAGES — AUTO-LOADED FROM src/assets/guides/
// Name them: s0.jpg, s1.jpg, s2.jpg, s3.jpg, s4.jpg
// They appear as the season banner background on the season page.
// ============================================================
const _allGuides = import.meta.glob(
  ['../assets/guides/*.jpg', '../assets/guides/*.jpeg', '../assets/guides/*.png', '../assets/guides/*.webp'],
  { eager: true }
);

export function getSeasonGuide(seasonNumber) {
  const entry = Object.entries(_allGuides).find(([path]) => {
    const filename = path.split('/').pop().replace(/\.[^.]+$/, '');
    return filename === `s${seasonNumber}`;
  });
  return entry ? entry[1].default : null;
}export function getHostImage(seasonNumber) {
  const entry = Object.entries(_allGuides).find(([path]) => {
    const filename = path
      .split("/")
      .pop()
      .replace(/\.[^.]+$/, "");
    return filename === `s${seasonNumber}`;
  });
  return entry ? entry[1].default : null;
}

function getEpisodeMediaEntries(season, ep) {
  const prefixes = [`s${season}e${ep}p`, `s${season}e${ep}v`];
  const photoEntries = Object.entries(_allPhotos).map(([path, mod]) => ({ path, src: mod.default }));
  const videoEntries = Object.entries(_allVideos).map(([path, src]) => ({ path, src }));

  return [...photoEntries, ...videoEntries]
    .filter(({ path }) => {
      const filename = path.split('/').pop();
      return prefixes.some((prefix) => filename.startsWith(prefix));
    })
    .sort((a, b) => {
      const aFile = a.path.split('/').pop();
      const bFile = b.path.split('/').pop();
      const aNum = parseInt(aFile.match(/[pv](\d+)\./)?.[1] ?? '0');
      const bNum = parseInt(bFile.match(/[pv](\d+)\./)?.[1] ?? '0');
      if (aNum !== bNum) return aNum - bNum;
      return aFile.localeCompare(bFile);
    });
}

// getPhotos(season, ep) → sorted gallery photos (p1, p2, p3...)
// p0 = thumbnail only when the file is named with p0.
export function getPhotos(season, ep) {
  return getEpisodeMediaEntries(season, ep)
    .filter(({ path }) => /\.(jpg|jpeg|png|webp|gif)$/i.test(path))
    .filter(({ path }) => {
      const filename = path.split('/').pop();
      const num = parseInt(filename.match(/[pv](\d+)\./)?.[1] ?? '99');
      return num >= 1;
    })
    .map(({ src }) => src);
}

// getThumbnail(season, ep) → p0 if exists, else p1, else null
export function getThumbnail(season, ep) {
  const entries = getEpisodeMediaEntries(season, ep)
    .filter(({ path }) => /\.(jpg|jpeg|png|webp|gif)$/i.test(path));
  const p0 = entries.find(({ path }) => /p0[^0-9]/.test(path.split('/').pop()));
  if (p0) return p0.src;
  const p1 = entries.find(({ path }) => /p1[^0-9]/.test(path.split('/').pop()));
  if (p1) return p1.src;
  if (entries[0]) return entries[0].src;
  return null;
}

// getLocalVideos(season, ep) → sorted array of local video URLs
// Accepts either p# or v# prefixes as long as the file is actually a video.
export function getLocalVideos(season, ep) {
  return getEpisodeMediaEntries(season, ep)
    .filter(({ path }) => /\.(mp4|webm|mov)$/i.test(path))
    .map(({ src }) => src);
}

// ── Secret Vault — sv1p1.jpg, sv2p1.jpg, sv1v1.mp4 etc ─────────────────────
const _svPhotos = import.meta.glob(
  ['../assets/vault/sv*.jpg', '../assets/vault/sv*.jpeg', '../assets/vault/sv*.png', '../assets/vault/sv*.webp'],
  { eager: true }
);
const _svVideos = import.meta.glob(
  ['../assets/vault/sv*.mp4', '../assets/vault/sv*.webm', '../assets/vault/sv*.mov'],
  { eager: true, query: '?url', import: 'default' }
);

function getVaultMediaEntries(vaultId) {
  const prefixes = [`sv${vaultId}p`, `sv${vaultId}v`];
  const photoEntries = Object.entries(_svPhotos).map(([path, mod]) => ({ path, src: mod.default }));
  const videoEntries = Object.entries(_svVideos).map(([path, src]) => ({ path, src }));

  return [...photoEntries, ...videoEntries]
    .filter(({ path }) => {
      const filename = path.split('/').pop();
      return prefixes.some((prefix) => filename.startsWith(prefix));
    })
    .sort((a, b) => {
      const aFile = a.path.split('/').pop();
      const bFile = b.path.split('/').pop();
      const aNum = parseInt(aFile.match(/[pv](\d+)\./)?.[1] ?? '0');
      const bNum = parseInt(bFile.match(/[pv](\d+)\./)?.[1] ?? '0');
      if (aNum !== bNum) return aNum - bNum;
      return aFile.localeCompare(bFile);
    });
}

// getSVPhotos(vaultId) → sorted photos for that vault section (sv{id}p1, sv{id}p2...)
export function getSVPhotos(vaultId) {
  return getVaultMediaEntries(vaultId)
    .filter(({ path }) => /\.(jpg|jpeg|png|webp)$/i.test(path))
    .map(({ src }) => src);
}

// getSVVideos(vaultId) → sorted video URLs for that vault section
export function getSVVideos(vaultId) {
  return getVaultMediaEntries(vaultId)
    .filter(({ path }) => /\.(mp4|webm|mov)$/i.test(path))
    .map(({ src }) => src);
}

export function getSVMedia(vaultId) {
  return getVaultMediaEntries(vaultId).map(({ path, src }) => ({
    type: /\.(mp4|webm|mov)$/i.test(path) ? 'video' : 'photo',
    src,
  }));
}



// ============================================================
// HOW TO ADD A VIDEO TO ANY EPISODE
// ============================================================
// 1. Upload your video to YouTube as Unlisted
// 2. Copy the video URL — looks like: https://www.youtube.com/watch?v=dQw4w9WgXcQ
// 3. Find the episode in data.js (Ctrl+F its title or id)
// 4. Paste the URL as the video field:
//      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//    (any YouTube URL format works — watch, share, embed — all handled automatically)
// 5. Save → npm run dev auto-refreshes. Done.
//
// HOW TO ADD PHOTOS TO ANY EPISODE
// ============================================================
// 1. Name your photo: s{season}e{ep}p{num}.jpg
//    e.g. s2e5p1.jpg, s2e5p2.jpg, s2e5p3.jpg
//    Use p0 for the THUMBNAIL (shown on the card). p1,p2,p3... show in the gallery.
// 2. Drop it in: src/assets/episodes/
// 3. That's it. No code changes needed. Auto-detected.
// ============================================================

// SITE CONFIG — edit these to set up the site
// ============================================================
export const siteConfig = {
  name: "Shamflix",
  tagline: "3 years. 1 happy autistic family.",
  createdBy: "Riya & Sattvik",
  dedicatedTo: "Sham",
  birthdayDate: "06-10",           // MM-DD format — June 10 (her birthday)
  introVideo: "PASTE_YOUTUBE_LINK_HERE",  // The intro video shown at top of homepage
  introVideoTitle: "A message before you start watching",
  introVideoDescription: "Before you dive in — watch this first.",
  spotifyPlaylist: "PASTE_SPOTIFY_EMBED_LINK_HERE",
  letterUnlocked: false,           // Set to true when you want the Connor letter to appear
};


// ============================================================
// INSIDE JOKES — for the Glossary page (/extras/glossary)
// Add more entries in the same format below the last one
// ============================================================
export const insideJokes = [
  {
    term: "The Drunk Call (2024)",
    definition: "A classified incident in which Sattvik said some bs on the phone. The contents of this call have been sealed by executive order. See also: things we don't talk about.",
    firstAppearance: "Sometime in 2024",
    seeAlso: "The Yulu Incident"
  },
  {
    term: "The Yulu Incident",
    definition: "On a warm July evening in 2024, a Yulu scooter was taken for a ride through Bengaluru. One pedestrian almost did not make it. The driver remains unnamed for legal reasons.",
    firstAppearance: "July 2024",
    seeAlso: "The Drunk Call"
  },
  {
    term: "Riya's Lost Phone",
    definition: "During the trampoline park outing of September 2024, a phone was lost. Panic ensued. Sattvik found it. The group was saved. A hero was born.",
    firstAppearance: "September 2024",
    seeAlso: "Sattvik's Hero Arc"
  },
  {
    term: "The Chennai Glasses Incident",
    definition: "At a beach in Chennai during Glytch hackathon 2025, the sea made a decision. Her glasses did not return. The ocean has no remorse.",
    firstAppearance: "December 2025",
    seeAlso: "Glytch Hackathon"
  },
  {
    term: "Horimiya Gateway",
    definition: "The anime that started it all. Sattvik recommended it. Sham watched it. The shared taste was confirmed. This is where the lore begins.",
    firstAppearance: "2023",
    seeAlso: "Origin Story"
  },
  // Sattvik: add more inside jokes here in the same format ↓
];


// ============================================================
// FRIENDSHIP STATS — for the Stats page (/stats)
// Edit values here. Icons use lucide-react icon names.
// ============================================================
export const friendshipStats = [
  { label: "Cities explored together", value: "5+", icon: "map-pin" },
  { label: "Birthdays celebrated", value: "6", icon: "cake" },
  { label: "Riya's phones lost", value: "1", icon: "smartphone" },
  { label: "Glasses lost to the sea", value: "1", icon: "glasses" },
  { label: "Anime recommended", value: "∞", icon: "tv" },
  { label: "Bad decisions made", value: "classified", icon: "shield-off" },
  { label: "Times Sattvik ran away", value: "multiple (Season 0)", icon: "footprints" },
  { label: "Yulu near-misses", value: "1 (official)", icon: "bike" },
  { label: "Years of friendship", value: "3+", icon: "heart" },
  { label: "Cursed energy level", value: "Special Grade", icon: "zap" },
  { label: "Times Sattvik was right", value: "3%", icon: "check-circle" },
  { label: "Times Sham was right", value: "97%", icon: "award" },
  // Sattvik: add/edit stats here ↓
];


// ============================================================
// MEMORY JAR — for the Memory Jar page (/extras/memory-jar)
// Add memories as plain strings. Each one gets pulled randomly.
// ============================================================
export const memoryJarEntries = [
  "the one time i drunk called u outta the blue and ended it with love you byiee",
  "riding behind the mini truck while shifting pg",
  "going to drink hehheee",
  "u guys helping me out pick clothes after being exhausted from my skinny ahh jeans",
  "late night sleep talking(lets not talk abt the things we talked abt for both of our izzat lmao)",
  "me giving u a ted talk wait more like a full course on how not to be gaslighted",
  "veryyyy rare but comfort hugs hehee when we emo",
  "hehee ladkiya tadna and sharing baddiess in reels(just come out already)",
];


// ============================================================
// JJK QUIZ QUESTIONS — for the Quiz page (/extras/quiz)
// ============================================================
export const jkkQuizQuestions = [
  {
    question: "It's a Monday morning. What's your vibe?",
    options: [
      { text: "Already planned the whole week. Discipline is key.", character: "nanami" },
      { text: "I am THE moment. Monday works around me.", character: "gojo" },
      { text: "Objection. Monday is inadmissible.", character: "higuruma" },
      { text: "Whatever. I'm here aren't I.", character: "toji" }
    ]
  },
  {
    question: "Someone wrongs your friend. You:",
    options: [
      { text: "Handle it quietly, efficiently, and without drama.", character: "nanami" },
      { text: "Make it a whole event because they deserve the spectacle.", character: "gojo" },
      { text: "Build a case. Present evidence. Win.", character: "higuruma" },
      { text: "Don't say anything. Just appear nearby looking intimidating.", character: "toji" }
    ]
  },
  {
    question: "Your ideal weekend?",
    options: [
      { text: "Good food, minimal people, maximum peace.", character: "nanami" },
      { text: "Everywhere, all at once, being perceived.", character: "gojo" },
      { text: "Board games. Strategy. Winning.", character: "higuruma" },
      { text: "Disappear somewhere. No explanation.", character: "toji" }
    ]
  },
  {
    question: "How do you handle a problem?",
    options: [
      { text: "Assess. Plan. Execute. No panic.", character: "nanami" },
      { text: "I don't have problems. Problems have me.", character: "gojo" },
      { text: "Analyse all angles first. Then strike.", character: "higuruma" },
      { text: "Hit it until it stops being a problem.", character: "toji" }
    ]
  },
  {
    question: "What's your friendship style?",
    options: [
      { text: "Reliable. Always there when it matters. Not always loud about it.", character: "nanami" },
      { text: "Chaotic but devoted. You're never bored.", character: "gojo" },
      { text: "Honest, a little intense, but genuinely invested.", character: "higuruma" },
      { text: "Doesn't say much but would do anything for you.", character: "toji" }
    ]
  }
];

export const jkkQuizResults = {
  nanami: {
    name: "Kento Nanami",
    title: "The dependable one",
    description: "Quiet strength. You don't make a big deal of things but you're always exactly where you're needed. People trust you without knowing why. You probably have a strong opinion about bread.",
    quote: "Overtime is not something I enjoy. But for the right people — I stay."
  },
  gojo: {
    name: "Satoru Gojo",
    title: "The main character",
    description: "Loud, bright, impossible to ignore. You walk in and the energy shifts. Deeply caring underneath all the chaos — you just prefer people think you're just fun. (You're not fooling anyone.)",
    quote: "Throughout heaven and earth, I alone am the most fun at a party."
  },
  higuruma: {
    name: "Hiromi Higuruma",
    title: "The calculated one",
    description: "You think before you act, which is rare and valuable. A little intense, yes — but only because you care about getting things right. Your friends know you've always done your research.",
    quote: "The verdict is clear. You were right all along."
  },
  toji: {
    name: "Toji Fushiguro",
    title: "The silent ride-or-die",
    description: "You don't say a lot. You don't need to. But everyone in your orbit knows — if things ever actually go wrong, you're the one person they want in their corner. Quietly unstoppable.",
    quote: "Didn't say I'd be here. Just am."
  }
};


// ============================================================
// CONNOR LETTER — for the Letter page (/letter)
// Set unlocked: true when you're ready for her to read it.
// Then write your actual letter in the content field.
// ============================================================
export const connorLetter = {
  unlocked: false,  // Sattvik: set to true when ready. The letter appears on /letter page.
  subject: "MEMORY FILE: SHAM_001 — ACCESS GRANTED",
  from: "Sattvik",
  content: `
    PASTE YOUR LETTER TO SHAM HERE.
    
    This will render inside a Detroit: Become Human styled interface.
    Write it however you want — casual, emotional, funny, all three.
    It will appear as if she's accessing a memory file.
    
    The button to reach this page is hidden at the bottom of the Stats page.
    She has to find it.
  `
};


// ============================================================
// HONORARY MENTIONS
// ============================================================
// HOW TO ADD PHOTOS:
//   Name them: h{collection}p{num}.jpg
//   h1 = Drinking chronicles, h2 = Gym arc, h3 = Random funny, h4 = Game sessions
//   e.g. h1p1.jpg, h1p2.jpg, h1p3.jpg for drinking chronicles
//   Drop them in: src/assets/honorary/   — auto-detected, no imports needed.
//
// HOW TO ADD VIDEOS (still manual — just one line per video):
//   In the items[] array below, add:
//   { type: "video", src: "https://www.youtube.com/watch?v=VIDEO_ID", caption: "...", note: null }
// ============================================================

const _honoraryImgs = import.meta.glob(
  ['../assets/honorary/h*.jpg','../assets/honorary/h*.jpeg','../assets/honorary/h*.png','../assets/honorary/h*.webp'],
  { eager: true }
);
function getHonoraryPhotos(collectionNum) {
  const prefix = `h${collectionNum}p`;
  return Object.entries(_honoraryImgs)
    .filter(([p]) => p.split('/').pop().startsWith(prefix))
    .sort(([a],[b]) => parseInt(a.match(/p(\d+)/)?.[1]??0) - parseInt(b.match(/p(\d+)/)?.[1]??0))
    .map(([,m]) => ({ type: 'photo', src: m.default }));
}


// ============================================================
// SEASONS — the main content. Each season has episodes.
// Season IDs must not be changed — they are used in routes.
// Episode IDs must not be changed — used to link from timeline.
// ============================================================
export const seasons = [
  // ============================================================
  // SEASON 0 — ORIGIN STORY
  // ============================================================
  {
    id: "season-0",
    number: 0,
    title: "Origin story",
    subtitle: "How it started",
    period: "2023",
    hostCharacter: {
      name: "Nanami Kento",
      image: getHostImage(0), // Paste a Nanami character image here
      quote: "Some things are meant to happen. This was one of them.",
      anime: "Jujutsu Kaisen",
    },
    description:
      "Before the chaos, before the cat cafes and the almost-accidents and the lost glasses in the sea — there was just a wrong number, a good voice, and a girl Sattvik kept running away from.",
    accentColor: "#5AADE2",
    episodes: [
      {
        id: "ep-s0-e1",
        number: 1,
        title: "Istg if u had blocked me 💀",
        date: "2023",
        description:
          "Heh sup my nugga... Soo yk how u were gonna block ts sweet guy?? The audacity tsk tsk just think u would've missed out on such a fineasss twin my shadow \n(Yea i mean it the other way thanks for not doin it gng u a riyal one love you dumbasss)",
        insiderNote: "technically the counsellor is the reason for all of this",
        thumbnail: getThumbnail(0, 1),
        video: null,
        photos: getPhotos(0, 1),
        localVideos: getLocalVideos(0, 1),
      },
      {
        id: "ep-s0-e2",
        number: 2,
        title: "Gossiping abt me with pri",
        date: "2023",
        description:
          "I do remember how u used to forward my liked reels to her and go like see what ts nigga liked 😭\nTho achha h cuz of ts u knew we'll get along",
        insiderNote: "you were so patient. I was a menace.",
        thumbnail: getThumbnail(0, 2),
        video: null,
        photos: getPhotos(0, 2),
        localVideos: getLocalVideos(0, 2),
      },
      {
        id: "ep-s0-e3",
        number: 3,
        title: "She tried talking. He ran.",
        date: "2023",
        description:
          "Heh so welll ts lil guy was scared at first but eventually gave up... Bro legit caught me specially vo lab wale din hehe\nAnd I just outta the blue commented that ur dimples r fine af 😭😭\nWell good job there thanks for catching me gng",
        insiderNote: "this is where it was sealed",
        thumbnail: getThumbnail(0, 3),
        video: null,
        photos: getPhotos(0, 3),
        localVideos: getLocalVideos(0, 3),
      },
      {
        id: "ep-s0-e4",
        number: 4,
        title: "Horimiya recommendation",
        date: "2023",
        description:
          "Then how I found ya on that tomodachi group and went like aint no way she watches anime too??\nI was soo happy to find some common topic to talk on and just went on and on and even recommended u one hehe",
        insiderNote: "this is where it was sealed",
        thumbnail: getThumbnail(0, 4),
        video: null,
        photos: getPhotos(0, 4),
        localVideos: getLocalVideos(0, 4),
      },
      {
        id: "ep-s0-e5",
        number: 5,
        title: "Ur singing in inauguration",
        date: "2023 — College Induction",
        description:
          "Truth be told I didn't realise first that it was u just went like wow she sings fine af ekdam end m I realised ki yr dekhi dekhi lg rhii... Achhaa hn isi se to baat kiya tha m 😭\nThen texted u complimenting... Well yea aavaj to pyara h tumhara",
        insiderNote: "I meant it",
        thumbnail: getThumbnail(0, 5),
        video: null,
        photos: getPhotos(0, 5),
        localVideos: getLocalVideos(0, 5),
      },
      {
        id: "ep-s0-e6",
        number: 6,
        title: "Broski fell ill Sattvik the saviour",
        date: "2023",
        description:
          "Jk... But yea I was genuinely concerned kahi to dekhe the sayad story ya status m ki ohh 💀\nThen shared ya notes and everything ki cover karti rahna couldn't have my friend lacking behind yk... Atleast u gotta be top somewhere\nTho sahil couldn't read shit 😭\nNot that I blame him ofc",
        insiderNote:
          "you never made a fuss about this and that's exactly why it mattered",
        thumbnail: getThumbnail(0, 6),
        video: null,
        photos: getPhotos(0, 6),
        localVideos: getLocalVideos(0, 6),
      },
      {
        id: "ep-s0-e7",
        number: 7,
        title: "Stoopied ahh course guy",
        date: "2023",
        description:
          "That guy wass soooo persistent ong... Itna baar mana kiye but maan hi nhi rha then tumko call kr rha ki humko manalo like what??😭 When I heard abt ts I was sooo mad call krke sunaye the unko achha khasa ki mujhse mtlb h mujhe course bechna h mujhse baat karo why u bothering others it was soo wild ong 😭",
        insiderNote:
          "sahil really could not figure out what was happening and neither could we",
        thumbnail: getThumbnail(0, 7),
        video: null,
        photos: getPhotos(0, 7),
        localVideos: getLocalVideos(0, 7),
      },
      {
        id: "ep-s0-e8",
        number: 8,
        title: "Found my shadow",
        date: "2023",
        description:
          "Jese jese we kept talking I realised we r sooo alike legit started calling u my shadow lmao 😭\nTho all those late night talks were fun af shared soo much to each other abt ourselves and we had barely met 😭",
        insiderNote: "you were so patient. I was a menace.",
        thumbnail: getThumbnail(0, 8),
        video: null,
        photos: getPhotos(0, 8),
        localVideos: getLocalVideos(0, 8),
      },
    ],
  },

  // ============================================================
  // SEASON 1 — FIRST TIMES
  // Order fixed: chronological — 1VX (Jan) → AnimeCon (Feb) → Cat cafe (Feb) → Ethnic (June) → Bday@Sattvik (June) → Secret
  // ============================================================
  {
    id: "season-1",
    number: 1,
    title: "First times",
    subtitle: "Where it got real",
    period: "Jan 2024 – Jun 2024",
    hostCharacter: {
      name: "Satoru Gojo",
      image: getHostImage(1),
      quote: "From here on, things get interesting. You're welcome.",
      anime: "Jujutsu Kaisen",
    },
    description:
      "The era of firsts. First outing, first cat cafe, first chaotic memories. This is where the friendship stopped being potential and started being a whole thing.",
    accentColor: "#7BC8F6",
    episodes: [
      {
        id: "ep-s1-e4",
        number: 1,
        title: "1VX",
        date: "January 2024",
        description:
          "Heh ts was soo fun too remember how u kept molesting me in ps5?😭\nWith ur weird combos? Hahahaa it was soo nice playing pool together too and teaching ur dumbasss heh\n(Also let's not talk abt the part where I came super late and u guys were mat at me had u guys waiting parking m itna der 😭\")",
        insiderNote: "this was when we realised we could actually hang",
        thumbnail: getThumbnail(1, 1),
        video: null,
        photos: getPhotos(1, 1),
        localVideos: getLocalVideos(1, 1),
      },
      {
        id: "ep-s1-e1",
        number: 2,
        title: "AnimeCon together",
        date: "Feb 2024",
        description:
          "I always wanted to attend some anime event hamesha se hi finally I met someone who was interested too and get to experience ts... Ksm se I can't tell how happy I was 😭\nAll 3 of us went had fun clicked mast mast pics it was first outing aisa apan log ka sath m and ong it was soo fun",
        insiderNote:
          "first time we actually went somewhere together and it was this. extremely on brand.",
        thumbnail: getThumbnail(1, 2),
        video: null,
        photos: getPhotos(1, 2),
        localVideos: getLocalVideos(1, 2),
      },
      {
        id: "ep-s1-e2",
        number: 3,
        title: "Cat cafe, finally",
        date: "Feb 2024",
        description:
          "Finallyy went to it 😭\nKitne time se man tha tumko but ja hi nhi pa rhi thi Riya to the rescue hehee... Tho broski is traumatized now but I remember ur pics... The smile broski had??😭😭 Bhaii sahab like she met her love",
        insiderNote: "your face in this place should be studied by scientists",
        thumbnail: getThumbnail(1, 3),
        video: null,
        photos: getPhotos(1, 3),
        localVideos: getLocalVideos(1, 3),
      },
      {
        id: "ep-s1-e5",
        number: 4,
        title: "Ethnic day+cultura",
        date: "June 2024",
        description:
          "Lmao I remember how u came late went to parlour for saree etc 😭 but wtv aa gye the time se finally and it was super fun got soo many fyn clicks us din same with cultura would've been a disaster if not for u... Also our first Polaroid together hehe",
        insiderNote: "every college has one day like this. this was ours.",
        thumbnail: getThumbnail(1, 4),
        video: null,
        photos: getPhotos(1, 4),
        localVideos: getLocalVideos(1, 4),
      },
      {
        id: "ep-s1-e3",
        number: 5,
        title: "Bday at Sattvik's — while he was ill",
        date: "10 June 2024",
        description:
          "Well yk how cooked I got us time 😭 bhai u guys r sooo nice people ksm se even my bhabhi said so ki bimar the so she came to ur place to celebrate?? Bhai It's soo rare finding such good folks 😭\nThanks twin🫂",
        insiderNote: "you didn't have to. you did anyway. I remember.",
        thumbnail: getThumbnail(1, 5),
        video: null,
        photos: getPhotos(1, 5),
        localVideos: getLocalVideos(1, 5),
      },
      {
        id: "ep-s1-e6",
        number: 6,
        title: "🔒 Season 1 Secret",
        date: "2024",
        description:
          "This episode is locked. Answer the Season 1 quiz to unlock it.",
        insiderNote: null,
        thumbnail: null,
        video: null,
        locked: true,
        quizSeason: 1,
        secretTitle: "The vault of firsts",
        secretDescription:
          "Hehee broskii first time drinkkk 😭😭\nJust look at u hahahaaa",
        secretInsiderNote:
          "you called me after the vc and said you felt weird when i cut it. i didn't say anything but i kept thinking about that.",
        photos: getPhotos(1, 6),
        localVideos: getLocalVideos(1, 6),
      },
    ],
  },

  // ============================================================
  // SEASON 2 — THE MAIN ARC (The Golden Era)
  // Episodes renumbered: e1=Shifting PG, e2=Yulu, e3=Arcade, e4=Trampoline
  // ============================================================
  {
    id: "season-2",
    number: 2,
    title: "The main arc",
    subtitle: "The golden era",
    period: "Jul 2024 – Jun 2025",
    hostCharacter: {
      name: "Hiromi Higuruma",
      image: getHostImage(2),
      quote: "Every case has its turning point. This season had several.",
      anime: "Jujutsu Kaisen",
    },
    description:
      "The longest, densest, most chaotic season. PG rescues, trampoline parks, lost phones, go-karting, nightouts, ISKCON, marathons, and the bday at 11:11 that ended the arc perfectly. This was the golden era.",
    accentColor: "#5AADE2",
    episodes: [
      {
        id: "ep-s2-e1",
        number: 1,
        title: "Bye bye hostel",
        date: "July 2024",
        description:
          "Heh finally aazadi... And ain't no way ur dumbass thought to shift it whole via cab??😭 Tsk tsk\nTho maza aaya tha minitruck ke piche ghumne m hehe and also how u guys sneaked me in",
        insiderNote: "freedom has many forms. this was one of them.",
        thumbnail: getThumbnail(2, 1),
        video: null,
        photos: getPhotos(2, 1),
        localVideos: getLocalVideos(2, 1),
      },
      {
        id: "ep-s2-e2",
        number: 2,
        title: "Yulu",
        date: "July 2024",
        description:
          "It was soo fun ong kabhi to vapas krte h sab chalke... Also I remember how u almost hit that biker 😭 that nigga was soo scared lol",
        insiderNote:
          "I was scared. I was also trying not to laugh. It was both.",
        thumbnail: getThumbnail(2, 2),
        video: null,
        clips: [{ title: "The ride", src: "PASTE_YOUTUBE_LINK" }],
        photos: getPhotos(2, 2),
        localVideos: getLocalVideos(2, 2),
      },
      {
        id: "ep-s2-e3",
        number: 3,
        title: "Bday treat",
        date: "July 2024",
        description:
          "Ur arcade bday treat... Playing laser together was soo fun... And ain't no way u won too 💀\nEven went church street uske baad but lmao bowling kiye hi nhi 😭 tho it'll come later heh",
        insiderNote: "happy birthday, again, officially",
        thumbnail: getThumbnail(2, 3),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(2, 3),
        localVideos: getLocalVideos(2, 3),
      },
      {
        id: "ep-s2-e4",
        number: 4,
        title: "My bday treat",
        date: "September 2024",
        description:
          "Ksm se we were on role us time kya ghume h bhaii poora saal... Trampoline was soo fun (and traumatic yk why 😭) hopefully sham to the rescue yayyy varna mera bday ptsd deta xd",
        insiderNote: "the phone saga will be told to our grandchildren",
        thumbnail: getThumbnail(2, 4),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(2, 4),
        localVideos: getLocalVideos(2, 4),
      },
      {
        id: "ep-s2-e6",
        number: 5,
        title: "Riya's bday — go-karting + paintball",
        date: "September 2024",
        description:
          "Fineasss day ong... Kitna sara activities kiye the tho our dumbasses didn't know ki blr brewing prebook krna hota h 😭 fir nikalke desi masala hi chale gye yippieee... Treat is treat",
        insiderNote: "Riya deserved the whole event and she got it",
        thumbnail: getThumbnail(2, 5),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(2, 5),
        localVideos: getLocalVideos(2, 5),
      },
      {
        id: "ep-s2-e7",
        number: 6,
        title: "Board games",
        date: "September 2024",
        description:
          "One of my favourite places we all went together... Bhaii kya maza aata tha ksm se and also all those lil truth and dares",
        insiderNote:
          "someone cheated. I have evidence. It's in the classified file.",
        thumbnail: getThumbnail(2, 6),
        video: null,
        photos: getPhotos(2, 6),
        localVideos: getLocalVideos(2, 6),
      },
      {
        id: "ep-s2-e8",
        number: 7,
        title: "Essotto hehe",
        date: "September 2024",
        description:
          "The struggle was riyal tho we managed... Random plan 9 ka curfew free entry dress for swimming and what not 😭\nAlso our crying heart to heart sessions in the end 😭",
        insiderNote: "this one stays in the memory forever",
        thumbnail: getThumbnail(2, 7),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(2, 7),
        localVideos: getLocalVideos(2, 7),
      },
      {
        id: "ep-s2-e9",
        number: 8,
        title: "Lalbagh",
        date: "September 2024",
        description:
          "Bhaii one of the best day I ever lived... Went to board games fir lalbagh whole lil cute outing walking together sooo many nice pics and then food street... Kya hi mast din tha",
        insiderNote: "peak bengaluru park energy",
        thumbnail: getThumbnail(2, 8),
        video: null,
        photos: getPhotos(2, 8),
        localVideos: getLocalVideos(2, 8),
      },
      {
        id: "ep-s2-e10",
        number: 9,
        title: "Garba night",
        date: "October 2024",
        description:
          "Heh I see what u did there with riya huhh\n#allegations_r_riyal",
        insiderNote: "the outfits were immaculate",
        thumbnail: getThumbnail(2, 9),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(2, 9),
        localVideos: getLocalVideos(2, 9),
      },
      {
        id: "ep-s2-e11",
        number: 10,
        title: "Diwali",
        date: "November 2024",
        description:
          "It sucked that riya couldn't join us 😭 it's good we celebrated b4 tooo... So many nice pics us din ka hehe",
        insiderNote: "diwali hits different with good people",
        thumbnail: getThumbnail(2, 10),
        video: null,
        photos: getPhotos(2, 10),
        localVideos: getLocalVideos(2, 10),
      },
      {
        id: "ep-s2-e12",
        number: 11,
        title: "ISKCON visit",
        date: "November 2024",
        description:
          "Kaha bgl ke mandir jane wale the and ghum gham ke iskcon pahuch gye 😭 tho nice experience hehe",
        insiderNote: "this one was different and you know it",
        thumbnail: getThumbnail(2, 11),
        video: null,
        photos: getPhotos(2, 11),
        localVideos: getLocalVideos(2, 11),
      },
      {
        id: "ep-s2-e13",
        number: 12,
        title: "Cubbon Park picnic",
        date: "December 2024",
        description:
          "Our cute lil picnic and the cute bouquet... Pahle we couldn't do cuz of that scr shyt 😭 I was sooo sad tb hehe tho it lead to smthg gd so ain't complaining iykyk",
        insiderNote:
          "bengaluru winter is 24 degrees and it still felt like a picnic season",
        thumbnail: getThumbnail(2, 12),
        video: null,
        photos: getPhotos(2, 12),
        localVideos: getLocalVideos(2, 12),
      },
      {
        id: "ep-s2-e14",
        number: 13,
        title: "Japan Habba",
        date: "January 2025",
        description:
          "Thanks for coming along u guys 😭... Ik it was a struggle but it really meant a lot... And ummm who's ts guy couldn't get his eyes off u huh 🤭",
        insiderNote: "we were in our natural habitat",
        thumbnail: getThumbnail(2, 13),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(2, 13),
        localVideos: getLocalVideos(2, 13),
      },
      {
        id: "ep-s2-e15",
        number: 14,
        title: "Zomaland",
        date: "March 2025",
        description:
          "Went for sunidhi came with memoriess 😭\nAnd also u met ur love kuch time baad hehe it all worked out",
        insiderNote: "we said we'd pace ourselves. we did not.",
        thumbnail: getThumbnail(2, 14),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(2, 14),
        localVideos: getLocalVideos(2, 14),
      },
      {
        id: "ep-s2-e16",
        number: 15,
        title: "Marathon",
        date: "March 2025",
        description:
          "Riya wasn't there but she was (bc this fuckass editing 💀) 😭",
        insiderNote: "the showing up is what counts",
        thumbnail: getThumbnail(2, 15),
        video: null,
        clips: [{ title: "Marathon day", src: "PASTE_YOUTUBE_LINK" }],
        photos: getPhotos(2, 15),
        localVideos: getLocalVideos(2, 15),
      },
      {
        id: "ep-s2-e17",
        number: 16,
        title: "Shinchan movie + hangout",
        date: "May 2025",
        description:
          "Shinchan movie was good but the after stuff?? The whole maze thing and the games and alll 😭 legit had such a fyn time",
        insiderNote: "peak us",
        thumbnail: getThumbnail(2, 16),
        video: null,
        photos: getPhotos(2, 16),
        localVideos: getLocalVideos(2, 16),
      },
      {
        id: "ep-s2-e19",
        number: 17,
        title: "Bday at 11:11 — season finale",
        date: "June 2025",
        description:
          "Lessgoooooo\nBroskis bdayyyyy\nHeh u got ur letter too huh... Ur dumbass spent soo much time in bathroom us din we three barely got any clicks 😭\nTho jitna bhi aaya pyara h hehe\nWill make u compensate for ts aaj just u wait",
        insiderNote: "this is the one. this is the episode.",
        thumbnail: getThumbnail(2, 17),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(2, 17),
        localVideos: getLocalVideos(2, 17),
      },
    ],
  },

  // ============================================================
  // SEASON 3 — STILL GOING
  // E5 restored as Mela+movie (was e6). E6 slot removed.
  // ============================================================
  {
    id: "season-3",
    number: 3,
    title: "Still going",
    subtitle: "The college final arc",
    period: "Jul 2025 – May 2026",
    hostCharacter: {
      name: "Toji Fushiguro",
      image: getHostImage(3),
      quote: "Still here. Still causing problems. That's the arc.",
      anime: "Jujutsu Kaisen",
    },
    description:
      "The arc that's still being written. Boho, golf, hackathons, beach trips, glasses lost to the sea, secret santas, BBQs. It doesn't have an ending yet. That's the point.",
    accentColor: "#2E86C1",
    episodes: [
      {
        id: "ep-s3-e1",
        number: 1,
        title: "Boho outing",
        date: "July 2025",
        description:
          "Another randomass plan we made... Tho heheheee maza to aaya tha iykyk hehehee",
        insiderNote: null,
        thumbnail: getThumbnail(3, 1),
        video: null,
        photos: getPhotos(3, 1),
        localVideos: getLocalVideos(3, 1),
      },
      {
        id: "ep-s3-e2",
        number: 2,
        title: "Got tea",
        date: "July 2025",
        description:
          "Kudos to u folks 😭 kya pyare pyare cafe leke gye ho hamesha also the polaroid thing of ts is just 🤌🏻 and well guacamole too 🥰",
        insiderNote: null,
        thumbnail: getThumbnail(3, 2),
        video: null,
        photos: getPhotos(3, 2),
        localVideos: getLocalVideos(3, 2),
      },
      {
        id: "ep-s3-e3",
        number: 3,
        title: "Riya's bday... Broski SLAYEDD",
        date: "July 2025",
        description:
          "Ong broo kya mast fit tha ye 😭🙏🏻\nBodyy sooo teaa ki even riya would reconsider coffee for a sec like WHATT??? the sassyy pics throughout ong\nAlso the vid we tried soo hard for 😭\nLast m nhi hi upload ki tum pgl aurat 😭 achha aa rha tha bhaiiiii",
        insiderNote: "the look was immaculate. on record.",
        thumbnail: getThumbnail(3, 3),
        video: null,
        photos: getPhotos(3, 3),
        localVideos: getLocalVideos(3, 3),
      },
      {
        id: "ep-s3-e4",
        number: 4,
        title: "Golf",
        date: "August 2025",
        description:
          "Hehee we won... Better luck next time gng\nTho fun place chalte h kbhi vapas",
        insiderNote: null,
        thumbnail: getThumbnail(3, 4),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(3, 4),
        localVideos: getLocalVideos(3, 4),
      },
      {
        id: "ep-s3-e5",
        number: 5,
        title: "Mela and movie",
        date: "October 2025",
        description:
          "After itna hard trouble barish m finally chale hi gye the next din after the movie hehe 😝\nTho movie k liye bhi late ho gye the baat alag 💀",
        insiderNote: null,
        thumbnail: getThumbnail(3, 5),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(3, 5),
        localVideos: getLocalVideos(3, 5),
      },
      {
        id: "ep-s3-e7",
        number: 6,
        title: "Soft skills presentation",
        date: "November 2025",
        description:
          "Well somehow ho gya 💀 shekhar did come and it all worked out... Somehow. Ong I was sooo scared",
        insiderNote: "we looked confident. we were not confident.",
        thumbnail: getThumbnail(3, 6),
        video: null,
        photos: getPhotos(3, 6),
        localVideos: getLocalVideos(3, 6),
      },
      {
        id: "ep-s3-e8",
        number: 7,
        title: "Blr Tech Summit",
        date: "November 2025",
        description:
          "Hehehee the deal is done (it was u owing me unlimited drinks aaj lessgoooooo) ps cute pic hehehee look at ya smiling heheee pretty",
        insiderNote: "we belonged there",
        thumbnail: getThumbnail(3, 7),
        video: null,
        photos: getPhotos(3, 7),
        localVideos: getLocalVideos(3, 7),
      },
      {
        id: "ep-s3-e9",
        number: 8,
        title: "Chennaiiiii (home to our mallu queen)",
        date: "December 2025",
        description:
          "Hehee pics to achha nikale the tum dono ka 😭\nIt was all soo rushed we didn't get to click many... Hopefully next trip 😝🙏🏻\nAnd sorry for the glasses gng 😭",
        insiderNote: "the glasses are gone. the sea has them now. I'm sorry.",
        thumbnail: getThumbnail(3, 8),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(3, 8),
        localVideos: getLocalVideos(3, 8),
      },
      {
        id: "ep-s3-e10",
        number: 9,
        title: "Secret Santa",
        date: "December 2025",
        description:
          "Heh I did gotchu there... Ts vid is soo cute ong 😭\nYe bhi itna randomly plan hua tha and worked out well anyways hehee",
        insiderNote: null,
        thumbnail: getThumbnail(3, 9),
        video: null,
        photos: getPhotos(3, 9),
        localVideos: getLocalVideos(3, 9),
      },
      {
        id: "ep-s3-e11",
        number: 10,
        title: "Jamming goat",
        date: "December 2025",
        description:
          "More shots of vodka pleaseee 😝😝😝😝\nWe SHOULD go udhar vapas... Kya goated jagah h ong like jamming\nGOAT frfrr... And the pics came out slayy tooo 😝",
        insiderNote: null,
        thumbnail: getThumbnail(3, 10),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(3, 10),
        localVideos: getLocalVideos(3, 10),
      },
      {
        id: "ep-s3-e12",
        number: 11,
        title: "Sattvik's bday treat — finally",
        date: "February 2026",
        description:
          "Hehe broo ts fit🤌🏻\nIfstg broskii properrr baddie vibes no cap likeee damnnn girll u slayyyy",
        insiderNote: "took long enough but it was worth it",
        thumbnail: getThumbnail(3, 11),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(3, 11),
        localVideos: getLocalVideos(3, 11),
      },
      {
        id: "ep-s3-e13",
        number: 12,
        title: "Holi",
        date: "March 2026",
        description:
          "Hehe lessgoooooo (sorry gng can't help with the dumbasss poses)",
        insiderNote: null,
        thumbnail: getThumbnail(3, 12),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(3, 12),
        localVideos: getLocalVideos(3, 12),
      },
      {
        id: "ep-s3-e14",
        number: 13,
        title: "Black Pearl BBQ",
        date: "April 2026",
        description:
          "Hehee bbq to thik hai but the playlist 😭🤌🏻\nAnd the fact ki actually asked them to send broo seriously unhe pass kr dena chahiye ss m direct",
        insiderNote: null,
        thumbnail: getThumbnail(3, 13),
        video: "PASTE_YOUTUBE_LINK",
        photos: getPhotos(3, 13),
        localVideos: getLocalVideos(3, 13),
      },
      {
        id: "ep-s3-e15",
        number: 14,
        title: "VTU endsems — season finale",
        date: "May 2026",
        description:
          "This season is finally coming to an end and yess we all r stepping on to the final season of our college now tho it won't be the final of us gng... We in it for lyf mental asylum for the W",
        insiderNote: "we made it out. both of us. that's the whole point.",
        thumbnail: getThumbnail(3, 14),
        video: null,
        photos: getPhotos(3, 14),
      },
    ],
  },

  // ============================================================
  // SEASON 4 — FOREVER
  // Starts June 10 2026 — her birthday.
  // The chapter after college. The one with no end date.
  // ============================================================
  {
    id: "season-4",
    number: 4,
    title: "Forever",
    subtitle: "From here, family for life",
    period: "June 10, 2026 – ???",
    hostCharacter: {
      name: "Sukuna",
      image: "PASTE_CHARACTER_IMAGE_LINK",
      quote: "I'll keep moving forward. As long as I'm alive.",
      anime: "Jujutsu Kaisen",
    },
    description:
      "College is over. The uniforms are done. The endsems are behind us. This is the season with no syllabus, no deadlines, no structure — just us, wherever life takes us next. It started on her birthday. It doesn't have an ending. That's the whole point.",
    accentColor: "#4A90D9",
    episodes: [
      {
        id: "ep-s4-e1",
        number: 1,
        title: "Season premiere — her birthday 🎂",
        date: "June 10, 2026",
        description:
          "Happyy bdayy gng have a sneak peek of me and riya doin our best to create wtv it is we created for u hehee... reviews give baad m enjoy for now",
        insiderNote:
          "from here it's just us and whatever we decide to do with it.",
        thumbnail: getThumbnail(4, 1),
        video: null,
        photos: getPhotos(4, 1),
        localVideos: getLocalVideos(4, 1),
      },
      // Add new episodes here as life happens.
      // Copy-paste a template from SATTVIK_GUIDE.md and drop it in.
    ],
  },
];


// ============================================================
// "HOW WELL DO YOU KNOW SATTVIK?" QUIZ
// Edit questions, options, and correct answers here.
// correctIndex = 0-based index of the right answer in options[]
// giftThreshold = score % needed to unlock the gift message
// ============================================================
export const knowMeQuizData = {
  title: "How Well Do You Know Sattvik?",
  subtitle: "No pressure. But yes this is absolutely being judged.",
  giftThreshold: 80, // score % needed to unlock the gift
  giftMessage: "PASTE_GIFT_MESSAGE_HERE", // What she sees when she passes — put your gift reveal here
  giftEmoji: "🥂",
  questions: [
    {
      question: "Which is the best daru?",
      options: ["Absolut", "Smirnoff", "Bacardi", "Old Monk"],
      correctIndex: 1,
      funFact: "Smirnoff. Standards have been set."
    },
    {
      question: "what is the one thing i hate most",
      options: ["being ignored", "being lied to", "slow walkers", "boring conversations"],
      correctIndex: 1,
      funFact: "Being lied to. Immediate red flag territory."
    },
    {
      question: "what is the one thing i love most",
      options: ["my autistic family", "sleep", "music", "peace and quiet"],
      correctIndex: 0,
      funFact: "The autistic family stays undefeated."
    },
    {
      question: "how tall am I",
      options: ["shorter than lil sham", "same height as lil sham", "taller than lil sham", "depends on the shoes"],
      correctIndex: 2,
      funFact: "Taller than lil sham. This is sacred lore now."
    },
    {
      question: "which is my comfort character",
      options: ["gojo", "luffy", "nanami", "chopper"],
      correctIndex: 1,
      funFact: "Luffy. Comfort king."
    },
    {
      question: "what is my fav song",
      options: ["lag ja gale", "tum se hi", "kahin to hogi woh", "heeriye"],
      correctIndex: 0,
      funFact: "Lag ja gale. Certified forever favorite."
    },
    {
      question: "what is my fav colour",
      options: ["baby blue", "black", "pastel pink", "lavender"],
      correctIndex: 2,
      funFact: "Paster pink. Pink supremacy, typo included."
    },
    {
      question: "what are my fav flowers",
      options: ["sunflowers", "roses", "tbh anything pink(preferably cherry blossoms)", "lilies"],
      correctIndex: 2,
      funFact: "Anything pink, preferably cherry blossoms. Very on brand."
    },
    {
      question: "who is that person with whom i talk the most diabolical shit",
      options: ["no one i am a good boy", "lil sham", "pri", "myself in the mirror"],
      correctIndex: 1,
      funFact: "Lil sham. The diabolical hotline."
    },
    {
      question: "do i love you my nigga?(platonically ofc)",
      options: ["only on alternate weekdays", "no", "ofc i do", "depends on your behavior"],
      correctIndex: 2,
      funFact: "Ofc she does. This one should have been free marks."
    },
  ],
  // Sattvik: add/edit questions above. correctIndex is 0-based.
};


// ============================================================
// DO NOT TOUCH — images auto-detected from src/assets/donottouch/dnt1.jpg, dnt2.jpg etc.
// ============================================================
export const doNotTouchConfig = {
  message: "I told you not to touch it.", // overridden per-touch in component
};

// ============================================================
// SECRET VAULT SECTIONS — sv1p1.jpg, sv2p1.jpg etc.
// Each section has an id (1-4), a title, and auto-detected photos/videos.
// Photos: src/assets/vault/sv1p1.jpg, sv1p2.jpg etc.
// Videos: src/assets/vault/sv1v1.mp4 etc.
// ============================================================
export const vaultSections = [
  {
    id: 1,
    title: "Drunk us",
    emoji: "🍻",
    description: "The classified archives. Evidence that will never be used against us in court.",
  },
  {
    id: 2,
    title: "Diabolical Sham",
    emoji: "😈",
    description: "The unhinged era. Documented for posterity and mild blackmail.",
  },
  {
    id: 3,
    title: "Sham-chan",
    emoji: "🌸",
    description: "The soft era. When the tsundere energy briefly gave way to actual adorable.",
  },
  {
    id: 4,
    title: "Sham-san",
    emoji: "🎌",
    description: "The formal era. When she put on her most sophisticated face. It lasted minutes.",
  },
];

// ============================================================
// SECRET VAULT — passcode is 106
// Add the YouTube video URL that plays after she says yes
// ============================================================
export const vaultConfig = {
  video: "PASTE_YOUTUBE_LINK", // The surprise video that plays after she unlocks and says yes
};


// ============================================================
// RIYA — SEASON 0 PHOTOS
// Name photos: rs0e1p0.jpg (thumbnail), rs0e1p1.jpg, rs0e1p2.jpg...
// Drop them in: src/assets/episodes/
// They are auto-detected — no imports needed.
// ============================================================
export function getRS0Photos(ep) {
  const prefix = `rs0e${ep}p`;
  return Object.entries(_allPhotos)
    .filter(([path]) => {
      const filename = path.split('/').pop();
      if (!filename.startsWith(prefix)) return false;
      const num = parseInt(filename.match(/p(\d+)\./)?.[1] ?? '99');
      return num >= 1;
    })
    .sort(([a], [b]) => {
      const numA = parseInt(a.match(/p(\d+)\./)?.[1] ?? '0');
      const numB = parseInt(b.match(/p(\d+)\./)?.[1] ?? '0');
      return numA - numB;
    })
    .map(([, mod]) => mod.default);
}

export function getRS0Thumbnail(ep) {
  const prefix = `rs0e${ep}p`;
  const entries = Object.entries(_allPhotos).filter(([path]) =>
    path.split('/').pop().startsWith(prefix)
  );
  const p0 = entries.find(([p]) => /p0[^0-9]/.test(p.split('/').pop()));
  if (p0) return p0[1].default;
  const p1 = entries.find(([p]) => /p1[^0-9]/.test(p.split('/').pop()));
  if (p1) return p1[1].default;
  return null;
}

// ============================================================
// RIYA — SEASON 0 (her custom origin story)
// Season 1, 2, 3, 4 are the SAME as Sattvik's — shared memories.
// ============================================================
const riyaSeason0 = {
  id: "riya-season-0",
  number: 0,
  title: "Origin Story",
  subtitle: "The Riya Edition",
  period: "2023 — Now",
  hostCharacter: {
    name: "Nanami Kento",
    image: getHostImage(0),
    quote:
      "The beginning of something real always looks ordinary from the outside.",
    anime: "Jujutsu Kaisen",
  },
  description:
    "Before the go-karts, before the paintball, before the lost phone at the trampoline park — there was just a group chat, a girl who became the glue, and a family that snuck up on everyone. This is Riya's origin story.",
  accentColor: "#A0724A",
  episodes: [
    {
      id: "riya-s0-e1",
      number: 1,
      title: "Met mumma",
      date: "2023",
      description:
        "Remember the day of hostel registration when my mumma first met you?The moment she found out that we were from the same city and in the same section, she said, \"Please take care of my daughter. She's an introvert and takes time to open up.\"\nWhat started as mumma's request soon became a beautiful friendship. Thank you for being the person who made a new place feel like home.",
      insiderNote: "when you meet the mum, you're in. permanently.",
      thumbnail: getRS0Thumbnail(1),
      video: null,
      photos: getRS0Photos(1),
      localVideos: [],
    },
    {
      id: "riya-s0-e2",
      number: 2,
      title: "Scared you",
      date: "2023",
      description:
        'You finally found me in the classroom and decided to say hi.\n"Hi, I\'m Shambhavi!You are Riya right?I met your mom:)\nMeanwhile me: "Hello…" walks away😭\nBut trust me, I\'m just an introvert, not a rude person bhaiiiii. I was probably overthinking every possible response in my head while trying to act normal.',
      insiderNote: "the look on your face. the absolute look on your face.",
      thumbnail: getRS0Thumbnail(2),
      video: null,
      photos: getRS0Photos(2),
      localVideos: [],
    },
    {
      id: "riya-s0-e3",
      number: 3,
      title: "Rejected number",
      date: "2023",
      description:
        "Ngl, I genuinely thought you had quit college after one week. 😭\nThen I found out about your health and realized there was actually a reason behind your disappearance.\nI wanted to check up on you and ask how you were doing, but Shalini had other plans. 😭\nWell… you know the story.",
      insiderNote: "the audacity of some people. iconic response though.",
      thumbnail: getRS0Thumbnail(3),
      video: null,
      photos: getRS0Photos(3),
      localVideos: [],
    },
    {
      id: "riya-s0-e4",
      number: 4,
      title: "Comeback",
      date: "2023",
      description:
        'So when you finally came back,I had completely forgotten what you looked like. 😭\nI am genuinely terrible at remembering faces, bhai.\nOne day I saw you in hostel and thought, "Wait… she looks familiar."\nThen later in class, it finally clicked\n"Ohhh, so she\'s Shambhavi!" 😭\nA little while later, I heard you asking people for help with the lab. When everyone kept giving excuses and you never asked me, my overthinking brain immediately jumped to one conclusion:\n"Maybe she doesn\'t like me." 🤡\n(Yes yes, I know now that you were just as scared and awkward as I was.)\nSo instead of sitting there and creating more imaginary scenarios in my head, I finally gathered some courage and stepped up myself.\nAnd honestly, that\'s probably one of the best decisions I made in college. 🤍',
      insiderNote: "you always come back. that's just your thing.",
      thumbnail: getRS0Thumbnail(4),
      video: null,
      photos: getRS0Photos(4),
      localVideos: [],
    },
    {
      id: "riya-s0-e5",
      number: 5,
      title: "Gossip sess about sattvik",
      date: "2023 — ongoing",
      description:
        "Between writing observations, pretending to understand Arduino, and trying not to mess up the experiment (iykyk 😭), we somehow unlocked the ultimate conversation starter:\n\n✨ Sattvik. ✨\n\nOur mutual friend.\n\nThe second his name came up, both of us went from awkward lab partners to professional gossipers.\nOne topic led to another, then another, and somehow an entire friendship was born in a physics lab.\nThe rest, as they say, is history. 🤍",
      insiderNote:
        "everything said in these sessions is accurate and documented mentally.",
      thumbnail: getRS0Thumbnail(5),
      video: null,
      photos: getRS0Photos(5),
      localVideos: [],
    },
    {
      id: "riya-s0-e6",
      number: 6,
      title: "Vibe matched",
      date: "2023",
      description:
        "The moment it became official — the energy just clicked. Same humour, same chaos, same wavelength. When vibes match, you don't need to explain it. You just know. This was that moment.",
      insiderNote: "when it clicks it clicks. this was that.",
      thumbnail: getRS0Thumbnail(6),
      video: null,
      photos: getRS0Photos(6),
      localVideos: [],
    },
  ],
};

// Riya's full seasons: custom Season 0 + shared Season 1, 2, 3, 4
// This is computed after `seasons` is defined, so it's exported as a getter.
// Usage: import { getRiyaSeasons } from '../data/data'; then getRiyaSeasons()
export function getRiyaSeasons() {
  return [riyaSeason0, ...seasons.filter(s => s.number >= 1)];
}

// Legacy array export (also works — computed at module load time after seasons is defined)
export const riyaSeasons = [riyaSeason0];
// Note: Seasons 1-4 are dynamically appended in Home.jsx via getRiyaSeasons()



// ============================================================
// RIYA — "HOW WELL DO YOU KNOW RIYA?" QUIZ
// Shown on /extras/know-me when Riya's profile is selected
// ============================================================
export const riyaKnowMeQuizData = {
  title: "How Well Do You Actually Know Riya?",
  subtitle: "Be honest. She'll know if you're guessing.",
  giftThreshold: 80,
  giftMessage: "PASTE_RIYA_GIFT_MESSAGE_HERE",
  giftEmoji: "☕",
  questions: [
    {
      question: "Where did we go for our first hangout?",
      options: [
        "Cat Cafe",
        "Library",
        "Art Cafe",
        "Hospital"
      ],
      correctIndex: 2,
      funFact: "Art Cafe. Not cat cafe, not a library — Art Cafe. The beginning of a beautiful tradition of going places."
    },
    {
      question: "How did we start our first conversation?",
      options: [
        "Thanks to cats 🐱",
        "Thanks to BTS 💜",
        "Thanks to coffee ☕",
        "Thanks to Sattvik 😭"
      ],
      correctIndex: 3,
      funFact: "Sattvik. Our mutual menace. Without him this friendship literally wouldn't exist. We owe him one. (Don't tell him that.)"
    },
    {
      question: "Who is more likely to say \"I'm fine\" when they're clearly not fine?",
      options: [
        "Riya",
        "Shambhavi",
        "Both",
        "Depends on the day"
      ],
      correctIndex: 2,
      funFact: "Both. We're both built the same. Neither of us is fine. We both say we're fine. This is just who we are."
    },
    {
      question: "What was the purpose of our highly classified secret mission?",
      options: [
        "Saving the world",
        "Catching attendance",
        "Hostel room booking",
        "Stealing extra sleep"
      ],
      correctIndex: 2,
      funFact: "Hostel room booking. Very high stakes. Very classified. The mission was a success."
    },
    {
      question: "If we're both up late talking, what's the most likely topic?",
      options: [
        "Food",
        "Future plans",
        "Our questionable history with people 💀",
        "Assignments"
      ],
      correctIndex: 2,
      funFact: "Our questionable history with people. The archive is extensive. The receipts are real. The sessions go on."
    },
  ],
};


