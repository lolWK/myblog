import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

type Props = {
  prevPost: PrevAndNextPost;
  nextPost: PrevAndNextPost;
  type: PostType;
};

export default function PrevNextPostButton({
  prevPost,
  nextPost,
  type,
}: Props) {
  console.log('타입???????????', type);

  return (
    <div className='relative w-full'>
      {prevPost && (
        <Button
          asChild
          variant='ghost'
          className='absolute left-0 p-0 font-p hover:bg-transparent'
        >
          <Link href={`/${type}/${prevPost?.id}`}>
            <div className='flex flex-col justify-start gap-1'>
              <div className='flex items-center gap-1'>
                <Icons.arrowLeft width={20} strokeWidth={1.5} />
                <span className='text-px14-400'>이전 글</span>
              </div>
              <p className='ml-6 text-px14-500'>{prevPost?.title}</p>
            </div>
          </Link>
        </Button>
      )}
      {nextPost && (
        <Button
          asChild
          variant='ghost'
          className='absolute right-0 p-0 font-p hover:bg-transparent'
        >
          <Link href={`/${type}/${nextPost?.id}`}>
            <div className='flex flex-col justify-start gap-1'>
              <div className='flex items-center gap-1'>
                <span className='text-px14-400'>다음 글</span>
                <Icons.arrowRight width={20} strokeWidth={1.5} />
              </div>
              <p className='mr-6 text-px14-500'>{nextPost?.title}</p>
            </div>
          </Link>
        </Button>
      )}
    </div>
  );
}
