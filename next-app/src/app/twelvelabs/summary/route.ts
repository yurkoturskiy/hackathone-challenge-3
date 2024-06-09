import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI();

export async function POST(req: NextRequest) {
  const { videoId } = await req.json();

  // Variables
  const baseUrl = "https://api.twelvelabs.io/v1.2";
  const apiKey = process.env.TWELVELABS_API as string;
  const data = {
    video_id: videoId,
    type: "summary",
    prompt:
      "Specify the name of the main character of the video. Generate bullet list of key topics the main character is talking about",
  };

  // Send request
  const response = await fetch(baseUrl + "/summarize", {
    method: "POST",
    headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  const thread = await openai.beta.threads.create();
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: json.summary,
  });
  let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: "asst_xWAVURBrhRwY2BRUVPFzTJcy",
    // instructions:
    //   "Please address the user as Jane Doe. The user has a premium account.",
  });
  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    for (const message of messages.data.reverse()) {
      console.log(`${message.role} > ${message.content[0].text.value}`);
      if (message.role === "assistant") {
        const messageData = JSON.parse(message.content[0].text.value);
        return NextResponse.json(messageData);
      }
    }
  } else {
    console.log(run.status);
  }

  return NextResponse.json({ error: "Assistant not found" }, { status: 404 });
}
