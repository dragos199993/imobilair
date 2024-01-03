import React, { useState } from 'react'
import { Chatbox } from '@/components/ui/ai/Chatbox'
import { Button } from '@/components/ui/button'
import { Bot } from 'lucide-react'

export const ChatButton = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Bot size={20} className="mr-2" />
        AI Chat
      </Button>
      <Chatbox open={open} onClose={() => setOpen(false)} />
    </>
  )
}
