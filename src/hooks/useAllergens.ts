import { useCallback, useEffect, useState } from 'react'
import { ALLERGENS_URL } from '../generateConstants'
import { authFetch } from '../session'
import { getErrorMessage } from '../types'

/** One saved food allergen. `id` is present when the server returns objects. */
export interface AllergenItem {
  id?: string
  name: string
}

const friendlyError = (err: unknown): string => {
  const message = getErrorMessage(err)
  return message === 'Failed to fetch'
    ? 'Could not reach the server. Is it running on localhost:3000?'
    : message
}

/** Throws with the server's error message when the response is not ok. */
async function readJson(res: Response): Promise<unknown> {
  const data: unknown = await res.json().catch(() => ({}))
  if (!res.ok) {
    const body = (data ?? {}) as { error?: string; message?: string }
    throw new Error(body.error || body.message || `Request failed (${res.status})`)
  }
  return data
}

/** Accepts `[...]`, `{ foods: [...] }` or `{ allergens: [...] }`, of strings or `{ id, name }`. */
function parseAllergens(data: unknown): AllergenItem[] {
  const body = (data ?? {}) as { allergens?: unknown; foods?: unknown }
  const list = Array.isArray(data) ? data : (body.foods ?? body.allergens)
  if (!Array.isArray(list)) return []

  return list.flatMap((a): AllergenItem[] => {
    if (typeof a === 'string') return [{ name: a }]
    if (a && typeof a === 'object') {
      const { id, _id, name, food } = a as Record<string, unknown>
      const label = typeof name === 'string' ? name : typeof food === 'string' ? food : ''
      const key = id ?? _id
      return label ? [{ id: key == null ? undefined : String(key), name: label }] : []
    }
    return []
  })
}

export function useAllergens() {
  const [items, setItems] = useState<AllergenItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setError('')
    try {
      const res = await authFetch(ALLERGENS_URL, { signal })
      setItems(parseAllergens(await readJson(res)))
    } catch (err) {
      if (signal?.aborted) return
      setError(friendlyError(err))
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal)
    return () => controller.abort()
  }, [load])

  /** POST a new allergen, then refetch so ids match the server. Throws a readable message. */
  const add = useCallback(
    async (name: string) => {
      try {
        const res = await authFetch(ALLERGENS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ allergens: [name] }),
        })
        await readJson(res)
      } catch (err) {
        throw new Error(friendlyError(err))
      }
      await load()
    },
    [load],
  )

  /** DELETE one allergen by id (or by name when the server sent plain strings). */
  const remove = useCallback(async (item: AllergenItem) => {
    try {
      const key = encodeURIComponent(item.id ?? item.name)
      const res = await authFetch(`${ALLERGENS_URL}/${key}`, { method: 'DELETE' })
      await readJson(res)
    } catch (err) {
      throw new Error(friendlyError(err))
    }
    setItems((list) => list.filter((a) => a !== item))
  }, [])

  return {
    items,
    allergens: items.map((a) => a.name),
    loading,
    error,
    reload: load,
    add,
    remove,
  }
}
