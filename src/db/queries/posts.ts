import { db } from '@/db';

// NOTE: This type manually written based on the Post List component requirements
// import type { Post } from '@prisma/client';
// export type TPostWithData = Post & {
//   topic: {
//     slug: string;
//   };
//   user: {
//     name: string | null;
//   };
//   _count: {
//     comments: number;
//   };
// };

// NOTE: This type we get automatically based on the return type of the fetchPostsByTopicSlug function
export type TPostWithData = Awaited<ReturnType<typeof fetchPostsByTopicSlug>>[number];

export function fetchPostsByTopicSlug(slug: string) {
  return db.post.findMany({
    where: {
      topic: {
        slug,
      },
    },
    include: {
      topic: {
        select: {
          slug: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
}
