'use client';

import Link from 'next/link';
import { SessionContext } from '@/provider/SessionProvider';
import { useContext } from 'react';
import { Icons } from '@/components/icons';
import { formatDate } from '@/util/formatDate';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import CustomBadge from '../common/CustomBadge';
import * as actions from '@/actions';

// TODO. any 타입 수정하기
type PostDeatilHeaderProps = {
  postInfo: any;
};

export default function PostDetailHeader({ postInfo }: PostDeatilHeaderProps) {
  const session = useContext(SessionContext);

  const handleDeletePost = (postId: string, postType: PostType) => {
    actions.deletePost(postId, postType);
  };

  return (
    <div className='mb-8 flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <CustomBadge type='topic'>{postInfo.topic}</CustomBadge>
          <h1 className='test-px16-500 font-h'>{postInfo.title}</h1>
        </div>
        {session && (
          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='icon'
              className='h-6 w-6 border-0'
              asChild
            >
              <Link href={`/edit/${postInfo.id}`}>
                <Icons.edit width={16} strokeWidth={1.5} />
              </Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger>
                <Icons.delete
                  width={16}
                  strokeWidth={1.5}
                  className='text-destructive'
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className='font-p font-normal'>
                    해당 글을 삭제하실 건가요?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction
                    className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    onClick={() =>
                      handleDeletePost(postInfo.id, postInfo.postType)
                    }
                  >
                    삭제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      <div className='flex items-center gap-1 text-neutral-400'>
        <Icons.calendar width={14} />
        <p className='font-p text-px12-500'>{formatDate(postInfo.createdAt)}</p>
      </div>
    </div>
  );
}
