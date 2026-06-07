// ============================================================
// src/utils/driveHelpers.js
// Utility functions for Google Drive URL handling.
// Sattvik: you don't need to edit this file.
// ============================================================

/**
 * Extracts the Google Drive folder or file ID from a share URL.
 * Works with both folder and file share links.
 */
export function extractDriveId(url) {
  if (!url || typeof url !== 'string') return null;
  
  // Folder: https://drive.google.com/drive/folders/FOLDER_ID
  const folderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch) return folderMatch[1];
  
  // File: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];
  
  // Direct ID (already extracted)
  if (/^[a-zA-Z0-9_-]{10,}$/.test(url)) return url;
  
  return null;
}

/**
 * Returns an embeddable Drive folder URL (grid view).
 * Use this for episode galleries.
 */
export function getDriveEmbedUrl(folderUrl) {
  if (!folderUrl || typeof folderUrl !== 'string') return null;
  if (folderUrl.startsWith('PASTE_')) return null;
  
  const id = extractDriveId(folderUrl);
  return id ? `https://drive.google.com/embeddedfolderview?id=${id}#grid` : null;
}

/**
 * Returns a direct image URL from a Drive file share link.
 * Use this for thumbnails and individual photos.
 */
export function getDriveImageUrl(fileUrl) {
  if (!fileUrl || typeof fileUrl !== 'string') return null;
  if (fileUrl.startsWith('PASTE_')) return null;
  
  const fileMatch = fileUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return `https://drive.google.com/uc?id=${fileMatch[1]}`;
  
  // Already a direct uc?id= URL
  if (fileUrl.includes('drive.google.com/uc?id=')) return fileUrl;
  
  return fileUrl;
}

/**
 * Extracts a YouTube video ID from any YouTube URL format.
 */
export function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  if (url.startsWith('PASTE_')) return null;
  
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

/**
 * Returns a YouTube embed URL from any YouTube URL.
 */
export function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== 'string') return null;
  if (url.startsWith('PASTE_')) return null;
  
  const id = extractYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

/**
 * Checks if a value is a placeholder (not yet filled in by Sattvik).
 */
export function isPlaceholder(value) {
  if (!value) return true;
  if (typeof value !== 'string') return false;
  return value.startsWith('PASTE_');
}
