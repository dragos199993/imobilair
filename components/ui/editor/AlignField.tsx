import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react'
import React, { FC } from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { Button } from '../button'
import { FormControl, FormItem, FormMessage } from '../form'

type Props = {
  field: ControllerRenderProps<FieldValues, any>
}

export const AlignField: FC<Props> = ({ field }) => {
  return (
    <FormItem className="flex flex-col">
      <FormControl>
        <div className="hidden gap-1 group-hover:flex">
          <Button
            size="smallIcon"
            type="button"
            variant={field.value === 'left' ? 'default' : 'secondary'}
            className="rounded-r-none"
            onClick={() => field.onChange('left')}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            size="smallIcon"
            type="button"
            className="rounded-none"
            variant={field.value === 'center' ? 'default' : 'secondary'}
            onClick={() => field.onChange('center')}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            size="smallIcon"
            type="button"
            className="rounded-l-none"
            variant={field.value === 'right' ? 'default' : 'secondary'}
            onClick={() => field.onChange('right')}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      </FormControl>
    </FormItem>
  )
}
