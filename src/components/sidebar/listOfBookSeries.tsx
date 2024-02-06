import { fetchListOfBookSeries } from '@/queries/book';
import BookIcon from '@/assets/icons/icon-book.svg';
import Link from 'next/link';

type ListOfBookSeriesSidebarProps = {
  currentBook: string | null;
  postId: string;
};

// TODO. Link 적용 해야함~
export default async function ListOfBookSeriesSidebar({
  currentBook,
  postId,
}: ListOfBookSeriesSidebarProps) {
  if (!currentBook) return;

  const seriesList = await fetchListOfBookSeries(postId);

  return (
    <aside className='sticky top-20 hidden w-36 lg:block'>
      <div className='flex items-center justify-end gap-1'>
        <BookIcon className='h-4 w-4' fill='currentColor' />
        <span className='font-p text-px14-500'>{currentBook}</span>
      </div>
      <ul className='mt-2 flex flex-col gap-1 text-right font-p'>
        {seriesList?.map((post, index) => {
          const listItemClass =
            postId === post.id ? 'text-px12-500' : 'text-px12-300';

          return (
            <li key={post.id} className={listItemClass}>
              {index + 1}. {post.title}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
