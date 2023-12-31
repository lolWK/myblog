import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/types/supabase';

export const createClient = () => {
  // 쿠키는 서버 구성 요소에서만 쓸 수 있음
  createServerComponentClient<Database>({
    cookies,
  });
};
