"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function GoogleSignIn({ configured }: { configured: boolean }) {
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function login() {
    setPending(true);
    setFailed(false);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch {
      setFailed(true);
      setPending(false);
    }
  }

  return (
    <div>
      <button type="button" disabled={!configured || pending} onClick={login}
        className="w-full rounded-md bg-[#8a4fff] px-5 py-3 font-semibold text-white hover:bg-[#763be5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a4fff] disabled:cursor-not-allowed disabled:opacity-50">
        {pending ? "Signing in..." : "Sign in with Google"}
      </button>
      {failed ? <p role="alert" className="mt-3 text-sm text-red-700">Sign-in failed. Please try again.</p> : null}
    </div>
  );
}
