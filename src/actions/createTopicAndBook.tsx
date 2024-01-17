'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import supabase from '@/lib/supabase';

const createTopicAndBookSchema = z.object({
  content: z.string().min(1, {
    message: '값을 입력해주세요',
  }),
});

interface CreateTopicAndBookFormState {
  errors: {
    content?: string[];
    _form?: string[]; // 다른 오류일 경우 (ex 비로그인)
  };
  success?: boolean; // 성공하면 성공했다고 토스트 띄울까?
}

export async function createTopicAndBook(
  type: string,
  formState: CreateTopicAndBookFormState,
  formData: FormData
): Promise<CreateTopicAndBookFormState> {
  const result = createTopicAndBookSchema.safeParse({
    content: formData.get('content'),
  });

  const isVaildType = type === 'topic' || type === 'book';

  if (!isVaildType) {
    return {
      errors: {
        _form: ['추가에 오류가 발생 했어요. (책장, 주제가 아님)'],
      },
    };
  }

  // const session = await auth();
  // if (!session || !session.user) {
  //   return {
  //     errors: {
  //       _form: ['You must be signed in to do this.'],
  //     },
  //   };
  // }

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const insertData =
      type === 'topic'
        ? { name: result.data.content }
        : { title: result.data.content };

    const { data, error } = await supabase
      .from(type)
      .insert(insertData)
      .select();

    console.log(type, '에 추가됬오용', data);

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

  revalidatePath('/edit');

  return {
    errors: {},
    success: true,
  };
}
