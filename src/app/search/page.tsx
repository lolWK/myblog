import PostList from '@/components/post/PostList';
import PostListHeader from '@/components/post/PostListHeader';
import { fetchSearchResult } from '@/queries/post';

type SearchPageProps = {
  searchParams: {
    query: string;
  };
};

/** TODO.
 * 1. content 내용도 검색 되게 하기
 * 2. pagination 작업
 */

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = searchParams;

  const resultPosts = await fetchSearchResult(query);

  return (
    <div className='mt-20'>
      <div>
        <PostListHeader
          leftText={`"${query}" 검색 결과`}
          rightText={resultPosts.length}
        />
        <PostList posts={resultPosts} />
      </div>
    </div>
  );
}
