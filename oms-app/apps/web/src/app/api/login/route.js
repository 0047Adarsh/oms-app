// import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export async function POST(request) {
//   const { email, password } = await request.json();

//   const { data, error } = await supabase.auth.signInWithPassword({ email, password });

//   if (error || !data?.session) {
//     return NextResponse.json({ success: false, message: error?.message || 'Login failed' }, { status: 401 });
//   }

//   // Optionally, set a cookie here (if you want persistent login on the client)
//   return NextResponse.json({ success: true, user: data.user });
// }

// /app/api/login/route.js

// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

// export async function POST(req) {
//   const { email, password } = await req.json();

//   // const supabase = createServerComponentClient({ cookies });
//    const cookieStore = await cookies();

//   const supabase = createServerComponentClient({ cookies: () => cookieStore });

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error || !data.session) {
//     return NextResponse.json({ success: false, message: error?.message || 'Login failed' }, { status: 401 });
//   }

//   return NextResponse.json({ success: true });
// }

// app/api/login/route.js
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient({ cookies });

  const { email, password } = await request.json();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });



  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}

