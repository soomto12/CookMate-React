import Icon from '../Icon'
import { icons } from '../../recipesConstants'

interface Props {
  label: string
  checked: boolean
  onToggle: () => void
  /** "round" for ingredients, "square" for the shopping list. */
  shape: 'round' | 'square'
}

const boxClass = {
  round: {
    base: 'rounded-full',
    on: 'bg-green-600 text-white',
    off: 'bg-emerald-100 text-green-600',
  },
  square: {
    base: 'rounded-md border-2',
    on: 'border-green-600 bg-green-600 text-white',
    off: 'border-emerald-300 bg-white text-transparent',
  },
}

/** A tickable list line that strikes through its text when checked. */
function CheckItem({ label, checked, onToggle, shape }: Props) {
  const box = boxClass[shape]

  return (
    <li>
      <label className="flex cursor-pointer items-start gap-3 text-sm font-semibold leading-6 text-stone-800 sm:text-base">
        <input type="checkbox" checked={checked} onChange={onToggle} className="peer sr-only" />
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center transition peer-focus-visible:ring-2 peer-focus-visible:ring-green-600/40 peer-focus-visible:ring-offset-2 ${box.base} ${
            checked ? box.on : box.off
          }`}
        >
          <Icon d={icons.check} className="h-3.5 w-3.5" />
        </span>
        <span className={checked ? 'text-slate-400 line-through' : undefined}>{label}</span>
      </label>
    </li>
  )
}

export default CheckItem
