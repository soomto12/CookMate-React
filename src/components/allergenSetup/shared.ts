export const ALLERGENS = [
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

export type CommonAllergen = (typeof ALLERGENS)[number]

export const inputClass =
  'h-12 rounded-lg border border-stone-200 bg-white text-sm text-stone-900 outline-none transition placeholder:text-stone-500/70 hover:border-stone-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/15'

const STORAGE_KEY = 'mealio_allergens'

interface SavedChoices {
  selected: string[]
  custom: string[]
}

/** Reads the choices kept in localStorage from a previous visit. */
export function loadSaved(): SavedChoices {
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

/** Keeps the choices in localStorage so they survive a reload. */
export function saveChoices(choices: SavedChoices) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choices))
  } catch {
    // storage unavailable; continue anyway
  }
}
