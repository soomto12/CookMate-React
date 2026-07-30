import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { CookMateUser, Recipe, RecipeIngredient, ShoppingListItem } from '../types'
import { getErrorMessage } from '../types'
import './Dashboard.css'

const API_BASE = 'http://localhost:3000/api/recipes'

function formatIngredient(ing: RecipeIngredient | ShoppingListItem) {
  return [ing.quantity, ing.unit, ing.name].filter(Boolean).join(' ')
}

function Dashboard() {
  const navigate = useNavigate()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const user = JSON.parse(
    localStorage.getItem('cookmate_user') || 'null',
  ) as CookMateUser | null

  const handleLogout = () => {
    localStorage.removeItem('cookmate_token')
    localStorage.removeItem('cookmate_user')
    navigate('/login')
  }

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
    <div className="dashboard">
      <header className="dashboard-nav">
        <div className="dashboard-nav-inner">
          <span className="brand">
            <span className="brand-mark">👨‍🍳</span>
            Cook<span className="brand-accent">Mate</span>
          </span>
          <div className="dashboard-nav-right">
            {user?.name && <span className="dashboard-greeting">Hi, {user.name}</span>}
            <Link to="/app" className="btn btn-primary btn-sm">
              + New recipe
            </Link>
            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-head">
          <span className="badge">🍲 Your kitchen</span>
          <h1>All your recipes</h1>
          <p className="dashboard-sub">
            Everything CookMate has cooked up for you, in one place.
          </p>
        </div>

        {loading && <p className="dashboard-status">Loading your recipes…</p>}

        {!loading && error && <p className="auth-error">{error}</p>}

        {!loading && !error && recipes.length === 0 && (
          <div className="dashboard-empty">
            <p>You haven't generated any recipes yet.</p>
            <Link to="/app" className="btn btn-primary btn-sm">
              Create your first recipe
            </Link>
          </div>
        )}

        {!loading && !error && recipes.length > 0 && (
          <div className="recipe-grid">
            {recipes.map((recipe) => {
              const isExpanded = expandedId === recipe.id
              const missingItems = recipe.shoppingLists?.[0]?.items || []

              return (
                <article className="recipe-card" key={recipe.id}>
                  <button
                    type="button"
                    className="recipe-card-header"
                    onClick={() => toggleExpanded(recipe.id)}
                    aria-expanded={isExpanded}
                  >
                    <div>
                      <h3>{recipe.title}</h3>
                      <div className="recipe-card-meta">
                        {recipe.cuisine && <span>🌍 {recipe.cuisine}</span>}
                        {recipe.servings && <span>🍽️ Serves {recipe.servings}</span>}
                        <span>
                          🧂 {recipe.ingredients?.length || 0}{' '}
                          {recipe.ingredients?.length === 1 ? 'ingredient' : 'ingredients'}
                        </span>
                      </div>
                    </div>
                    <span className="recipe-card-chevron">{isExpanded ? '−' : '+'}</span>
                  </button>

                  {recipe.description && (
                    <p className="recipe-card-description">{recipe.description}</p>
                  )}

                  {isExpanded && (
                    <div className="recipe-card-details">
                      {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
                        <div className="recipe-section">
                          <h4>Ingredients</h4>
                          <ul className="recipe-ingredients">
                            {recipe.ingredients.map((ing) => (
                              <li key={ing.id}>{formatIngredient(ing)}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {Array.isArray(recipe.steps) && recipe.steps.length > 0 && (
                        <div className="recipe-section">
                          <h4>Steps</h4>
                          <ol className="recipe-steps">
                            {recipe.steps.map((step) => (
                              <li key={step.id}>{step.instruction}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {missingItems.length > 0 && (
                        <div className="recipe-section">
                          <h4>Shopping list (missing ingredients)</h4>
                          <ul className="recipe-ingredients">
                            {missingItems.map((item) => (
                              <li key={item.id}>{formatIngredient(item)}</li>
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
    </div>
  )
}

export default Dashboard
