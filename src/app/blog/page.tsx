import PagePagination from '@/components/common/PagePagination';
import SectionHeader from '@/components/common/SectionHeader';
import PostList from '@/components/post/PostList';
import PostListHeader from '@/components/post/PostListHeader';
import { fetchPostCountByType, fetchPosts } from '@/queries/post';

export const revalidate = 0;

export default async function BlogPage() {
  const posts = await fetchPosts('blog', 0);
  const postCount = await fetchPostCountByType('blog');

  return (
    <main className='flex flex-col gap-10'>
      <SectionHeader pageType='blog' />
      <div>
        <PostListHeader leftText='All' rightText={postCount} />
        <PostList posts={posts} />
        <PagePagination />
      </div>
    </main>
  );
}
