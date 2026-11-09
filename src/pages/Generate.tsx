import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'
import Icon from '../components/Icon'
import MealSuggestionModal from '../components/MealSuggestionModal'
import Toggle from '../components/Toggle'
import { useRecipe } from '../context/RecipeContext'
import { useAllergens } from '../hooks/useAllergens'
import {
  fieldsetClass,
  hintClass,
  icons,
  inputClass,
  legendClass,
  sectionIconClass,
  steps,
} from '../generateConstants'

function Generate() {
  const current = '/generate'
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const [meal, setMeal] = useState('')
  const [quickMeal, setQuickMeal] = useState(false)
  const [ingredients, setIngredients] = useState('')
  const [justIngredients, setJustIngredients] = useState(false)
  const [excludeAllergens, setExcludeAllergens] = useState(false)
  const { allergens, loading: allergensLoading, error: allergensError } = useAllergens()
  const { suggestLoading, suggestError, submit, suggestions, clear } = useRecipe()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const ok = await submit({
      meal,
      ingredients,
      justIngredients,
      quickMeal,
      excludeAllergens,
    })
    // When the user only gave ingredients, let them pick from the suggestion
    // popup instead of navigating straight to /recipes.
    if (ok && !justIngredients) navigate('/recipes')
  }

  const handleGenerateSelected = async (input: {
    meal: string
    quickMeal: boolean
    excludeAllergens: boolean
  }) => {
    const ok = await submit({
      meal: input.meal,
      ingredients,
      justIngredients: false,
      quickMeal: input.quickMeal,
      excludeAllergens: input.excludeAllergens,
    })
    if (ok) navigate('/recipes')
  }

  return (
    <div className="flex min-h-screen font-jakarta">
      <AppSidebar current={current} open={menuOpen} onClose={() => setMenuOpen(false)} />

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

          <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-8 rounded-3xl bg-white p-5 shadow-xl shadow-green-900/5 ring-1 ring-emerald-50 sm:p-8">
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
                  value={meal}
                  onChange={(e) => setMeal(e.target.value)}
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
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
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
                checked={quickMeal}
                onChange={setQuickMeal}
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
                    <>
                      {allergens.map((name) => (
                        <span
                          key={name}
                          className="rounded-full bg-green-700 px-3 py-1 text-sm font-medium text-white"
                        >
                          {name}
                        </span>
                      ))}
                      <a href="/allergens" className="text-sm font-semibold text-green-800 hover:underline">
                        Add more
                      </a>
                    </>
                  )}
                </div>
                <Toggle
                  name="excludeAllergens"
                  label="Exclude allergens"
                  checked={excludeAllergens}
                  onChange={setExcludeAllergens}
                />
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={suggestLoading}
              className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-800 to-green-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-green-900/20 transition hover:from-green-900 hover:to-green-800 disabled:opacity-60"
            >
              <Icon d={icons.sparkles} className="h-5 w-5" />
              {suggestLoading ? 'Finding meals...' : 'Generate Recipe'}
              <span aria-hidden="true">&rarr;</span>
            </button>

            {suggestError && (
              <p role="alert" className="text-sm text-red-700">{suggestError}</p>
            )}
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

      {justIngredients && suggestions.length > 0 && (
        <MealSuggestionModal
          suggestions={suggestions}
          quickMeal={quickMeal}
          excludeAllergens={excludeAllergens}
          loading={suggestLoading}
          onClose={clear}
          onGenerate={handleGenerateSelected}
        />
      )}
    </div>
  )
}

export default Generate
