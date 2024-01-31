'use server';

import { revalidatePath } from 'next/cache';
import supabase from '@/lib/supabase';
import { redirect } from 'next/navigation';

export async function deletePost(postId: string, postType: PostType) {
  if (!postId) throw new Error();

  const { error } = await supabase.from('post').delete().eq('id', postId);

  if (error) throw new Error(error.message);

  // TODO. 성공 시 토스트 띄우장
  console.log('삭제 성공');

  // TODO. searchPage 정리 되면 거기도 revalidate 해야함
  revalidatePath(`/[postType]/page/[pageNum]`, 'page');
  redirect(`/${postType}/page/1`);
}
