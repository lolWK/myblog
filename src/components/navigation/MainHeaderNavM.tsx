'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MenuIcon from '@/assets/icons/icon-bars.svg';

export default function MainHeaderNavM() {
  return (
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
  );
}
