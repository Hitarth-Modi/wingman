"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

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
        className="primary-button login-button">
        {pending ? "Signing in..." : "Sign in with Google"}
        {pending ? <LoaderCircle size={17} className="animate-spin" aria-hidden="true" /> : <ArrowRight size={17} aria-hidden="true" />}
      </button>
      {failed ? <p role="alert" className="login-alert mt-3">Sign-in failed. Please try again.</p> : null}
    </div>
  );
}
