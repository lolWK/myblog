import Logo from '@/assets/logo/logo.svg';
import ThemeModeToggle from '@/components/ThemeModeToggle';
import SearchInput from '@/components/input/SearchInput';
import MainHeaderNav from '@/components/navigation/MainHeaderNav';
import MainHeaderNavM from '@/components/navigation/MainHeaderNavM';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex h-20 items-center justify-between'>
      <h1 className='colors-foreground'>
        <Link href='/blog/1'>
          <Logo fill='currentColor' />
          <span className='sr-only'>22_devlog</span>
        </Link>
      </h1>

      <div className='hidden items-center md:flex'>
        <SearchInput />
        <MainHeaderNav />
        <ThemeModeToggle />
      </div>

      <div className='flex items-center md:hidden'>
        <SearchInput />
        <ThemeModeToggle />
        <MainHeaderNavM />
      </div>
    </header>
  );
}
