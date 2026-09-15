import { useState } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import type { Recipe } from '../types'
import { getErrorMessage } from '../types'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

const API_BASE = 'http://localhost:3000/api/recipes'

const HIGHLIGHTS = [
  {
    tagline: 'Authentic Recipe',
    emoji: '🍚',
    title: 'Smoky West African Jollof Rice',
    description:
      "A celebration of flavor featuring long-grain rice, fire-roasted tomatoes, and a signature spice blend that delivers the legendary smoky 'kanzo' crust.",
    time: '45 Min',
  },
  {
    tagline: "Chef's Pick",
    emoji: '🍝',
    title: 'Creamy Garlic Pasta',
    description: 'A rich, silky weeknight pasta that comes together in under 30 minutes.',
    time: '25 Min',
  },
  {
    tagline: 'Street Food Favorite',
    emoji: '🍢',
    title: 'Spicy Suya Skewers',
    description: 'Charred, peanut-spiced skewers straight from the Nigerian suya spot.',
    time: '30 Min',
  },
]

const TIPS = [
  'Your ginger is getting older. Try freezing it and grating it directly into your base for a more vibrant, spicy kick.',
  'Add a pinch of smoked paprika to your pantry for instant gourmet depth in any stew.',
  'A squeeze of lime juice at the end brightens almost any savory dish.',
]

function Home() {
  const [dish, setDish] = useState('')
  const [ingredientInput, setIngredientInput] = useState('')
  const [ingredients, setIngredients] = useState<string[]>([])
  const [addingIngredient, setAddingIngredient] = useState(false)
  const [vegetarian, setVegetarian] = useState(false)
  const [glutenFree, setGlutenFree] = useState(false)
  const [extraSpicy, setExtraSpicy] = useState(false)
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  const [highlight] = useState(
    () => HIGHLIGHTS[Math.floor(Math.random() * HIGHLIGHTS.length)],
  )
  const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)])

  const addIngredient = () => {
    const value = ingredientInput.trim()
    if (value && !ingredients.includes(value)) {
      setIngredients((list) => [...list, value])
    }
    setIngredientInput('')
  }

  const handleIngredientKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addIngredient()
    }
  }

  const handleIngredientBlur = () => {
    if (!ingredientInput.trim()) {
      setAddingIngredient(false)
    }
  }

  const removeIngredient = (value: string) => {
    setIngredients((list) => list.filter((item) => item !== value))
  }

  const toggleChecked = (id: string) => {
    setCheckedIngredients((list) =>
      list.includes(id) ? list.filter((item) => item !== id) : [...list, id],
    )
  }

  const handleSubmit = async () => {
    if (!dish.trim()) {
      setError('Tell CookMate what you want to cook first.')
      return
    }

    setLoading(true)
    setError('')
    setRecipe(null)
    setCheckedIngredients([])

    const token = localStorage.getItem('cookmate_token')

    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          mealName: dish.trim(),
          availableIngredients: ingredients,
          ...(vegetarian ? { vegetarian: true } : {}),
          ...(glutenFree ? { glutenFree: true } : {}),
          ...(extraSpicy ? { extraSpicy: true } : {}),
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(
          data.error || data.message || `Request failed (${res.status})`,
        )
      }

      setRecipe(data.recipe || data)
    } catch (err) {
      const message = getErrorMessage(err)
      setError(
        message === 'Failed to fetch'
          ? 'Could not reach the server. Is it running on localhost:3000?'
          : message,
      )
    } finally {
      setLoading(false)
    }
  }

  const startCookingHighlight = () => {
    setDish(highlight.title)
    handleSubmit()
  }

  return (
    <div className="min-h-screen bg-[#fffdf9] text-stone-900">
      <SiteHeader active="home" />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 rounded-[28px] border border-amber-100 bg-gradient-to-r from-amber-50 to-white p-5 shadow-[0_20px_45px_-30px_rgba(41,27,7,0.35)] md:flex-row md:items-end md:justify-between md:p-7">
          <div className="max-w-2xl">
            <h1 className="text-4xl tracking-tight text-stone-900 md:text-5xl">What are we cooking today?</h1>
            <p className="mt-2 text-base text-stone-600 md:text-lg">
              Tell CookMate what&rsquo;s in your kitchen and get a full recipe in seconds.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-3 py-2 shadow-sm md:min-w-[360px]">
            <span className="text-xl">🔍</span>
            <input
              type="text"
              placeholder="What's in your fridge?"
              value={dish}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDish(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              aria-label="What do you want to cook?"
              className="w-full border-0 bg-transparent text-sm text-stone-700 outline-none placeholder:text-stone-400"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-amber-100 bg-white p-5 shadow-[0_18px_45px_-30px_rgba(41,27,7,0.35)]">
              <h3 className="flex items-center gap-2 text-2xl text-stone-900">
                Your Pantry <span className="text-2xl">🧺</span>
              </h3>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-stone-500">Ingredients you have</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {ingredients.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-medium text-stone-700"
                  >
                    {item}
                    <button
                      type="button"
                      className="text-base text-stone-500 transition hover:text-red-500"
                      onClick={() => removeIngredient(item)}
                      aria-label={`Remove ${item}`}
                    >
                      ×
                    </button>
                  </span>
                ))}

                {addingIngredient ? (
                  <input
                    type="text"
                    className="w-36 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    placeholder="Ingredient"
                    autoFocus
                    value={ingredientInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setIngredientInput(e.target.value)
                    }
                    onKeyDown={handleIngredientKeyDown}
                    onBlur={handleIngredientBlur}
                  />
                ) : (
                  <button
                    type="button"
                    className="rounded-full border border-dashed border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:border-amber-300 hover:text-amber-700"
                    onClick={() => setAddingIngredient(true)}
                  >
                    + Add Item
                  </button>
                )}
              </div>

              {error && <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-600 to-stone-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Cooking up your recipe…' : 'Update Pantry'}
              </button>
            </div>

            <div className="rounded-[28px] border border-amber-100 bg-white p-5 shadow-[0_18px_45px_-30px_rgba(41,27,7,0.35)]">
              <h3 className="text-2xl text-stone-900">Preferences</h3>

              <div className="mt-5 space-y-3">
                {[
                  { label: 'Vegetarian', checked: vegetarian, onChange: setVegetarian },
                  { label: 'Gluten-Free', checked: glutenFree, onChange: setGlutenFree },
                  { label: 'Extra Spicy', checked: extraSpicy, onChange: setExtraSpicy },
                ].map((item) => (
                  <label key={item.label} className="flex cursor-pointer items-center gap-3 text-base text-stone-700">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => item.onChange(e.target.checked)}
                      className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5 shadow-[0_18px_45px_-30px_rgba(41,27,7,0.35)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-700">✨ AI Kitchen Tip</p>
              <p className="mt-3 text-lg leading-8 text-stone-700">&ldquo;{tip}&rdquo;</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl text-stone-900">Today&rsquo;s Highlight</h2>

            <div className="relative overflow-hidden rounded-[32px] border border-amber-100 bg-white shadow-[0_26px_65px_-30px_rgba(41,27,7,0.45)]">
              <div className="flex min-h-[420px] items-end bg-gradient-to-br from-amber-200 via-orange-100 to-stone-200 p-6">
                <div className="relative z-10 w-full rounded-[24px] border border-white/30 bg-black/10 p-5 text-white backdrop-blur-sm">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-400/90 px-2.5 py-1 text-xs font-semibold text-stone-900">
                      {highlight.tagline}
                    </span>
                    <span className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90">
                      {highlight.time} Cook Time
                    </span>
                  </div>

                  <h2 className="mb-3 text-3xl leading-tight text-white">{highlight.title}</h2>
                  <p className="max-w-md text-sm leading-7 text-stone-100">{highlight.description}</p>
                  <button
                    type="button"
                    onClick={startCookingHighlight}
                    className="mt-5 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-stone-900 shadow-md transition hover:-translate-y-0.5"
                  >
                    🍴 Start Cooking Now
                  </button>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-90">
                {highlight.emoji}
              </div>
            </div>
          </div>
        </div>

        {recipe && (
          <section className="mt-12 rounded-[32px] border border-amber-100 bg-white p-6 shadow-[0_28px_70px_-40px_rgba(41,27,7,0.4)] md:p-8">
            {recipe.cuisine && (
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-amber-700">
                {recipe.cuisine}
              </span>
            )}

            <h2 className="mt-4 text-4xl text-stone-900">{recipe.title || dish}</h2>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-stone-600">
              {recipe.servings && <span>👥 Serves {recipe.servings}</span>}
              {recipe.cookTimeMinutes && <span>⏱️ {recipe.cookTimeMinutes} min</span>}
              {recipe.difficulty && (
                <span>
                  🍴 {recipe.difficulty[0]}
                  {recipe.difficulty.slice(1).toLowerCase()}
                </span>
              )}
            </div>

            {recipe.description && (
              <p className="mt-4 max-w-3xl text-base leading-7 text-stone-600">{recipe.description}</p>
            )}

            {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-2xl text-stone-900">Ingredients</h3>
                  <span className="text-sm text-stone-500">
                    {recipe.ingredients.length} {recipe.ingredients.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ing) => {
                    const id = ing.id ?? ing.name
                    const checked = checkedIngredients.includes(id)
                    return (
                      <li key={id} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                        <label className={`flex cursor-pointer items-center gap-3 ${checked ? 'text-stone-400 line-through' : 'text-stone-700'}`}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleChecked(id)}
                            className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                          />
                          <span>
                            {[ing.quantity, ing.unit, ing.name].filter(Boolean).join(' ')}
                          </span>
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {Array.isArray(recipe.steps) && recipe.steps.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-2xl text-stone-900">Instructions</h3>
                <ol className="space-y-4">
                  {[...recipe.steps]
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map((step, i) => (
                      <li key={step.id ?? i} className="flex gap-4 rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-white">
                          {step.order ?? i + 1}
                        </span>
                        <span className="text-base leading-7 text-stone-700">{step.instruction}</span>
                      </li>
                    ))}
                </ol>
              </div>
            )}

            {(recipe.shoppingLists?.[0]?.items?.length ?? 0) > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-2xl text-stone-900">Shopping list (missing ingredients)</h3>
                <ul className="space-y-3">
                  {recipe.shoppingLists?.[0].items.map((item) => (
                    <li key={item.id ?? item.name} className="rounded-2xl border border-stone-200 bg-stone-50 p-3 text-stone-700">
                      {[item.quantity, item.unit, item.name].filter(Boolean).join(' ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

export default Home
