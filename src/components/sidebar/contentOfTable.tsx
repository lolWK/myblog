'use client';

import { useEditor } from '@/provider/EditorProvider';
import { Icons } from '@/components/icons';
import { usePathname } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import type { TElement } from '@udecode/plate-common';

export default function ContentOfTableSidebar() {
  const { value } = useEditor();
  const { toast } = useToast();

  const scrollToElementByKey = (key: string) => {
    const element = document.querySelector(`[data-key='${key}']`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const pathname = usePathname();

  const handleShareClick = async () => {
    try {
      const url = `${window.location.origin}${pathname}`;
      await navigator.clipboard.writeText(url);

      toast({
        description: `링크가 클립보드에 복사되었습니다 ✅`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: `링크 복사에 실패했습니다 ❌`,
      });
    }
  };

  const renderListItem = (el: TElement, i: number) => {
    const isH2 = el.type === 'h2';
    const prefix = isH2 ? '•' : '-';
    const marginLeftClass = isH2 ? '' : 'ml-4';

    return (
      <li
        key={i}
        onClick={() => scrollToElementByKey(el.id as string)}
        className={`${marginLeftClass} cursor-pointer text-px12-300`}
      >
        {prefix} {el.children?.[0].text as string}
      </li>
    );
  };

  return (
    <aside className='sticky top-36 hidden w-36 font-p lg:block'>
      <div className='flex items-center gap-2'>
        <p className='text-px14-500'>목차</p>
        <Icons.ul className='h-4 w-4' strokeWidth={1.5} />
      </div>
      <ul className='mt-2 flex flex-col gap-1 text-px14-300'>
        {value.map((el, i) =>
          ['h2', 'h3'].includes(el.type) ? renderListItem(el, i) : null
        )}
      </ul>

      <div className='mt-5 flex items-center justify-between'>
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 border-none p-0'
          onClick={handleShareClick}
        >
          <Icons.share strokeWidth={1.5} className='h-5 w-5' />
        </Button>

        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 border-none p-0'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Icons.chevronUp
            strokeWidth={1.5}
            className='h-6 w-6 cursor-pointer'
          />
        </Button>
      </div>
    </aside>
  );
}
