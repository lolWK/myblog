import Link from 'next/link';
import { ReactNode } from 'react';

type ListItemType = {
  id: string;
  text: string;
  count: number;
};

type FilterTitleProps = {
  icon: ReactNode;
  text: string;
};

export function FilterTitle({ icon, text }: FilterTitleProps) {
  return (
    <p className='flex items-center gap-2 text-px14-400'>
      {icon} <span>{text}</span>
    </p>
  );
}

type FilterListProps = {
  items: ListItemType[];
  currentTag: string;
  currentFilter: string;
  prefix?: string;
};

/* filter랑 tag 다 있어야함 tag는 있는데 filter 없음.. 위에서 넣어줘야함 */
export function FilterList({
  items,
  currentTag,
  currentFilter,
  prefix = '',
}: FilterListProps) {
  return (
    <ul className='flex flex-wrap items-center gap-2 text-px12-300'>
      {items.map((item) => {
        const isCurrentTag =
          item.text.toLowerCase() === currentTag?.toLowerCase();
        const listItemClass = isCurrentTag
          ? `hover:bg-accent border-b-[1px] border-current py-1 px-1 transition-colors font-medium`
          : 'hover:bg-accent py-1 px-1 transition-colors';

        return (
          <li key={item.id} className={listItemClass}>
            <Link href={`/archive?filter=${currentFilter}&tag=${item.text}`}>
              {prefix}
              {item.text} ({item.count})
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

type FilterAreaProps = {
  children: ReactNode;
};

export default function FilterArea({ children }: FilterAreaProps) {
  return <div className='flex flex-col gap-3 font-p'>{children}</div>;
}

FilterArea.Title = FilterTitle;
FilterArea.List = FilterList;
