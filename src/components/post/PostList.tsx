// import LeftIcon from '@/assets/icons/icon-arrow-left.svg';
'use client';

import { SetStateAction, useRef, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  console.log(posts);
  const [hoverIndex, setHoverIndex] = useState<string | undefined>(undefined);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseOver = (item: SetStateAction<string | undefined>) => {
    if (timeoutRef.current) {
      console.log(timeoutRef);

      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setHoverIndex(item);
    }, 250);
  };

  const handleMouseOut = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoverIndex(undefined);
  };

  return (
    <Accordion
      type="single"
      value={hoverIndex}
      onValueChange={setHoverIndex}
      className="w-full"
    >
      {['item-1', 'item-2', 'item-3'].map((item, index) => (
        <AccordionItem
          key={item}
          value={item}
          onMouseOver={() => handleMouseOver(item)}
          onMouseOut={handleMouseOut}
        >
          <AccordionTrigger>{`Item ${index + 1}`}</AccordionTrigger>
          <AccordionContent>Content for item {index + 1}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
