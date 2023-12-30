import React, { FC } from 'react'
import { FormControl, FormItem } from '../form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select'
import { cn, fontFamilyMapping } from '@/lib/utils'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

type Props = {
  field: ControllerRenderProps<FieldValues, any>
}

export const FontFamilyField: FC<Props> = ({ field }) => {
  return (
    <FormItem className="flex flex-col">
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger
            className={cn(
              fontFamilyMapping[field.value].className,
              'invisible h-8 w-[120px] space-x-2 bg-secondary text-primary group-hover:visible'
            )}
          >
            <SelectValue placeholder="Selecteza un font" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                value="greatVibes"
                className={fontFamilyMapping.greatVibes.className}
              >
                Great Vibes
              </SelectItem>
              <SelectItem
                value="dancingScript"
                className={fontFamilyMapping.dancingScript.className}
              >
                Dancing Script
              </SelectItem>
              <SelectItem
                value="playfairDisplay"
                className={fontFamilyMapping.playfairDisplay.className}
              >
                Playfair Display
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  )
}
