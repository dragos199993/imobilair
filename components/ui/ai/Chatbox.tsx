import React, { useEffect, useRef } from 'react'
import { useChat } from 'ai/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Bot, Delete, Trash, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Message } from 'ai'
import { useOnClickOutside } from 'usehooks-ts'

type Props = {
  open: boolean
  onClose: () => void
}

export const Chatbox = ({ onClose, open }: Props) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const ref = useRef(null)
  useOnClickOutside(ref, onClose)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  return (
    <div
      ref={ref}
      className={cn(
        'relative bottom-0 right-0 z-40 w-full max-w-[500px] rounded-lg bg-secondary shadow-xl xl:right-36',
        open ? 'fixed' : 'hidden'
      )}
    >
      <Button
        variant="ghost"
        title="Close"
        className="absolute right-0 top-2"
        onClick={onClose}
      >
        <X size={30} />
      </Button>
      <div className="flex h-[600px] flex-col border bg-secondary shadow-xl">
        <div className="mt-16 h-full overflow-y-auto p-3" ref={scrollRef}>
          {messages.length ? (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          ) : (
            <div className="flex h-full items-center justify-center gap-2">
              <Bot size={20} /> Start a conversation here
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Button variant="ghost" type="button" onClick={() => setMessages([])}>
            <Trash />
          </Button>

          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  )
}

const ChatMessage = ({ message: { role, content } }: { message: Message }) => {
  return (
    <div
      className={cn(
        'mb-3 flex w-auto flex-col',
        role === 'user' && 'items-start rounded-lg bg-primary/20 px-2 py-2',
        role === 'assistant' && 'items-end rounded-lg bg-amber-600/20 px-2 py-2'
      )}
    >
      <div
        className={cn(
          role === 'user' && 'items-start rounded-lg bg-primary/20 px-2 py-2',
          role === 'assistant' &&
            'items-end rounded-lg bg-amber-600/20 px-2 py-2'
        )}
      >
        {content}
      </div>
    </div>
  )
}
