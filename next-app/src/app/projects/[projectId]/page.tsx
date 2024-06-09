"use client";

import useSWR from "swr";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import YouTubeEmbed from "@/components/YouTubeEmbeded";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  params: { projectId: string };
}

export default function IndexPage({ params }: Props) {
  const supabase = createClientComponentClient();
  const projectId = params.projectId;
  const { data, isLoading } = useSWR(
    `/twelvelabs/index?indexName=${projectId}`,
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
  );
  const {
    data: storage,
    error,
    isLoading: storageIsLoading,
  } = useSWR("projects", async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId);
    return data;
  });

  if (isLoading || storageIsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <YouTubeEmbed
        url={`https://www.youtube.com/watch?v=${projectId}`}
        className="h-[480px] mb-2 mt-0"
      />
      <h1 className="text-xl mb-8 line-clamp-1 tracking-tight font-bold text-slate-800">
        {data?.video.metadata.filename}
      </h1>
      {/* <div>Video: {JSON.stringify(data)}</div> */}
      {/* <div>Storage: {JSON.stringify(storage)}</div> */}
      <Card className="px-1 pb-2">
        <CardHeader>
          <CardTitle className="text-lg">Generate video highlight</CardTitle>
          <CardDescription>
            Describe the desired summary or highlight
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Prompt</Label>
          <div className="flex gap-2">
            <Textarea
              placeholder="Create a highlight reel of Roger Federer discussing his retirement"
              className="resize-none"
              rows={1}
            />
            <Button>Generate</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
