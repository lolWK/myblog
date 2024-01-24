import PagePagination from '@/components/common/PagePagination';
import SectionHeader from '@/components/common/SectionHeader';
import PostList from '@/components/post/PostList';
import PostListHeader from '@/components/post/PostListHeader';
import { fetchPostCountByType, fetchPosts } from '@/queries/post';
import supabase from '@/lib/supabase';

type PageParams = {
  pageNum: string;
  postType: PostType;
};

export async function generateStaticParams() {
  const { data: postTypes } = await supabase.from('post_type').select('name');

  const postsPerPage = 8;

  if (!postTypes) return ['blog', 'note'];

  const paths = await Promise.all(
    postTypes.map(async (type) => {
      const postCount = await fetchPostCountByType(type.name as PostType);
      const totalPages = Math.ceil(postCount / postsPerPage);

      return Array.from({ length: totalPages }, (_, i) => ({
        params: { postType: type.name, pageNum: String(i + 1) },
      }));
    })
  );

  return paths.flat();
}

export default async function BlogAndNotesPage({
  params,
}: {
  params: PageParams;
}) {
  const { postType, pageNum } = params;

  const posts = await fetchPosts(postType, parseInt(pageNum));
  const postCount = await fetchPostCountByType(postType);

  return (
    <div className='flex flex-col gap-10'>
      <SectionHeader pageType={postType} />
      <div>
        <PostListHeader leftText='All' rightText={postCount} />
        <PostList posts={posts} />
        <PagePagination
          postCount={postCount}
          currentPageNum={parseInt(pageNum)}
          pageType={postType}
        />
      </div>
    </div>
  );
}
