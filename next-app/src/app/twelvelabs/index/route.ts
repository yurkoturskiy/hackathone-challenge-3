import { NextRequest, NextResponse } from "next/server";
import { TwelveLabs } from "twelvelabs-js";

export async function POST(req: NextRequest) {
  const { videoId } = await req.json();
  const client = new TwelveLabs({
    apiKey: process.env.TWELVELABS_API as string,
  });
  const engines = [
    {
      name: "marengo2.6",
      options: ["visual", "conversation", "text_in_video", "logo"],
    },
    {
      name: "pegasus1",
      options: ["visual", "conversation"],
    },
  ];
  let index = await client.index.create({
    name: videoId,
    engines: engines,
    addons: ["thumbnail"], // Optional
  });
  console.log(
    `A new index has been created: id=${index.id} name=${
      index.name
    } engines=${JSON.stringify(index.engines)}`
  );
  return NextResponse.json({ index });
}

export async function GET(req: NextRequest) {
  const { searchParams, hostname } = new URL(req.url);
  const name = searchParams.get("indexName");
  const client = new TwelveLabs({
    apiKey: process.env.TWELVELABS_API as string,
  });
  const indexes = await client.index.list();
  const indexesWithVideos = indexes.filter((index) => index.videoCount);
  const index = indexesWithVideos.find((index) => index.name === name);
  const videos = await index?.listVideos();

  if (!index) {
    return NextResponse.json({ error: "Index not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: index.id,
    name: index.name,
    video: { id: videos?.[0].id, metadata: { ...videos?.[0].metadata } },
  });
}
