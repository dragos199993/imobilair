import { type ClassValue, clsx } from 'clsx'
import { NextFont } from 'next/dist/compiled/@next/font'
import { Dancing_Script, Great_Vibes, Playfair_Display } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(url: string) {
  return `${HTTP_TYPE}${process.env.NEXT_PUBLIC_ROOT_DOMAIN}${url}`
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

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^a-zA-Z0-9-]/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '')
}

export const HTTP_TYPE =
  process.env.NODE_ENV === 'production' ? 'https://' : 'http://'
