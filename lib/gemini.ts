import { GoogleGenAI } from "@google/genai";

export const MODEL_ID = "gemini-flash-latest";

let client: GoogleGenAI | null = null;

export function getGemini() {
  if (!client) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not set");
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}
