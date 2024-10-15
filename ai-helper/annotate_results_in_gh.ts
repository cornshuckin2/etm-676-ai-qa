import * as fs from "fs";
import * as process from "process";

import { getOpenAIResponse } from "../support/openai";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.OWNER;
const REPO = process.env.REPO;
const CHECK_RUN_ID = process.env.CHECK_RUN_ID;

main();

async function main() {
  try {
    const testResults = await getTestResults();
    const suggestions = await getChatGPTSuggestions(testResults);

    await annotateGitHubCheck(suggestions);
    console.log("Successfully annotated GitHub check with ChatGPT suggestions");
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

async function getTestResults(): Promise<any> {
  try {
    const data = fs.readFileSync("../test-results.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading test results file:", error);
    throw error;
  }
}

async function getChatGPTSuggestions(testResults: any): Promise<string> {
  return await getOpenAIResponse(JSON.stringify(testResults));
}

async function annotateGitHubCheck(suggestions: string): Promise<void> {
  const response = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/check-runs/${CHECK_RUN_ID}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        conclusion: "success",
        output: {
          title: "Playwright Test Results Suggestions",
          summary: suggestions,
          text: suggestions,
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to annotate GitHub check: ${errorText}`);
  }
}
