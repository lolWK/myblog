import { createClient } from '@/util/supabaseClient';

const supabase = createClient();

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
