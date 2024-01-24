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
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import * as actions from '@/actions';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

type ButtonProps = {
  type: 'topic' | 'book';
};

type FormType = {
  content: string;
};

export default function TopicAndBookAddButton({ type }: ButtonProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<FormType>({
    defaultValues: {
      content: '',
    },
  });

  const { reset } = form;

  const [formState, action] = useFormState(
    actions.createTopicAndBook.bind(null, type),
    {
      errors: {},
    }
  );
  const TYPE_TEXT = type === 'topic' ? '주제' : '책장';

  const onSubmit = (data: FormType) => {
    const formData = new FormData();
    formData.append('content', data.content);
    action(formData);
  };

  useEffect(() => {
    if (formState.success) {
      setOpen(false);
      toast({
        className: cn(
          'bottom-0 left-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
        ),
        title: `${TYPE_TEXT} 추가 성공!`,
      });
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='font-p text-px14-400'>
          {TYPE_TEXT} 추가
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='font-h text-px16-400'>
            {TYPE_TEXT} 추가
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              return form.handleSubmit(onSubmit)(e);
            }}
          >
            <div className='flex items-center gap-4 py-2'>
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem className='flex w-full flex-grow  gap-4'>
                    <FormLabel htmlFor={type} className='sr-only'>
                      {TYPE_TEXT}
                    </FormLabel>
                    <FormControl className='flex items-center'>
                      <Input
                        placeholder='입력해주세요'
                        autoComplete='off'
                        {...field}
                        className='flex items-center'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='ml-auto mt-2 font-p text-px14-500 text-sm text-background'
              >
                추가
              </Button>
            </div>

            <FormMessage className='font-p text-px12-400 text-destructive'>
              {formState.errors.content?.join(', ')}
            </FormMessage>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
