import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import type { TElement } from '@udecode/plate-common';

const DynamicEditor = dynamic(() => import('../editor/plateEditor'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

type PostProps = {
  content: TElement[];
};

export default function PostDetailContent({ content }: PostProps) {
  console.log(content);

  return (
    <>
      <DynamicEditor initialValue={content} isReadOnly={true} />
    </>
  );
}
