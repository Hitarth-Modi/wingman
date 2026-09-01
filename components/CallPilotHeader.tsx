"use client";

import { useEffect, useState } from "react";
import type { CallState } from "@/types/conversation";
import { formatIndustry } from "./formatters";
import { GumletLogo } from "./GumletLogo";
import { NavigationControls } from "./NavigationControls";

type CallPilotHeaderProps = {
  callState: CallState;
  navigation: {
    canGoBack: boolean;
    canGoForward: boolean;
    onBack: () => void;
    onForward: () => void;
  };
  onEndCall: () => void;
};

export function CallPilotHeader({ callState, navigation, onEndCall }: CallPilotHeaderProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const { prospect } = callState;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-10 border-b border-[#e4e1eb] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3">
              <GumletLogo compact />
              <h1 className="text-xl font-semibold text-[#17121f]">CallPilot</h1>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d9f0df] bg-[#f0fbf3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#247a3d]">
              <span className="h-2 w-2 rounded-full bg-[#2fad55]" />
              Call in progress
            </span>
            <span className="rounded-full border border-[#e4e1eb] px-3 py-1 text-xs font-semibold text-[#615a6b]">
              {formatElapsed(elapsedSeconds)}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-[#615a6b]">
            {prospect.company || "Prospect company"} · {formatIndustry(prospect.industry)} ·{" "}
            {prospect.jobTitle || "Role"} · {prospect.companySize || "Company size"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <NavigationControls {...navigation} />
          <button
            className="h-10 rounded-md border border-[#d8d4e2] bg-white px-4 text-sm font-semibold text-[#332a42] transition hover:border-[#c7bfd6] hover:bg-[#fbfafc] focus:outline-none focus:ring-4 focus:ring-[#6d35c7]/15"
            type="button"
            onClick={onEndCall}
          >
            End Call
          </button>
        </div>
      </div>
    </header>
  );
}

function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}
