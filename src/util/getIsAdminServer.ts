import { createClient } from '@/util/supabaseServer';

export const getIsAdminServer = async () => {
  const {
    data: { session },
  } = await createClient().auth.getSession();
  if (!session) {
    return false;
  } else {
    return true;
  }
};
