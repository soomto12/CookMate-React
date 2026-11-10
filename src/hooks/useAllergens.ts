import { useCallback, useEffect, useState } from 'react'
import { ALLERGENS_URL } from '../generateConstants'
import { authFetch } from '../session'
import { getErrorMessage } from '../types'

export function useAllergens() {
  const [allergens, setAllergens] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setError('')
    try {
      const res = await authFetch(ALLERGENS_URL, { signal })
      const data: unknown = await res.json().catch(() => ({}))

      if (!res.ok) {
        const body = data as { error?: string; message?: string }
        throw new Error(body.error || body.message || `Request failed (${res.status})`)
      }

      const body = data as { allergens?: unknown; foods?: unknown }
      const list = Array.isArray(data) ? data : (body.foods ?? body.allergens)
      setAllergens(
        Array.isArray(list)
          ? list.map((a) => (typeof a === 'string' ? a : (a as { name: string }).name))
          : [],
      )
    } catch (err) {
      if (signal?.aborted) return
      const message = getErrorMessage(err)
      setError(
        message === 'Failed to fetch'
          ? 'Could not reach the server. Is it running on localhost:3000?'
          : message,
      )
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal)
    return () => controller.abort()
  }, [load])

  return { allergens, loading, error, reload: load }
}
