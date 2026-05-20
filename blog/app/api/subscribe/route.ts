import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

async function ensureFile() {
  try {
    await fs.access(SUBSCRIBERS_FILE);
  } catch {
    await fs.mkdir(path.dirname(SUBSCRIBERS_FILE), { recursive: true });
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify([], null, 2));
  }
}

async function getSubscribers(): Promise<
  { email: string; subscribedAt: string }[]
> {
  await ensureFile();
  const raw = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
  return JSON.parse(raw);
}

async function addSubscriber(email: string) {
  const subs = await getSubscribers();

  if (subs.some((s) => s.email === email)) {
    return { success: false, message: "You're already subscribed!" };
  }

  subs.push({ email, subscribedAt: new Date().toISOString() });
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subs, null, 2));

  return { success: true, message: "Successfully subscribed!" };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const result = await addSubscriber(email.toLowerCase().trim());

    return NextResponse.json(result, {
      status: result.success ? 200 : 409,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subs = await getSubscribers();
    return NextResponse.json({ count: subs.length });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
