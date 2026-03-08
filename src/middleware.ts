import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth';
  
  // Get the token from cookies
  const token = request.cookies.get('auth_token')?.value || '';

  // Redirect to /auth if not logged in and trying to access private path
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth', request.nextUrl));
  }

  // Redirect to home if logged in and trying to access /auth
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/explore/:path*',
    '/sell/:path*',
    '/dashboard/:path*',
    '/u/:path*',
    '/wallet/:path*',
    '/auth',
  ],
};
