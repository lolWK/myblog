import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import type { TElement } from '@udecode/plate-common';

const DynamicEditor = dynamic(() => import('../editor/plateEditor'), {
  suspense: true,
  ssr: false,
});

type PostProps = {
  content: TElement[];
};

export default function PostDetailContent({ content }: PostProps) {
  console.log(content);

  return (
    <>
      <Suspense fallback={null}>
        <DynamicEditor initialValue={content} isReadOnly={true} />
      </Suspense>
    </>
  );
}
