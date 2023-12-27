'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import Logo from '@/assets/logo/logo.svg';
import SearchIcon from '@/assets/icons/icon-search.svg';
import MenuIcon from '@/assets/icons/icon-bars.svg';
import { ModeToggle } from '@/components/ModeToggle';
import { useState } from 'react';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="flex items-center justify-between h-20">
      <h1 className="colors-foreground">
        <Logo fill="currentColor" />
        <span className="sr-only">1klog.dev blog</span>
      </h1>

      <div className="hidden md:flex items-center">
        <form className="relative">
          <label
            htmlFor="search"
            className="colors-foreground cursor-pointer absolute top-[50%] -translate-y-2/4 right-3"
          >
            <SearchIcon width={16} height={16} stroke="currentColor" />
            <span className="sr-only">검색</span>
          </label>
          <Input
            type="text"
            className="absolute -top-[20px] right-0 bg-transparent w-0 focus:w-[160px] border-none focus:outline-none transition-width duration-300 pr-8"
            id="search"
            autoComplete="off"
          />
        </form>

        <NavigationMenu>
          <NavigationMenuList className="gap-4 mx-4">
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="font-h text-px16-300">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="font-h text-px16-300">
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/note" legacyBehavior passHref>
                <NavigationMenuLink className="font-h text-px-300">
                  Notes
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/archive" legacyBehavior passHref>
                <NavigationMenuLink className="font-h text-px16-300">
                  Archive
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <ModeToggle />
      </div>

      <div className="md:hidden flex items-center">
        <form className="relative">
          <label
            htmlFor="search"
            className="colors-foreground cursor-pointer absolute top-[50%] -translate-y-2/4 right-3"
          >
            <SearchIcon width={16} height={16} stroke="currentColor" />
            <span className="sr-only">검색</span>
          </label>
          <Input
            type="text"
            className="absolute -top-[20px] right-0 bg-transparent w-0 focus:w-[160px] border-none focus:outline-none transition-width duration-300 pr-8"
            id="search"
            autoComplete="off"
          />
        </form>

        <ModeToggle />

        <Sheet>
          <SheetTrigger className="colors-foreground px-2">
            <MenuIcon width={16} height={16} stroke="currentColor" />
          </SheetTrigger>
          <SheetContent className="w-[320px]">
            <NavigationMenu className="mx-auto flex items-center h-full">
              <NavigationMenuList className="gap-4 flex-col items-center">
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="font-h text-px16-300 py-4 px-16 block">
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="font-h text-px6-300 py-4 px-16 block">
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/note" legacyBehavior passHref>
                    <NavigationMenuLink className="font-h text-px16-300 py-4 px-16 block">
                      Notes
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/archive" legacyBehavior passHref>
                    <NavigationMenuLink className="font-h text-px-300 py-4 px-16 block">
                      Archive
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </div>

      {/* <div className="md:hidden colors-foreground cursor-pointer">
        <MenuIcon width={16} height={16} stroke="currentColor" />
      </div> */}
    </header>
  );
}
