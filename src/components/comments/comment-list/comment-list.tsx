import { CommentShow } from '@/components/comments';
import type { TCommentWithAuthor } from '@/db/queries/comments';

type TCommentListProps = {
  fetchData: () => Promise<TCommentWithAuthor[]>;
};

export default async function CommentList({ fetchData }: TCommentListProps) {
  const comments = await fetchData();

  const topLevelComments = comments.filter((comment) => comment.parentId === null);

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {topLevelComments.map((comment) => (
        <CommentShow key={comment.id} commentId={comment.id} comments={comments} />
      ))}
    </div>
  );
}
