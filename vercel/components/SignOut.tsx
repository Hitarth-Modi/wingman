"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button type="button" title="Sign out" aria-label="Sign out"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#e0d2c0] bg-white hover:bg-[#f4eadc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a4fff]">
      <LogOut size={18} aria-hidden="true" />
    </button>
  );
}
