import React, { useState } from 'react'
import { Chatbox } from '@/components/ui/ai/Chatbox'
import { Button } from '@/components/ui/button'
import { Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  hideLabel?: boolean
}

export const ChatButton = ({ hideLabel = false }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Bot size={20} className={cn(!hideLabel && 'mr-2')} />
        {!hideLabel && 'AI Chat'}
      </Button>
      <Chatbox open={open} setOpen={setOpen} />
    </>
  )
}
