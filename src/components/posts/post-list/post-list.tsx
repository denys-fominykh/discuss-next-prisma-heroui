import Link from 'next/link';

import type { TPostWithData } from '@/db/queries/posts';
import paths from '@/paths';

type TPostListProps = {
  fetchData: () => Promise<TPostWithData[]>;
};

export default async function PostList({ fetchData }: TPostListProps) {
  const posts = await fetchData();

  return (
    <div className="space-y-2">
      {posts.map((post) => {
        const topicSlug = post.topic.slug;

        if (!topicSlug) {
          throw new Error('Need a slug to link to a post');
        }

        return (
          <div key={post.id} className="rounded border p-2">
            <Link href={paths.postShow(topicSlug, post.id)}>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <div className="flex flex-row gap-8">
                <p className="text-xs text-gray-400">By {post.user.name}</p>
                <p className="text-xs text-gray-400">{post._count.comments} comments</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
