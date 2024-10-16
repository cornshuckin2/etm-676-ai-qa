import { Reporter, TestCase, TestResult } from "@playwright/test/reporter";

import fs from "fs";

interface TestStep {
  name: string;
  duration: number;
}

interface TestDetails {
  file: string;
  suite: string;
  title: string;
  tags?: string[];
  steps: TestStep[];
  result: string;
  totalTime: number;
}

class CustomJsonReporter implements Reporter {
  private testResults: TestDetails[] = [];
  private startTime: number = 0;

  onBegin() {
    this.startTime = Date.now();
  }

  onTestBegin() {}

  async onTestEnd(test: TestCase, result: TestResult) {
    const steps: TestStep[] = result.steps.map((step) => ({
      name: step.title,
      duration: step.duration,
    }));

    const testDetails: TestDetails = {
      file: test.location.file.split("/").pop() || "",
      suite: test.parent?.title || "",
      title: test.title,
      tags: test.tags,
      steps: steps,
      result: result.status,
      totalTime: result.duration,
    };

    this.testResults.push(testDetails);
  }

  onEnd() {
    const totalDuration = Date.now() - this.startTime;

    const jsonData = {
      totalTime: totalDuration,
      results: this.testResults,
    };

    fs.writeFileSync("test-results.json", JSON.stringify(jsonData, null, 2));

    console.log("Results saved to test-results.json");
  }
}

export default CustomJsonReporter;
