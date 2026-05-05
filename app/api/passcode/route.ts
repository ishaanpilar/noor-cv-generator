import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { passcode } = (await req.json().catch(() => ({}))) as { passcode?: string };
  const expected = process.env.CUSTOMIZE_PASSCODE;
  if (!expected) {
    return NextResponse.json({ error: "Passcode not configured on server" }, { status: 500 });
  }
  if (!passcode || passcode !== expected) {
    return NextResponse.json({ error: "Invalid passcode" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
