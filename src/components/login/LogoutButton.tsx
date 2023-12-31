'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/util/auth';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.refresh();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Button
      variant="outline"
      className="px-2 py-1 h-auto font-p text-px12-500"
      onClick={handleLogout}
    >
      logout
    </Button>
  );
}
