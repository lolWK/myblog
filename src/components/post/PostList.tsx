'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import CustomBadge from '@/components/common/CustomBadge';
import BookIcon from '@/assets/icons/icon-book.svg';
import { useDebounce } from '@/hooks/useDebounce';
import { formatDate } from '@/util/formatDate';
import { fetchPost } from '@/actions/fetchPost';
interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const [hoverIndex, setHoverIndex] = useState<string | undefined>(undefined);
  const debouncedHoverIndex = useDebounce(hoverIndex, 300);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (debouncedHoverIndex) {
      fetchPost(debouncedHoverIndex);
    }
  }, [debouncedHoverIndex]);

  const handleMouseOver = (itemId: string) => {
    setHoverIndex(itemId);
  };

  const handleMouseOut = () => {
    setHoverIndex(undefined);
  };

  if (!posts)
    return (
      <p className='h-[250px] text-center font-p text-px16-400 leading-[250px]'>
        곧 글을 등록할 예정이에요 😊
      </p>
    );

  return (
    <div className='h-[470px]'>
      <Accordion
        type='single'
        value={debouncedHoverIndex}
        onValueChange={setHoverIndex}
        className='w-full'
      >
        {posts.map((item, index) => (
          <Link href={`/post/${item.id}`} key={item.id}>
            <AccordionItem
              value={item.id.toString()}
              onMouseOver={() => handleMouseOver(item.id.toString())}
              onMouseOut={handleMouseOut}
            >
              <AccordionTrigger className='flex w-full items-center justify-between'>
                <div className='flex min-w-0 flex-1 items-center gap-4'>
                  <div className='flex-none'>
                    <CustomBadge type='topic'>{item.topic}</CustomBadge>
                  </div>

                  <h3 className='max-w-[70%] flex-grow truncate text-left font-h text-px14-300 sm:text-px16-300'>
                    {item.title}
                  </h3>
                </div>

                <span className='font-h text-px12-300 text-neutral-400 sm:text-px14-300'>
                  {formatDate(item.createdAt)}
                </span>
              </AccordionTrigger>

              <AccordionContent className='flex flex-col gap-1'>
                {item.summary && (
                  <p className='font-p text-px14-300 text-neutral-500'>
                    {item.summary}
                  </p>
                )}
                {item.book && (
                  <span className='flex items-center gap-1 text-neutral-500'>
                    <BookIcon width={16} height={16} fill='currentColor' />
                    {item.book}
                  </span>
                )}
                {/* • 나중에 읽는 시간 추가 */}
              </AccordionContent>
            </AccordionItem>
          </Link>
        ))}
      </Accordion>
    </div>
  );
}
