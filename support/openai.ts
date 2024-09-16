import OpenAI from "openai";
import { getEnv } from "./env";

const apiKey = getEnv("OPENAI_API_KEY");
const openai = new OpenAI({ apiKey });

export async function getOpenAIResponse(prompt: string): Promise<string> {
  const completion = await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "user", content: prompt }],
    })
    .then((response) => response.choices[0].message.content);

  return completion || "No response";
}
