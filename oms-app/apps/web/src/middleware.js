// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import { createMiddlewareClient } from '@supabase/ssr';

// export async function middleware(request) {
//   const url = request.nextUrl.clone();

//   if (url.pathname.startsWith('/admin')) {
//     const cookieStore = await cookies();
//     const isAdminLoggedIn = cookieStore.get('isAdminLoggedIn')?.value === 'true';

//     if (!isAdminLoggedIn) {
//       url.pathname = '/auth';
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*', '/dashboard/:path*'],
// };

// middleware.js

import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/ssr';

export async function middleware(request) {
  let response = NextResponse.next();

  const supabase = createMiddlewareClient({ req: request, res: response });

  await supabase.auth.getSession();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = request.nextUrl.clone();

  if (url.pathname.startsWith('/admin') && !session) {
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};