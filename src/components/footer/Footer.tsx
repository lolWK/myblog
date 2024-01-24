import AdminLogin from '@/components/login/AdminLogin';

export default function Footer() {
  return (
    <footer className='mt-32 flex h-32 w-full items-center justify-center gap-4'>
      <p className='font-p text-px12-500'>@ 2024 1klog.dev</p>
      <AdminLogin />
    </footer>
  );
}
