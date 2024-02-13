'use server';

import { z } from 'zod';
import { Database, Tables, Enums } from '@/types/supabaseDB';
import { revalidatePath } from 'next/cache';
// import supabase from '@/lib/supabase';
import { getPostTypeId } from '@/queries/post';
import { redirect } from 'next/navigation';
import { createClient } from '@/util/supabaseServer';
import { createAndLinkTags } from '.';

// Zod는 .nullish() 메서드를 제공하여 null 또는 undefined 값을 둘 다 허용하는 더 깔끔한 방법을 제공
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
  content: z.array(z.any()),
  tag: z
    .string()
    .nullish()
    .refine(
      (value) => {
        const regex = /^[^,\s]+(,[^,\s]+)*$/;
        return !value || regex.test(value);
      },
      {
        message:
          '태그 형식이 올바르지 않습니다. 태그1,태그2,태그3 형식으로 입력해주세요',
      }
    ),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    topic?: string[];
    tag?: string[];
    _form?: string[];
  };
}

export async function createPost(
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  console.log('들어왔어용', formData);
  const supabaseWithAuth = createClient();

  // const contentString = formData.get('content');
  let postId;

  const result = createPostSchema.safeParse({
    postType: formData.get('postType'),
    title: formData.get('title'),
    summary: formData.get('summary') ? formData.get('summary') : null,
    topic: formData.get('topic'),
    book: formData.get('book') ? formData.get('book') : null,
    content: JSON.parse(formData.get('content') as string),
    tag: formData.get('tag') ? formData.get('tag') : null,
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
    const { data, error } = await supabaseWithAuth
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
      .select(`id`);

    if (error) throw new Error(error.message);

    postId = data[0].id;

    if (result.data.tag) {
      await createAndLinkTags(postId, result.data.tag);
    }

    console.log(data);
  } catch (err: unknown) {
    console.log(err);

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

  // TODO. archive 페이지도 반영하기~
  revalidatePath(`/[postType]/[pageNum]`, 'page');
  redirect(`/post/${postId}`);

  // return { errors: {} };
}
