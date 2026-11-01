import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../generateConstants'
import { useAllergens } from './AllergenContext'
import { useIngredients } from './IngredientContext'
import { useMeal } from './MealContext'
import { getErrorMessage, type Recipe } from '../types'

interface RecipeContextValue {
  // generate request
  suggestLoading: boolean
  suggestError: string
  submit: () => Promise<void>

  // results
  recipe: Recipe | null
  suggestions: string[]
  clear: () => void
}

interface Saved {
  recipe: Recipe | null
  suggestions: string[]
}

const STORAGE_KEY = 'cookmate_recipe'

const loadSaved = (): Saved => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw) as Partial<Saved>
      return { recipe: saved.recipe ?? null, suggestions: saved.suggestions ?? [] }
    }
  } catch {
    // ignore corrupt or unavailable storage
  }
  return { recipe: null, suggestions: [] }
}

const friendlyError = (err: unknown): string => {
  const message = getErrorMessage(err)
  return message === 'Failed to fetch'
    ? 'Could not reach the server. Is it running on localhost:3000?'
    : message
}

const RecipeContext = createContext<RecipeContextValue | null>(null)

export function RecipeProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  const { quickMeal } = useMeal()
  const { ingredients, justIngredients } = useIngredients()
  const { allergens, excludeAllergens } = useAllergens()

  const [suggestLoading, setSuggestLoading] = useState(false)
  const [suggestError, setSuggestError] = useState('')

  const [recipe, setRecipe] = useState<Recipe | null>(() => loadSaved().recipe)
  const [suggestions, setSuggestions] = useState<string[]>(() => loadSaved().suggestions)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ recipe, suggestions }))
    } catch {
      // storage unavailable; state still works in memory
    }
  }, [recipe, suggestions])

  const submit = async () => {
    const list = ingredients
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean)

    if (list.length === 0) {
      setSuggestError('Enter at least one ingredient.')
      return
    }

    setSuggestLoading(true)
    setSuggestError('')

    try {
      const token = localStorage.getItem('cookmate_token')
      const res = await fetch(`${API_URL}/${justIngredients ? 'suggest' : 'generate'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ingredients: list,
          quickMeal,
          allergens: excludeAllergens ? allergens : [],
        }),
      })

      const data: unknown = await res.json().catch(() => ({}))

      if (!res.ok) {
        const body = data as { error?: string; message?: string }
        throw new Error(body.error || body.message || `Request failed (${res.status})`)
      }

      const newRecipe = (data as { recipe?: Recipe }).recipe
      if (newRecipe) {
        setRecipe(newRecipe)
        setSuggestions([])
      } else {
        const items = Array.isArray(data) ? data : (data as { suggestions?: unknown }).suggestions
        setSuggestions(
          Array.isArray(items)
            ? items.map((f) => (typeof f === 'string' ? f : (f as { name: string }).name))
            : [],
        )
        setRecipe(null)
      }
      navigate('/recipes')
    } catch (err) {
      setSuggestError(friendlyError(err))
    } finally {
      setSuggestLoading(false)
    }
  }

  const clear = () => {
    setRecipe(null)
    setSuggestions([])
  }

  return (
    <RecipeContext.Provider
      value={{
        suggestLoading,
        suggestError,
        submit,
        recipe,
        suggestions,
        clear,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRecipe(): RecipeContextValue {
  const ctx = useContext(RecipeContext)
  if (!ctx) throw new Error('useRecipe must be used inside <RecipeProvider>')
  return ctx
}
