'use client';

import { useActionState } from 'react';
import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';

import * as actions from '@/actions';
import { FormButton, FormErrors } from '@/components/common';

type TPostCreateFormProps = {
  slug: string;
};

export default function PostCreateForm({ slug }: TPostCreateFormProps) {
  const [formState, createPostAction, isPending] = useActionState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    },
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={createPostAction}>
          <div className="flex w-80 flex-col gap-4 p-4">
            <h3 className="text-lg">Create a Post</h3>
            <Input name="title" label="Title" labelPlacement="outside" placeholder="title" />
            {formState.errors?.title ? <FormErrors errors={formState.errors.title} /> : null}
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="content"
            />
            {formState.errors?.content ? <FormErrors errors={formState.errors.content} /> : null}
            {formState.errors?._form ? <FormErrors errors={formState.errors._form} /> : null}
            <FormButton isLoading={isPending} disabled={isPending}>
              Create Post
            </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
