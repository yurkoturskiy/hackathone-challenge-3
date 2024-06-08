export async function POST(req: Request) {
  const { videoUrl } = await req.json();
  const baseUrl = "https://api.twelvelabs.io/v1.2";
  const apiKey = process.env.TWELVELABS_API as string;
  const data = {
    video_id: "6664ac18d22b3a3c97bf189e",
    types: ["title", "hashtag", "topic"],
  };
  const response = await fetch(baseUrl + "/gist", {
    method: "POST",
    headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return Response.json({ res });
}
