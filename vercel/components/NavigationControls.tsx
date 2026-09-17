"use client";

type NavigationControlsProps = {
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
};

export function NavigationControls({
  canGoBack,
  canGoForward,
  onBack,
  onForward,
}: NavigationControlsProps) {
  return (
    <div className="flex items-center gap-2" aria-label="Call navigation">
      <button
        aria-label="Go back"
        className="flex h-10 w-10 items-center justify-center rounded-md border border-[#d8d4e2] bg-white text-lg font-semibold text-[#332a42] transition hover:border-[#c7bfd6] hover:bg-[#fbfafc] focus:outline-none focus:ring-4 focus:ring-[#6d35c7]/15 disabled:cursor-not-allowed disabled:text-[#b9adc9]"
        disabled={!canGoBack}
        onClick={onBack}
        title="Back"
        type="button"
      >
        ←
      </button>

      {canGoForward ? (
        <button
          aria-label="Go forward"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[#6d35c7] bg-[#f5f0ff] text-lg font-semibold text-[#4e2396] transition hover:bg-[#ece2ff] focus:outline-none focus:ring-4 focus:ring-[#6d35c7]/15"
          onClick={onForward}
          title="Forward"
          type="button"
        >
          →
        </button>
      ) : null}
    </div>
  );
}
