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
  console.log(resultPosts);

  return (
    <div className='mt-20'>
      <div>
        <PostListHeader
          leftText={`"${query}" 검색 결과`}
          rightText={resultPosts.length}
        />
        {resultPosts.length > 0 ? (
          <PostList posts={resultPosts} />
        ) : (
          <p className='h-[250px] text-center font-p text-px16-400 leading-[250px]'>
            해당 검색 결과가 없어요 🥲
          </p>
        )}
      </div>
    </div>
  );
}
