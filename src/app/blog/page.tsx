import SectionHeader from '@/components/common/SectionHeader';
import PostList from '@/components/post/PostList';
import { fetchPosts } from '@/queries/post';

export default function BlogPage() {
  // const posts = await fetchPosts('blog', 0);

  // console.log(posts);
  return (
    <main>
      <SectionHeader pageType="blog" />

      {/* <PostList posts={posts} /> */}
    </main>
  );
}
