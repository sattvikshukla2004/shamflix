// src/components/home/EpisodeCard.jsx
// Clean card — thumbnail auto from p0/p1, click to open modal.
// No type badges, no classified, no content warnings.

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, PlayCircle, Images, Lock } from 'lucide-react';
import EpisodeModal from '../episode/EpisodeModal';
import SeasonQuizUnlock from '../features/SeasonQuizUnlock';
import { extractYouTubeId } from '../../utils/driveHelpers';

function getEpisodeThumbnailFallback(episode) {
  if (episode.thumbnail) return { kind: 'image', src: episode.thumbnail };

  const youtubeId = extractYouTubeId(episode.video);
  if (youtubeId) {
    return {
      kind: 'image',
      src: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    };
  }

  if (episode.localVideos?.length > 0) {
    return { kind: 'video', src: episode.localVideos[0] };
  }

  return null;
}

function ThumbnailArea({ episode }) {
  // Locked episode — show lock overlay
  if (episode.locked) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, var(--color-bg-secondary), var(--color-border))' }}>
        <div className="flex flex-col items-center gap-2">
          <Lock size={28} style={{ color: 'var(--color-accent-primary)' }} />
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
            Locked
          </span>
        </div>
      </div>
    );
  }
  const mediaThumb = getEpisodeThumbnailFallback(episode);
  const hasYouTube = episode.video && !episode.video.includes('PASTE');
  const hasLocalVideos = episode.localVideos?.length > 0;
  const hasVideo = hasYouTube || hasLocalVideos;
  const hasPhotos = Array.isArray(episode.photos) && episode.photos.length > 0;
  const videoCount = (hasLocalVideos ? episode.localVideos.length : 0);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-bg-secondary flex items-center justify-center">
      {mediaThumb?.kind === 'image' ? (
        <img
          src={mediaThumb.src}
          alt={episode.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : mediaThumb?.kind === 'video' ? (
        <video
          src={mediaThumb.src}
          className="w-full h-full object-cover"
          preload="metadata"
          muted
          playsInline
        />
      ) : (
        <ImageIcon size={28} style={{ color: 'var(--color-border)' }} />
      )}
      {/* Media type indicators */}
      <div className="absolute bottom-2 right-2 flex gap-1">
        {hasVideo && (
          <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
            style={{ background: 'rgba(0,0,0,0.65)' }}>
            <PlayCircle size={10} /> {videoCount > 1 ? `${videoCount} clips` : 'Video'}
          </span>
        )}
        {hasPhotos && (
          <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
            style={{ background: 'rgba(0,0,0,0.65)' }}>
            <Images size={10} /> {episode.photos.length}
          </span>
        )}
      </div>
    </div>
  );
}

export default function EpisodeCard({ episode, allEpisodes }) {
  const [open, setOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const startIndex = allEpisodes?.findIndex(e => e.id === episode.id) ?? 0;

  return (
    <>
      <motion.div
        whileHover={{ y: -3, boxShadow: '0 8px 28px rgba(90,173,226,0.18)' }}
        transition={{ duration: 0.18 }}
        onClick={() => {
          if (episode.locked && !quizPassed) setShowQuiz(true);
          else setOpen(true);
        }}
        className="rounded-xl overflow-hidden flex flex-col cursor-pointer"
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
      >
        <ThumbnailArea episode={episode} />

        <div className="p-3 flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-bold leading-snug line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>
              {episode.title}
            </p>
            {episode.locked ? (
              <span className="flex items-center gap-0.5 text-xs font-bold flex-shrink-0 px-1.5 py-0.5 rounded"
                style={{ color: 'var(--color-accent-primary)', background: 'var(--color-bg-secondary)' }}>
                <Lock size={9} /> Quiz
              </span>
            ) : null}
          </div>
          {episode.date && (
            <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{episode.date}</p>
          )}
        </div>
      </motion.div>

      {open && (
        <EpisodeModal
          episodes={allEpisodes ?? [episode]}
          startIndex={startIndex}
          onClose={() => setOpen(false)}
          unlocked={quizPassed}
        />
      )}
      {showQuiz && episode.locked && (
        <SeasonQuizUnlock
          quizSeason={episode.quizSeason ?? 1}
          onUnlock={() => { setShowQuiz(false); setQuizPassed(true); setOpen(true); }}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </>
  );
}
