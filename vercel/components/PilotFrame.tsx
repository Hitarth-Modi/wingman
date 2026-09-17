"use client";

import type { ReactNode } from "react";
import { Building2, Check } from "lucide-react";
import type { PilotStep } from "@/types/playbook";
import { GumletLogo } from "./GumletLogo";
import { NavigationControls } from "./NavigationControls";
import { SignOut } from "./SignOut";

type PilotFrameProps = {
  children: ReactNode;
  step: PilotStep;
  industryLabel?: string;
  navigation: {
    canGoBack: boolean;
    canGoForward: boolean;
    onBack: () => void;
    onForward: () => void;
  };
};

const steps: { id: PilotStep; label: string }[] = [
  { id: "setup", label: "Industry" },
  { id: "problems", label: "Questions" },
  { id: "benefits", label: "Benefits" },
  { id: "features", label: "Demo" },
];

export function PilotFrame({ children, step, industryLabel, navigation }: PilotFrameProps) {
  const currentStep = steps.findIndex((item) => item.id === step);

  return (
    <main className="workspace">
      <header className="workspace-header">
        <div className="header-main">
          <div className="brand-lockup">
            <GumletLogo compact />
            <span className="brand-divider" aria-hidden="true" />
            <h1 className="wordmark">wingman</h1>
          </div>
          <div className="header-actions">
            <NavigationControls {...navigation} />
            <span className="signout-divider" aria-hidden="true" />
            <SignOut />
          </div>
        </div>
        <ol className="progress-track" aria-label="Call progress">
          {steps.map((item, index) => (
            <li key={item.id} aria-current={index === currentStep ? "step" : undefined}
              className={`flow-step ${index === currentStep ? "is-active" : index < currentStep ? "is-complete" : ""}`}>
              <span className="step-number" aria-hidden="true">
                {index < currentStep ? <Check size={13} strokeWidth={2.5} /> : index + 1}
              </span>
              <span>{item.label}</span>
            </li>
          ))}
        </ol>
      </header>
      <div className="workspace-body">
        {industryLabel ? (
          <div className="workspace-context"><Building2 size={14} aria-hidden="true" />{industryLabel}</div>
        ) : null}
        <div className="screen-content" key={step}>{children}</div>
      </div>
    </main>
  );
}
