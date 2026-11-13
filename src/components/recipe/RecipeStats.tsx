import Icon from '../Icon'
import type { Recipe } from '../../types'
import { icons } from '../../recipesConstants'

interface Stat {
  icon: string
  label: string
  value: string
}

function getStats(recipe: Recipe): Stat[] {
  const stats: Stat[] = []
  if (recipe.prepTimeMinutes != null) {
    stats.push({ icon: icons.cutlery, label: 'Prep Time', value: `${recipe.prepTimeMinutes} min` })
  }
  if (recipe.cookTimeMinutes != null) {
    stats.push({ icon: icons.pot, label: 'Cook Time', value: `${recipe.cookTimeMinutes} min` })
  }
  if (recipe.servings != null) {
    const people = recipe.servings === 1 ? 'person' : 'people'
    stats.push({ icon: icons.people, label: 'Servings', value: `${recipe.servings} ${people}` })
  }
  if (recipe.cuisine) {
    stats.push({ icon: icons.chef, label: 'Cuisine', value: recipe.cuisine })
  }
  return stats
}

/** Prep time, cook time, servings and cuisine in a row. */
function RecipeStats({ recipe }: { recipe: Recipe }) {
  const stats = getStats(recipe)
  if (stats.length === 0) return null

  return (
    <dl className="mt-6 grid grid-cols-2 gap-y-5 border-y border-emerald-100 py-5 sm:grid-cols-3 sm:divide-x sm:divide-emerald-100">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-3 sm:justify-center">
          <Icon d={stat.icon} className="h-6 w-6 shrink-0 text-green-700" />
          <div className="min-w-0">
            <dt className="text-xs text-slate-500">{stat.label}</dt>
            <dd className="truncate text-sm font-extrabold text-green-950">{stat.value}</dd>
          </div>
        </div>
      ))}
    </dl>
  )
}

export default RecipeStats
