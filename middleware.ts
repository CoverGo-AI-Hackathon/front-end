import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isPublicRoute = (path: string) => {
  const publicRoutes = ['/login', '/register', '/forgot-password']
  return publicRoutes.includes(path)
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value
  
  console.log('Current path:', path)
  console.log('Token exists:', !!token)

  if (path === '/login') {
    return NextResponse.next()
  }

  if (token && isPublicRoute(path)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!token && !isPublicRoute(path)) {
    const url = new URL('/login', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/image|_next|_static|_vercel|favicon.ico|sitemap.xml|.*\.svg$|.*\.png$).*)',
  ]
}