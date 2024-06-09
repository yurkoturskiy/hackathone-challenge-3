"use client";

import useSWR from "swr";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Props {
  params: { projectId: string };
}

export default function IndexPage({ params }: Props) {
  const supabase = createClientComponentClient();
  const projectId = params.projectId;
  const { data, error, isLoading } = useSWR("projects", async () => {
    const { data, error } = await supabase.from("projects").select("*");
    return data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Index Page</h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
