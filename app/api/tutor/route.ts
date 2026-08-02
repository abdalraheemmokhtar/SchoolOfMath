import { z } from "zod";
import { soma } from "../../../lib/tutor";

const requestSchema = z.object({
  mode: z.enum([
    "Explain this concept",
    "Give me a hint",
    "Check my reasoning",
    "Show another example",
    "Create a similar problem",
    "Make it easier",
    "Make it harder",
    "Summarize this lesson",
  ]),
  lessonTitle: z.string().min(1).max(160),
  lessonContext: z.string().min(1).max(600),
  questionPrompt: z.string().max(600).optional(),
  learnerMessage: z.string().max(1200).optional(),
  hintLevel: z.number().int().min(0).max(3).optional(),
});

export async function POST(request: Request) {
  try {
    const payload = requestSchema.parse(await request.json());
    const reply = await soma.respond(payload);
    return Response.json({ reply, provider: "Soma guided fallback" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Please send a valid tutor request." }, { status: 400 });
    }
    return Response.json({ error: "Soma could not respond just now." }, { status: 500 });
  }
}
