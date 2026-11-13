import Icon from '../Icon'
import type { AllergenItem } from '../../hooks/useAllergens'
import AllergenRow from './AllergenRow'
import ErrorAlert from './ErrorAlert'
import { icons } from './shared'

interface Props {
  items: AllergenItem[]
  loading: boolean
  error: string
  onRetry: () => void
  removing: AllergenItem | null
  busy: boolean
  onRemove: (item: AllergenItem) => void
}

function SavedAllergensCard({ items, loading, error, onRetry, removing, busy, onRemove }: Props) {
  const ready = !loading && !error

  return (
    <section
      aria-labelledby="saved-heading"
      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100"
    >
      <h2
        id="saved-heading"
        className="flex items-center gap-2 px-5 pb-3 pt-5 text-base font-extrabold text-green-950 sm:text-lg"
      >
        <Icon d={icons.shield} className="h-5 w-5 text-green-700" />
        Your allergies
        {ready && (
          <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-green-800">
            {items.length}
          </span>
        )}
      </h2>

      {loading ? (
        <LoadingRows />
      ) : error ? (
        <LoadError message={error} onRetry={onRetry} />
      ) : items.length === 0 ? (
        <p className="px-5 pb-6 text-sm text-slate-500">No allergies saved yet. Add a food above.</p>
      ) : (
        <ul className="divide-y divide-emerald-50 border-t border-emerald-50">
          {items.map((item) => (
            <AllergenRow
              key={item.id ?? item.name}
              item={item}
              deleting={removing === item}
              disabled={busy}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

function LoadingRows() {
  return (
    <ul aria-busy="true" className="grid gap-2 px-5 pb-5">
      {[0, 1, 2].map((i) => (
        <li key={i} className="h-12 animate-pulse rounded-xl bg-emerald-50" />
      ))}
    </ul>
  )
}

function LoadError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="px-5 pb-5">
      <ErrorAlert message={message} />
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 text-sm font-semibold text-green-800 hover:underline"
      >
        Try again
      </button>
    </div>
  )
}

export default SavedAllergensCard
