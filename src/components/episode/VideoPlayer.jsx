// ============================================================
// src/components/episode/VideoPlayer.jsx
// Renders a single YouTube video embed. Accepts a YouTube URL
// or embed URL and converts to the proper embed format.
// ============================================================

import { getDriveEmbedUrl } from '../../utils/driveHelpers';

function toYouTubeEmbed(src) {
  if (!src || src === 'PASTE_YOUTUBE_LINK') return null;
  // Already an embed URL
  if (src.includes('/embed/')) return src;
  // Standard watch URLs
  const match =
    src.match(/[?&]v=([^&#]+)/) ||
    src.match(/youtu\.be\/([^?&#]+)/) ||
    src.match(/youtube\.com\/embed\/([^?&#]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
  return null;
}

export default function VideoPlayer({ src, title = 'Video' }) {
  const embedUrl = toYouTubeEmbed(src);

  if (!embedUrl) {
    return (
      <div
        className="w-full aspect-video rounded-xl flex items-center justify-center text-sm"
        style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-tertiary)' }}
      >
        Video coming soon — Sattvik is on it 🎬
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md">
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
