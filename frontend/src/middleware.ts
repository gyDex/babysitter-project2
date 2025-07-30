import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const role = request.cookies.get('role')?.value
  const { pathname } = request.nextUrl
  if (role === 'parent' && pathname !== '/parent') {
    return NextResponse.redirect(new URL('/parent', request.url))
  }

  if (role === 'baby' && pathname !== '/babysitter') {
    return NextResponse.redirect(new URL('/babysitter', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/parent', '/babysitter'], 
}