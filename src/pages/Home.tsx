import { useState } from 'react'
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { CookMateUser, Recipe } from '../types'
import { getErrorMessage } from '../types'
import './Home.css'

const API_BASE = 'http://localhost:3000/api/recipes'

const HIGHLIGHTS = [
  {
    tagline: 'Authentic Recipe',
    emoji: '🍚',
    title: 'Smoky West African Jollof Rice',
    description:
      "Master the legendary party rice with our AI-guided technique for the perfect bottom crust (the 'kanzo').",
    time: '45 Mins',
    difficulty: 'Medium',
    servings: '4 Servings',
  },
  {
    tagline: "Chef's Pick",
    emoji: '🍝',
    title: 'Creamy Garlic Pasta',
    description: 'A rich, silky weeknight pasta that comes together in under 30 minutes.',
    time: '25 Mins',
    difficulty: 'Easy',
    servings: '2 Servings',
  },
  {
    tagline: 'Street Food Favorite',
    emoji: '🍢',
    title: 'Spicy Suya Skewers',
    description: 'Charred, peanut-spiced skewers straight from the Nigerian suya spot.',
    time: '30 Mins',
    difficulty: 'Medium',
    servings: '4 Servings',
  },
]

const SUGGESTIONS = [
  { title: 'Peach & Burrata Salad', emoji: '🍑', time: '15 min' },
  { title: 'Truffle Mushroom Risotto', emoji: '🍄', time: '35 min' },
]

const TIPS = [
  'Add a pinch of smoked paprika to your pantry for instant gourmet depth in any stew.',
  'A squeeze of lime juice at the end brightens almost any savory dish.',
  'Toast your spices in dry, hot oil for 30 seconds before adding liquids to wake up their flavor.',
]

function Home() {
  const navigate = useNavigate()
  const [dish, setDish] = useState('')
  const [ingredientInput, setIngredientInput] = useState('')
  const [ingredients, setIngredients] = useState<string[]>([])
  const [addingIngredient, setAddingIngredient] = useState(false)
  const [excludeAllergens, setExcludeAllergens] = useState(false)
  const [quickMeals, setQuickMeals] = useState(false)
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  const [highlight] = useState(
    () => HIGHLIGHTS[Math.floor(Math.random() * HIGHLIGHTS.length)],
  )
  const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)])

  const user = JSON.parse(
    localStorage.getItem('cookmate_user') || 'null',
  ) as CookMateUser | null
  const initial = user?.name?.trim()?.[0]?.toUpperCase() || '?'

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

  const handleLogout = () => {
    localStorage.removeItem('cookmate_token')
    localStorage.removeItem('cookmate_user')
    navigate('/login')
  }

  const applySuggestion = (title: string) => {
    setDish(title)
  }

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
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
          ...(excludeAllergens ? { excludeAllergens: true } : {}),
          ...(quickMeals ? { maxCookTimeMinutes: 30 } : {}),
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

  return (
    <div className="home">
      <header className="home-nav">
        <div className="home-nav-inner">
          <div className="home-nav-left">
            <span className="brand">CookMate</span>
            <nav className="home-nav-links">
              <Link to="/app" className="nav-link active">
                Home
              </Link>
              <Link to="/dashboard" className="nav-link">
                Meal History
              </Link>
            </nav>
          </div>
          <div className="home-nav-right">
            <button type="button" className="logout-link" onClick={handleLogout}>
              Logout
            </button>
            <span className="avatar-circle">{initial}</span>
          </div>
        </div>
      </header>

      <main className="home-main">
        <h1 className="home-title">What are we cooking today?</h1>

        <div className="search-field">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for recipes, cuisines, or diets..."
            value={dish}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDish(e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSubmit()
              }
            }}
            aria-label="What do you want to cook?"
          />
        </div>

        <div className="home-columns">
          <div className="home-left-col">
            <form className="ingredients-card" onSubmit={handleSubmit}>
              <h3 className="card-heading">
                Ingredients you have <span className="card-heading-icon">🧺</span>
              </h3>

              <div className="ingredient-chips">
                {ingredients.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                    <button
                      type="button"
                      className="chip-remove"
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
                    className="chip-input"
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
                    className="chip chip-add"
                    onClick={() => setAddingIngredient(true)}
                  >
                    + Add more
                  </button>
                )}
              </div>

              <p className="prefs-heading">Kitchen preferences</p>

              <label className="pref-row">
                <input
                  type="checkbox"
                  checked={excludeAllergens}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setExcludeAllergens(e.target.checked)
                  }
                />
                <span>Exclude common allergens</span>
              </label>

              <label className="pref-row">
                <input
                  type="checkbox"
                  checked={quickMeals}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setQuickMeals(e.target.checked)
                  }
                />
                <span>Quick meals (under 30 mins)</span>
              </label>

              {error && <p className="auth-error">{error}</p>}

              <button
                type="submit"
                className="btn btn-primary btn-lg recipe-submit"
                disabled={loading}
              >
                {loading ? 'Cooking up your recipe…' : 'Generate Recipe ✨'}
              </button>
            </form>

            <div className="ai-tip-card">
              <p className="ai-tip-heading">💡 AI PRO TIP</p>
              <p className="ai-tip-text">{tip}</p>
            </div>
          </div>

          <div className="home-right-col">
            <button
              type="button"
              className="hero-highlight"
              onClick={() => applySuggestion(highlight.title)}
            >
              <div className="hero-badges">
                <span className="hero-badge hero-badge-solid">TODAY'S HIGHLIGHT</span>
                <span className="hero-badge hero-badge-ghost">{highlight.tagline}</span>
              </div>
              <h2 className="hero-title">{highlight.title}</h2>
              <p className="hero-description">{highlight.description}</p>
              <div className="hero-meta-row">
                <span>⏱️ {highlight.time}</span>
                <span>🍴 {highlight.difficulty}</span>
                <span>👥 {highlight.servings}</span>
                <span className="hero-cook-now">Cook Now ▶</span>
              </div>
            </button>

            <div className="suggestion-row">
              {SUGGESTIONS.map((s) => (
                <button
                  type="button"
                  className="suggestion-card"
                  key={s.title}
                  onClick={() => applySuggestion(s.title)}
                >
                  <div className="suggestion-thumb">{s.emoji}</div>
                  <p className="suggestion-title">{s.title}</p>
                  <p className="suggestion-meta">⏱️ {s.time}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {recipe && (
          <section className="recipe-result">
            {recipe.cuisine && <span className="recipe-cuisine-badge">{recipe.cuisine}</span>}
            <h2>{recipe.title || dish}</h2>
            <div className="recipe-meta-row">
              {recipe.servings && <span>👥 Serves {recipe.servings}</span>}
              {recipe.cookTimeMinutes && <span>⏱️ {recipe.cookTimeMinutes} min</span>}
              {recipe.difficulty && (
                <span>
                  🍴 {recipe.difficulty[0]}
                  {recipe.difficulty.slice(1).toLowerCase()}
                </span>
              )}
            </div>

            {recipe.description && <p className="recipe-description">{recipe.description}</p>}

            {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
              <div className="recipe-section">
                <div className="section-label-row">
                  <h3>Ingredients</h3>
                  <span className="item-count">
                    {recipe.ingredients.length}{' '}
                    {recipe.ingredients.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <ul className="recipe-ingredients">
                  {recipe.ingredients.map((ing) => {
                    const id = ing.id ?? ing.name
                    const checked = checkedIngredients.includes(id)
                    return (
                      <li key={id}>
                        <label className={`ingredient-row ${checked ? 'checked' : ''}`}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleChecked(id)}
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
              <div className="recipe-section">
                <h3>Instructions</h3>
                <ol className="recipe-steps">
                  {[...recipe.steps]
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map((step, i) => (
                      <li key={step.id ?? i}>
                        <span className="step-number">{step.order ?? i + 1}</span>
                        <span className="step-text">{step.instruction}</span>
                      </li>
                    ))}
                </ol>
              </div>
            )}

            {(recipe.shoppingLists?.[0]?.items?.length ?? 0) > 0 && (
              <div className="recipe-section">
                <h3>Shopping list (missing ingredients)</h3>
                <ul className="recipe-ingredients-plain">
                  {recipe.shoppingLists?.[0].items.map((item) => (
                    <li key={item.id ?? item.name}>
                      {[item.quantity, item.unit, item.name].filter(Boolean).join(' ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="home-footer">
        <div className="home-footer-inner">
          <span className="brand">CookMate</span>
          <p className="footer-copy">© {new Date().getFullYear()} CookMate. All rights reserved.</p>
          <div className="footer-links">
            <span>About</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
