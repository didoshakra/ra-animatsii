// src/components/VideoGrid.jsx
import VideoCard from "./VideoCard"
import { formatRuntime } from "@/lib/videos"

export default function VideoGrid({ videos, badge }) {
  return (
    <div className="mt-8 bg-ink rounded-3xl p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {videos.map((v) => (
          <VideoCard
            key={v.id}
            title={v.displayTitle}
            videoUrl={v.VIDEO_URL}
            posterUrl={v.POSTER_URL}
            badge={badge}
            aspectLabel={v.aspect}
            runtime={formatRuntime(v.durationSeconds)}
            meta={v.meta}
          />
        ))}
      </div>
    </div>
  )
}
