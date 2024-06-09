import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { projectId, videoId, prompt } = await req.json();
  const baseUrl = "https://api.twelvelabs.io/v1.2";
  const apiKey = process.env.TWELVELABS_API as string;
  const data = {
    prompt: prompt,
    video_id: videoId,
    type: "highlight",
  };

  // Send request
  const response = await fetch(baseUrl + "/summarize", {
    method: "POST",
    headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  const highlight = json.highlights[0];
  // return NextResponse.json(json.highlights[0]);
  const title = highlight.highlight;
  const videoUrl = `https://ai-images-capsule.s3.us-west-1.amazonaws.com/hackathon/${projectId}.mp4`;
  const start = highlight.start;
  const end = highlight.end;
  console.log({ title, videoUrl, start, end });

  // Given an incoming request...
  const redirectUrl = new URL(
    "/",
    process.env.NEXT_PUBLIC_REMOTION_URL as string
  );
  // Add ?from=/incoming-url to the /login URL
  redirectUrl.searchParams.set("title", title);
  redirectUrl.searchParams.set("start", start);
  redirectUrl.searchParams.set("end", end);
  redirectUrl.searchParams.set("videoUrl", videoUrl);

  console.log("Redirect", redirectUrl.toString());

  // And redirect to the new URL

  return NextResponse.json({
    title: title,
    start: start,
    end: end,
    videoUrl: videoUrl,
  });
}
