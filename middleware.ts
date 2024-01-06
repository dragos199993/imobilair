import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'ro', 'hu'],
  defaultLocale: 'en',
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|api/*).*)', '/', '/(en|ro|hu)/:path*'],
}
