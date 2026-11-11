import type { MealSuggestion } from '../../types'
import { icons } from '../../recipesConstants'
import SectionHeading from './SectionHeading'

function SuggestedMeals({ suggestions }: { suggestions: MealSuggestion[] }) {
  if (suggestions.length === 0) return null

  return (
    <section
      aria-labelledby="suggestions-heading"
      className="mb-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-emerald-100"
    >
      <SectionHeading id="suggestions-heading" icon={icons.sparkles} className="text-base">
        Suggested meals
      </SectionHeading>
      <ul className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((food) => (
          <li
            key={food.name}
            className="rounded-full bg-emerald-50 px-3.5 py-1.5 text-sm font-semibold text-green-800 ring-1 ring-emerald-100"
          >
            {food.name}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SuggestedMeals
