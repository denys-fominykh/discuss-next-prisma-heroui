import Link from 'next/link';

// import { PostShow } from '@/components/posts';
// import { CommentCreateForm, CommentList } from '@/components/comments';
import paths from '@/paths';

type TPostShowPageProps = {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
};

export default async function PostShowPage({ params }: TPostShowPageProps) {
  const {
    slug,
    // postId,
  } = await params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {'< '}Back to {slug}
      </Link>
      {/* <PostShow /> */}
      {/* <CommentCreateForm postId={postId} startOpen /> */}
      {/* <CommentList comments={comments} /> */}
    </div>
  );
}
