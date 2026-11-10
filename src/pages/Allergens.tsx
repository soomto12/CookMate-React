import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ALLERGENS_URL } from '../generateConstants'
import { authFetch } from '../session'
import { getErrorMessage } from '../types'

const ALLERGENS = [
  { name: 'Milk', icon: '🥛' },
  { name: 'Eggs', icon: '🥚' },
  { name: 'Peanuts', icon: '🥜' },
  { name: 'Tree nuts', icon: '🌰' },
  { name: 'Soy', icon: '🫘' },
  { name: 'Wheat', icon: '🌾' },
  { name: 'Fish', icon: '🐟' },
  { name: 'Shellfish', icon: '🦐' },
  { name: 'Sesame', icon: '⚪' },
  { name: 'Gluten', icon: '🍞' },
  { name: 'Corn', icon: '🌽' },
  { name: 'Mustard', icon: '🟡' },
  { name: 'Celery', icon: '🥬' },
  { name: 'Lupin', icon: '🌱' },
  { name: 'Other', icon: '•••' },
]

const STORAGE_KEY = 'mealio_allergens'

function loadSaved(): { selected: string[]; custom: string[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { selected: parsed.selected ?? [], custom: parsed.custom ?? [] }
    }
  } catch {
    // ignore unreadable storage
  }
  return { selected: [], custom: [] }
}

function Allergens() {
  const navigate = useNavigate()
  const saved = useMemo(loadSaved, [])
  const [selected, setSelected] = useState<string[]>(saved.selected)
  const [custom, setCustom] = useState<string[]>(saved.custom)
  const [customInput, setCustomInput] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const visible = ALLERGENS.filter((a) => a.name.toLowerCase().includes(query.trim().toLowerCase()))

  const toggle = (name: string) =>
    setSelected((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]))

  const addCustom = () => {
    const name = customInput.trim()
    if (!name) return
    const exists = [...ALLERGENS.map((a) => a.name), ...custom].some((n) => n.toLowerCase() === name.toLowerCase())
    if (!exists) setCustom((c) => [...c, name])
    setCustomInput('')
  }

  const removeCustom = (name: string) => setCustom((c) => c.filter((n) => n !== name))

  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ selected, custom }))
    } catch {
      // storage unavailable; continue anyway
    }
  }

  const proceed = async () => {
    save()
    setLoading(true)
    setError('')

    try {
      const res = await authFetch(ALLERGENS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allergens: [...selected, ...custom] }),
      })

      const data: { error?: string; message?: string } = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || data.message || `Request failed (${res.status})`)
      }

      navigate('/app')
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
    <div className="min-h-screen bg-gradient-to-b from-[#eef6f1] to-[#f7faf8] px-4 py-6 font-jakarta sm:py-10">
      <div className="mx-auto w-full max-w-[560px]">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-stone-800 transition hover:bg-white"
          >
            ←
          </button>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-xs text-stone-600">Step 1 of 2</span>
            <div className="h-1 w-40 overflow-hidden rounded-full bg-stone-200">
              <div className="h-full w-1/2 rounded-full bg-green-700" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-xl text-green-700">
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2.5 4.5 5.5v5.6c0 4.4 3 8.3 7.5 10.4 4.5-2.1 7.5-6 7.5-10.4V5.5L12 2.5Z" />
            <path d="m8.5 12 2.5 2.5 4.5-5" />
          </svg>
        </div>
        <h1 className="mt-4 font-jakarta text-3xl font-extrabold tracking-tight text-stone-900 sm:text-[2rem]">
          Tell us about your allergies
        </h1>
        <p className="mt-3 max-w-md text-base leading-7 text-stone-600">
          This helps us suggest safe recipes and avoid ingredients that could harm you.
        </p>

        <div className="relative mt-7">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for an allergen..."
            aria-label="Search for an allergen"
            className="h-12 w-full rounded-lg border border-stone-200 bg-white pl-12 pr-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-500/70 hover:border-stone-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/15"
          />
        </div>

        <h2 className="mt-8 font-jakarta text-sm font-bold text-stone-900">Common Allergies</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {visible.map(({ name, icon }) => {
            const on = selected.includes(name)
            return (
              <li key={name}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(name)}
                  className={`flex h-12 w-full items-center gap-3 rounded-lg border px-3.5 text-sm font-medium outline-none transition focus-visible:ring-4 focus-visible:ring-green-600/25 ${
                    on
                      ? 'border-green-700 bg-green-700 text-white'
                      : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <span className="w-5 text-center text-base leading-none" aria-hidden="true">{icon}</span>
                  <span className="flex-1 text-left">{name}</span>
                  {on && <span aria-hidden="true" className="text-xs">✓</span>}
                </button>
              </li>
            )
          })}
        </ul>
        {visible.length === 0 && (
          <p className="mt-2 text-sm text-stone-500">No allergens match &ldquo;{query}&rdquo;.</p>
        )}

        <label htmlFor="custom-allergen" className="mt-8 block text-sm font-bold text-stone-900">
          Add your own allergen
        </label>
        <div className="mt-3 flex gap-2">
          <input
            id="custom-allergen"
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addCustom()
              }
            }}
            placeholder="e.g. Kiwi, sulphites..."
            className="h-12 min-w-0 flex-1 rounded-lg border border-stone-200 bg-white px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-500/70 hover:border-stone-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/15"
          />
          <button
            type="button"
            onClick={addCustom}
            disabled={!customInput.trim()}
            className="h-12 rounded-lg bg-green-700 px-5 text-sm font-bold text-white outline-none transition hover:bg-green-800 focus-visible:ring-4 focus-visible:ring-green-600/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add
          </button>
        </div>
        {custom.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {custom.map((name) => (
              <li
                key={name}
                className="flex items-center gap-2 rounded-full bg-green-700 py-1.5 pl-3.5 pr-2 text-sm font-medium text-white"
              >
                {name}
                <button
                  type="button"
                  onClick={() => removeCustom(name)}
                  aria-label={`Remove ${name}`}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-xs hover:bg-green-800"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {error && (
          <p role="alert" className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={proceed}
          disabled={loading}
          className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-green-700 text-sm font-bold text-white shadow-lg shadow-green-900/15 outline-none transition hover:bg-green-800 focus-visible:ring-4 focus-visible:ring-green-600/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Saving...' : <>Continue <span aria-hidden="true">→</span></>}
        </button>
        <button
          type="button"
          onClick={() => navigate('/app')}
          className="mx-auto mt-5 block text-sm font-semibold text-green-800 hover:underline"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}

export default Allergens
