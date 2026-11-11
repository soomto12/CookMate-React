import Icon from '../Icon'
import type { Recipe } from '../../types'
import { icons } from '../../recipesConstants'
import heroFallback from '../../assets/Fresh Grilled Chicken Power Bowl.png'

/** The big recipe photo with the total-time badge and photo credit. */
function RecipeHero({ recipe }: { recipe: Recipe }) {
  const totalMinutes = (recipe.prepTimeMinutes ?? 0) + (recipe.cookTimeMinutes ?? 0)

  return (
    <figure className="relative m-0 p-0">
      <img
        src={recipe.imageUrl || heroFallback}
        alt={recipe.title}
        className="aspect-[2/1] w-full rounded-2xl object-cover sm:aspect-[21/9]"
      />

      {totalMinutes > 0 && (
        <figcaption className="absolute left-3 top-3 sm:left-4 sm:top-4">
          <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
            <Icon d={icons.clock} className="h-4 w-4" />
            <time dateTime={`PT${totalMinutes}M`}>{totalMinutes} min</time>
          </span>
        </figcaption>
      )}

      {recipe.imageCredit && (
        <small className="mt-2 block text-right text-xs text-slate-400">
          Photo by{' '}
          {recipe.imageCreditUrl ? (
            <a
              href={recipe.imageCreditUrl}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-slate-600"
            >
              {recipe.imageCredit}
            </a>
          ) : (
            recipe.imageCredit
          )}
        </small>
      )}
    </figure>
  )
}

export default RecipeHero
