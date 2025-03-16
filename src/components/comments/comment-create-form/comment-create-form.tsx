'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { Button } from '@heroui/button';
import { Textarea } from '@heroui/input';

import * as actions from '@/actions';
import { FormButton, FormErrors } from '@/components/common';

type TCommentCreateFormProps = {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
};

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: TCommentCreateFormProps) {
  const ref = useRef<HTMLFormElement | null>(null);

  const [open, setOpen] = useState(startOpen);
  const [formState, action] = useActionState(
    actions.createComment.bind(null, { postId, parentId }),
    {
      errors: {},
    },
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea name="content" label="Reply" placeholder="Enter your comment" />
        {formState.errors.content ? <FormErrors errors={formState.errors.content} /> : null}
        {formState.errors._form ? <FormErrors errors={formState.errors._form} /> : null}
        <FormButton>Create Comment</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button size="sm" variant="light" onPress={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}
