import { Link } from 'react-router-dom'
import Icon from '../Icon'
import { icons } from '../../recipesConstants'

const actionClass =
  'rounded-xl bg-green-800 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-green-900/20 transition hover:bg-green-900'

/** Shown when the recipe failed to load. */
export function RecipeLoadError({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <section className="flex flex-col items-center gap-4 rounded-2xl bg-rose-50 px-6 py-16 text-center ring-1 ring-rose-100">
      <Icon d={icons.chef} className="h-10 w-10 text-rose-500" />
      <div>
        <h2 className="text-lg font-extrabold text-green-950">Couldn&rsquo;t load your recipe</h2>
        <p className="mt-1 text-sm text-slate-600">{error}</p>
      </div>
      <button type="button" onClick={onRetry} className={actionClass}>
        Try again
      </button>
    </section>
  )
}

interface EmptyProps {
  title: string
  message: string
  actionLabel?: string
  actionTo?: string
}

/** Shown when there is no recipe to display. */
export function RecipeEmpty({ title, message, actionLabel, actionTo }: EmptyProps) {
  return (
    <section className="flex flex-col items-center gap-4 rounded-2xl bg-emerald-50/60 px-6 py-16 text-center ring-1 ring-emerald-100">
      <Icon d={icons.chef} className="h-10 w-10 text-green-700" />
      <div>
        <h2 className="text-lg font-extrabold text-green-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">{message}</p>
      </div>
      {actionLabel && actionTo && (
        <Link to={actionTo} className={actionClass}>
          {actionLabel}
        </Link>
      )}
    </section>
  )
}
