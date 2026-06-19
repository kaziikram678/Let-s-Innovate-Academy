import Image from "next/image"
import type { WorkItem } from "@/types"

interface WorkCardProps {
  work: WorkItem
}

export default function WorkCard({ work }: WorkCardProps) {
  return (
    <div className="group bg-[#111111] border border-white/10 hover:border-red-500/30 rounded-2xl overflow-hidden transition-all duration-300">
      <div className={`relative ${work.aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video"} overflow-hidden`}>
        {work.mediaType === "youtube" ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${work.media}?autoplay=1&mute=1&rel=0&modestbranding=1`}
            title={work.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : work.mediaType === "video" ? (
          <video
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={work.media}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
          />
        ) : (
          <Image
            src={work.media}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
      </div>
      <div className="p-5">
        <span className="text-red-400 text-xs font-medium uppercase tracking-wider">
          {work.category}
        </span>
        <h3 className="text-white font-semibold text-lg mt-1 mb-2">
          {work.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4">{work.description}</p>
        {work.link && (
          <a
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
          >
            {work.linkLabel || "View"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
