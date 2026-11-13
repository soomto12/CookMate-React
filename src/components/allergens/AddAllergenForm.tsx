import type { FormEvent } from 'react'
import Icon from '../Icon'
import { icons, sameName } from './shared'

interface Props {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  busy: boolean
  adding: string | null
}

function AddAllergenForm({ value, onChange, onSubmit, busy, adding }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(value)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
      <label htmlFor="allergen-input" className="sr-only">
        Food allergen
      </label>
      <input
        id="allergen-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Kiwi, sulphites..."
        autoComplete="off"
        className="h-12 min-w-0 flex-1 rounded-xl border border-emerald-100 bg-white px-4 text-sm text-stone-900 outline-none transition placeholder:text-slate-400 hover:border-emerald-200 focus:border-green-600 focus:ring-4 focus:ring-green-600/15"
      />
      <button
        type="submit"
        disabled={!value.trim() || busy}
        className="flex h-12 shrink-0 items-center gap-1.5 rounded-xl bg-green-800 px-5 text-sm font-bold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon d={icons.plus} className="h-4 w-4" />
        {adding !== null && sameName(adding, value) ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}

export default AddAllergenForm
