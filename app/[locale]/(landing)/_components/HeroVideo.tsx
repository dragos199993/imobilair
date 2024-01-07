import { auth } from '@/lib/auth'

export default async function HeroVideo() {
  return (
    <video
      autoPlay={true}
      muted={true}
      playsInline={true}
      className="mx-auto mb-12 h-full w-full max-w-6xl rounded-none shadow-2xl sm:rounded-2xl"
      controls
    >
      <source
        src="https://assets.imobilair.com/hero-video.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  )
}
