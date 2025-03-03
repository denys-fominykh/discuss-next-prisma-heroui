type TTopicShowPageProps = {
  params: {
    slug: string;
  };
};

export default async function TopicShowPage({ params }: TTopicShowPageProps) {
  const slug = (await params).slug;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="mb-2 text-2xl font-bold">{slug}</h1>
      </div>
    </div>
  );
}
