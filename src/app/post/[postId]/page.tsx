import PrevNextPostButton from '@/components/common/PrevNextPostButton';
import PostDetailContent from '@/components/post/PostDetailContent';
import PostDetailHeader from '@/components/post/PostDetailHeader';
import PostDetailTags from '@/components/post/postDetailTags';
import ContentOfTableSidebar from '@/components/sidebar/contentOfTable';
import ListOfBookSeriesSidebar from '@/components/sidebar/listOfBookSeries';

import supabase from '@/lib/supabase';
import { fetchPostDetail } from '@/queries/post';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface PostDetailPageProps {
  params: {
    postId: string;
  };
}

// getServerSideProps에서는 props로 postId와 blog를 반환합니다.
export async function generateStaticParams() {
  // 여기에 정적 파라미터를 생성하는 로직을 작성하세요.
  const { data: posts } = await supabase.from('post').select('id');

  if (!posts) return [];

  return posts?.map(({ id }) => ({
    params: { postId: id },
  }));
}

// DetailBlogPage 컴포넌트에서는 postId와 blog를 직접 props로 받습니다.
export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { postId } = params;
  const data = await fetchPostDetail(postId);

  console.log(postId);

  // TOOD: 기능 수정하면서 data 들어오는 데이터 수정하기
  const { prevPost, nextPost, content, tag, ...post } = data;

  if (!post) {
    notFound();
  }

  console.log(params);

  return (
    <>
      <div className='relative mt-[104px] flex w-full'>
        <div className='absolute -right-48 order-3 h-full'>
          <ContentOfTableSidebar />
        </div>
        <div className='absolute -left-48 order-1 h-full'>
          <ListOfBookSeriesSidebar currentBook={post.book} postId={post.id} />
        </div>
        <article className='order-2 flex-grow'>
          <PostDetailHeader postInfo={post} />
          <PostDetailContent content={content} />
          <PostDetailTags tags={tag} />
        </article>
      </div>

      <PrevNextPostButton prevPost={prevPost} nextPost={nextPost} />
    </>
  );
}
