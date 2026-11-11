import Icon from '../Icon'
import { icons } from './shared'

interface Props {
  suggestions: string[]
  onPick: (name: string) => void
  busy: boolean
  adding: string | null
}

function AllergenSuggestions({ suggestions, onPick, busy, adding }: Props) {
  if (suggestions.length === 0) return null

  return (
    <>
      <p className="mt-5 text-xs font-bold uppercase tracking-wide text-slate-500">
        Common allergens
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {suggestions.map((name) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => onPick(name)}
              disabled={busy}
              className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-sm font-medium text-green-900 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon d={icons.plus} className="h-3.5 w-3.5" />
              {adding === name ? 'Adding...' : name}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default AllergenSuggestions
