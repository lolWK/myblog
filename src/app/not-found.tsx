import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='mt-32 flex h-full w-full flex-col items-center justify-center text-center font-p text-px16-400'>
      <h1 className='mb-4 text-px16-500'>존재하지 않는 페이지에요 – 404!</h1>
      <Button asChild>
        <Link href='/'>홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
