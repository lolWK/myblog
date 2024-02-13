import PostList from '@/components/post/PostList';
import PostListHeader from '@/components/post/PostListHeader';
import { fetchSearchResult, fetchSearchPostByTagName } from '@/queries/post';

type SearchPageProps = {
  searchParams: {
    query?: string;
    tag?: string;
  };
};

/** TODO.
 * 1. content 내용도 검색 되게 하기
 * 2. pagination 작업
 */

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query, tag } = searchParams;

  let searchResult: Post[] = [];
  let searchText: string = '';

  if (query) {
    searchText = `검색어 - "${query}"`;
    searchResult = await fetchSearchResult(query);
  }

  if (tag) {
    searchText = `태그 - "${tag}"`;
    searchResult = await fetchSearchPostByTagName(tag);
  }

  console.log(searchResult);

  return (
    <div className='mt-20'>
      <div>
        <PostListHeader
          leftText={`${searchText} 검색 결과`}
          rightText={searchResult.length}
        />
        {searchResult.length > 0 ? (
          <PostList posts={searchResult} />
        ) : (
          <p className='h-[250px] text-center font-p text-px16-400 leading-[250px]'>
            해당 검색 결과가 없어요 🥲
          </p>
        )}
      </div>
    </div>
  );
}
