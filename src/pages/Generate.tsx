import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'
import MealSuggestionModal from '../components/MealSuggestionModal'
import AllergiesField from '../components/generate/AllergiesField'
import GenerateButton from '../components/generate/GenerateButton'
import GenerateHeader from '../components/generate/GenerateHeader'
import GenerateIntro from '../components/generate/GenerateIntro'
import HowItWorks from '../components/generate/HowItWorks'
import TextField from '../components/generate/TextField'
import ToggleField from '../components/generate/ToggleField'
import { useRecipe } from '../context/RecipeContext'
import { useAllergens } from '../hooks/useAllergens'
import { icons } from '../generateConstants'

function Generate() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
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
      <AppSidebar current="/generate" open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0 flex-1 bg-gradient-to-br from-white via-emerald-50/40 to-emerald-50">
        <GenerateHeader menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />

        <main className="grid gap-x-10 gap-y-8 px-4 pb-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-14">
          <GenerateIntro />

          <form
            onSubmit={handleSubmit}
            className="flex min-w-0 flex-col gap-8 rounded-3xl bg-white p-5 shadow-xl shadow-green-900/5 ring-1 ring-emerald-50 sm:p-8"
          >
            {!justIngredients && (
              <TextField
                icon={icons.pot}
                title="What do you want to cook?"
                hint="Enter the meal you have in mind (e.g. jollof rice, chicken curry, pasta...)."
                name="meal"
                value={meal}
                onChange={setMeal}
                placeholder="e.g. jollof rice, chicken curry, pasta..."
              />
            )}

            <TextField
              icon={icons.bag}
              title="What do you have?"
              hint="Enter the ingredients you have (separate with commas)."
              name="ingredients"
              value={ingredients}
              onChange={setIngredients}
              placeholder="e.g. chicken, rice, tomatoes, onions..."
            />

            <ToggleField
              icon={icons.sparkles}
              title="Or just ingredients?"
              hint={
                <>
                  Don&rsquo;t have a specific meal in mind? Just enter the ingredients and let AI
                  suggest a meal for you.
                </>
              }
              name="justIngredients"
              label="I just have ingredients (suggest a meal)"
              checked={justIngredients}
              onChange={setJustIngredients}
            />

            <ToggleField
              icon={icons.bolt}
              title="Quick meal?"
              hint="Need something fast? This will prioritize quick and easy recipes."
              name="quickMeal"
              label="Yes, I want a quick meal"
              checked={quickMeal}
              onChange={setQuickMeal}
            />

            <AllergiesField
              allergens={allergens}
              loading={allergensLoading}
              error={allergensError}
              exclude={excludeAllergens}
              onExcludeChange={setExcludeAllergens}
            />

            <GenerateButton loading={suggestLoading} />

            {suggestError && (
              <p role="alert" className="text-sm text-red-700">{suggestError}</p>
            )}
          </form>

          <HowItWorks />
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
