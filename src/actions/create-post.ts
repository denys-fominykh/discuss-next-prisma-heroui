'use server';

import type { Post } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { createPostSchema } from '@/validation';

type TFormState = {
  errors?: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
};

export async function createPost(
  slug: string,
  _prevState: TFormState,
  formData: FormData,
): Promise<TFormState> {
  const session = await auth();

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const validation = createPostSchema.safeParse({ title, content });

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  if (!session || !session?.user || !session?.user?.id) {
    return { errors: { _form: ['You must be signed in.'] } };
  }

  const topic = await db.topic.findFirst({
    where: {
      slug,
    },
  });

  if (!topic) {
    return { errors: { _form: ['Cannot find topic.'] } };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: validation.data.title,
        content: validation.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong.'],
        },
      };
    }
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
