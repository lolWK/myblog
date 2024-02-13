'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getPostTypeId } from '@/queries/post';
import { createClient } from '@/util/supabaseServer';
import {
  checkTagInTagTable,
  createNewTag,
  deleteTag,
  fetchTagsForPost,
} from '@/queries/tag';

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

interface UpdatePostFormState {
  errors: {
    title?: string[];
    topic?: string[];
    tag?: string[];
    _form?: string[];
  };
}
//

export async function updatePost(
  { postId }: { postId: string | null },
  formState: UpdatePostFormState,
  formData: FormData
): Promise<UpdatePostFormState> {
  const supabaseWithAuth = createClient();

  if (!postId) throw new Error();

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
    console.log('수정중', result);
    const postTypeId = await getPostTypeId(result.data.postType);
    console.log('postTypeId', postTypeId);

    const { error } = await supabaseWithAuth
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

    if (error) throw new Error(error.message);

    if (result.data.tag) {
      await updatePostTags(postId, result.data.tag);
    }
    console.log('업데이트됨!');
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

const updatePostTags = async (postId: string, userInputTags: string) => {
  const supabaseWithAuth = createClient();

  const newTags = userInputTags.split(',').map((tag) => tag.trim());

  const currentTags: Tag[] | null = await fetchTagsForPost(postId);
  const currentTagNames = currentTags ? currentTags.map((tag) => tag.name) : [];

  const tagsToAdd = newTags.filter((tag) => !currentTagNames.includes(tag));
  const tagsToRemove = currentTagNames.filter((tag) => !newTags.includes(tag));

  for (let tagName of tagsToAdd) {
    const checkTags = await checkTagInTagTable(tagName);

    if (checkTags) {
      const { error } = await supabaseWithAuth
        .from('post_tag')
        .insert([{ post_id: postId, tag_id: checkTags.id }]);

      if (error) throw new Error(error.message);
    }

    if (!checkTags) {
      const addedId = await createNewTag(tagName);

      const { error } = await supabaseWithAuth
        .from('post_tag')
        .insert([{ post_id: postId, tag_id: addedId }]);

      if (error) throw new Error(error.message);
    }
  }

  if (tagsToRemove && tagsToRemove.length > 0) {
    if (!currentTags) return;

    const tagIdsToRemove = currentTags
      .filter((tag) => tagsToRemove.includes(tag.name))
      .map((tag) => tag.id);

    for (let tagId of tagIdsToRemove) {
      await deleteTag(postId, tagId);
    }
  }
};
