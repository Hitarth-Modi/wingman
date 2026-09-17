"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

type NavigationControlsProps = { canGoBack: boolean; canGoForward: boolean; onBack: () => void; onForward: () => void };

export function NavigationControls({ canGoBack, canGoForward, onBack, onForward }: NavigationControlsProps) {
  return (
    <div className="navigation-controls" role="group" aria-label="Call navigation">
      <button aria-label="Go back" className="icon-button" disabled={!canGoBack}
        onClick={onBack} title="Back" type="button"><ArrowLeft size={17} aria-hidden="true" /></button>
      {canGoForward ? (
        <button aria-label="Go forward" className="icon-button" onClick={onForward}
          title="Forward" type="button"><ArrowRight size={17} aria-hidden="true" /></button>
      ) : null}
    </div>
  );
}
