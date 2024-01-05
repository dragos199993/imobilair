'use server'
import { JSDOM } from 'jsdom'
import { createListing } from '@/actions/create-listing'

export const scrapeLink = async (data: string) => {
  const response = await fetch(data)
  const body = await response.text()

  const { document } = new JSDOM(body).window

  const title = document.querySelector('[data-cy="adPageAdTitle"]').textContent
  const content = document.querySelector(
    '[data-cy="adPageAdDescription"]'
  ).textContent
  const price = document.querySelector(
    '[data-cy="adPageHeaderPrice"]'
  ).textContent

  return { title, content, price }
}

export const importAll = async () => {
  const response = await fetch(
    'https://www.storia.ro/ro/companii/agentii/blitz-ID4195222'
  )
  const body = await response.text()
  const { document } = new JSDOM(body).window

  const ads = document.querySelector('[data-cy="adverts-list-container"]')
  if (ads) {
    const liElements = ads.querySelectorAll('li')
    const hrefs: any = []

    liElements.forEach((li: any) => {
      const anchor = li.querySelector('a')
      if (anchor) {
        const href = anchor.getAttribute('href')
        hrefs.push('https://www.storia.ro' + href)
      }
    })

    hrefs.map(async (href: any) => {
      const result = await scrapeLink(href)
    })
  }
}
