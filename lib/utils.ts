import { type ClassValue, clsx } from 'clsx'
import { NextFont } from 'next/dist/compiled/@next/font'
import { Dancing_Script, Great_Vibes, Playfair_Display } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] })
export const playfairDisplay = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
})
export const dancingScrip = Dancing_Script({
  weight: '400',
  subsets: ['latin'],
})

export const fontFamilyMapping: Record<string, NextFont> = {
  greatVibes: greatVibes,
  dancingScript: dancingScrip,
  playfairDisplay: playfairDisplay,
}
