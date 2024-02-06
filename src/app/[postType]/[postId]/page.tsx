import PrevNextPostButton from '@/components/common/PrevNextPostButton';
import PostDetailContent from '@/components/post/PostDetailContent';
import PostDetailHeader from '@/components/post/PostDetailHeader';
import ContentOfTableSidebar from '@/components/sidebar/contentOfTable';
import ListOfBookSeriesSidebar from '@/components/sidebar/listOfBookSeries';

import supabase from '@/lib/supabase';
import { fetchPostDetail } from '@/queries/post';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface PostDetailPageProps {
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
export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { postId, postType } = params;
  const data = await fetchPostDetail(postId, postType);

  console.log(postId, postType);

  // TOOD: 기능 수정하면서 data 들어오는 데이터 수정하기
  const { prevPost, nextPost, content, ...post } = data;

  if (!post) {
    notFound();
  }

  console.log(params);

  return (
    <>
      <article>
        <PostDetailHeader postInfo={post} />
        <PostDetailContent content={content} />
      </article>

      <PrevNextPostButton
        prevPost={prevPost}
        nextPost={nextPost}
        type={postType}
      />
    </>
  );
}
