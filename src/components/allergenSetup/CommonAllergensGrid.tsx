import AllergenTile from './AllergenTile'
import type { CommonAllergen } from './shared'

interface Props {
  allergens: CommonAllergen[]
  selected: string[]
  onToggle: (name: string) => void
  query: string
}

function CommonAllergensGrid({ allergens, selected, onToggle, query }: Props) {
  return (
    <>
      <h2 className="mt-8 font-jakarta text-sm font-bold text-stone-900">Common Allergies</h2>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {allergens.map((allergen) => (
          <AllergenTile
            key={allergen.name}
            allergen={allergen}
            selected={selected.includes(allergen.name)}
            onToggle={() => onToggle(allergen.name)}
          />
        ))}
      </ul>
      {allergens.length === 0 && (
        <p className="mt-2 text-sm text-stone-500">No allergens match &ldquo;{query}&rdquo;.</p>
      )}
    </>
  )
}

export default CommonAllergensGrid
