// import { redirect } from 'next/navigation';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

// export default async function HomePage() {
//   const supabase = createServerComponentClient({ cookies });

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) {
//     redirect('/auth');
//   }

//   // You can also check if the user is an admin here
//   redirect('/admin/dashboard');
// }

// app/page.js
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth');
  }

  redirect('/admin/dashboard');
}
