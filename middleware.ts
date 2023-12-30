import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['ro', 'hu'],

  // Used when no locale matches
  defaultLocale: 'ro',
})

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ['/', '/ro', '/hu', '/invite/:id', '/api/webhook'],
  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req)
  },
  afterAuth(auth, req) {
    // if (auth.userId && auth.isPublicRoute) {
    //   let path = '/dashboard'
    //   const dashboardUrl = new URL(path, req.url)
    //   return NextResponse.redirect(dashboardUrl)
    // }
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }
    // if (auth.userId && !auth.orgId && req.nextUrl.pathname !== '/select-org') {
    //   const orgSelection = new URL('/select-org', req.url)
    //   return NextResponse.redirect(orgSelection)
    // }
  },
})

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    '/(ro|hu)/:path*',
  ],
}
