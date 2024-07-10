import {
  SessionData,
  defaultSession,
  sessionOptions,
} from "@/lib/session-options";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// login
export async function POST(request: NextRequest) {
  const { token, tokenExpired, ...user } = await request.json();
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
  const maxAge = tokenExpired - currentTimestampInSeconds;

  const session = await getIronSession<SessionData>(cookies(), {
    ...sessionOptions,
    // cookieOptions: {
    //   maxAge,
    // },
  });
  session.user = user;
  session.isLoggedIn = true;
  session.token = token;
  await session.save();

  return NextResponse.json(session);
}

// read session
export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    return NextResponse.json(defaultSession);
  }
  return NextResponse.json(session);
}

// logout
export async function DELETE() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.destroy();
  return NextResponse.json(defaultSession);
}
