import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/games(.*)',
  '/offers(.*)',
  '/rewards(.*)',
  '/leaderboard(.*)',
  '/referrals(.*)',
  '/profile(.*)',
  '/admin(.*)',
])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|cur|heic|heif|mp4)(?:\\?.*)?|\\$next).*)',
    '/(api|trpc)(.*)',
  ],
}
