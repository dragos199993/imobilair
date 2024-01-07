import React, { FC } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

import { FormField } from '../form'
import { Separator } from '../separator'
import { AlignField } from './AlignField'
import { EditorBarContainer } from './EditorBarContainer'
import { FontFamilyField } from './FontFamilyField'

type Props = {
  form: UseFormReturn<FieldValues, any, undefined>
  name: string
}

export const EditorBar: FC<Props> = ({ name, form }) => {
  return (
    <EditorBarContainer>
      <FormField
        control={form.control}
        name={`${name}.fontFamily`}
        render={({ field }) => <FontFamilyField field={field} />}
      />
      <Separator orientation="vertical" />
      <FormField
        control={form.control}
        name={`${name}.alignment`}
        render={({ field }) => <AlignField field={field} />}
      />
    </EditorBarContainer>
  )
}
