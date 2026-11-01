import { createContext, useContext, useState, type ReactNode } from 'react'
import { ALLERGENS_URL } from '../generateConstants'
import { getErrorMessage } from '../types'

interface AllergenContextValue {
  allergens: string[]
  allergensLoading: boolean
  allergensError: string
  loadAllergens: (signal?: AbortSignal) => Promise<void>
  excludeAllergens: boolean
  setExcludeAllergens: (v: boolean) => void
}

const AllergenContext = createContext<AllergenContextValue | null>(null)

export function AllergenProvider({ children }: { children: ReactNode }) {
  const [allergens, setAllergens] = useState<string[]>([])
  const [allergensLoading, setAllergensLoading] = useState(true)
  const [allergensError, setAllergensError] = useState('')
  const [excludeAllergens, setExcludeAllergens] = useState(false)

  const loadAllergens = async (signal?: AbortSignal) => {
    setAllergensLoading(true)
    setAllergensError('')
    try {
      const token = localStorage.getItem('cookmate_token')
      const res = await fetch(ALLERGENS_URL, {
        signal,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })

      const data: unknown = await res.json().catch(() => ({}))

      if (!res.ok) {
        const body = data as { error?: string; message?: string }
        throw new Error(body.error || body.message || `Request failed (${res.status})`)
      }

      const list = Array.isArray(data) ? data : (data as { allergens?: unknown }).allergens
      setAllergens(
        Array.isArray(list)
          ? list.map((a) => (typeof a === 'string' ? a : (a as { name: string }).name))
          : [],
      )
    } catch (err) {
      if (signal?.aborted) return
      const message = getErrorMessage(err)
      setAllergensError(
        message === 'Failed to fetch'
          ? 'Could not reach the server. Is it running on localhost:3000?'
          : message,
      )
    } finally {
      if (!signal?.aborted) setAllergensLoading(false)
    }
  }

  return (
    <AllergenContext.Provider
      value={{
        allergens,
        allergensLoading,
        allergensError,
        loadAllergens,
        excludeAllergens,
        setExcludeAllergens,
      }}
    >
      {children}
    </AllergenContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAllergens(): AllergenContextValue {
  const ctx = useContext(AllergenContext)
  if (!ctx) throw new Error('useAllergens must be used inside <AllergenProvider>')
  return ctx
}
