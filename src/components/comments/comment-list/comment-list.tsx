import { CommentShow } from '@/components/comments';
import { type TCommentWithAuthor, fetchCommentsByPostId } from '@/db/queries/comments';

type TCommentListProps = {
  postId: string;
};

export default async function CommentList({ postId }: TCommentListProps) {
  const comments: TCommentWithAuthor[] = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter((comment) => comment.parentId === null);

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {topLevelComments.map((comment) => (
        <CommentShow key={comment.id} commentId={comment.id} postId={postId} />
      ))}
    </div>
  );
}
