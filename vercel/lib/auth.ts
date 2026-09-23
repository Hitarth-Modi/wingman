import "server-only";
import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";
import { isApprovedEmail } from "./access";
import { isApprovedGoogleProfile } from "./access-policy.mjs";

export function isAuthConfigured(): boolean {
  return ["NEXTAUTH_URL", "NEXTAUTH_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"]
    .every((name) => Boolean(process.env[name]?.trim()));
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: { scope: "openid email profile", prompt: "select_account", hd: "gumlet.com" },
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    async signIn({ account, profile }) {
      return isApprovedGoogleProfile(account?.provider, profile);
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.googleVerified = isApprovedGoogleProfile(account.provider, profile);
        token.email = profile?.email;
      }
      if (!isApprovedEmail(token.email)) token.googleVerified = false;
      return token;
    },
    async session({ session, token }) {
      if (token.googleVerified !== true || !isApprovedEmail(token.email)) {
        session.user = undefined;
      }
      return session;
    },
  },
};

export async function requireUser() {
  if (!isAuthConfigured()) redirect("/login");
  const session = await getServerSession(authOptions);
  if (!session?.user || !isApprovedEmail(session.user.email)) redirect("/login");
  return session.user;
}
