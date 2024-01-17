'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import MyPlateEditor from '@/components/editor/plateEditor';
import { useRef } from 'react';
import type { PlateEditor, TElement } from '@udecode/plate-common';
import * as actions from '@/actions';
import { useFormState } from 'react-dom';
import TopicAndBookAddButton from './editor/TopicAndBookAddButton';

// const formSchema = z.object({
//   postType: z.enum(['blog', 'note']).default('blog'),
//   title: z.string().min(1, {
//     message: '제목을 입력해주세요',
//   }),
//   summary: z.string().nullable().optional(),
//   topic: z
//     .string()
//     .min(1, {
//       message: '주제를 선택해주세요',
//     })
//     .nullable(),
//   book: z.string().nullable().optional(),
//   content: z.array(z.any()).optional(),
// });

interface EditInputFormData {
  postType: string;
  title: string;
  summary: string | undefined;
  topic: string | undefined;
  book: string | undefined;
  content: TElement[];
}

interface EditFormProps {
  bookList: Book[] | null;
  topicList: Topic[] | null;
}

export default function EditForm({ bookList, topicList }: EditFormProps) {
  const [formState, action] = useFormState(actions.createPost, {
    errors: {},
  });

  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      postType: 'blog',
      title: '',
      summary: '',
      topic: '',
      book: '',
      content: [],
      // tag:''
    },
  });

  const editorRef = useRef<PlateEditor | null>(null);

  const onSubmit = (post: EditInputFormData) => {
    console.log(post);

    let editorData: TElement[] = [];

    if (editorRef.current) {
      const content = editorRef.current.children;
      editorData = content;
      console.log(content);
    }

    const formData = new FormData();

    // 명시적으로 각 필드를 FormData에 추가
    formData.append('postType', post.postType);
    formData.append('title', post.title);
    if (post.summary) formData.append('summary', post.summary);
    if (post.topic) formData.append('topic', post.topic);
    if (post.book) formData.append('book', post.book);
    if (editorData.length > 0) {
      formData.append('content', JSON.stringify(editorData));
    }
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    action(formData);

    // const completeData = {
    //   ...formData,
    //   content: editorData, // 에디터 데이터를 폼 데이터에 추가
    // };
    // console.log(completeData);

    // action(completeData);
  };

  // const handleSubmit = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-12 w-full space-y-6'
      >
        {/* 타입 */}

        <FormField
          control={form.control}
          name='postType'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4 space-y-0'>
              <FormLabel className='font-h text-px16-400'>타입</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex'
                >
                  <FormItem className='rounded-md border border-border bg-popover px-4 py-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-2 [&:has([data-state=checked])]:border-primary'>
                    <FormControl className='peer sr-only'>
                      <RadioGroupItem value='blog' id='blog' />
                    </FormControl>
                    <FormLabel htmlFor='blog' className='font-p text-px14-300'>
                      Blog
                    </FormLabel>
                  </FormItem>
                  <FormItem className='rounded-md border border-border bg-popover px-4 py-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-2 [&:has([data-state=checked])]:border-primary'>
                    <FormControl className='peer sr-only'>
                      <RadioGroupItem value='note' id='note' />
                    </FormControl>
                    <FormLabel htmlFor='note' className='font-p text-px14-300'>
                      Note
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {/* 제목 */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-4 space-y-0'>
                <FormLabel className='flex shrink-0 font-h text-px16-400'>
                  제목
                </FormLabel>
                <FormControl>
                  <Input placeholder='제목을 입력해주세요' {...field} />
                </FormControl>
              </div>

              <FormMessage className='font-p text-px12-400 text-destructive'>
                {formState.errors.title?.join(', ')}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* 설명 */}
        <FormField
          control={form.control}
          name='summary'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4 space-y-0'>
              <FormLabel className='flex shrink-0 font-h text-px16-400'>
                설명
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='설명을 입력해주세요 (선택사항)'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 주제 */}
        <FormField
          control={form.control}
          name='topic'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-4 space-y-0'>
                <FormLabel className='flex shrink-0 font-h text-px16-400'>
                  주제
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className='w-52'>
                    <SelectTrigger>
                      <SelectValue placeholder='선택해주세요' />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {topicList?.map((topic) => (
                      <SelectItem value={topic.id} key={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <TopicAndBookAddButton type='topic' />
              </div>
              <FormMessage className='font-p text-px12-400 text-destructive'>
                {formState.errors.topic?.join(', ')}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* 책장 */}
        <FormField
          control={form.control}
          name='book'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4 space-y-0'>
              <FormLabel className='flex shrink-0 font-h text-px16-400'>
                책장
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className='w-52'>
                  <SelectTrigger>
                    <SelectValue placeholder='선택해주세요(선택)' />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {bookList?.map((book) => (
                    <SelectItem value={book.id} key={book.id}>
                      {book.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <TopicAndBookAddButton type='book' />
            </FormItem>
          )}
        />

        {/* 내용 */}

        <FormItem className='flex items-center gap-4 space-y-0'>
          <FormLabel className='sr-only flex shrink-0 font-h  text-px16-400'>
            내용
          </FormLabel>

          <div className='w-full rounded-lg border bg-background shadow'>
            <MyPlateEditor editorRef={editorRef} />
          </div>
          <FormMessage className='font-p text-px12-400 text-destructive' />
        </FormItem>

        <div className='flex'>
          <Button
            type='submit'
            className='ml-auto font-p text-px14-500 text-sm text-background'
          >
            게시
          </Button>
        </div>
      </form>
    </Form>
  );
}
