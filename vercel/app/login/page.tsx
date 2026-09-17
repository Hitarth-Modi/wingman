import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions, isAuthConfigured } from "@/lib/auth";
import { isApprovedEmail } from "@/lib/access";
import { GumletLogo } from "@/components/GumletLogo";
import { GoogleSignIn } from "@/components/GoogleSignIn";
import { Compass, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Login({ searchParams }: {
  searchParams: Promise<{ error?: string }>;
}) {
  const configured = isAuthConfigured();
  if (configured) {
    const session = await getServerSession(authOptions);
    if (session?.user && isApprovedEmail(session.user.email)) redirect("/");
  }
  const { error } = await searchParams;

  return (
    <main className="login-screen">
      <header className="login-header">
        <GumletLogo compact />
        <span className="workspace-label"><ShieldCheck size={15} aria-hidden="true" />Gumlet workspace</span>
      </header>
      <div className="login-body">
      <div className="login-content">
        <div className="login-mark"><Compass size={30} strokeWidth={1.5} aria-hidden="true" /><h1 className="login-wordmark">wingman</h1></div>
        <p className="login-copy">Sign in with your Gumlet Google account.</p>
        {error ? <p role="alert" className="login-alert">
          {error === "AccessDenied" ? "This account does not have access. Please contact your administrator." : "Unable to sign in. Please try again."}
        </p> : null}
        {!configured ? <p role="status" className="login-status">Sign-in is being set up. Please contact your administrator.</p> : null}
        <GoogleSignIn configured={configured} />
      </div>
      </div>
      <footer className="login-footer">Gumlet &middot; Internal workspace</footer>
    </main>
  );
}
