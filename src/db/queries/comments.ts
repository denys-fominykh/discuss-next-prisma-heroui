import { cache } from 'react';

import { db } from '@/db';

// NOTE: This type manually written based on the Comment List component requirements
// import type { Comment } from '@prisma/client';
// export type TCommentWithAuthor = Comment & {
//   user: {
//     name: string | null;
//     image: string | null;
//   };
// };

// NOTE: This type we get automatically based on the return type of the fetchCommentsByPostId function
export type TCommentWithAuthor = Awaited<ReturnType<typeof fetchCommentsByPostId>>[number];

export const fetchCommentsByPostId = cache((postId: string) => {
  return db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
});
