"use client";

import type { ReactNode } from "react";
import type { PilotStep } from "@/types/playbook";
import { GumletLogo } from "./GumletLogo";
import { NavigationControls } from "./NavigationControls";

type PilotFrameProps = {
  children: ReactNode;
  step: PilotStep;
  navigation: {
    canGoBack: boolean;
    canGoForward: boolean;
    onBack: () => void;
    onForward: () => void;
  };
};

const stepLabels: Record<PilotStep, string> = {
  setup: "Step 1",
  problems: "Step 2",
  benefits: "Step 3",
  features: "Step 4",
};

export function PilotFrame({ children, step, navigation }: PilotFrameProps) {
  return (
    <main className="min-h-screen bg-[#f8f1e6] text-[#1f211d]">
      <header className="sticky top-0 z-10 border-b border-[#e7ddcf] bg-[#fffaf3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <GumletLogo compact />
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold">wingman</h1>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a6f61]">
                {stepLabels[step]}
              </p>
            </div>
          </div>
          <NavigationControls {...navigation} />
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">{children}</div>
    </main>
  );
}
