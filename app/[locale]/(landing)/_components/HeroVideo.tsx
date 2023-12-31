'use client'

export const HeroVideo = () => {
  return (
    <video
      className="mx-auto mb-12 h-full w-full max-w-[750px] rounded-none shadow-2xl sm:rounded-2xl"
      controls
    >
      <source src="/hero-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
