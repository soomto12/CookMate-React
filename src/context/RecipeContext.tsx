import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { API_URL } from '../generateConstants'
import {
  getErrorMessage,
  type GenerateInput,
  type Recipe,
  type RecipeContextValue,
  type SavedRecipeState,
} from '../types'

const STORAGE_KEY = 'cookmate_recipe'

const loadSaved = (): SavedRecipeState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw) as Partial<SavedRecipeState>
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

  const submit = async ({
    meal,
    ingredients,
    justIngredients,
    quickMeal,
    allergens,
    excludeAllergens,
  }: GenerateInput): Promise<boolean> => {
    const list = ingredients
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean)

    if (list.length === 0) {
      setSuggestError('Enter at least one ingredient.')
      return false
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
          ...(!justIngredients && meal.trim() ? { meal: meal.trim() } : {}),
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
      return true
    } catch (err) {
      setSuggestError(friendlyError(err))
      return false
    } finally {
      setSuggestLoading(false)
    }
  }

  const clear = () => {
    setRecipe(null)
    setSuggestions([])
  }

  const value = useMemo(
    () => ({ suggestLoading, suggestError, submit, recipe, suggestions, clear }),
    // submit and clear only call state setters, so they can be omitted
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [suggestLoading, suggestError, recipe, suggestions],
  )

  return (
    <RecipeContext.Provider value={value}>
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
