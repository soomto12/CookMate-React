import { useEffect, useState } from 'react'
import logo from '../assets/Mealio Green Fork Logo.png'
import { getErrorMessage } from '../types'

const ALLERGENS_URL = 'http://localhost:3000/api/allergens'

const icons = {
  home: 'M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6',
  sparkles:
    'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
  recipes: 'M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zM12 8v8M9 11h6',
  cart: 'M3 4h2l2.4 10.4a1 1 0 001 .6h8.2a1 1 0 001-.8L19 8H6M9 20h.01M17 20h.01',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 3.6-6 8-6s8 2 8 6',
  bag: 'M6 8h12l1 12H5L6 8zM9 8a3 3 0 016 0M10 13c.5 1 1 1.5 2 1.5s1.5-.5 2-1.5',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5',
  pot: 'M4 11h16v6a3 3 0 01-3 3H7a3 3 0 01-3-3v-6zM2 11h20M8 7c0-1 1-1 1-2s-1-1-1-2M13 7c0-1 1-1 1-2s-1-1-1-2',
}

const navItems = [
  { href: '/app', label: 'Home', icon: icons.home },
  { href: '/generate', label: 'Generate Recipe', icon: icons.sparkles },
  { href: '/recipes', label: 'My Recipes', icon: icons.recipes },
  { href: '/shopping-list', label: 'Shopping List', icon: icons.cart },
  { href: '/profile', label: 'Profile', icon: icons.user },
]

const steps = [
  'Enter your ingredients or the meal you have in mind.',
  'Set your preferences (quick meal, allergies, shopping list).',
  'Click “Generate Recipe” and get delicious meal ideas!',
]

function Icon({ d, className }: { d: string; className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={d} />
    </svg>
  )
}

type ToggleProps = {
  name: string
  label: string
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
  describedBy?: string
}

function Toggle({ name, label, defaultChecked, checked, onChange, describedBy }: ToggleProps) {
  return (
    <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-slate-600">
      <input
        type="checkbox"
        role="switch"
        name={name}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange && ((e) => onChange(e.target.checked))}
        aria-describedby={describedBy}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="relative h-6 w-11 shrink-0 rounded-full bg-slate-300 transition peer-checked:bg-green-700 peer-focus-visible:ring-2 peer-focus-visible:ring-green-600 peer-focus-visible:ring-offset-2 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition after:content-[''] peer-checked:after:translate-x-5"
      />
      {label}
    </label>
  )
}

const fieldsetClass = 'relative min-w-0 pl-11 sm:pl-14'
const legendClass = 'p-0 text-base font-bold text-green-950'
const hintClass = 'mt-1 text-sm text-slate-500'
const sectionIconClass = 'absolute left-0 top-0 h-7 w-7 text-green-700 sm:h-8 sm:w-8'
const inputClass =
  'mt-3 w-full rounded-xl border border-emerald-100 bg-white px-4 py-3.5 text-sm text-stone-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'

function Generate() {
  const current = '/generate'
  const [menuOpen, setMenuOpen] = useState(false)
  const [justIngredients, setJustIngredients] = useState(false)
  const [allergens, setAllergens] = useState<string[]>([])
  const [allergensLoading, setAllergensLoading] = useState(true)
  const [allergensError, setAllergensError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadAllergens = async () => {
      try {
        const token = localStorage.getItem('cookmate_token')
        const res = await fetch(ALLERGENS_URL, {
          signal: controller.signal,
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
        if (controller.signal.aborted) return
        const message = getErrorMessage(err)
        setAllergensError(
          message === 'Failed to fetch'
            ? 'Could not reach the server. Is it running on localhost:3000?'
            : message,
        )
      } finally {
        if (!controller.signal.aborted) setAllergensLoading(false)
      }
    }

    loadAllergens()
    return () => controller.abort()
  }, [])

  return (
    <div className="flex min-h-screen font-jakarta">
      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col overflow-y-auto bg-gradient-to-b from-green-900 to-green-950 px-4 py-8 text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <a href="/generate" className="mb-10 flex items-center gap-2 px-3 text-3xl font-extrabold">
          <img src={logo} alt="" className="h-12 w-12 rounded-full bg-white p-0.5" />
          Mealio
        </a>

        <nav aria-label="Main navigation">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={item.href === current ? 'page' : undefined}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                    item.href === current
                      ? 'bg-green-700/60 text-white'
                      : 'text-emerald-50/90 hover:bg-white/10'
                  }`}
                >
                  <Icon d={item.icon} className="h-6 w-6 shrink-0" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-white/5 px-5 py-6">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7 shrink-0 -rotate-12 text-emerald-400"
          >
            <path d="M20 3C10 3 4 8.5 4 15c0 1.4.3 2.6.8 3.6C3.6 19.8 3 21 3 21h2c.5-.9 1.4-1.8 2.6-2.6C8.7 19 9.9 19.2 11 19.2 17 19.2 20 12 20 3z" />
          </svg>
          <p className="font-display text-lg italic leading-snug text-white/90">
            Good food
            <br />
            Good mood
          </p>
        </div>
      </aside>

      <div className="min-w-0 flex-1 bg-gradient-to-br from-white via-emerald-50/40 to-emerald-50">
        <header className="flex items-center px-4 py-4 sm:px-8 sm:py-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="sidebar"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border-2 border-green-800 text-green-800 transition hover:bg-green-50 lg:hidden"
          >
            <span className="h-0.5 w-5 rounded bg-current" />
            <span className="h-0.5 w-5 rounded bg-current" />
            <span className="h-0.5 w-5 rounded bg-current" />
          </button>
          <button
            type="button"
            aria-label="Account menu"
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-900 font-bold text-white transition hover:bg-green-800"
          >
            S
          </button>
        </header>

        <main className="grid gap-x-10 gap-y-8 px-4 pb-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-14">
          <section className="lg:col-span-2">
            <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-green-950 sm:text-4xl">
              <Icon d={icons.sparkles} className="h-8 w-8 shrink-0 text-green-700 sm:h-9 sm:w-9" />
              Generate Recipe
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Tell us what you have, and let Mealio turn it into something delicious!
            </p>
          </section>

          <form className="flex min-w-0 flex-col gap-8 rounded-3xl bg-white p-5 shadow-xl shadow-green-900/5 ring-1 ring-emerald-50 sm:p-8">
            {!justIngredients && (
              <fieldset className={fieldsetClass}>
                <Icon d={icons.pot} className={sectionIconClass} />
                <legend className={legendClass}>What do you want to cook?</legend>
                <label htmlFor="meal" className={`block ${hintClass}`}>
                  Enter the meal you have in mind (e.g. jollof rice, chicken curry, pasta...).
                </label>
                <input
                  id="meal"
                  name="meal"
                  type="text"
                  placeholder="e.g. jollof rice, chicken curry, pasta..."
                  className={inputClass}
                />
              </fieldset>
            )}

            <fieldset className={fieldsetClass}>
              <Icon d={icons.bag} className={sectionIconClass} />
              <legend className={legendClass}>What do you have?</legend>
              <label htmlFor="ingredients" className={`block ${hintClass}`}>
                Enter the ingredients you have (separate with commas).
              </label>
              <input
                id="ingredients"
                name="ingredients"
                type="text"
                placeholder="e.g. chicken, rice, tomatoes, onions..."
                className={inputClass}
              />
            </fieldset>

            <fieldset className={fieldsetClass}>
              <Icon d={icons.sparkles} className={sectionIconClass} />
              <legend className={legendClass}>Or just ingredients?</legend>
              <p id="just-ingredients-hint" className={`${hintClass} mb-3`}>
                Don&rsquo;t have a specific meal in mind? Just enter the ingredients and let AI
                suggest a meal for you.
              </p>
              <Toggle
                name="justIngredients"
                label="I just have ingredients (suggest a meal)"
                checked={justIngredients}
                onChange={setJustIngredients}
                describedBy="just-ingredients-hint"
              />
            </fieldset>

            <fieldset className={fieldsetClass}>
              <Icon d={icons.bolt} className={sectionIconClass} />
              <legend className={legendClass}>Quick meal?</legend>
              <p id="quick-meal-hint" className={`${hintClass} mb-3`}>
                Need something fast? This will prioritize quick and easy recipes.
              </p>
              <Toggle
                name="quickMeal"
                label="Yes, I want a quick meal"
                describedBy="quick-meal-hint"
              />
            </fieldset>

            <fieldset className={fieldsetClass}>
              <Icon d={icons.shield} className={sectionIconClass} />
              <legend className={legendClass}>Allergies</legend>
              <p className={hintClass}>
                Exclude ingredients you are allergic to. These come from your saved allergies.
              </p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <div className="flex min-h-[3.25rem] flex-1 flex-wrap items-center gap-2 rounded-xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
                  {allergensLoading ? (
                    <span className="text-sm text-slate-400">Loading your allergies...</span>
                  ) : allergensError ? (
                    <span role="alert" className="text-sm text-red-700">{allergensError}</span>
                  ) : allergens.length === 0 ? (
                    <span className="text-sm text-slate-400">
                      No allergies saved.{' '}
                      <a href="/allergens" className="font-semibold text-green-800 hover:underline">
                        Add some
                      </a>
                    </span>
                  ) : (
                    allergens.map((name) => (
                      <span
                        key={name}
                        className="rounded-full bg-green-700 px-3 py-1 text-sm font-medium text-white"
                      >
                        {name}
                      </span>
                    ))
                  )}
                </div>
                <Toggle name="excludeAllergens" label="Exclude allergens" />
              </div>
            </fieldset>

            <fieldset className={fieldsetClass}>
              <Icon d={icons.cart} className={sectionIconClass} />
              <legend className={legendClass}>Shopping list</legend>
              <p id="shopping-list-hint" className={`${hintClass} mb-3`}>
                Include a shopping list with the recipe.
              </p>
              <Toggle
                name="includeShoppingList"
                label="Include shopping list"
                describedBy="shopping-list-hint"
              />
            </fieldset>

            <button
              type="submit"
              className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-800 to-green-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-green-900/20 transition hover:from-green-900 hover:to-green-800"
            >
              <Icon d={icons.sparkles} className="h-5 w-5" />
              Generate Recipe
              <span aria-hidden="true">&rarr;</span>
            </button>
          </form>

          <aside aria-label="Recipe generator help" className="flex flex-col gap-8">
            <section className="rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100/60">
              <h2 className="flex items-center gap-3 text-base font-bold text-green-950">
                <Icon d={icons.sparkles} className="h-6 w-6 text-green-700" />
                How it works
              </h2>
              <ol className="mt-5 flex flex-col gap-5">
                {steps.map((step, i) => (
                  <li key={step} className="flex items-start gap-4 text-sm leading-6 text-slate-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-800 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            <p className="-rotate-6 font-display text-2xl italic leading-snug text-green-900">
              Better ingredients.
              <br />
              Better meals.
            </p>
          </aside>
        </main>
      </div>
    </div>
  )
}

export default Generate
