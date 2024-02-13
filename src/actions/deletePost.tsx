'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/util/supabaseServer';
import { deleteUnusedTag, fetchTagsForPost } from '@/queries/tag';

export async function deletePost(postId: string, postType: PostType) {
  const supabaseWithAuth = createClient();

  const tags = await fetchTagsForPost(postId);

  if (!postId) throw new Error();

  const { error } = await supabaseWithAuth
    .from('post')
    .delete()
    .eq('id', postId);

  if (error) throw new Error(error.message);

  if (tags) {
    for (let tag of tags) {
      await deleteUnusedTag(tag.id);
    }
  }

  // TODO. 성공 시 토스트 띄우장
  console.log('삭제 성공');

  // TODO. searchPage 정리 되면 거기도 revalidate 해야함
  revalidatePath(`/[postType]/[pageNum]`, 'page');
  redirect(`/${postType}/1`);
}
