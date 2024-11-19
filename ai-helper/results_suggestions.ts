import * as fs from "fs";

import { getOpenAIResponse } from "../support/openai";

const OPEN_AI_DESIRED_OUTPUT_FORMAT = [
  "If there are no test results, only return a message of 'Summary unavailable, no test results found'.",
  "Please format the output into a nicely readable format.",
  "- (table) Suite, Test Case, Priority, Timing, Result",
  '- (list of code blocks) Give suggestions on missing test cases and their priority for the suites. If you believe there are any missing tests, provide a typescript playwright test block (with priority tag) using psuedo code that can be used to write the test see example: test("cannot login as a locked out user", { tag: "@P1" }, async ({ page }) => { await test.step("Navigate to login page", async () => { await page.goto(URL); await expect(page).toHaveTitle(/Swag Labs/); }); });',
  "- (list) Give suggestions on the given results and their priorities (P1 for high priority, P2 for medium priority, P3 for low priority)",
  "- (list) Give suggestions on the given timing of the test cases for the suites",
  "- (list) Determine if any area would be prone to defects.",
  "- (summary) Provide a summary of all of the above, including any recommendations.",
].join("\n");
main();

async function main() {
  const testResults = await getTestResults();
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
