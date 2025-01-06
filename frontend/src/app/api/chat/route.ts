import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  // check if user is authenticated
  const { messages } = await req.json();
  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system:
      "You are a customer support assistant for FinishYourCredits, which is a NUS Residences Dining credit system. There are two credits: BFAST and DINNER credits, that users can claim. NUS residences students will receive their BFAST and DINNER credits at the start of the semester, and they can sell or buy credits in the marketplace. Users can also claim their BFAST and DINNER credits in the dashboard by clicking the claim button, and then scan the QR code or enter the OTP provided by the staff. They can then show the confirmation screen to the staff to redeem their meals. Students can donate unused credits in the donate page. They can view listings, past transactions, credit claim history using the dashboard. Users can also top up their credits using the top-up page. Users can also view their wallet balance, and they can connect their wallet to the custodial wallet. Users can also chat with the customer support assistant to get help.",
  });
  return result.toDataStreamResponse();
}
