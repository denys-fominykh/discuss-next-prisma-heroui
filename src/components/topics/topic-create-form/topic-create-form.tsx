'use client';

import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { useActionState } from 'react';

import * as actions from '@/actions';
import { FormButton, FormErrors } from '@/components/common';

export default function TopicCreateForm() {
  const [formState, createTopicAction, isPending] = useActionState(actions.createTopic, {
    errors: {},
  });

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
            {formState.errors?.name ? <FormErrors errors={formState.errors.name} /> : null}
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
            />
            {formState.errors?.description ? (
              <FormErrors errors={formState.errors.description} />
            ) : null}
            {formState.errors?._form ? <FormErrors errors={formState.errors._form} /> : null}
            <FormButton isLoading={isPending} disabled={isPending}>
              Submit
            </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
