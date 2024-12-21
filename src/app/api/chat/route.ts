import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  // check if user is authenticated
  const { messages } = await req.json();
  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  });
  return result.toDataStreamResponse();
}
