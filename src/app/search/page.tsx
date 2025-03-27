import { redirect } from 'next/navigation';

import { PostList } from '@/components/posts';
import { fetchPostsBySearchTerm } from '@/db/queries/posts';

type TSearchPageProps = {
  searchParams: Promise<{
    term: string;
  }>;
};

export default async function SearchPage({ searchParams }: TSearchPageProps) {
  const { term } = await searchParams;

  if (!term) {
    redirect('/');
  }

  return (
    <div>
      <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
    </div>
  );
}
