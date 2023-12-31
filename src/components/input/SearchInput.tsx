'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import SearchIcon from '@/assets/icons/icon-search.svg';
import { Label } from '@/components/ui/label';

let uniqueIdCounter = 0;

export default function SearchInput() {
  const [id] = useState(() => {
    uniqueIdCounter += 1;
    return `search-${uniqueIdCounter}`;
  });

  return (
    <form className="relative">
      <Label
        htmlFor={id}
        className="colors-foreground cursor-pointer absolute top-[50%] -translate-y-2/4 right-3"
      >
        <SearchIcon width={16} height={16} stroke="currentColor" />
        <span className="sr-only">검색</span>
      </Label>

      <Input
        type="text"
        className="absolute -top-[20px] right-0 bg-transparent w-0 focus:w-[160px] border-none focus:outline-none transition-width duration-300 pr-8"
        id={id}
        autoComplete="off"
      />
    </form>
  );
}
