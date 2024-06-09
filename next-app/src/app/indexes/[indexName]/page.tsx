"use client";

interface Props {
  params: { indexName: string };
}

export default function IndexPage({ params }: Props) {
  const indexName = params.indexName;

  return (
    <div>
      <h1>Index Page</h1>
    </div>
  );
}
