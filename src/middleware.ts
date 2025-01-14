import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'



// putting all the routes which are to be protected in isProtectedRoute 
const isProtectedRoute=createRouteMatcher([
  '/dashboard(.*)',
  '/api/payment(.*)',
  '/callback(.*)',
])

// Protecting the routes using clerk authentication
export default clerkMiddleware(async (auth, req) => {
    // is the request is coming from the isProtectedRoute then authenticate it
    if (isProtectedRoute(req)) await auth.protect()
  })

  // CLerk Authentication
  export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  }  