import * as fs from "fs";

import { exit } from "process";
import { getOpenAIResponse } from "../support/openai";

const OPEN_AI_DESIRED_OUTPUT_FORMAT = [
  "Analyze the provided test results and offer actionable suggestions for improving the test suite.",
  "If there are no suggestions, provide a short summary for each section.",
  "- (table) Format the results in a table with the columns: Suite, Test Case, Priority (P1, P2, P3), Timing (execution time in seconds), and Result (Pass/Fail).",
  '- (list of code blocks) Identify any missing test cases and provide a TypeScript Playwright test block (with a priority tag) in pseudocode for each missing case. For example: test("this is not a test", { tag: "@P1" }, async ({ page }) => { await test.step("nothing here", async () => { await page.goto(URL); await expect(page).toHaveTitle(/dont copy this/); }); });',
  "- (list) Suggest improvements or optimizations to the existing test cases based on the results, including re-prioritization (P1 for high priority, P2 for medium priority, P3 for low priority).",
  "- (list) Provide recommendations for optimizing test execution timings. Highlight tests with unusually long durations and suggest potential reasons and fixes (e.g., optimizing selectors, network mocking).",
  "- (list) Identify areas or functionalities that might be prone to defects based on failed or flaky tests and suggest additional test coverage or improvements.",
  "- (summary) Summarize all findings, including recommendations for missing test cases, timing optimizations, and strategies for improving test stability and coverage.",
  "- (optional next steps) Provide a checklist of actionable next steps to implement the recommendations.",
].join("\n");

main();

async function main() {
  const testResults = await getTestResults();
  if (!testResults?.results || testResults?.results.length === 0) {
    fs.writeFileSync(
      "script_output.txt",
      "Summary unavailable, no test results found",
    );
    exit(0);
  }
  const suggestions = await getChatGPTSuggestions(
    OPEN_AI_DESIRED_OUTPUT_FORMAT + "\n" + JSON.stringify(testResults),
  );
  fs.writeFileSync("script_output.txt", suggestions);
}

async function getTestResults(): Promise<any> {
  const data = fs.readFileSync("test-results.json", "utf-8");
  return JSON.parse(data);
}

async function getChatGPTSuggestions(testResults: any): Promise<string> {
  return await getOpenAIResponse(JSON.stringify(testResults));
}
