'use client';

// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import type { Database } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login } from '@/util/auth';

const formSchema = z.object({
  email: z.string().email({
    message: '이메일 형식으로 입력해주세요',
  }),
  password: z.string().min(8, {
    message: '8자 이상으로 입력해주세요',
  }),
});

export function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const { email, password } = values;

    try {
      await login(email, password);
      router.refresh();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 font-p">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>아이디</FormLabel>
              <FormControl>
                <Input placeholder="아이디를 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="비밀번호를 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">로그인</Button>
        </div>
      </form>
    </Form>
  );
}
