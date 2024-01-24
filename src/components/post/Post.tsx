import { formatDate } from '@/util/formatDate';
import MyPlateEditor from '../editor/plateEditor';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Icons } from '@/components/icons';

const DynamicEditor = dynamic(() => import('../editor/plateEditor'), {
  suspense: true,
  ssr: false,
});

type PostProps = {
  post: PostWithContent;
};

export default function Post({ post }: PostProps) {
  console.log(post);

  return (
    <article>
      <div className='mb-8 mt-[104px] flex flex-col gap-2'>
        <h1 className='test-px16-500 font-h'>{post.title}</h1>
        <div className='flex items-center gap-1 text-neutral-400'>
          <Icons.calendar width={14} />
          <p className='font-p text-px12-500'>{formatDate(post.createdAt)}</p>
        </div>
      </div>

      <Suspense fallback={null}>
        <div>
          <DynamicEditor initialValue={post.content} isReadOnly={true} />
        </div>
      </Suspense>
    </article>
  );
}
