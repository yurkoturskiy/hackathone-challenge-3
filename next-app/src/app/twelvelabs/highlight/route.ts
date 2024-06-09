import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { videoId, prompt } = await req.json();
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
  return NextResponse.json(json.highlights[0]);
}
