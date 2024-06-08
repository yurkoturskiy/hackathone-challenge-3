function convertToEmbedLink(youtubeUrl: string): string {
  const url = new URL(youtubeUrl);
  const videoId = url.searchParams.get("v");

  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  return `https://www.youtube.com/embed/${videoId}`;
}

const YouTubeEmbed = ({ url }: { url: string }) => (
  <div className="relative overflow-hidden mt-4 pb-[56.25%] h-0">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      width="560"
      height="315"
      src={convertToEmbedLink(url)}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded YouTube"
    />
  </div>
);

export default YouTubeEmbed;
