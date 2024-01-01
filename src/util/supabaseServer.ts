import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/types/supabaseDB';

export const createClient = () => {
  cookies().getAll();
  return createServerComponentClient<Database>({
    cookies,
  });
};
