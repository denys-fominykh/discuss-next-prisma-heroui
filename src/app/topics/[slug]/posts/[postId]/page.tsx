import Link from 'next/link';
import { Suspense } from 'react';

import { CommentCreateForm, CommentList } from '@/components/comments';
import { PostShow, PostShowLoading } from '@/components/posts';
import paths from '@/paths';

type TPostShowPageProps = {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
};

export default async function PostShowPage({ params }: TPostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {'< '}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}
