'use client'
import React from 'react'
import videojs from 'video.js'
import VideoJS from '@/components/ui/VideoJS'

export const HeroVideo = () => {
  const playerRef = React.useRef(null)

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: '/hero-video.mp4',
        type: 'video/mp4',
      },
    ],
  }

  const handlePlayerReady = (player: any) => {
    playerRef.current = player

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting')
    })

    player.on('dispose', () => {
      videojs.log('player will dispose')
    })
  }

  return (
    <div className="mx-auto max-w-[650px]">
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  )
}
