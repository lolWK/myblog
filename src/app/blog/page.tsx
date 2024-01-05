import SectionHeader from '@/components/common/SectionHeader';
import PostList from '@/components/post/PostList';
import PostListHeader from '@/components/post/PostListHeader';
import { fetchPostCountByType, fetchPosts } from '@/queries/post';

export default async function BlogPage() {
  const posts = await fetchPosts('blog', 0);
  const postCount = await fetchPostCountByType('blog');

  // console.log(posts);
  console.log(postCount);
  return (
    <main className="flex flex-col gap-10">
      <SectionHeader pageType="blog" />
      {/* 전체 글 갯수 따로 가져와야하네? 오호 */}
      <div>
        <PostListHeader leftText="All" rightText={11} />
        <PostList posts={posts} />
      </div>
    </main>
  );
}
