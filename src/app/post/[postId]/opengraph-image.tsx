import { ImageResponse } from 'next/og';
import { getPostDetail } from '@/queries/post';

export const size = {
  width: 1200,
  height: 630,
};

interface PostDetailPageProps {
  params: {
    postId: string;
  };
}

export default async function Image({ params }: PostDetailPageProps) {
  const { postId } = params;
  const data = await getPostDetail(postId);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data.title}
      </div>
    ),
    {
      ...size,
    }
  );
}
