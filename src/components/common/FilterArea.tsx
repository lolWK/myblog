import { ReactNode } from 'react';

type ListItemType = {
  name: string;
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
  prefix?: string;
};

export function FilterList({ items, prefix = '' }: FilterListProps) {
  return (
    <ul className='flex gap-2 text-px12-300'>
      {items.map((item) => (
        <li key={item.name}>
          {prefix}
          {item.name} ({item.count})
        </li>
      ))}
    </ul>
  );
}

type FilterAreaProps = {
  children: ReactNode;
};

export default function FilterArea({ children }: FilterAreaProps) {
  return <div className='flex flex-col gap-4 font-p'>{children}</div>;
}

FilterArea.Title = FilterTitle;
FilterArea.List = FilterList;
