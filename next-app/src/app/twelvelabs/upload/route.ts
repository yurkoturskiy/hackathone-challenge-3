import { NextRequest, NextResponse } from "next/server";
import { TwelveLabs, Task } from "twelvelabs-js";

export async function POST(req: NextRequest) {
  const { YouTubeUrl, indexId } = await req.json();
  const client = new TwelveLabs({
    apiKey: process.env.TWELVELABS_API as string,
  });
  const task = await client.task.externalProvider(indexId, YouTubeUrl);
  console.log(`Task id=${task.id}`);
  return NextResponse.json({ task });
}
