import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { API_BASE } from '../generateConstants'
import { authFetch } from '../session'
import {
  getErrorMessage,
  type GenerateInput,
  type MealSuggestion,
  type Recipe,
  type RecipeContextValue,
} from '../types'

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

  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [suggestions, setSuggestions] = useState<MealSuggestion[]>([])

  const [recipeLoading, setRecipeLoading] = useState(false)
  const [recipeError, setRecipeError] = useState('')

  const loadLatestRecipe = async (): Promise<void> => {
    setRecipeLoading(true)
    setRecipeError('')

    try {
      const res = await authFetch(`${API_BASE}/recipes/latest`)

      if (res.status === 404) {
        setRecipe(null)
        return
      }

      const data: unknown = await res.json().catch(() => ({}))

      if (!res.ok) {
        const body = data as { error?: string; message?: string }
        throw new Error(body.error || body.message || `Request failed (${res.status})`)
      }

      setRecipe((data as { recipe?: Recipe }).recipe ?? null)
    } catch (err) {
      setRecipeError(friendlyError(err))
    } finally {
      setRecipeLoading(false)
    }
  }

  const submit = async ({
    meal,
    ingredients,
    justIngredients,
    quickMeal,
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
      const res = await authFetch(`${API_BASE}/recipes/${justIngredients ? 'suggest' : 'generate'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          availableIngredients: list,
          ...(!justIngredients && meal.trim() ? { mealName: meal.trim() } : {}),
          quickMealOnly: quickMeal,
          excludeCommonAllergens: excludeAllergens,
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
        const body = data as { suggestions?: unknown; meals?: unknown }
        const items = Array.isArray(data) ? data : body.suggestions ?? body.meals
        setSuggestions(
          Array.isArray(items)
            ? items.map((f): MealSuggestion =>
                typeof f === 'string'
                  ? { name: f, imageUrl: null, imageCredit: null, imageCreditUrl: null }
                  : {
                      name: (f as { name: string }).name,
                      imageUrl: (f as { imageUrl?: string | null }).imageUrl ?? null,
                      imageCredit: (f as { imageCredit?: string | null }).imageCredit ?? null,
                      imageCreditUrl: (f as { imageCreditUrl?: string | null }).imageCreditUrl ?? null,
                    },
              )
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
    () => ({
      suggestLoading,
      suggestError,
      submit,
      recipe,
      suggestions,
      clear,
      recipeLoading,
      recipeError,
      loadLatestRecipe,
    }),
    // submit, clear and loadLatestRecipe only call state setters, so they can be omitted
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [suggestLoading, suggestError, recipe, suggestions, recipeLoading, recipeError],
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
