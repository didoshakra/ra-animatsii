// src/components/VideoGrid.jsx
import VideoCard from "./VideoCard"
import { formatRuntime } from "@/lib/videos"
import { FORMATS } from "@/lib/pages"

export default function VideoGrid({ videos, badge }) {
  return (
    <div id="page-videos" className="mt-8 bg-ink rounded-3xl p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {videos.map((v) => (
          <VideoCard
            key={v.id}
            title={v.displayTitle}
            videoUrl={v.VIDEO_URL}
            posterUrl={v.POSTER_URL}
            badge={badge}
            aspect={v.aspect}
            runtime={formatRuntime(v.durationSeconds)}
            meta={v.meta}
            ctaFormatId={FORMATS.find((f) => f.key === v.format)?.formId ?? null}
            ctaSource={`video:${v.id}`}
            ctaVideoName={v.displayTitle}
          />
        ))}
      </div>
    </div>
  )
}
