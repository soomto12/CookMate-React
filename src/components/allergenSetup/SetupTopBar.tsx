/** Back arrow on the left, "Step 1 of 2" progress bar on the right. */
function SetupTopBar({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-stone-800 transition hover:bg-white"
      >
        ←
      </button>
      <div className="flex flex-col items-end gap-1.5">
        <span className="text-xs text-stone-600">Step 1 of 2</span>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-stone-200">
          <div className="h-full w-1/2 rounded-full bg-green-700" />
        </div>
      </div>
    </div>
  )
}

export default SetupTopBar
