import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions, isAuthConfigured } from "@/lib/auth";
import { isApprovedEmail } from "@/lib/access";
import { GumletLogo } from "@/components/GumletLogo";
import { GoogleSignIn } from "@/components/GoogleSignIn";

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
    <main className="flex min-h-screen items-center justify-center bg-[#f8f1e6] px-6 py-12 text-[#1f211d]">
      <div className="w-full max-w-sm">
        <GumletLogo />
        <h1 className="mt-6 text-3xl font-semibold">wingman</h1>
        <p className="mb-6 mt-2 text-base text-[#665d52]">Sign in with your Gumlet Google account.</p>
        {error ? <p role="alert" className="mb-4 text-sm text-red-700">
          {error === "AccessDenied" ? "This account does not have access. Please contact your administrator." : "Unable to sign in. Please try again."}
        </p> : null}
        {!configured ? <p role="status" className="mb-4 text-sm text-[#665d52]">Sign-in is being set up. Please contact your administrator.</p> : null}
        <GoogleSignIn configured={configured} />
      </div>
    </main>
  );
}
