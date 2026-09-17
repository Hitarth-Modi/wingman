"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button type="button" title="Sign out" aria-label="Sign out"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="icon-button">
      <LogOut size={18} aria-hidden="true" />
    </button>
  );
}
