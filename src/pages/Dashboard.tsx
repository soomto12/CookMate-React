import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Recipe, RecipeIngredient, ShoppingListItem } from '../types'
import { getErrorMessage } from '../types'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

const API_BASE = 'http://localhost:3000/api/recipes'

function formatIngredient(ing: RecipeIngredient | ShoppingListItem) {
  return [ing.quantity, ing.unit, ing.name].filter(Boolean).join(' ')
}

function Dashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('cookmate_token')

    const load = async () => {
      setLoading(true)
      setError('')

      try {
        const res = await fetch(API_BASE, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })

        const data = await res.json().catch(() => ({}))

        if (!res.ok) {
          throw new Error(
            data.error || data.message || `Request failed (${res.status})`,
          )
        }

        setRecipes(data.recipes || [])
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

    load()
  }, [])

  const toggleExpanded = (id: string) => {
    setExpandedId((current) => (current === id ? null : id))
  }

  return (
    <div className="min-h-screen bg-[#fffdf9] text-stone-900">
      <SiteHeader active="history" />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
            🍲 Your kitchen
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl">All your recipes</h1>
          <p className="mt-3 text-lg text-stone-600">
            Everything CookMate has cooked up for you, in one place.
          </p>
        </div>

        {loading && <p className="rounded-2xl border border-stone-200 bg-white p-4 text-stone-600">Loading your recipes…</p>}

        {!loading && error && <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>}

        {!loading && !error && recipes.length === 0 && (
          <div className="rounded-[28px] border border-amber-100 bg-white p-10 text-center shadow-[0_20px_45px_-30px_rgba(41,27,7,0.35)]">
            <p className="text-lg text-stone-600">You haven&apos;t generated any recipes yet.</p>
            <Link to="/app" className="mt-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-600 to-stone-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:-translate-y-0.5">
              Create your first recipe
            </Link>
          </div>
        )}

        {!loading && !error && recipes.length > 0 && (
          <div className="grid gap-5">
            {recipes.map((recipe) => {
              const isExpanded = expandedId === recipe.id
              const missingItems = recipe.shoppingLists?.[0]?.items || []

              return (
                <article key={recipe.id} className="overflow-hidden rounded-[28px] border border-amber-100 bg-white shadow-[0_18px_45px_-30px_rgba(41,27,7,0.35)]">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 bg-white px-5 py-4 text-left md:px-6"
                    onClick={() => toggleExpanded(recipe.id)}
                    aria-expanded={isExpanded}
                  >
                    <div className="min-w-0">
                      <h3 className="text-2xl text-stone-900">{recipe.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-stone-600">
                        {recipe.cuisine && <span>🌍 {recipe.cuisine}</span>}
                        {recipe.servings && <span>🍽️ Serves {recipe.servings}</span>}
                        <span>
                          🧂 {recipe.ingredients?.length || 0}{' '}
                          {recipe.ingredients?.length === 1 ? 'ingredient' : 'ingredients'}
                        </span>
                      </div>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-2xl font-semibold text-amber-700">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>

                  {recipe.description && (
                    <p className="px-5 pb-3 text-base leading-7 text-stone-600 md:px-6">
                      {recipe.description}
                    </p>
                  )}

                  {isExpanded && (
                    <div className="space-y-5 border-t border-stone-200 bg-stone-50 px-5 py-5 md:px-6">
                      {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
                        <div>
                          <h4 className="mb-3 text-xl text-stone-900">Ingredients</h4>
                          <ul className="space-y-2">
                            {recipe.ingredients.map((ing) => (
                              <li key={ing.id} className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-stone-700">
                                {formatIngredient(ing)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {Array.isArray(recipe.steps) && recipe.steps.length > 0 && (
                        <div>
                          <h4 className="mb-3 text-xl text-stone-900">Steps</h4>
                          <ol className="space-y-3">
                            {recipe.steps.map((step) => (
                              <li key={step.id} className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50/60 p-3 text-stone-700">
                                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold text-white">
                                  {step.order ?? 1}
                                </span>
                                <span className="leading-7">{step.instruction}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {missingItems.length > 0 && (
                        <div>
                          <h4 className="mb-3 text-xl text-stone-900">Shopping list (missing ingredients)</h4>
                          <ul className="space-y-2">
                            {missingItems.map((item) => (
                              <li key={item.id} className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-stone-700">
                                {formatIngredient(item)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

export default Dashboard
