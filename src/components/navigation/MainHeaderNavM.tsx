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
      <SheetTrigger className='colors-foreground px-2'>
        <MenuIcon width={16} height={16} stroke='currentColor' />
      </SheetTrigger>
      <SheetContent className='w-[320px]'>
        <NavigationMenu className='mx-auto flex h-full items-center'>
          <NavigationMenuList className='flex-col items-center gap-4'>
            <NavigationMenuItem>
              <Link href='/about' legacyBehavior passHref>
                <NavigationMenuLink className='block px-16 py-4 font-h text-px16-300'>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/blog/1' legacyBehavior passHref>
                <NavigationMenuLink className='text-px6-300 block px-16 py-4 font-h'>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/note/1' legacyBehavior passHref>
                <NavigationMenuLink className='block px-16 py-4 font-h text-px16-300'>
                  Notes
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/archive' legacyBehavior passHref>
                <NavigationMenuLink className='text-px-300 block px-16 py-4 font-h'>
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
