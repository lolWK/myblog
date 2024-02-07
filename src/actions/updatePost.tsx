'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import supabase from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { getPostTypeId } from '@/queries/post';

const createPostSchema = z.object({
  postType: z.enum(['blog', 'note']).default('blog'),
  title: z.string().min(1, {
    message: '제목을 입력해주세요',
  }),
  summary: z.string().nullable().optional(),
  topic: z.string({
    required_error: '주제를 선택해주세요',
    invalid_type_error: '주제를 선택해주세요',
  }),
  book: z.string().nullable().optional(),
  content: z.array(z.any()).optional(),
});

interface UpdatePostFormState {
  errors: {
    title?: string[];
    topic?: string[];
    _form?: string[];
  };
}
//

export async function updatePost(
  { postId }: { postId: string | null },
  formState: UpdatePostFormState,
  formData: FormData
): Promise<UpdatePostFormState> {
  if (!postId) throw new Error();

  // post Id로 post type 이름 찾고 이전 이후 같으면 그 페이지만
  // 다르면 양쪽 다 revalidate 해줘야함 ;;

  const contentString = formData.get('content');

  const result = createPostSchema.safeParse({
    postType: formData.get('postType'),
    title: formData.get('title'),
    summary: formData.get('summary') ? formData.get('summary') : null,
    topic: formData.get('topic'),
    book: formData.get('book') ? formData.get('book') : null,
    content: contentString ? JSON.parse(contentString as string) : [],
  });

  console.log(result);

  if (!result.success) {
    console.log('Validation Error:', result.error);

    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    console.log('수정중', result);
    const postTypeId = await getPostTypeId(result.data.postType);
    console.log('postTypeId', postTypeId);

    const { error } = await supabase
      .from('post')
      .update({
        type_id: postTypeId,
        title: result.data.title,
        summary: result.data.summary,
        topic_id: result.data.topic,
        book_id: result.data.book,
        content: result.data.content,
      })
      .eq('id', postId);

    console.log('업데이트됨!');

    if (error) throw new Error(error.message);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }

  // TODO. 성공 시 토스트 띄우장

  // TODO. searchPage 정리 되면 거기도 revalidate 해야함
  revalidatePath(`/[postType]/[pageNum]`, 'page');
  redirect(`/post/${postId}`);
}
