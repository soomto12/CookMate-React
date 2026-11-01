import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'
import { useRecipe } from '../context/RecipeContext'

function Recipes() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { recipe, suggestions } = useRecipe()

  return (
    <div className="flex min-h-screen font-jakarta">
      <AppSidebar current="/recipes" open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0 flex-1 bg-gradient-to-br from-white via-emerald-50/40 to-emerald-50">
        <header className="flex items-center px-4 py-4 sm:px-8 sm:py-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="sidebar"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border-2 border-green-800 text-green-800 transition hover:bg-green-50 lg:hidden"
          >
            <span className="h-0.5 w-5 rounded bg-current" />
            <span className="h-0.5 w-5 rounded bg-current" />
            <span className="h-0.5 w-5 rounded bg-current" />
          </button>
        </header>

        <main className="px-4 pb-12 sm:px-8">
          {recipe ? (
            <article className="max-w-3xl">
              {recipe.imageUrl && (
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="h-64 w-full rounded-3xl object-cover"
                />
              )}
              {recipe.imageCredit && (
                <p className="mt-1 text-xs text-slate-500">
                  Photo by{' '}
                  {recipe.imageCreditUrl ? (
                    <a href={recipe.imageCreditUrl} target="_blank" rel="noreferrer" className="underline">
                      {recipe.imageCredit}
                    </a>
                  ) : (
                    recipe.imageCredit
                  )}
                </p>
              )}
              <h1 className="mt-4 text-2xl font-bold text-green-950">{recipe.title}</h1>
              {recipe.description && <p className="mt-2 text-slate-600">{recipe.description}</p>}

              <ul className="mt-4 flex flex-wrap gap-2 text-sm font-medium text-white">
                {recipe.cuisine && <li className="rounded-full bg-green-700 px-3 py-1">{recipe.cuisine}</li>}
                {recipe.servings != null && (
                  <li className="rounded-full bg-green-700 px-3 py-1">Serves {recipe.servings}</li>
                )}
                {recipe.cookTimeMinutes != null && (
                  <li className="rounded-full bg-green-700 px-3 py-1">{recipe.cookTimeMinutes} min</li>
                )}
                {recipe.difficulty && (
                  <li className="rounded-full bg-green-700 px-3 py-1">
                    {recipe.difficulty.charAt(0) + recipe.difficulty.slice(1).toLowerCase()}
                  </li>
                )}
              </ul>

              <h2 className="mt-8 text-lg font-bold text-green-950">Ingredients</h2>
              <ul className="mt-3 list-disc pl-5 text-slate-700">
                {recipe.ingredients.map((ing) => (
                  <li key={ing.id ?? ing.name}>
                    {[ing.quantity, ing.unit, ing.name].filter((v) => v != null).join(' ')}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-lg font-bold text-green-950">Steps</h2>
              <ol className="mt-3 list-decimal pl-5 text-slate-700">
                {[...recipe.steps]
                  .sort((a, b) => a.order - b.order)
                  .map((step) => (
                    <li key={step.id ?? step.order} className="mt-2">
                      {step.instruction}
                    </li>
                  ))}
              </ol>
            </article>
          ) : (
            <h1 className="text-2xl font-bold text-green-950">Your recipes</h1>
          )}

          {!recipe && suggestions.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {suggestions.map((food) => (
                <li
                  key={food}
                  className="rounded-full bg-green-700 px-3 py-1 text-sm font-medium text-white"
                >
                  {food}
                </li>
              ))}
            </ul>
          )}

          {!recipe && suggestions.length === 0 && (
            <p className="mt-3 text-sm text-slate-500">
              Nothing here yet.{' '}
              <Link to="/generate" className="font-semibold text-green-800 hover:underline">
                Generate a recipe
              </Link>
            </p>
          )}
        </main>
      </div>
    </div>
  )
}

export default Recipes
