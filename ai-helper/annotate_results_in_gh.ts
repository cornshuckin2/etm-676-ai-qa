import * as fs from "fs";

import { getOpenAIResponse } from "../support/openai";

main();

async function main() {
  const testResults = await getTestResults();
  const suggestions = await getChatGPTSuggestions(testResults);
  return suggestions;
}

async function getTestResults(): Promise<any> {
  const data = fs.readFileSync("test-results.json", "utf-8");
  return JSON.parse(data);
}

async function getChatGPTSuggestions(testResults: any): Promise<string> {
  return await getOpenAIResponse(JSON.stringify(testResults));
}
