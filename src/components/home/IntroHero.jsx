// src/components/home/IntroHero.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Film } from "lucide-react";
import { siteConfig } from "../../data/data";
import { useProfile } from "../../context/ProfileContext";

const _introFiles = import.meta.glob(
  [
    "../../assets/intro/intro.{mp4,webm,mov}",
    "../../assets/intro/*.{mp4,webm,mov}",
  ],
  { eager: true },
);
const LOCAL_VIDEO = Object.values(_introFiles)[0]?.default ?? null;

const _introThumbs = import.meta.glob(
  ["../../assets/intro/thumb.{jpg,jpeg,png,webp}"],
  { eager: true },
);
const LOCAL_THUMB = Object.values(_introThumbs)[0]?.default ?? null;

const _riyaIntroImages = import.meta.glob(
  [
    "../../assets/intro/rintro.{jpg,jpeg,png,webp}",
    "../../assets/intro/rintro-*.*",
  ],
  { eager: true },
);
const RIYA_INTRO_IMAGE = Object.values(_riyaIntroImages)[0]?.default ?? null;

function getYouTubeId(url) {
  if (!url || url.includes("PASTE_")) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

export default function IntroHero() {
  const { profile } = useProfile();
  const [playing, setPlaying] = useState(false);

  if (profile === "riya") {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full mb-12"
      >
        <div className="flex items-center gap-2 mb-4">
          <Film size={16} style={{ color: "var(--color-accent-primary)" }} />
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-accent-primary)" }}
          >
            Before you start
          </span>
        </div>
        <div
          className="relative w-full rounded-2xl overflow-hidden shadow-lg mx-auto"
          style={{
            background: "var(--color-bg-secondary)",
            border: "1.5px solid var(--color-border)",
            aspectRatio: "16/12",
            maxHeight: 900,
            maxWidth: 400,
          }}
        >
          {RIYA_INTRO_IMAGE ? (
            <img
              src={RIYA_INTRO_IMAGE}
              alt="Riya intro"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, var(--color-accent-secondary) 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10 space-y-1">
                <p
                  className="text-lg font-bold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Drop rintro.jpg in src/assets/intro/
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.section>
    );
  }

  const videoId = getYouTubeId(siteConfig.introVideo);
  const youtubeEmbed = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    : null;
  const youtubeThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;
  const hasVideo = youtubeEmbed || LOCAL_VIDEO;
  const thumbnail = LOCAL_THUMB || youtubeThumbnail;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full mb-12"
    >
      <div className="flex items-center gap-2 mb-4">
        <Film size={16} style={{ color: "var(--color-accent-primary)" }} />
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-accent-primary)" }}
        >
          Before you start
        </span>
      </div>

      <div
        className="relative rounded-2xl overflow-hidden shadow-lg mx-auto"
        style={{
          background: "var(--color-bg-secondary)",
          border: "1.5px solid var(--color-border)",
          aspectRatio: "16/12",
          maxHeight: 900,
          maxWidth: 400,
        }}
      >
        {/* YouTube embed */}
        {playing && youtubeEmbed && (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={youtubeEmbed}
            title={siteConfig.introVideoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        {/* Local video */}
        {playing && LOCAL_VIDEO && !youtubeEmbed && (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={LOCAL_VIDEO}
            autoPlay
            controls
          />
        )}

        {/* Poster / play button */}
        {!playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Thumbnail */}
            {thumbnail && (
              <img
                src={thumbnail}
                alt="intro thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.25)" }}
            />
            {hasVideo && (
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setPlaying(true)}
                className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-deep))",
                }}
              >
                <Play size={30} fill="white" className="text-white ml-1" />
              </motion.button>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}
