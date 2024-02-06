import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

type Props = {
  prevPost: PrevAndNextPost;
  nextPost: PrevAndNextPost;
};

export default function PrevNextPostButton({ prevPost, nextPost }: Props) {
  return (
    <div className='relative h-28 w-full'>
      {prevPost && (
        <Button
          asChild
          variant='ghost'
          className='absolute left-0 flex h-fit w-2/5 min-w-40 justify-start p-0 font-p hover:bg-transparent'
        >
          <Link href={`/${prevPost.postType}/${prevPost?.id}`}>
            <div className='flex flex-col justify-start gap-1'>
              <div className='flex items-center gap-1'>
                <Icons.arrowLeft width={20} strokeWidth={1.5} />
                <span className='text-px14-400'>이전 글</span>
              </div>
              <p className='ml-6 text-wrap text-px14-500'>{prevPost?.title}</p>
            </div>
          </Link>
        </Button>
      )}
      {nextPost && (
        <Button
          asChild
          variant='ghost'
          className='absolute right-0 flex h-fit w-2/5 min-w-40 justify-end p-0 font-p hover:bg-transparent'
        >
          <Link href={`/${nextPost.postType}/${nextPost?.id}`}>
            <div className='flex flex-col justify-end gap-1'>
              <div className='flex flex-row-reverse items-center gap-1'>
                <Icons.arrowRight width={20} strokeWidth={1.5} />
                <span className='text-px14-400'>다음 글</span>
              </div>
              <p className='mr-6 text-wrap text-px14-500'>{nextPost?.title}</p>
            </div>
          </Link>
        </Button>
      )}
    </div>
  );
}
