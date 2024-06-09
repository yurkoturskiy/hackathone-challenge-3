"use client";

import YouTubeEmbed from "@/components/YouTubeEmbeded";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Video {
  id: string;
  url: string;
  title: string;
  description: string;
  uploadedAt: string;
}

function IndexesPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/metadata.json")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.videos);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video metadata:", error);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-extrabold tracking-tight mb-4">Projects</h1>
      <div className="grid grid-cols-4 gap-4">
        <Card className="flex items-center justify-center">
          <CardContent className="text-slate-400 select-none text-center">
            Create a project
          </CardContent>
        </Card>
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden" asChild>
            <Link href={`/indexes/${video.id}`}>
              <div className="pointer-events-none">
                <YouTubeEmbed url={`${video.url}?controls=0`} />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1 leading-8">
                  {video.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {video.description}
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default IndexesPage;
