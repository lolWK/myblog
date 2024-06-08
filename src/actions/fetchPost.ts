'use server';

import { getPostDetail } from '@/queries/post';

export async function fetchPost(postId: string) {
  await getPostDetail(postId);

  if (!postId) throw new Error();
}
