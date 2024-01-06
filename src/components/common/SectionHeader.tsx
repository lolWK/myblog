'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PAGE_INFO } from '@/constants/pageInfo';
import { SessionContext } from '@/contexts/SessionProvider';
import { useContext } from 'react';

type Props = {
  pageType: 'blog' | 'notes' | 'archive';
};

export default function SectionHeader({ pageType }: Props) {
  const session = useContext(SessionContext);
  const { name, description } = PAGE_INFO[pageType];

  return (
    <section className='mt-10 flex justify-between sm:mt-20'>
      <div className='flex items-center gap-8 font-h text-px16-300'>
        <h2>{name}</h2>
        <p className='sm-visible-hide'>{description}</p>
      </div>

      {session && (
        /* TODO. 글쓰기 페이지로 이동 */
        <Button asChild variant='secondary' className='px-4 py-2'>
          <Link href={'/edit'} className='font-p text-px14-300 text-foreground'>
            글쓰기
          </Link>
        </Button>
      )}
    </section>
  );
}
