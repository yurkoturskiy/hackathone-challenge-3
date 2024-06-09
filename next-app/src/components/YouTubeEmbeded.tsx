import { cn } from "@/lib/utils";

function convertToEmbedLink(youtubeUrl: string): string {
  const url = new URL(youtubeUrl);
  const videoId = url.searchParams.get("v");

  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  return `https://www.youtube.com/embed/${videoId}`;
}

const YouTubeEmbed = ({
  url,
  className,
}: {
  url: string;
  className?: string;
}) => (
  <iframe
    className={cn("w-full h-full", className)}
    width="560"
    height="340"
    src={convertToEmbedLink(url)}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded YouTube"
  />
);

export default YouTubeEmbed;
