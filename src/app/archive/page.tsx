import SectionHeader from '@/components/common/SectionHeader';
import PostListHeader from '@/components/post/PostListHeader';
import FolderIcon from '@/assets/icons/icon-folder.svg';
import BookIcon from '@/assets/icons/icon-book.svg';
import FilterArea from '@/components/common/FilterArea';
import PostList from '@/components/post/PostList';
import PagePagination from '@/components/common/PagePagination';

import { fetchAllTopicListWithCount } from '@/queries/topic';
import { fetchAllBookListWithCount } from '@/queries/book';
import { fetchPostFilteredByTopicAndBook } from '@/queries/post';
import { getArchiveListHeader } from '@/util/getArchiveListHeader';

type ArchivePageProps = {
  searchParams: {
    filter: 'topic' | 'book';
    keyword: string;
    page: string;
  };
};

export default async function ArchivePage({ searchParams }: ArchivePageProps) {
  const currentPage = parseInt(searchParams.page) || 1;
  const filter = searchParams.filter || 'All';
  const keyword = searchParams.keyword || 'All';

  const topicList = await fetchAllTopicListWithCount();
  const bookList = await fetchAllBookListWithCount();
  const { posts, postsCount } = await fetchPostFilteredByTopicAndBook(
    filter,
    keyword,
    currentPage
  );

  return (
    <div className='flex flex-col gap-10'>
      <SectionHeader pageType={'archive'} />

      <section className='flex flex-col gap-5'>
        <FilterArea>
          <FilterArea.Title
            icon={<FolderIcon className='h-4 w-4' fill='currentColor' />}
            text={'주제'}
          />
          <FilterArea.List
            items={topicList}
            currentKeyword={keyword}
            currentFilter={'topic'}
          />
        </FilterArea>

        <FilterArea>
          <FilterArea.Title
            icon={<BookIcon className='h-4 w-4' fill='currentColor' />}
            text={'책장'}
          />
          <FilterArea.List
            items={bookList}
            currentKeyword={keyword}
            currentFilter={'book'}
          />
        </FilterArea>
      </section>

      <section>
        <PostListHeader
          leftText={getArchiveListHeader(filter, keyword)}
          rightText={postsCount}
        />
        <PostList posts={posts} />
        <PagePagination
          allPostCount={postsCount}
          currentPageNum={currentPage}
          href={`/archive?filter=${filter}&keyword=${keyword}&page=`}
        />
      </section>
    </div>
  );
}
