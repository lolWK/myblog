import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/provider/ThemeProvider';
import { SessionProvider } from '@/provider/SessionProvider';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { TooltipProvider } from '@/components/plate-ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { EditorProvider } from '@/provider/EditorProvider';
import localFont from 'next/font/local';

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  title: {
    default: '22_devlog',
    template: '%s - 22_devlog',
  },
  description: '천천히 기록하는 개발 블로그',
};

// Font files can be colocated inside of `app`
const hahmlet = localFont({
  src: [
    {
      path: '../assets/fonts/Hahmlet-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Hahmlet-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Hahmlet-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-hahmlet',
});

const pretendard = localFont({
  src: [
    {
      path: '../assets/fonts/Pretendard-Light.subset.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard-Regular.subset.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard-Medium.subset.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
});

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='ko' className={`${hahmlet.variable} ${pretendard.variable}`}>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <SessionProvider>
            <EditorProvider>
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
            </EditorProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
