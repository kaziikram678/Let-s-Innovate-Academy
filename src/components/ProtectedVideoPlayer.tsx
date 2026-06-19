"use client"

import { useEffect, useRef, useState } from "react"
import { useDRMProtection } from "@/hooks/useDRMProtection"

interface ProtectedVideoPlayerProps {
  src: string
  title: string
  userEmail?: string
  poster?: string
}

export default function ProtectedVideoPlayer({ src, title, userEmail, poster }: ProtectedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false)

  useDRMProtection()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleDurationChange = () => setDuration(video.duration)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("durationchange", handleDurationChange)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("durationchange", handleDurationChange)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    if (video && duration) {
      video.currentTime = pos * duration
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div
      ref={containerRef}
      className="relative bg-black rounded-lg overflow-hidden select-none"
      onContextMenu={(e) => e.preventDefault()}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        playsInline
        preload="metadata"
        onClick={togglePlay}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      />

      {userEmail && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08]">
            {Array.from({ length: 20 }).map((_, i) => (
              Array.from({ length: 10 }).map((_, j) => (
                <span
                  key={`${i}-${j}`}
                  className="absolute text-white text-xs font-mono whitespace-nowrap"
                  style={{
                    top: `${i * 10 + 5}%`,
                    left: `${j * 15 + 5}%`,
                    transform: "rotate(-25deg)",
                  }}
                >
                  {userEmail}
                </span>
              ))
            ))}
          </div>
        </div>
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div
            className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-3"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-red-500 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="text-white hover:text-red-400 transition-colors">
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <h3 className="text-white text-sm font-medium truncate max-w-xs">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
