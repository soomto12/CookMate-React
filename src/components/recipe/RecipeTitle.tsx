import { useState } from 'react'
import Icon from '../Icon'
import type { Recipe } from '../../types'
import { formatDifficulty, icons } from '../../recipesConstants'

/** Title, description, tags and the favourite button. */
function RecipeTitle({ recipe }: { recipe: Recipe }) {
  const [favourite, setFavourite] = useState(false)
  const tags = [
    ...(recipe.tags ?? []),
    ...(recipe.difficulty ? [formatDifficulty(recipe.difficulty)] : []),
  ]

  return (
    <header className="flex items-start gap-4">
      <div className="min-w-0 flex-1">
        <h1
          id="recipe-title"
          className="text-2xl font-extrabold leading-tight tracking-tight text-green-950 sm:text-4xl"
        >
          {recipe.title}
        </h1>
        {recipe.description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            {recipe.description}
          </p>
        )}

        {tags.length > 0 && (
          <ul aria-label="Tags" className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-green-800 ring-1 ring-emerald-100 sm:text-sm"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        aria-label="Add to favourites"
        aria-pressed={favourite}
        onClick={() => setFavourite((v) => !v)}
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-md ring-1 ring-emerald-100 transition ${
          favourite ? 'bg-rose-500 text-white' : 'bg-white text-rose-400 hover:bg-rose-50'
        }`}
      >
        <Icon d={icons.heart} className="h-5 w-5" />
      </button>
    </header>
  )
}

export default RecipeTitle
