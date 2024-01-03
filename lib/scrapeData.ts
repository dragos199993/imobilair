'use server'
import { JSDOM } from 'jsdom'

export const scrapeLink = async (data: string) => {
  const response = await fetch(data)
  const body = await response.text()

  const { document } = new JSDOM(body).window

  const title = document.querySelector('[data-cy="adPageAdTitle"]').textContent
  const content = document.querySelector(
    '[data-cy="adPageAdDescription"]'
  ).textContent

  return { title, content }
}
