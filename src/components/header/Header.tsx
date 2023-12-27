import Logo from '@/assets/logo/logo.svg';
import ThemeModeToggle from '@/components/ThemeModeToggle';
import SearchInput from '@/components/input/SearchInput';
import MainHeaderNav from '@/components/navigation/MainHeaderNav';
import MainHeaderNavM from '@/components/navigation/MainHeaderNavM';

export default function Header() {
  return (
    <header className="flex items-center justify-between h-20">
      <h1 className="colors-foreground">
        <Logo fill="currentColor" />
        <span className="sr-only">1klog.dev blog</span>
      </h1>

      <div className="hidden md:flex items-center">
        <SearchInput />
        <MainHeaderNav />
        <ThemeModeToggle />
      </div>

      <div className="md:hidden flex items-center">
        <SearchInput />
        <ThemeModeToggle />
        <MainHeaderNavM />
      </div>
    </header>
  );
}
