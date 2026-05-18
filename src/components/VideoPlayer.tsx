interface VideoPlayerProps {
  src: string
  poster?: string
  caption?: string
}

export default function VideoPlayer({ src, poster, caption }: VideoPlayerProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden bg-[#111111] border border-white/10">
        <video
          className="w-full aspect-video"
          src={src}
          poster={poster}
          controls
          autoPlay
          muted
          playsInline
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      {caption && (
        <p className="text-zinc-500 text-sm text-center mt-4">{caption}</p>
      )}
    </div>
  )
}
