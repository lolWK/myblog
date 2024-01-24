'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export default function MainHeaderNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList className='mx-4 gap-4'>
        <NavigationMenuItem>
          <Link href='/about' legacyBehavior passHref>
            <NavigationMenuLink className='font-h text-px16-300'>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/blog/page/1' legacyBehavior passHref>
            <NavigationMenuLink className='font-h text-px16-300'>
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/note/page/1' legacyBehavior passHref>
            <NavigationMenuLink className='text-px-300 font-h'>
              Notes
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/archive' legacyBehavior passHref>
            <NavigationMenuLink className='font-h text-px16-300'>
              Archive
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
