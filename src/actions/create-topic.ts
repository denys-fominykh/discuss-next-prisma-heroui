'use server';

import type { Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { createTopicSchema } from '@/validation';

type TFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
};

export async function createTopic(_prevState: TFormState, formData: FormData): Promise<TFormState> {
  const session = await auth();
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const validation = createTopicSchema.safeParse({
    name,
    description,
  });

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  if (!session || !session?.user) {
    return {
      errors: {
        _form: ['You must be sign in to do this.'],
      },
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: validation.data.name,
        description: validation.data.description,
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

  revalidatePath('/');
  redirect(paths.topicShow(topic.slug));
}
