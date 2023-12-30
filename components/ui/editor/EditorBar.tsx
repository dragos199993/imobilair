import React, { FC } from 'react'
import { EditorBarContainer } from './EditorBarContainer'
import { FormField } from '../form'
import { FontFamilyField } from './FontFamilyField'
import { Separator } from '../separator'
import { AlignField } from './AlignField'
import { FieldValues, UseFormReturn } from 'react-hook-form'

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
