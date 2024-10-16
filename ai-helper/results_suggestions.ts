import * as fs from "fs";

import { getOpenAIResponse } from "../support/openai";

const OPEN_AI_DESIRED_OUTPUT_FORMAT = [
  "Please format the output into a nicely readable format.",
  "- (table) Suite, Test Case, Priority, Timing, Result",
  '- (list of code blocks) Give suggestions on missing test cases and their priority for the suites. For missing tests, provide a typescript playwright test block (with priority tag) using psuedo code that can be used to write the test see example: test("cannot login as a locked out user", { tag: "@P1" }, async ({ page }) => { await test.step("Navigate to login page", async () => { await page.goto(URL); await expect(page).toHaveTitle(/Swag Labs/); }); });',
  "- (list, then summary) Give suggestions on the given results and their priorities (P1 for high priority, P2 for medium priority, P3 for low priority)",
  "- (list, then summary) Give suggestions on the given timing of the test cases for the suites",
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