import React, { useEffect, useRef } from 'react'
import { useChat } from 'ai/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Bot, Trash, X, XCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Message } from 'ai'
import { useOnClickOutside } from 'usehooks-ts'
import { useTranslations } from 'next-intl'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
}

export const Chatbox = ({ setOpen, open }: Props) => {
  const t = useTranslations('Dashboard')
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))

  if (isDesktop) {
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
          onClick={() => setOpen(false)}
        >
          <X size={30} />
        </Button>

        <ChatBase open={open} setOpen={setOpen} isDesktop={isDesktop} />
      </div>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{t('chat_box_title')}</DrawerTitle>
          </DrawerHeader>
          <ChatBase open={open} setOpen={setOpen} isDesktop={isDesktop} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

const ChatBase = ({ open, isDesktop }: Props & { isDesktop: boolean }) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat({
    api: '/en/api/chat',
  })
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, error])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  const isLastMessageUser = messages[messages.length - 1]?.role === 'user'

  const t = useTranslations('Dashboard')

  return (
    <div className="flex h-[600px] flex-col border bg-secondary shadow-xl">
      {isDesktop && (
        <p className="pl-4 pt-4 text-lg font-semibold">{t('chat_box_title')}</p>
      )}
      <div className="mt-8 h-full overflow-y-auto p-3" ref={scrollRef}>
        {!!messages.length &&
          !error &&
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

        {!messages.length && !error && (
          <div className="flex h-full items-center justify-center gap-2">
            <Bot size={20} /> Start a conversation here
          </div>
        )}
        {isLoading && isLastMessageUser && (
          <ChatMessage
            message={{
              role: 'assistant',
              content: 'Thinking...',
            }}
          />
        )}

        {error && (
          <ChatMessage
            message={{
              role: 'system',
              content: 'Something went wrong',
            }}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="m-3 flex gap-2">
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
  )
}

const ChatMessage = ({
  message: { role, content },
}: {
  message: Pick<Message, 'role' | 'content'>
}) => {
  return (
    <div
      className={cn(
        'mb-3 flex w-auto flex-col',
        role === 'user' && 'items-start rounded-lg bg-primary/20 px-2 py-2',
        role === 'assistant' && 'items-end rounded-lg bg-amber-600/20 px-2 py-2'
      )}
    >
      {(role === 'assistant' || role === 'user') && (
        <div
          className={cn(
            role === 'user' && 'items-start rounded-lg bg-primary/20 px-2 py-2',
            role === 'assistant' &&
              'items-end rounded-lg bg-amber-600/20 px-2 py-2'
          )}
        >
          {content}
        </div>
      )}
      {role === 'system' && (
        <Alert variant="destructive">
          <XCircle className="h-5 w-5" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            Please try again and if it doesn&lsquo;t work, feel free to contact
            us.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
