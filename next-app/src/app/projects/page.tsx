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
import * as Dialog from "@radix-ui/react-dialog";
import { VideoIcon, MagicWandIcon } from "@radix-ui/react-icons";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

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
  const [open, setOpen] = useState(false);

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
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <motion.div
            animate={{ backgroundColor: "#ffffff" }}
            layoutId="create-project"
            className="flex z-20 px-8 my-20 shadow shadow-blue-100 hover:shadow-lg transition-shadow cursor-pointer hover:shadow-blue-200 items-center rounded-full h-20 w-full"
          >
            {open === false && (
              <div className="text-blue-500 flex items-center gap-5 font-[370]">
                <MagicWandIcon className="w-5 h-5 text-blue-500" />
                Start with a new project
              </div>
            )}
          </motion.div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay asChild>
            <motion.div
              className="fixed inset-0"
              initial={{ opacity: 0, backgroundColor: "#ffffff" }}
              animate={{ opacity: 0.95, backgroundColor: "#10172A" }}
            />
          </Dialog.Overlay>
          <Dialog.Content asChild>
            <div className="fixed top-1/4 inset-x-0 container">
              <motion.div
                layoutId="create-project"
                initial={{ backgroundColor: "#ffffff" }}
                animate={{ backgroundColor: "#10172A" }}
                className="w-full outline  ring-1 ring-blue-900 bg-slate-900 rounded-full outline-none h-20 "
              >
                <motion.input
                  placeholder="Paste YouTube URL"
                  className="w-full px-8 text-slate-200 placeholder:text-slate-700 caret-blue-700 outline-none bg-transparent h-full"
                />
              </motion.div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* <h1 className="text-md font-semibold text-slate-500 tracking-tight mb-4">
        History
      </h1> */}
      <div className="grid grid-cols-4 gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden" asChild>
            <Link href={`/projects/${video.id}`}>
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
