import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'
import Icon from '../components/Icon'
import RecipeSkeleton from '../components/RecipeSkeleton'
import UserMenu from '../components/UserMenu'
import { useRecipe } from '../context/RecipeContext'
import { formatIngredient } from '../types'
import { formatDifficulty, iconButtonClass, icons, itemKey } from '../recipesConstants'
import heroFallback from '../assets/Fresh Grilled Chicken Power Bowl.png'
import shoppingBasket from '../assets/Screenshot 2026-11-04 110842.png'

function Recipes() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [favourite, setFavourite] = useState(false)
  const [checked, setChecked] = useState<string[]>([])
  const [inCart, setInCart] = useState<string[]>([])
  const { recipe, suggestions, recipeLoading, recipeError, loadLatestRecipe } = useRecipe()

  useEffect(() => {
    if (!recipe) loadLatestRecipe()
    // only on mount: once a recipe is set (by this fetch or by Generate), we don't refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalMinutes = recipe ? (recipe.prepTimeMinutes ?? 0) + (recipe.cookTimeMinutes ?? 0) : 0
  const tags = recipe
    ? [...(recipe.tags ?? []), ...(recipe.difficulty ? [formatDifficulty(recipe.difficulty)] : [])]
    : []
  const nutrition = recipe?.nutrition
  const nutritionParts = nutrition
    ? [
        nutrition.calories != null && `~${nutrition.calories} kcal`,
        nutrition.proteinGrams != null && `${nutrition.proteinGrams}g Protein`,
        nutrition.carbsGrams != null && `${nutrition.carbsGrams}g Carbs`,
        nutrition.fatGrams != null && `${nutrition.fatGrams}g Fat`,
      ].filter(Boolean)
    : []

  const stats = !recipe
    ? []
    : [
        recipe.prepTimeMinutes != null && {
          icon: icons.cutlery,
          label: 'Prep Time',
          value: `${recipe.prepTimeMinutes} min`,
        },
        recipe.cookTimeMinutes != null && {
          icon: icons.pot,
          label: 'Cook Time',
          value: `${recipe.cookTimeMinutes} min`,
        },
        recipe.servings != null && {
          icon: icons.people,
          label: 'Servings',
          value: `${recipe.servings} ${recipe.servings === 1 ? 'person' : 'people'}`,
        },
        recipe.cuisine ? { icon: icons.chef, label: 'Cuisine', value: recipe.cuisine } : false,
      ].filter((stat): stat is { icon: string; label: string; value: string } => Boolean(stat))

  const toggleIngredient = (key: string) =>
    setChecked((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  // The API may attach a shopping list; otherwise shop the ingredient list.
  const shoppingItems = recipe ? (recipe.shoppingLists?.[0]?.items ?? recipe.ingredients) : []

  const toggleCart = (key: string) =>
    setInCart((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  return (
    <div className="flex min-h-screen font-jakarta">
      <AppSidebar current="/recipes" open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0 flex-1 bg-white">
        <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <header className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="sidebar"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-green-800 text-green-800 transition hover:bg-green-50 lg:hidden"
            >
              <Icon d={icons.menu} className="h-5 w-5" />
            </button>

            <nav aria-label="Recipe actions" className="flex min-w-0 flex-1 items-center gap-2">
              <Link
                to="/generate"
                className="flex min-w-0 items-center gap-2.5 rounded-full py-2 pr-3 text-sm font-bold text-green-950 transition hover:text-green-700 sm:text-base"
              >
                <Icon d={icons.back} className="h-5 w-5 shrink-0" />
                <span className="truncate">Back to recipes</span>
              </Link>

              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Bookmark recipe"
                  aria-pressed={saved}
                  onClick={() => setSaved((v) => !v)}
                  className={`${iconButtonClass} ${saved ? 'bg-emerald-100' : ''}`}
                >
                  <Icon d={icons.bookmark} className="h-5 w-5" />
                </button>
                <button type="button" aria-label="Share recipe" className={iconButtonClass}>
                  <Icon d={icons.share} className="h-5 w-5" />
                </button>
                <UserMenu />
              </div>
            </nav>
          </header>

          <main className="mt-4">
            {!recipe && suggestions.length > 0 && (
              <section
                aria-labelledby="suggestions-heading"
                className="mb-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-emerald-100"
              >
                <h2
                  id="suggestions-heading"
                  className="flex items-center gap-2 text-base font-extrabold text-green-950"
                >
                  <Icon d={icons.sparkles} className="h-5 w-5 text-green-600" />
                  Suggested meals
                </h2>
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
            )}

            {!recipe && recipeLoading ? (
              <RecipeSkeleton />
            ) : !recipe && recipeError ? (
              <section className="flex flex-col items-center gap-4 rounded-2xl bg-rose-50 px-6 py-16 text-center ring-1 ring-rose-100">
                <Icon d={icons.chef} className="h-10 w-10 text-rose-500" />
                <div>
                  <h2 className="text-lg font-extrabold text-green-950">Couldn&rsquo;t load your recipe</h2>
                  <p className="mt-1 text-sm text-slate-600">{recipeError}</p>
                </div>
                <button
                  type="button"
                  onClick={() => loadLatestRecipe()}
                  className="rounded-xl bg-green-800 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-green-900/20 transition hover:bg-green-900"
                >
                  Try again
                </button>
              </section>
            ) : !recipe ? (
              <section className="flex flex-col items-center gap-4 rounded-2xl bg-emerald-50/60 px-6 py-16 text-center ring-1 ring-emerald-100">
                <Icon d={icons.chef} className="h-10 w-10 text-green-700" />
                <div>
                  <h2 className="text-lg font-extrabold text-green-950">No recipe yet</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Generate a recipe from your ingredients to see it here.
                  </p>
                </div>
                <Link
                  to="/generate"
                  className="rounded-xl bg-green-800 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-green-900/20 transition hover:bg-green-900"
                >
                  Generate a recipe
                </Link>
              </section>
            ) : (
            <article aria-labelledby="recipe-title">
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

              <div className="pb-8 pt-5">
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

                {stats.length > 0 && (
                  <dl className="mt-6 grid grid-cols-2 gap-y-5 border-y border-emerald-100 py-5 sm:grid-cols-3 sm:divide-x sm:divide-emerald-100">
                    {stats.map((stat) => (
                      <div key={stat.label} className="flex items-center gap-3 sm:justify-center">
                        <Icon d={stat.icon} className="h-6 w-6 shrink-0 text-green-700" />
                        <div className="min-w-0">
                          <dt className="text-xs text-slate-500">{stat.label}</dt>
                          <dd className="truncate text-sm font-extrabold text-green-950">
                            {stat.value}
                          </dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-6 grid gap-7 lg:grid-cols-2 lg:gap-10">
                  <section aria-labelledby="ingredients-heading">
                    <h2
                      id="ingredients-heading"
                      className="flex items-center gap-2 text-lg font-extrabold text-green-950"
                    >
                      <Icon d={icons.cart} className="h-5 w-5 text-green-600" />
                      Ingredients
                    </h2>
                    <ul className="mt-4 grid gap-3">
                      {recipe.ingredients.map((ing) => {
                        const key = ing.id ?? ing.name
                        const isChecked = checked.includes(key)
                        return (
                          <li key={key}>
                            <label className="flex cursor-pointer items-start gap-3 text-sm font-semibold leading-6 text-stone-800 sm:text-base">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleIngredient(key)}
                                className="peer sr-only"
                              />
                              <span
                                aria-hidden="true"
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition peer-focus-visible:ring-2 peer-focus-visible:ring-green-600/40 peer-focus-visible:ring-offset-2 ${
                                  isChecked ? 'bg-green-600 text-white' : 'bg-emerald-100 text-green-600'
                                }`}
                              >
                                <Icon d={icons.check} className="h-3.5 w-3.5" />
                              </span>
                              <span className={isChecked ? 'text-slate-400 line-through' : undefined}>
                                {formatIngredient(ing)}
                              </span>
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                  </section>

                  <section aria-labelledby="instructions-heading">
                    <h2
                      id="instructions-heading"
                      className="flex items-center gap-2 text-lg font-extrabold text-green-950"
                    >
                      <Icon d={icons.info} className="h-5 w-5 text-green-600" />
                      Instructions
                    </h2>
                    <ol className="mt-4 grid gap-3.5">
                      {[...recipe.steps]
                        .sort((a, b) => a.order - b.order)
                        .map((step, i) => (
                          <li
                            key={step.id ?? step.order}
                            className="flex items-start gap-3 text-sm font-semibold leading-6 text-stone-800 sm:text-base"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white"
                            >
                              {i + 1}
                            </span>
                            {step.instruction}
                          </li>
                        ))}
                    </ol>
                  </section>
                </div>

                <section
                  aria-labelledby="shopping-heading"
                  className="mt-7 rounded-2xl bg-emerald-50/80 p-5 ring-1 ring-emerald-100 sm:p-6"
                >
                  <h2
                    id="shopping-heading"
                    className="flex items-center gap-2 text-lg font-extrabold text-green-950"
                  >
                    <Icon d={icons.cart} className="h-5 w-5 text-green-600" />
                    Shopping List
                  </h2>

                  <div className="mt-4 flex items-start gap-6">
                    <ul className="min-w-0 flex-1 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {shoppingItems.map((item) => {
                        const key = itemKey(item)
                        const isInCart = inCart.includes(key)
                        return (
                          <li key={key}>
                            <label className="flex cursor-pointer items-start gap-3 text-sm font-semibold leading-6 text-stone-800 sm:text-base">
                              <input
                                type="checkbox"
                                checked={isInCart}
                                onChange={() => toggleCart(key)}
                                className="peer sr-only"
                              />
                              <span
                                aria-hidden="true"
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition peer-focus-visible:ring-2 peer-focus-visible:ring-green-600/40 peer-focus-visible:ring-offset-2 ${
                                  isInCart
                                    ? 'border-green-600 bg-green-600 text-white'
                                    : 'border-emerald-300 bg-white text-transparent'
                                }`}
                              >
                                <Icon d={icons.check} className="h-3.5 w-3.5" />
                              </span>
                              <span className={isInCart ? 'text-slate-400 line-through' : undefined}>
                                {formatIngredient(item)}
                              </span>
                            </label>
                          </li>
                        )
                      })}
                    </ul>

                    <img
                      src={shoppingBasket}
                      alt=""
                      aria-hidden="true"
                      className="hidden w-[147px] shrink-0 self-center rounded-xl sm:block"
                    />
                  </div>
                </section>

                {nutritionParts.length > 0 && (
                  <section
                    aria-labelledby="nutrition-heading"
                    className="mt-7 rounded-2xl bg-emerald-50/80 px-5 py-4 ring-1 ring-emerald-100"
                  >
                    <h2
                      id="nutrition-heading"
                      className="flex items-center gap-2 text-base font-extrabold text-green-950"
                    >
                      <Icon d={icons.chart} className="h-5 w-5 text-green-600" />
                      Nutrition Info
                    </h2>
                    <p className="mt-1.5 text-sm text-slate-600">{nutritionParts.join(' • ')}</p>
                  </section>
                )}

                <button
                  type="button"
                  aria-pressed={saved}
                  onClick={() => setSaved((v) => !v)}
                  className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-green-800 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-900 sm:text-base"
                >
                  <Icon d={icons.chef} className="h-5 w-5" />
                  {saved ? 'Saved to My Recipes' : 'Save Recipe'}
                </button>
              </div>
            </article>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Recipes
