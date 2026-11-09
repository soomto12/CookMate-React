import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import Toggle from './Toggle'
import { useRecipe } from '../context/RecipeContext'
import { INGREDIENT_URL } from '../generateConstants'
import { authFetch, SessionExpiredError } from '../session'
import logo from '../assets/Mealio Green Fork Logo.png'
import {
  formatIngredient,
  getErrorMessage,
  type IngredientResponse,
  type MealDetails,
  type RecipeDetailsModalProps,
  type RecipeIngredient,
} from '../types'

const icons = {
  close: 'M6 6l12 12M18 6L6 18',
  clock: 'M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z',
  chef: 'M7 14a4 4 0 01-1-7.9A5 5 0 0116 5a4 4 0 011 8.1V20H7v-6zM7 17h10',
  cutlery: 'M7 3v4a2 2 0 004 0V3M9 9v12M17 3c-1.4 2-2 4-2 6h4c0-2-.6-4-2-6zM17 9v12',
  leaf: 'M20 3C10 3 4 8.5 4 15c0 1.4.3 2.6.8 3.6C3.6 19.8 3 21 3 21M11 19c6 0 9-7 9-16',
  check: 'M5.5 12.5l4 4 9-9',
  pot: 'M4 11h16v6a3 3 0 01-3 3H7a3 3 0 01-3-3v-6zM2 11h20M8 7c0-1 1-1 1-2s-1-1-1-2M13 7c0-1 1-1 1-2s-1-1-1-2',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5',
  arrow: 'M5 12h14M13 6l6 6-6 6',
}

// The API may send ingredients as plain strings or as {name, quantity, unit}.
const toIngredients = (raw: unknown): RecipeIngredient[] => {
  if (!Array.isArray(raw)) return []
  return raw
    .map((item): RecipeIngredient => {
      if (typeof item === 'string') return { name: item, quantity: null, unit: null }
      const ing = item as Partial<RecipeIngredient>
      return {
        name: ing.name ?? '',
        quantity: ing.quantity ?? null,
        unit: ing.unit ?? null,
      }
    })
    .filter((ing) => ing.name)
}

const normalise = (data: IngredientResponse): MealDetails => ({
  name: data.mealname || data.mealName || data.title || '',
  description: data.description ?? '',
  ingredients: toIngredients(Array.isArray(data) ? data : data.ingredients),
  servings: data.servings ?? null,
  difficulty: data.difficulty ?? null,
  prepTimeMinutes: data.prepTimeMinutes ?? null,
  cookTimeMinutes: data.cookTimeMinutes ?? null,
})

const formatDifficulty = (difficulty: string) =>
  difficulty.charAt(0) + difficulty.slice(1).toLowerCase()

// ---------------------------------------------------------------------------
// TEMPORARY sample data, shown when /ingredients cannot be reached, so the
// modal can be reviewed without the API. Delete this block once the route is live.
// ---------------------------------------------------------------------------
const SAMPLE_INGREDIENTS: Record<string, RecipeIngredient[]> = {
  'Chicken Fried Rice': [
    { name: 'Chicken breast', quantity: 200, unit: 'g' },
    { name: 'Rice', quantity: 2, unit: 'cups' },
    { name: 'Carrots', quantity: 1, unit: 'cup' },
    { name: 'Green peas', quantity: 0.5, unit: 'cup' },
    { name: 'Onions', quantity: 1, unit: 'medium' },
    { name: 'Soy sauce', quantity: 2, unit: 'tbsp' },
    { name: 'Cooking oil', quantity: null, unit: null },
    { name: 'Salt & pepper', quantity: null, unit: null },
  ],
  'Spaghetti Bolognese': [
    { name: 'Spaghetti', quantity: 300, unit: 'g' },
    { name: 'Minced beef', quantity: 400, unit: 'g' },
    { name: 'Chopped tomatoes', quantity: 2, unit: 'cups' },
    { name: 'Tomato paste', quantity: 2, unit: 'tbsp' },
    { name: 'Onions', quantity: 1, unit: 'medium' },
    { name: 'Garlic', quantity: 3, unit: 'cloves' },
    { name: 'Olive oil', quantity: 2, unit: 'tbsp' },
    { name: 'Parmesan', quantity: null, unit: null },
  ],
  'Vegetable Stir-Fry': [
    { name: 'Broccoli florets', quantity: 2, unit: 'cups' },
    { name: 'Bell peppers', quantity: 2, unit: 'medium' },
    { name: 'Carrots', quantity: 1, unit: 'cup' },
    { name: 'Snap peas', quantity: 1, unit: 'cup' },
    { name: 'Garlic', quantity: 2, unit: 'cloves' },
    { name: 'Fresh ginger', quantity: 1, unit: 'tbsp' },
    { name: 'Soy sauce', quantity: 3, unit: 'tbsp' },
    { name: 'Sesame oil', quantity: 1, unit: 'tbsp' },
  ],
  'Grilled Chicken Salad': [
    { name: 'Chicken breast', quantity: 2, unit: 'fillets' },
    { name: 'Mixed greens', quantity: 4, unit: 'cups' },
    { name: 'Cherry tomatoes', quantity: 1, unit: 'cup' },
    { name: 'Cucumber', quantity: 1, unit: 'medium' },
    { name: 'Red onion', quantity: 0.5, unit: 'medium' },
    { name: 'Feta cheese', quantity: 0.5, unit: 'cup' },
    { name: 'Olive oil', quantity: 3, unit: 'tbsp' },
    { name: 'Lemon juice', quantity: 2, unit: 'tbsp' },
  ],
  'Jollof Rice': [
    { name: 'Long-grain rice', quantity: 3, unit: 'cups' },
    { name: 'Tomatoes', quantity: 4, unit: 'large' },
    { name: 'Red bell peppers', quantity: 2, unit: 'medium' },
    { name: 'Scotch bonnet', quantity: 1, unit: null },
    { name: 'Onions', quantity: 2, unit: 'medium' },
    { name: 'Tomato paste', quantity: 3, unit: 'tbsp' },
    { name: 'Vegetable oil', quantity: 0.5, unit: 'cup' },
    { name: 'Chicken stock', quantity: 3, unit: 'cups' },
  ],
  'Creamy Pasta': [
    { name: 'Penne pasta', quantity: 400, unit: 'g' },
    { name: 'Heavy cream', quantity: 1, unit: 'cup' },
    { name: 'Parmesan', quantity: 1, unit: 'cup' },
    { name: 'Garlic', quantity: 4, unit: 'cloves' },
    { name: 'Butter', quantity: 2, unit: 'tbsp' },
    { name: 'Baby spinach', quantity: 2, unit: 'cups' },
    { name: 'Salt & black pepper', quantity: null, unit: null },
  ],
}

const sampleDetails = (name: string, time: string): MealDetails => ({
  name,
  description:
    'A simple and delicious meal made with tender chicken, fragrant rice and fresh vegetables.',
  ingredients: SAMPLE_INGREDIENTS[name] ?? SAMPLE_INGREDIENTS['Chicken Fried Rice'],
  servings: 2,
  difficulty: 'EASY',
  prepTimeMinutes: 10,
  cookTimeMinutes: Number.parseInt(time, 10) || null,
})

function RecipeDetailsModal({ recipe, onClose }: RecipeDetailsModalProps) {
  const navigate = useNavigate()
  const { submit, suggestLoading, suggestError } = useRecipe()
  const closeRef = useRef<HTMLButtonElement>(null)
  const [details, setDetails] = useState<MealDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [usingSample, setUsingSample] = useState(false)
  const [quickMeal, setQuickMeal] = useState(false)
  const [excludeAllergens, setExcludeAllergens] = useState(false)

  const load = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true)
      setError('')
      setUsingSample(false)
      try {
        const res = await authFetch(INGREDIENT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mealName: recipe.name }),
          signal,
        })

        const data = (await res.json().catch(() => ({}))) as IngredientResponse
        if (!res.ok) {
          throw new Error(data.error || data.message || `Request failed (${res.status})`)
        }
        setDetails(normalise(data))
      } catch (err) {
        if (signal?.aborted) return
        // The session is gone and the guard is already redirecting to /login,
        // so don't swap in sample data on the way out.
        if (err instanceof SessionExpiredError) {
          setError(err.message)
          return
        }
        // TEMPORARY: fall back to sample data instead of an error panel, so the
        // design is reviewable before /ingredient exists.
        setDetails(sampleDetails(recipe.name, recipe.time))
        setUsingSample(true)
        setError(getErrorMessage(err))
      } finally {
        if (!signal?.aborted) setLoading(false)
      }
    },
    [recipe.name, recipe.time],
  )

  useEffect(() => {
    const controller = new AbortController()
    void load(controller.signal)
    return () => controller.abort()
  }, [load])

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  const handleCook = async () => {
    if (!details) return
    const ingredientNames = details.ingredients.map((ingredient) => ingredient.name).join(', ')
    const ok = await submit({
      meal: details.name || recipe.name,
      ingredients: ingredientNames,
      justIngredients: false,
      quickMeal,
      excludeAllergens,
    })
    if (ok) {
      onClose()
      navigate('/recipes')
    }
  }

  // /ingredients returns only the ingredient list and meal name, so the
  // modal always shows the home page card's image.
  const image = recipe.image
  const title = details?.name || recipe.name

  const chips = [
    {
      icon: icons.clock,
      value: details?.cookTimeMinutes != null ? `${details.cookTimeMinutes} mins` : recipe.time,
      label: details?.prepTimeMinutes != null ? `Prep: ${details.prepTimeMinutes} mins` : null,
    },
    details?.difficulty
      ? { icon: icons.chef, value: formatDifficulty(details.difficulty), label: 'Difficulty' }
      : null,
    details?.servings != null
      ? { icon: icons.cutlery, value: `${details.servings} servings`, label: null }
      : null,
  ].filter((chip): chip is { icon: string; value: string; label: string | null } => chip !== null)

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-green-950/50 font-jakarta backdrop-blur-sm sm:items-center sm:p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl ring-1 ring-emerald-100 sm:max-h-[92vh] sm:rounded-3xl"
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <span className="flex items-center gap-2 text-base font-extrabold text-green-950 sm:text-xl">
            <img src={logo} alt="" className="h-7 w-7 sm:h-9 sm:w-9" />
            Mealio
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close recipe details"
            className="flex h-9 w-9 items-center justify-center rounded-full text-green-950 transition hover:bg-emerald-50"
          >
            <Icon d={icons.close} className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 sm:px-6">
          <img
            src={image}
            alt={title}
            className="aspect-[2/1] w-full rounded-2xl object-cover sm:aspect-[16/10]"
          />
        </div>

        <div className="px-4 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
          <h2
            id="recipe-modal-title"
            className="text-xl font-extrabold leading-tight text-green-950 sm:text-3xl"
          >
            {title}
          </h2>
          {details?.description && (
            <p className="mt-1.5 text-xs leading-5 text-slate-600 sm:mt-2 sm:text-base sm:leading-6">
              {details.description}
            </p>
          )}

          <dl className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
            {chips.map((chip) => (
              <div
                key={chip.value}
                className="flex flex-col items-center gap-1 rounded-xl bg-emerald-50/70 px-2 py-2.5 text-center ring-1 ring-emerald-100 sm:flex-row sm:gap-2.5 sm:px-3.5 sm:text-left"
              >
                <Icon d={chip.icon} className="h-4 w-4 shrink-0 text-green-700 sm:h-5 sm:w-5" />
                <div className="min-w-0">
                  <dt className="truncate text-xs font-extrabold text-green-950 sm:text-sm">
                    {chip.value}
                  </dt>
                  {chip.label && (
                    <dd className="truncate text-[10px] text-slate-500 sm:text-xs">
                      {chip.label}
                    </dd>
                  )}
                </div>
              </div>
            ))}
          </dl>

          <h3 className="mt-5 flex items-center gap-2 text-base font-extrabold text-green-950 sm:mt-6 sm:text-lg">
            <Icon d={icons.leaf} className="h-5 w-5 text-green-600" />
            Ingredients
          </h3>

          {usingSample && (
            <p className="mt-2 text-xs font-semibold text-amber-600">
              Showing sample ingredients &mdash; /ingredients is not reachable yet.
            </p>
          )}

          {loading && (
            <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5 sm:gap-x-6" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="h-5 w-5 shrink-0 animate-pulse rounded-full bg-emerald-100" />
                  <span className="h-3.5 w-full animate-pulse rounded bg-emerald-50" />
                </li>
              ))}
            </ul>
          )}
          <p role="status" className="sr-only">
            {loading ? 'Loading ingredients' : ''}
          </p>

          {!loading && error && !usingSample && (
            <div className="mt-3 rounded-xl bg-rose-50 px-4 py-3 ring-1 ring-rose-100">
              <p className="text-sm text-rose-700">{error}</p>
              <button
                type="button"
                onClick={() => void load()}
                className="mt-2 text-sm font-bold text-green-800 underline underline-offset-2 transition hover:text-green-950"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && details && details.ingredients.length === 0 && (
            <p className="mt-3 text-sm text-slate-500">
              No ingredients came back for this meal.
            </p>
          )}

          {!loading && details && details.ingredients.length > 0 && (
            <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5 sm:mt-3.5 sm:gap-x-6 sm:gap-y-3">
              {details.ingredients.map((ingredient) => (
                <li
                  key={ingredient.name}
                  className="flex items-start gap-2 text-xs leading-5 text-stone-700 sm:gap-2.5 sm:text-base sm:leading-6"
                >
                  <span
                    aria-hidden="true"
                    className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-600 text-white sm:mt-0.5 sm:h-5 sm:w-5"
                  >
                    <Icon d={icons.check} className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </span>
                  {formatIngredient(ingredient)}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 grid gap-3 rounded-2xl bg-emerald-50/70 p-3.5 ring-1 ring-emerald-100 sm:mt-6 sm:grid-cols-2 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <Icon d={icons.bolt} className="h-5 w-5 shrink-0 text-amber-500" />
                <span className="text-sm font-bold text-green-950">Quick Meal</span>
              </span>
              <Toggle
                name="modalQuickMeal"
                label=""
                ariaLabel="Quick meal"
                checked={quickMeal}
                onChange={setQuickMeal}
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <Icon d={icons.shield} className="h-5 w-5 shrink-0 text-green-700" />
                <span className="text-sm font-bold text-green-950">Exclude Allergens</span>
              </span>
              <Toggle
                name="modalExcludeAllergens"
                label=""
                ariaLabel="Exclude allergens"
                checked={excludeAllergens}
                onChange={setExcludeAllergens}
              />
            </div>
          </div>

          {suggestError && (
            <p role="alert" className="mt-3 text-sm text-red-700">
              {suggestError}
            </p>
          )}

          <div className="mt-5 grid gap-2.5 sm:mt-6 sm:gap-3">
            <button
              type="button"
              onClick={() => void handleCook()}
              disabled={!details || suggestLoading}
              className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:py-4 sm:text-base"
            >
              <Icon d={icons.pot} className="h-5 w-5" />
              {suggestLoading ? 'Generating...' : 'Cook This Meal'}
              <Icon d={icons.arrow} className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetailsModal
