import { z } from 'zod'
import { FC } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useFormContext } from 'react-hook-form'
import { cn, fontFamilyMapping } from '@/lib/utils'
import { EditorBar } from './editor/EditorBar'
import { formSchema } from '@/app/[locale]/(platform)/(dashboard)/dashboard/new/_components/new-event-form'

type Props = z.infer<typeof formSchema>

export const TemplateEditor: FC<Props> = ({
  date,
  location,
  name,
  description,
  customization,
}) => {
  const dayObj: Dayjs = dayjs(date)
  const {
    background,
    name: nameCustomization,
    location: locationCustomization,
    date: dateCustomization,
    description: descriptionCustomization,
  } = customization
  const form = useFormContext() // retrieve all hook methods

  return (
    <div className="w-full">
      <div
        className="h-auto min-h-[480px] w-full rounded-lg  px-10 py-8 shadow-xl"
        style={{
          color: background.color === 'dark' ? '#000' : '#fff',
          background: `${background.value} left top / cover no-repeat`,
        }}
      >
        <div className="mx-auto w-full">
          <div className="group relative">
            <h1
              className={cn(
                'border-2 border-transparent py-4 text-4xl font-bold transition-all duration-100 hover:border-blue-500 group-hover:border-2 group-hover:border-blue-500',
                {
                  'text-left': nameCustomization.alignment === 'left',
                  'text-center': nameCustomization.alignment === 'center',
                  'text-right': nameCustomization.alignment === 'right',
                },
                fontFamilyMapping[nameCustomization.fontFamily].className
              )}
            >
              {name || 'Mireasa si Mirel'}
            </h1>

            <EditorBar form={form} name="customization.name" />
          </div>

          <div className="group relative">
            <p
              className={cn(
                'border-2 border-transparent py-4 text-xl font-bold transition-all duration-100 hover:border-blue-500 group-hover:border-2 group-hover:border-blue-500',
                {
                  'text-left': descriptionCustomization.alignment === 'left',
                  'text-center':
                    descriptionCustomization.alignment === 'center',
                  'text-right': descriptionCustomization.alignment === 'right',
                },
                fontFamilyMapping[descriptionCustomization.fontFamily].className
              )}
            >
              {description || 'Descriere'}
            </p>

            <EditorBar form={form} name="customization.description" />
          </div>

          <div className="group relative">
            <h1
              className={cn(
                'border-2 border-transparent py-4 text-2xl font-bold transition-all duration-300 hover:border-blue-500 group-hover:border-2 group-hover:border-blue-500',
                {
                  'text-left': locationCustomization.alignment === 'left',
                  'text-center': locationCustomization.alignment === 'center',
                  'text-right': locationCustomization.alignment === 'right',
                },
                fontFamilyMapping[locationCustomization.fontFamily].className
              )}
            >
              {location || 'Sanpaul'}
            </h1>

            <EditorBar form={form} name="customization.location" />
          </div>
          <div className="group relative">
            <p
              className={cn(
                'border-2 border-transparent py-4 text-2xl font-bold transition-all duration-300 hover:border-blue-500 group-hover:border-2 group-hover:border-blue-500',
                {
                  'text-left': dateCustomization.alignment === 'left',
                  'text-center': dateCustomization.alignment === 'center',
                  'text-right': dateCustomization.alignment === 'right',
                },
                fontFamilyMapping[dateCustomization.fontFamily].className
              )}
            >
              {dayObj.format('MMM D, YYYY')}
            </p>

            <EditorBar form={form} name="customization.date" />
          </div>
        </div>
      </div>
    </div>
  )
}
