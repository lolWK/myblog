import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SessionProvider } from '@/contexts/SessionProvider';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { TooltipProvider } from '@/components/plate-ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: '1klog.dev',
  description: '나를 위해 기록해가는 Devlog',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='ko'>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <SessionProvider>
            <TooltipProvider
              disableHoverableContent
              delayDuration={500}
              skipDelayDuration={0}
            >
              <div className='container mx-auto flex min-h-dvh max-w-screen-sm flex-col px-4'>
                <Header />
                <main className='flex-grow'>{children}</main>
                <Footer />
              </div>
            </TooltipProvider>
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
