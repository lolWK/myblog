'use client';

import * as actions from '@/actions';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { SessionContext } from '@/provider/SessionProvider';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  email: z.string().email({
    message: '이메일 형식으로 입력해주세요',
  }),
  password: z.string().min(8, {
    message: '8자 이상으로 입력해주세요',
  }),
});

export default function AdminLogin() {
  const router = useRouter();
  const session = useContext(SessionContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    actions.login(email, password);
    router.refresh();
    form.reset({
      email: '',
      password: '',
    });
  };

  const handleSignOut = async () => {
    actions.logout();
    router.refresh();
  };

  return session ? (
    <Button
      variant='outline'
      className='h-auto px-2 py-1 font-p text-px12-500'
      onClick={handleSignOut}
    >
      logout
    </Button>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='h-auto px-2 py-1 font-p text-px12-500'
        >
          admin
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogDescription>관리자만 로그인 할 수 있어요 😊</DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 font-p'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>아이디</FormLabel>
                  <FormControl>
                    <Input placeholder='아이디를 입력해주세요' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='비밀번호를 입력해주세요'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end'>
              <Button type='submit'>로그인</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
