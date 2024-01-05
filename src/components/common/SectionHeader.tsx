'use client';

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
    <section className="mt-10 sm:mt-20 flex justify-between">
      <div className="font-h text-px16-300 flex items-center gap-8">
        <h2>{name}</h2>
        <p className="sm-visible-hide">{description}</p>
      </div>

      {session && (
        /* TODO. 글쓰기 페이지로 이동 */
        <Button
          variant="secondary"
          className="font-p text-px14-300 text-foreground px-4 py-2"
        >
          글쓰기
        </Button>
      )}
    </section>
  );
}
