import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center gap-4 h-32 mt-auto">
      <p className="font-p text-px12-500">@ 2023 1klog.dev</p>
      <Button asChild className="px-2 py-1 h-auto">
        <Link href="/login" className="font-p text-px12-500">
          admin
        </Link>
      </Button>
    </footer>
  );
}
