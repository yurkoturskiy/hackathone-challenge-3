import { NextRequest, NextResponse } from "next/server";
import { TwelveLabs } from "twelvelabs-js";

export async function GET(req: NextRequest) {
  const client = new TwelveLabs({
    apiKey: process.env.TWELVELABS_API as string,
  });
  const indexes = await client.index.list();
  const indexesWithVideos = indexes.filter((index) => index.videoCount);
  const parsed = indexesWithVideos.map((index) => {
    return {
      id: index.id,
      name: index.name,
    };
  });
  return NextResponse.json(parsed);
}
