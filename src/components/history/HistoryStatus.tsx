import { Link } from 'react-router-dom'
import Icon from '../Icon'
import { icons } from './shared'

/** Grey placeholder rows while the history loads. */
export function HistorySkeleton() {
  return (
    <ul aria-hidden="true" className="grid animate-pulse gap-3">
      {[1, 2, 3, 4].map((i) => (
        <li
          key={i}
          className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-emerald-100 sm:gap-4"
        >
          <div className="h-16 w-16 shrink-0 rounded-xl bg-emerald-100 sm:h-20 sm:w-24" />
          <div className="min-w-0 flex-1">
            <div className="h-4 w-2/3 rounded-md bg-emerald-100" />
            <div className="mt-2 h-3 w-1/3 rounded-md bg-emerald-100" />
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Shown when the history failed to load. */
export function HistoryError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-2xl bg-rose-50 px-6 py-12 text-center ring-1 ring-rose-100">
      <Icon d={icons.chef} className="mx-auto h-10 w-10 text-rose-500" />
      <h2 className="mt-3 text-lg font-extrabold text-green-950">
        Couldn&rsquo;t load your history
      </h2>
      <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-xl bg-green-800 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-green-900/20 transition hover:bg-green-900"
      >
        Try again
      </button>
    </div>
  )
}

/** Shown when the user has not generated any recipes yet. */
export function HistoryEmpty() {
  return (
    <div className="rounded-2xl bg-emerald-50/60 px-6 py-12 text-center ring-1 ring-emerald-100">
      <Icon d={icons.sparkles} className="mx-auto h-10 w-10 text-green-600" />
      <h2 className="mt-3 text-lg font-extrabold text-green-950">No recipes yet</h2>
      <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-600">
        Recipes you generate will show up here so you can cook them again.
      </p>
      <Link
        to="/generate"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-900"
      >
        Generate a recipe
        <Icon d={icons.arrow} className="h-4 w-4" />
      </Link>
    </div>
  )
}
