import { createClient } from '@/util/supabaseClient';

const supabase = createClient();

export async function login(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}
