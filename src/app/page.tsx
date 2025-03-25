import { Divider } from '@heroui/divider';

import { PostList } from '@/components/posts';
import { TopicCreateForm, TopicList } from '@/components/topics';
import { fetchTopPosts } from '@/db/queries/posts';

export default function HomePage() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="m-2 text-xl">Top Posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
      <div className="border px-2 py-3 shadow">
        <TopicCreateForm />
        <Divider className="my-2" />
        <h3 className="text-lg">Topics</h3>
        <TopicList />
      </div>
    </div>
  );
}
