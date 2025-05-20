// apps/web/src/app/api/login/route.js

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function POST(request) {
  let email, password;

  const contentType = request.headers.get('Content-Type');

  if (contentType.includes('application/json')) {
    // If request is JSON
    const body = await request.json();
    email = body.email;
    password = body.password;
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    // If request is FormData (from HTML form)
    const formData = await request.formData();
    email = formData.get('email');
    password = formData.get('password');
  } else {
    return new Response('Unsupported content type', { status: 400 });
  }

  // Simulate fake login
  if (email === 'admin@example.com' && password === 'password123') {
    const cookieStore = await cookies();

    cookieStore.set('isAdminLoggedIn', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return redirect('/admin/orders');
  }

  // Invalid credentials → redirect back with error
  return redirect('/auth?error=invalid_credentials');
}