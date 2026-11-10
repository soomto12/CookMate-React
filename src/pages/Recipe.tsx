import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import RecipeView from '../components/RecipeView'
import { API_BASE } from '../generateConstants'
import { authFetch, SessionExpiredError } from '../session'
import { getErrorMessage, type Recipe as RecipeData } from '../types'

function Recipe() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const [recipe, setRecipe] = useState<RecipeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(
    async (signal?: AbortSignal) => {
      if (!id) {
        setRecipe(null)
        setError('No recipe id was given.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      try {
        const res = await authFetch(`${API_BASE}/recipes/find?id=${encodeURIComponent(id)}`, {
          signal,
        })

        if (res.status === 404) {
          setRecipe(null)
          setError('This recipe could not be found.')
          return
        }

        const data: unknown = await res.json().catch(() => ({}))
        if (!res.ok) {
          const body = data as { error?: string; message?: string }
          throw new Error(body.error || body.message || `Request failed (${res.status})`)
        }

        setRecipe((data as { recipe?: RecipeData }).recipe ?? (data as RecipeData))
      } catch (err) {
        if (signal?.aborted) return
        if (err instanceof SessionExpiredError) {
          setError(err.message)
          return
        }
        setError(getErrorMessage(err))
      } finally {
        if (!signal?.aborted) setLoading(false)
      }
    },
    [id],
  )

  useEffect(() => {
    const controller = new AbortController()
    void load(controller.signal)
    return () => controller.abort()
  }, [load])

  return (
    <RecipeView
      current="/recipes"
      recipe={recipe}
      loading={loading}
      error={error}
      onRetry={() => void load()}
      backTo="/history"
      backLabel="Back to history"
      emptyTitle="Recipe not found"
      emptyMessage="We couldn't find a recipe for this link."
      emptyActionLabel="Back to history"
      emptyActionTo="/history"
    />
  )
}

export default Recipe
