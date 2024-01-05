'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import CustomBadge from '@/components/common/CustomBadge';
import BookIcon from '@/assets/icons/icon-book.svg';
import { useDebounce } from '@/hooks/useDebounce';
import { formatDate } from '@/util/formatData';
interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  // console.log(posts);

  const [hoverIndex, setHoverIndex] = useState<string | undefined>(undefined);
  const debouncedHoverIndex = useDebounce(hoverIndex, 300);

  const handleMouseOver = (itemId: string) => {
    setHoverIndex(itemId);
  };

  const handleMouseOut = () => {
    setHoverIndex(undefined);
  };

  return (
    <Accordion
      type="single"
      value={debouncedHoverIndex}
      onValueChange={setHoverIndex}
      className="w-full"
    >
      {posts.map((item, index) => (
        <AccordionItem
          key={item.id}
          value={item.id.toString()}
          onMouseOver={() => handleMouseOver(item.id.toString())}
          onMouseOut={handleMouseOut}
        >
          <AccordionTrigger className="flex justify-between items-center w-full">
            <div className="flex gap-4 flex-1 min-w-0 items-center">
              <div className="flex-none">
                <CustomBadge type="topic">{item.topic}</CustomBadge>
              </div>

              <h3 className="font-h text-px14-300 sm:text-px16-300 truncate flex-grow max-w-[70%] text-left">
                {item.title}
              </h3>
            </div>

            <span className="font-h text-px12-300 sm:text-px14-300 text-neutral-400">
              {formatDate(item.createdAt)}
            </span>
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-1">
            {item.summary && (
              <p className="font-p text-px14-300 text-neutral-500">{item.summary}</p>
            )}
            {item.book && (
              <span className="text-neutral-500 flex gap-1 items-center">
                <BookIcon width={16} height={16} fill="currentColor" />
                {item.book}
              </span>
            )}
            {/* • 나중에 읽는 시간 추가 */}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
