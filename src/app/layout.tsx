import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/provider/ThemeProvider';
import { SessionProvider } from '@/provider/SessionProvider';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { TooltipProvider } from '@/components/plate-ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { EditorProvider } from '@/provider/EditorProvider';
// import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}
// https://myblog-sigma-drab.vercel.app/
export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  title: {
    default: '22_devlog',
    template: '%s - 22_devlog',
  },
  description: '천천히 기록하는 개발 블로그',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='ko'>
      {/* <Head>
        <meta
          name='naver-site-verification'
          content='9bc921d582f8e33a86f91951b3709d4e598844e7'
        />
        <meta
          name='google-site-verification'
          content='JmZHGyWI6opS82DCHqFfIRA_inKm0eZFYBP9gS96t0s'
        />
      </Head> */}
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
