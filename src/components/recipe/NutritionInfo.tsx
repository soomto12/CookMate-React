import type { RecipeNutrition } from '../../types'
import { icons } from '../../recipesConstants'
import SectionHeading from './SectionHeading'

function NutritionInfo({ nutrition }: { nutrition?: RecipeNutrition | null }) {
  if (!nutrition) return null

  const parts = [
    nutrition.calories != null && `~${nutrition.calories} kcal`,
    nutrition.proteinGrams != null && `${nutrition.proteinGrams}g Protein`,
    nutrition.carbsGrams != null && `${nutrition.carbsGrams}g Carbs`,
    nutrition.fatGrams != null && `${nutrition.fatGrams}g Fat`,
  ].filter(Boolean)

  if (parts.length === 0) return null

  return (
    <section
      aria-labelledby="nutrition-heading"
      className="mt-7 rounded-2xl bg-emerald-50/80 px-5 py-4 ring-1 ring-emerald-100"
    >
      <SectionHeading id="nutrition-heading" icon={icons.chart} className="text-base">
        Nutrition Info
      </SectionHeading>
      <p className="mt-1.5 text-sm text-slate-600">{parts.join(' • ')}</p>
    </section>
  )
}

export default NutritionInfo
