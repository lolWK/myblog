'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import MoonIcon from '@/assets/icons/icon-moon.svg';
import SunIcon from '@/assets/icons/icon-sun.svg';

export default function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-transparent"
      onClick={toggleTheme}
    >
      <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
