import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import AuthButton from '../login/AuthButton';

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center gap-4 h-32 mt-auto">
      <p className="font-p text-px12-500">@ 2023 1klog.dev</p>
      <AuthButton />
    </footer>
  );
}
