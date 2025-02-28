'use client';

import { type ReactNode, useActionState } from 'react';
import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';

import * as actions from '@/actions';
import { FormButton } from '@/components/common/form-button';

export default function TopicCreateForm() {
  const [formState, createTopicAction, isPending] = useActionState(actions.createTopic, {
    errors: {},
  });

  const showFormErrors = (errors: string[]): ReactNode => (
    <div className="rounded border border-red-400 bg-red-200 p-2">{errors.join(', ')}</div>
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={createTopicAction}>
          <div className="flex w-80 flex-col gap-4 p-4">
            <h1 className="text-lg">Create a Topic</h1>
            <Input name="name" label="Name" labelPlacement="outside" placeholder="Name" />
            {formState.errors?.name ? showFormErrors(formState.errors.name) : null}
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
            />
            {formState.errors?.description ? showFormErrors(formState.errors.description) : null}
            {formState.errors?._form ? showFormErrors(formState.errors._form) : null}
            <FormButton isLoading={isPending} disabled={isPending}>
              Submit
            </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
