'use client';

import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Icons } from '@/components/icons';

const formSchema = z.object({
  query: z.string().min(2),
});

export default function SearchInput() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      query: '',
    },
  });

  const { setValue, clearErrors } = form;

  function onSubmit(value: z.infer<typeof formSchema>) {
    router.push(`/search?query=${value.query}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='relative'>
        <FormField
          control={form.control}
          name='query'
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormItem>
              <FormLabel className='absolute right-3 top-[50%] -translate-y-2/4 cursor-pointer'>
                <Icons.search width={16} height={16} strokeWidth={1.5} />
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='transition-width absolute -top-[27px] right-0 w-0 border-none bg-transparent pr-8 font-p text-px14-400 duration-300 focus:w-[160px] focus:outline-none'
                  autoComplete='off'
                  placeholder='2자 이상 입력해주세요'
                  onBlur={() => {
                    onBlur();
                    setValue('query', '');
                    clearErrors('query');
                  }}
                  onChange={onChange}
                  value={value}
                  ref={ref}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='sr-only'>
          검색 버튼
        </Button>
      </form>
    </Form>
  );
}
