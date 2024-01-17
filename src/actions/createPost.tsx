'use server';

import { z } from 'zod';
import { Database, Tables, Enums } from '@/types/supabaseDB';
import { revalidatePath } from 'next/cache';
import supabase from '@/lib/supabase';
import { getPostTypeId } from '@/queries/post';
import { redirect } from 'next/navigation';

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

interface CreatePostFormState {
  errors: {
    title?: string[];
    topic?: string[];
    _form?: string[];
  };
}
// : Tables<'post'>
export async function createPost(
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  console.log('들어왔어용', formData);

  const contentString = formData.get('content');

  console.log(formData.get('topic'));

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
    const postTypeId = await getPostTypeId(result.data.postType);

    /* TODO. form 에러 따로 화면에 메시지 추가하기 */
    if (!postTypeId) {
      return {
        errors: { _form: ['Cannot find post'] },
      };
    }

    const { data, error } = await supabase
      .from('post')
      .insert([
        {
          type_id: postTypeId,
          title: result.data.title,
          summary: result.data.summary,
          topic_id: result.data.topic,
          book_id: result.data.book,
          content: result.data.content,
        },
      ])
      .select();

    console.log('제대로 들어갓다', data);

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

  // TODO. 블로그 글 일 경우 노트일 경우 처리하기
  revalidatePath('/blog');
  redirect('/blog');
}
