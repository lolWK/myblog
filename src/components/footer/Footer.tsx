import AdminLogin from '@/components/login/AdminLogin';

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center gap-4 h-32 mt-auto">
      <p className="font-p text-px12-500">@ 2023 1klog.dev</p>
      <AdminLogin />
    </footer>
  );
}
