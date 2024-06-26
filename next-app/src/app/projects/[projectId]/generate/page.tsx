"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: { projectId: string };
}
export default function GeneratePage({ params }: Props) {
  const router = useRouter();
  const projectId = params.projectId;
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt");
  const videoId = searchParams.get("videoId");
  const [highlight, setHighlight] = useState<string | null>(null);
  const [generatingHighlight, setGeneratingHighlight] = useState(false);

  useEffect(() => {
    const generateHighlight = async () => {
      if (prompt && videoId) {
        try {
          setGeneratingHighlight(true);
          const response = await fetch("/twelvelabs/highlight", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt, videoId, projectId }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log("Highlight generated:", data);
          setGeneratingHighlight(false);
          setHighlight(data);
          const title = data.title;
          const start = data.start;
          const end = data.end;
          const videoUrl = data.videoUrl;
          router.push(
            `${process.env.NEXT_PUBLIC_REMOTION_URL}/?title=${title}&start=${start}&end=${end}&videoUrl=${videoUrl}`
          );
        } catch (error) {
          console.error("Error generating highlight:", error);
        }
      }
    };

    generateHighlight();
  }, []);

  return (
    <div>
      {generatingHighlight && <h1>Generating...</h1>}
      <p>{prompt}</p>
      <p>{videoId}</p>
      <p>{JSON.stringify(highlight)}</p>
    </div>
  );
}
