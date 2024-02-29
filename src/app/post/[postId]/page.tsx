import type { Metadata } from 'next';

import PrevNextPostButton from '@/components/common/PrevNextPostButton';
import PostDetailContent from '@/components/post/PostDetailContent';
import PostDetailHeader from '@/components/post/PostDetailHeader';
import PostDetailTags from '@/components/post/postDetailTags';
import ContentOfTableSidebar from '@/components/sidebar/contentOfTable';
import ListOfBookSeriesSidebar from '@/components/sidebar/listOfBookSeries';

import { fetchPostIds, getPostDetail } from '@/queries/post';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface PostDetailPageProps {
  params: {
    postId: string;
  };
}

export async function generateMetadata({
  params: { postId },
}: PostDetailPageProps): Promise<Metadata> {
  const data = await getPostDetail(postId);

  return {
    title: data.title,
    description: data.summary,
  };
}

export async function generateStaticParams() {
  const postIds = await fetchPostIds();

  if (!postIds) return [];

  return postIds?.map(({ id }) => ({
    postId: id,
  }));
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { postId } = params;
  const data = await getPostDetail(postId);

  const { prevPost, nextPost, content, tag, ...post } = data;

  if (!post) {
    notFound();
  }

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
