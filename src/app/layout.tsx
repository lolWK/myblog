import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: '1klog.dev',
  description: '나를 위해 기록해가는 Devlog',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ko">
      <body className="container mx-auto px-4 max-w-screen-sm min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
