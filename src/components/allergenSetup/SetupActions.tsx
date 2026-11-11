import ErrorAlert from '../allergens/ErrorAlert'

interface Props {
  loading: boolean
  error: string
  onContinue: () => void
  onSkip: () => void
}

/** Error message (if any), the Continue button and "Skip for now". */
function SetupActions({ loading, error, onContinue, onSkip }: Props) {
  return (
    <>
      {error && <ErrorAlert message={error} className="mt-6" />}
      <button
        type="button"
        onClick={onContinue}
        disabled={loading}
        className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-green-700 text-sm font-bold text-white shadow-lg shadow-green-900/15 outline-none transition hover:bg-green-800 focus-visible:ring-4 focus-visible:ring-green-600/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Saving...' : <>Continue <span aria-hidden="true">→</span></>}
      </button>
      <button
        type="button"
        onClick={onSkip}
        className="mx-auto mt-5 block text-sm font-semibold text-green-800 hover:underline"
      >
        Skip for now
      </button>
    </>
  )
}

export default SetupActions
