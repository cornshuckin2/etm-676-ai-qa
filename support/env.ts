import dotenv from "dotenv";

export function getEnv(key: "GITHUB_API_KEY" | "OPENAI_API_KEY"): string {
  dotenv.config();
  return process.env[key] || "";
}
