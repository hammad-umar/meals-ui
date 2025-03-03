import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { AUTH_ROUTES, PROTECTED_ROUTES } from '@/constants';

import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookiesStore = await cookies();
  const cookie = cookiesStore.get('Authentication');

  // Redirect authenticated users away from login and register pages
  if (AUTH_ROUTES.includes(request.nextUrl.pathname) && cookie?.value) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users away from protected routes to login
  if (PROTECTED_ROUTES.includes(request.nextUrl.pathname) && !cookie?.value) {
    cookiesStore.delete('Authentication');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow normal navigation if no redirection is needed
  return NextResponse.next();
}
