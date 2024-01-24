import PrevNextPostButton from '@/components/common/PrevNextPostButton';
import Post from '@/components/post/Post';
import supabase from '@/lib/supabase';
import { fetchPostDetail } from '@/queries/post';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface DetailBlogPageProps {
  params: {
    postId: string;
    postType: PostType;
  };
}

// getServerSideProps에서는 props로 postId와 blog를 반환합니다.
export async function generateStaticParams() {
  // 여기에 정적 파라미터를 생성하는 로직을 작성하세요.
  const { data: posts } = await supabase
    .from('post')
    .select(`id, post_type(name)`);

  if (!posts) return [];

  return posts?.map(({ id, post_type }) => ({
    params: { postId: id, type: post_type?.name },
  }));
}

// DetailBlogPage 컴포넌트에서는 postId와 blog를 직접 props로 받습니다.
export default async function DetailPage({ params }: DetailBlogPageProps) {
  const { postId, postType } = params;
  const data = await fetchPostDetail(postId, postType);
  const { prevPost, nextPost, ...post } = data;

  if (!post) {
    notFound();
  }

  console.log(params);

  return (
    <div>
      <Post post={post} />

      <PrevNextPostButton
        prevPost={prevPost}
        nextPost={nextPost}
        type={postType}
      />
    </div>
  );
}
