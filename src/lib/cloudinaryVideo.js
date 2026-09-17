// src/lib/cloudinaryVideo.js

// Cloudinary generates a JPG thumbnail (first frame) of a video automatically
// when you request the same public ID with a .jpg extension instead of .mp4.
export function getCloudinaryPoster(videoUrl) {
  if (!videoUrl) return ""
  return videoUrl.replace(/\.mp4($|\?)/i, ".jpg$1")
}

// Cloudinary embeds the upload time in the URL as a Unix timestamp version
// segment, e.g. ".../upload/v1789065442/...". We reuse it as uploadDate for
// VideoObject structured data instead of a made-up date.
export function getCloudinaryUploadDate(videoUrl) {
  if (!videoUrl) return null
  const match = videoUrl.match(/\/upload\/v(\d{10})\//)
  if (!match) return null
  const timestampSeconds = parseInt(match[1], 10)
  return new Date(timestampSeconds * 1000).toISOString()
}

// Converts whole seconds into ISO 8601 duration format required by
// schema.org VideoObject (e.g. 75 -> "PT1M15S").
export function secondsToIsoDuration(totalSeconds) {
  if (!totalSeconds || totalSeconds <= 0) return null
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  let result = "PT"
  if (minutes > 0) result += `${minutes}M`
  if (seconds > 0 || minutes === 0) result += `${seconds}S`
  return result
}
