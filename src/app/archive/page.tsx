import SectionHeader from '@/components/common/SectionHeader';
import PostListHeader from '@/components/post/PostListHeader';
import FolderIcon from '@/assets/icons/icon-folder.svg';
import BookIcon from '@/assets/icons/icon-book.svg';
import FilterArea from '@/components/common/FilterArea';

export default function ArchivePage() {
  return (
    <div className='flex flex-col gap-10'>
      <SectionHeader pageType={'archive'} />

      <section>
        <FilterArea>
          <FilterArea.Title
            icon={<FolderIcon className='h-4 w-4' fill='currentColor' />}
            text='주제'
          />
          <FilterArea.List items={[]} prefix='' />
        </FilterArea>

        <FilterArea>
          <FilterArea.Title
            icon={<BookIcon className='h-4 w-4' fill='currentColor' />}
            text='책장'
          />
          <FilterArea.List items={[{ name: 'aa', count: 0 }]} prefix='' />
        </FilterArea>
      </section>
    </div>
  );
}
