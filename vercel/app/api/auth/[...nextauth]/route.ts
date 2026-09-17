import NextAuth from "next-auth";
import { authOptions, isAuthConfigured } from "@/lib/auth";

export const runtime = "nodejs";
const handler = NextAuth(authOptions);

export async function GET(...args: Parameters<typeof handler>) {
  if (!isAuthConfigured()) return Response.json({ error: "Login is not configured." }, { status: 503 });
  return handler(...args);
}

export const POST = GET;
