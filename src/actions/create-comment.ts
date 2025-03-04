'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/db';
import { createCommentSchema } from '@/validation';
import paths from '@/paths';

type TCreateCommentParams = {
  postId: string;
  parentId?: string;
};

type TFormState = {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export async function createComment(
  { postId, parentId }: TCreateCommentParams,
  _prevState: TFormState,
  formData: FormData,
): Promise<TFormState> {
  const session = await auth();

  const content = formData.get('content') as string;

  const validation = createCommentSchema.safeParse({
    content: content,
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ['You must sign in to do this.'],
      },
    };
  }

  try {
    await db.comment.create({
      data: {
        content: validation.data.content,
        postId: postId,
        parentId: parentId,
        userId: session.user.id,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong...'],
        },
      };
    }
  }

  const topic = await db.topic.findFirst({
    where: { posts: { some: { id: postId } } },
  });

  if (!topic) {
    return {
      errors: {
        _form: ['Failed to revalidate topic'],
      },
    };
  }

  revalidatePath(paths.postShow(topic.slug, postId));

  return {
    errors: {},
    success: true,
  };
}
