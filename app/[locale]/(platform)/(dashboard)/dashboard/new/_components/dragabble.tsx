import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'

import { Button } from '@/components/ui/button'

function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  })
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined

  return (
    <Button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </Button>
  )
}

export default Draggable
