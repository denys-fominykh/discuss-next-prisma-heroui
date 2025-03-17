import Image from 'next/image';

import { CommentCreateForm } from '@/components/comments';
import { type TCommentWithAuthor, fetchCommentsByPostId } from '@/db/queries/comments';

type TCommentShowProps = {
  commentId: string;
  postId: string;
};

export default async function CommentShow({ commentId, postId }: TCommentShowProps) {
  const comments: TCommentWithAuthor[] = await fetchCommentsByPostId(postId);
  const comment: TCommentWithAuthor | undefined = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);

  return (
    <div className="mb-1 mt-2 border p-4">
      <div className="flex gap-3">
        <Image
          className="size-10 rounded-full"
          src={comment.user.image || ''}
          alt="user image"
          width={40}
          height={40}
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">{comment.user.name}</p>
          <p className="text-gray-900">{comment.content}</p>

          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">
        {children.map((child) => (
          <CommentShow key={child.id} commentId={child.id} postId={postId} />
        ))}
      </div>
    </div>
  );
}
