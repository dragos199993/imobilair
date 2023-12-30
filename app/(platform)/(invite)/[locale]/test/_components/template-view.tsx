import { z } from 'zod'
import { FC } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { cn, fontFamilyMapping } from '@/lib/utils'
import { formSchema } from '@/app/(platform)/(dashboard)/dashboard/new/_components/new-event-form'

type Props = z.infer<typeof formSchema> & { action?: JSX.Element }

export const TemplateView: FC<Props> = ({
  date,
  location,
  name,
  customization,
  description,
  action,
}) => {
  const dayObj: Dayjs = dayjs(date)

  const {
    background,
    location: locationCustomization,
    name: nameCustomization,
    date: dateCustomization,
    description: descriptionCustomization,
  } = customization

  return (
    <div className="w-full">
      <div
        className="h-auto min-h-[240px] w-full rounded-lg  px-8 py-8 shadow-xl"
        style={{
          color: background.color === 'dark' ? '#000' : '#fff',
          background: `${background.value} left top / cover no-repeat`,
        }}
      >
        {action}
        <div className="mx-auto w-full space-y-6">
          <h1
            className={cn(
              'border-2 border-transparent py-4 text-4xl font-bold',
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
          <p
            className={cn(
              'border-2 border-transparent py-4 text-xl font-bold',
              {
                'text-left': descriptionCustomization.alignment === 'left',
                'text-center': descriptionCustomization.alignment === 'center',
                'text-right': descriptionCustomization.alignment === 'right',
              },
              fontFamilyMapping[descriptionCustomization.fontFamily].className
            )}
          >
            {description || 'Descriere'}
          </p>

          <p
            className={cn(
              'border-2 border-transparent py-4 text-2xl font-bold',
              {
                'text-left': locationCustomization.alignment === 'left',
                'text-center': locationCustomization.alignment === 'center',
                'text-right': locationCustomization.alignment === 'right',
              },
              fontFamilyMapping[locationCustomization.fontFamily].className
            )}
          >
            {location || 'Sanpaul'}
          </p>
          <p
            className={cn('py-4 text-2xl font-bold', {
              'text-left': locationCustomization.alignment === 'left',
              'text-center': locationCustomization.alignment === 'center',
              'text-right': locationCustomization.alignment === 'right',
            })}
          >
            {location || 'Sanpaul'}
          </p>
          <div className="group relative">
            <p
              className={cn(
                'border-2 border-transparent py-4 text-2xl font-bold',
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
          </div>
        </div>
      </div>
    </div>
  )
}
