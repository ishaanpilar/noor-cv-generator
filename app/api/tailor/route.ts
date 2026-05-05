import { NextResponse } from "next/server";
import { getGemini, MODEL_ID } from "@/lib/gemini";
import { getIdeaBank } from "@/lib/ideabank";
import { CV_SYSTEM_PROMPT } from "@/lib/cv-prompt";
import type { TailorRequest, TailorResponse } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Partial<TailorRequest>;
  const { passcode, jdText, companyName, roleTitle } = body;

  if (!passcode || passcode !== process.env.CUSTOMIZE_PASSCODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!jdText || jdText.trim().length < 50) {
    return NextResponse.json({ error: "Job description too short" }, { status: 400 });
  }

  const ideabank = await getIdeaBank();
  const ai = getGemini();

  const userText = [
    `# Noor's IdeaBank — source of truth\n\n${ideabank}`,
    `\n\n---\n\nJOB DESCRIPTION:\n${jdText.trim()}`,
    companyName ? `\nCOMPANY: ${companyName.trim()}` : "",
    roleTitle ? `\nROLE TITLE: ${roleTitle.trim()}` : "",
    `\n\nGenerate the tailored CV JSON now.`,
  ].join("");

  try {
    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: userText,
      config: {
        systemInstruction: CV_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        temperature: 0.7,
        maxOutputTokens: 4096,
      },
    });

    const text = response.text;
    if (!text) {
      return NextResponse.json({ error: "No text response from model" }, { status: 502 });
    }

    const parsed = parseJsonResponse(text);
    if (!parsed) {
      return NextResponse.json(
        { error: "Model returned malformed JSON", raw: text.slice(0, 500) },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed satisfies TailorResponse);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function parseJsonResponse(raw: string): TailorResponse | null {
  const trimmed = raw.trim();
  const candidates = [
    trimmed,
    stripCodeFence(trimmed),
    extractFirstJsonObject(trimmed),
  ].filter(Boolean) as string[];
  for (const c of candidates) {
    try {
      const obj = JSON.parse(c);
      if (typeof obj === "object" && obj && "tailoredCvMarkdown" in obj) {
        return obj as TailorResponse;
      }
    } catch {
      // try next
    }
  }
  return null;
}

function stripCodeFence(s: string) {
  const m = s.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return m ? m[1] : s;
}

function extractFirstJsonObject(s: string) {
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return s;
  return s.slice(start, end + 1);
}
