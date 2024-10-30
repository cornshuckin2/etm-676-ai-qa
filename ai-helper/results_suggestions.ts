import * as fs from "fs";

import { getOpenAIResponse } from "../support/openai";

const OPEN_AI_DESIRED_OUTPUT_FORMAT = [
  "First, please summarize the contents of the pull request.",
  "Please format the output into a nicely readable format.",
  "- (table) Suite, Test Case, Priority, Timing, Result",
  '- (list of code blocks) Give suggestions on missing test cases and their priority for the suites. For missing tests, provide a typescript playwright test block (with priority tag) using pseudo code that can be used to write the test see example: test("cannot login as a locked out user", { tag: "@P1" }, async ({ page }) => { await test.step("Navigate to login page", async () => { await page.goto(URL); await expect(page).toHaveTitle(/Swag Labs/); }); });',
  "- (list) Give suggestions on the given results and their priorities (P1 for high priority, P2 for medium priority, P3 for low priority)",
  "- (list) Give suggestions on the given timing of the test cases for the suites",
  "- (summary) Provide a summary of all of the above, including any recommendations.",
].join("\n");

async function main(prDescription: string, fileContents: string) {
  const combinedInput = `${prDescription}\n\n${fileContents}`;
  const suggestions = await getChatGPTSuggestions(
    OPEN_AI_DESIRED_OUTPUT_FORMAT + "\n" + combinedInput,
  );
  fs.writeFileSync("script_output.txt", suggestions);
}

async function getChatGPTSuggestions(input: string): Promise<string> {
  return await getOpenAIResponse(input);
}

if (require.main === module) {
  const [, , prDescription, fileContents] = process.argv;
  main(prDescription, fileContents);
}
