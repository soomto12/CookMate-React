import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import Toggle from './Toggle'
import heroFallback from '../assets/Fresh Grilled Chicken Power Bowl.png'
import type { MealSuggestionModalProps } from '../types'

const icons = {
  close: 'M6 6l12 12M18 6L6 18',
  chef: 'M7 14a4 4 0 01-1-7.9A5 5 0 0116 5a4 4 0 011 8.1V20H7v-6zM7 17h10',
  sparkles:
    'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
  cutlery: 'M7 3v4a2 2 0 004 0V3M9 9v12M17 3c-1.4 2-2 4-2 6h4c0-2-.6-4-2-6zM17 9v12',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 00-3 11.2V16h6v-1.8A6 6 0 0012 3z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  settings:
    'M12 3l1 2.2 2.4.3 1.7 1.7-.3 2.4L19 11l-2.2 1-.3 2.4-1.7 1.7-2.4-.3L11 18l-1-2.2-2.4-.3-1.7-1.7.3-2.4L5 10l2.2-1 .3-2.4 1.7-1.7 2.4.3z',
}

function MealSuggestionModal({
  suggestions,
  quickMeal,
  excludeAllergens,
  loading,
  onClose,
  onGenerate,
}: MealSuggestionModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
    const [selected, setSelected] = useState<string | null>(null)
  const [localQuickMeal, setLocalQuickMeal] = useState(quickMeal)
  const [localExcludeAllergens, setLocalExcludeAllergens] = useState(excludeAllergens)

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  const handleGenerate = () => {
    if (!selected) return
    onGenerate({
      meal: selected,
      quickMeal: localQuickMeal,
      excludeAllergens: localExcludeAllergens,
    })
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-green-950/50 p-0 font-jakarta backdrop-blur-sm sm:items-center sm:p-4"
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="suggestion-modal-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault()
          handleGenerate()
        }}
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl ring-1 ring-emerald-100 sm:max-h-[90vh] sm:rounded-3xl sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close meal suggestions"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-green-950 transition hover:bg-emerald-50 sm:right-6 sm:top-6"
        >
          <Icon d={icons.close} className="h-5 w-5" />
        </button>

        <div className="flex flex-wrap items-start justify-between gap-3 pr-10">
          <div className="flex items-start gap-3">
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-800 text-white">
              <Icon d={icons.chef} className="h-6 w-6" />
              <Icon
                d={icons.sparkles}
                className="absolute -right-1.5 -top-1.5 h-4 w-4 text-emerald-300"
              />
            </span>
            <div>
              <h2
                id="suggestion-modal-title"
                className="text-xl font-extrabold leading-tight text-green-950 sm:text-2xl"
              >
                Meal Suggestion
              </h2>
              <p className="mt-0.5 text-sm text-slate-500 sm:text-base">
                Here are {suggestions.length} delicious meals you can make with your ingredients!
              </p>
            </div>
          </div>

          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-green-700 ring-1 ring-emerald-100">
            <Icon d={icons.sparkles} className="h-4 w-4" />
            Generated just for you
          </span>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {suggestions.map(({ name, imageUrl }) => {
            const isSelected = selected === name
            return (
              <li
                key={name}
                className={`flex flex-col overflow-hidden rounded-2xl ring-1 transition ${
                  isSelected ? 'ring-2 ring-green-700' : 'ring-emerald-100'
                }`}
              >
                <div className="relative">
                  <img
                    src={imageUrl ?? heroFallback}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-3.5">
                  <h3 className="text-sm font-extrabold leading-snug text-green-950">{name}</h3>
                  <span className="flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-emerald-100">
                    <Icon d={icons.cutlery} className="h-3.5 w-3.5" />
                    2 servings
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelected(name)}
                    aria-pressed={isSelected}
                    className={`mt-auto w-full rounded-xl border px-3 py-2 text-sm font-bold transition ${
                      isSelected
                        ? 'border-green-800 bg-green-800 text-white'
                        : 'border-emerald-200 bg-white text-green-800 hover:bg-emerald-50'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        <section className="mt-6 rounded-2xl bg-emerald-50/80 p-4 ring-1 ring-emerald-100 sm:p-5">
          <h3 className="flex items-center gap-2 text-base font-extrabold text-green-950">
            <Icon d={icons.settings} className="h-5 w-5 text-green-700" />
            Meal Options
          </h3>
          <p className="mt-0.5 text-sm text-slate-500">Customize your recipe generation experience</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(2,minmax(0,1fr))_auto] lg:items-center">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5">
                <Icon d={icons.bolt} className="h-5 w-5 shrink-0 text-amber-500" />
                <span>
                  <span className="block text-sm font-bold text-green-950">Quick Meal</span>
                  <span className="block text-xs text-slate-500">Ready in ~20 mins</span>
                </span>
              </span>
              <Toggle
                name="modalQuickMeal"
                label=""
                ariaLabel="Quick meal"
                checked={localQuickMeal}
                onChange={setLocalQuickMeal}
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5">
                <Icon d={icons.shield} className="h-5 w-5 shrink-0 text-green-700" />
                <span>
                  <span className="block text-sm font-bold text-green-950">Exclude Allergies</span>
                  <span className="block text-xs text-slate-500">Avoid specific allergens</span>
                </span>
              </span>
              <Toggle
                name="modalExcludeAllergens"
                label=""
                ariaLabel="Exclude allergies"
                checked={localExcludeAllergens}
                onChange={setLocalExcludeAllergens}
              />
            </div>

            <div className="flex items-start gap-2 rounded-xl bg-white px-3.5 py-2.5 text-xs text-slate-600 ring-1 ring-emerald-100 lg:max-w-[12rem]">
              <Icon d={icons.bulb} className="h-4 w-4 shrink-0 text-green-600" />
              <span>
                <span className="font-bold text-green-900">Tip: </span>
                You can always adjust these options on the next page.
              </span>
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={!selected || loading}
          className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-green-800 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
        >
          <Icon d={icons.sparkles} className="h-5 w-5" />
          {loading ? 'Generating...' : 'Generate Selected Meal'}
          <Icon d={icons.arrow} className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}

export default MealSuggestionModal
