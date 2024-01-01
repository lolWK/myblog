import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabaseDB';

export const createClient = () => createClientComponentClient<Database>();
