'use client'

import { Paintbrush } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export function PickerExample() {
  const [background, setBackground] = useState<GradientGroup>({
    value: '#000',
    color: 'light',
    label: 'Black',
  })

  return (
    <div
      className="preview flex h-full min-h-[350px] w-full items-center justify-center rounded !bg-cover !bg-center p-10 transition-all"
      style={{ background: background.value }}
    >
      <GradientPicker background={background} setBackground={setBackground} />
    </div>
  )
}

export type GradientGroup = {
  value: string
  color: 'dark' | 'light'
  label: string
}

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: GradientGroup
  setBackground: (background: GradientGroup) => void
  className?: string
}) {
  const solids: GradientGroup[] = [
    { value: '#E2E2E2', color: 'dark', label: 'Gray' },
    { value: '#ff75c3', color: 'dark', label: 'Pink' },
    { value: '#ffa647', color: 'dark', label: 'Orange' },
    { value: '#ffe83f', color: 'dark', label: 'Yellow' },
    { value: '#9fff5b', color: 'dark', label: 'Green' },
    { value: '#70e2ff', color: 'dark', label: 'Blue' },
    { value: '#cd93ff', color: 'dark', label: 'Purple' },
    { value: '#09203f', color: 'light', label: 'Dark Blue' },
  ]

  const gradients: GradientGroup[] = [
    {
      value: 'linear-gradient(to top left,#accbee,#e7f0fd)',
      color: 'dark',
      label: 'Blue',
    },
    {
      value: 'linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)',
      color: 'dark',
      label: 'Gray',
    },
    {
      value: 'linear-gradient(to top left,#000000,#434343)',
      color: 'light',
      label: 'Gray 2',
    },
    {
      value: 'linear-gradient(to top left,#09203f,#537895)',
      color: 'light',
      label: 'Blue',
    },
    {
      value: 'linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)',
      color: 'light',
      label: 'Purple',
    },
    {
      value: 'linear-gradient(to top left,#f953c6,#b91d73)',
      color: 'light',
      label: 'Pink',
    },
    {
      value: 'linear-gradient(to top left,#ee0979,#ff6a00)',
      color: 'light',
      label: 'Red',
    },
    {
      value: 'linear-gradient(to top left,#F00000,#DC281E)',
      color: 'light',
      label: 'Red',
    },
    {
      value: 'linear-gradient(to top left,#00c6ff,#0072ff)',
      color: 'light',
      label: 'Blue',
    },
    {
      value: 'linear-gradient(to top left,#4facfe,#00f2fe)',
      color: 'light',
      label: 'Blue',
    },
    {
      value: 'linear-gradient(to top left,#0ba360,#3cba92)',
      color: 'light',
      label: 'Green',
    },
    {
      value: 'linear-gradient(to top left,#FDFC47,#24FE41)',
      color: 'dark',
      label: 'Green',
    },
    {
      value: 'linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)',
      color: 'dark',
      label: 'Rainbow',
    },
    {
      value: 'linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)',
      color: 'light',
      label: 'Rainbow',
    },
  ]

  const images: GradientGroup[] = [
    {
      value:
        'url(https://images.unsplash.com/photo-1617796993472-7c1a483d3e39?w=2532&q=90)',
      color: 'light',
      label: 'Model 1',
    },
    {
      value:
        'url(https://images.unsplash.com/photo-1466781783364-36c955e42a7f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      color: 'dark',
      label: 'Model 2',
    },
  ]

  const defaultTab = useMemo(() => {
    if (background.value.includes('url')) return 'image'
    if (background.value.includes('gradient')) return 'gradient'
    return 'solid'
  }, [background])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal',
            !background && 'text-muted-foreground',
            className
          )}
        >
          <div className="flex w-full items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
                style={{ background: background.value }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="flex-1 truncate">
              {background ? background.label : 'Pick a color'}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="image">
              Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="mt-0 flex flex-wrap gap-1">
            {solids.map((s) => (
              <div
                key={s.value}
                style={{ background: s.value }}
                className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>

          <TabsContent value="gradient" className="mt-0">
            <div className="mb-2 flex flex-wrap gap-1">
              {gradients.map((s) => (
                <div
                  key={s.value}
                  style={{ background: s.value }}
                  className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="image" className="mt-0">
            <div className="mb-2 grid grid-cols-2 gap-1">
              {images.map((s) => (
                <div
                  key={s.value}
                  style={{ backgroundImage: s.value }}
                  className="h-12 w-full cursor-pointer rounded-md bg-cover bg-center active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>

        <Input
          id="custom"
          value={background.value}
          className="col-span-2 mt-4 h-8"
          onChange={(e) =>
            setBackground(e.currentTarget.value as unknown as GradientGroup)
          }
        />
      </PopoverContent>
    </Popover>
  )
}

const GradientButton = ({
  background,
  children,
}: {
  background: string
  children: React.ReactNode
}) => {
  return (
    <div
      className="relative rounded-md !bg-cover !bg-center p-0.5 transition-all"
      style={{ background }}
    >
      <div className="rounded-md bg-popover/80 p-1 text-center text-xs">
        {children}
      </div>
    </div>
  )
}
