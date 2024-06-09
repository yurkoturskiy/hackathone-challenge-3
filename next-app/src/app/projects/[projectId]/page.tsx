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
import { MagicWandIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Link from "next/link";

interface Props {
  params: { projectId: string };
}

export default function IndexPage({ params }: Props) {
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [mainCharacter, setMainCharacter] = useState<string | null>(null);
  const [promptIdeas, setPromptIdeas] = useState<string[] | null>(null);

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
      <h1 className="text-xl mb-6 line-clamp-1 tracking-tight font-bold text-slate-800">
        {data?.video.metadata.filename}
      </h1>
      <Button
        disabled={isGeneratingIdeas}
        variant="outline"
        onClick={async () => {
          const videoId = data.video.id as string;
          console.log({ videoId });
          setIsGeneratingIdeas(true);
          const response = await fetch(`/twelvelabs/summary`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ videoId: videoId }),
          });
          const output = await response.json();
          console.log({ output });
          setMainCharacter(output.main_character);
          setPromptIdeas(output.prompts);
          setIsGeneratingIdeas(false);
        }}
        className="gap-2 mt-6 w-full px-8"
        size="lg"
      >
        <MagicWandIcon className="w-4 h-4" />
        {isGeneratingIdeas ? "Generating ideas..." : "Generate highlight ideas"}
      </Button>
      <Separator className="my-6 flex items-center justify-center relative">
        <div className="bg-slate-100 px-4 text-slate-400">or</div>
      </Separator>
      <Card className="px-1 pb-2">
        <CardHeader>
          <CardTitle className="text-lg">Describe video highlight</CardTitle>
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
            <Button variant="secondary">Generate</Button>
          </div>
        </CardContent>
      </Card>
      {((mainCharacter && promptIdeas) || isGeneratingIdeas) && (
        <Separator className="my-6" />
      )}
      {mainCharacter && promptIdeas && (
        <h3 className="text-xl font-bold mb-6 text-slate-800">
          {mainCharacter} highlight prompt ideas
        </h3>
      )}
      <div className="">
        {promptIdeas &&
          promptIdeas.map((idea, index) => (
            <div
              key={index}
              className="group flex border-b border-b-slate-200 py-4 last:border-b-0 items-center"
            >
              <div>{idea}</div>
              <Button
                variant="outline"
                className="ml-auto group-hover:opacity-100 opacity-100"
                asChild
              >
                <Link
                  href={`/projects/${projectId}/generate?prompt=${idea}&videoId=${data.video.id}`}
                  target="_blank"
                >
                  Generate
                </Link>
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
