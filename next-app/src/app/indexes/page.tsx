"use client";

import YouTubeEmbed from "@/components/YouTubeEmbeded";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  useEffect(() => {
    fetch("/metadata.json")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.videos);
      })
      .catch((error) => {
        console.error("Error fetching video metadata:", error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-xl font-extrabold tracking-tight mb-4">Projects</h1>
      <div className="flex gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="max-w-[420px] overflow-hidden">
            <div className="pointer-events-none">
              <YouTubeEmbed url={`${video.url}?controls=0`} />
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1 leading-8">
                {video.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {video.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
        <Button>Create</Button>
      </div>
    </div>
  );
}

export default IndexesPage;
