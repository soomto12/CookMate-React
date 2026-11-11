import type { CommonAllergen } from './shared'

interface Props {
  allergen: CommonAllergen
  selected: boolean
  onToggle: () => void
}

/** One selectable allergen button with its emoji; turns green when picked. */
function AllergenTile({ allergen, selected, onToggle }: Props) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={selected}
        onClick={onToggle}
        className={`flex h-12 w-full items-center gap-3 rounded-lg border px-3.5 text-sm font-medium outline-none transition focus-visible:ring-4 focus-visible:ring-green-600/25 ${
          selected
            ? 'border-green-700 bg-green-700 text-white'
            : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50'
        }`}
      >
        <span className="w-5 text-center text-base leading-none" aria-hidden="true">
          {allergen.icon}
        </span>
        <span className="flex-1 text-left">{allergen.name}</span>
        {selected && (
          <span aria-hidden="true" className="text-xs">
            ✓
          </span>
        )}
      </button>
    </li>
  )
}

export default AllergenTile
