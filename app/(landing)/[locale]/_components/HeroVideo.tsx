'use client'
import React, { useState } from 'react'
import videojs from 'video.js'
import VideoJS from '@/components/ui/VideoJS'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export const HeroVideo = () => {
  const [isVideoLoading, setVideoLoading] = useState(true)
  const playerRef = React.useRef(null)

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    poster: '/next.svg',
    sources: [
      {
        src: '/hero-video.mp4',
        type: 'video/mp4',
      },
    ],
  }

  const handlePlayerReady = (player: any) => {
    playerRef.current = player

    player.on('loadeddata', () => {
      setVideoLoading(false)
      videojs.log('video loaded')
    })

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting')
    })

    player.on('dispose', () => {
      videojs.log('player will dispose')
    })
  }

  return (
    <div className="mx-auto max-w-[1024px]">
      {isVideoLoading && <Skeleton className="w-[750px] pb-[56.25%]" />}
      <div className={cn('relative h-0 pb-[56.25%]', isVideoLoading && 'pb-0')}>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  )
}
