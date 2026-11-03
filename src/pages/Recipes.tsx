import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'
import { useRecipe } from '../context/RecipeContext'
import { formatIngredient, type Recipe } from '../types'
import friedRiceImage from '../assets/Fried rice and peppered chicken.jpg'

// Placeholder shown until a recipe is generated (data from the Mealio design).
const SAMPLE_RECIPE: Recipe = {
  id: 'sample-chicken-fried-rice',
  title: 'Chicken Fried Rice',
  description: 'A quick and delicious meal made with tender chicken, fragrant rice and fresh vegetables.',
  tags: ['High Protein', 'Quick Meal'],
  difficulty: 'EASY',
  prepTimeMinutes: 10,
  cookTimeMinutes: 15,
  servings: 2,
  ingredients: [
    { name: 'Chicken breast', quantity: 200, unit: 'g' },
    { name: 'Rice', quantity: 2, unit: 'cups' },
    { name: 'Carrots', quantity: 1, unit: 'cup' },
    { name: 'Green peas', quantity: 0.5, unit: 'cup' },
    { name: 'Onions', quantity: 1, unit: 'medium' },
    { name: 'Soy sauce', quantity: 2, unit: 'tbsp' },
    { name: 'Cooking oil', quantity: null, unit: null },
    { name: 'Salt & pepper', quantity: null, unit: null },
  ],
  steps: [
    { order: 1, instruction: 'Cook the rice until fluffy, then set aside.' },
    { order: 2, instruction: 'Heat oil in a pan, add diced chicken and stir-fry until golden brown.' },
    { order: 3, instruction: 'Add onions, carrots and peas. Cook for 2–3 minutes.' },
    {
      order: 4,
      instruction: 'Add the rice, soy sauce, and season to taste. Stir well and cook for another 2–3 minutes.',
    },
    { order: 5, instruction: 'Serve hot and enjoy!' },
  ],
  nutrition: { calories: 420, proteinGrams: 35, carbsGrams: 60, fatGrams: 10 },
}

const formatDifficulty = (difficulty: NonNullable<Recipe['difficulty']>) =>
  difficulty.charAt(0) + difficulty.slice(1).toLowerCase()

function Recipes() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { recipe: generated, suggestions } = useRecipe()

  const recipe = generated ?? SAMPLE_RECIPE
  const totalMinutes = (recipe.prepTimeMinutes ?? 0) + (recipe.cookTimeMinutes ?? 0)
  const tags = [...(recipe.tags ?? []), ...(recipe.difficulty ? [formatDifficulty(recipe.difficulty)] : [])]
  const nutrition = recipe.nutrition
  const nutritionParts = nutrition
    ? [
        nutrition.calories != null && `~${nutrition.calories} kcal`,
        nutrition.proteinGrams != null && `${nutrition.proteinGrams}g Protein`,
        nutrition.carbsGrams != null && `${nutrition.carbsGrams}g Carbs`,
        nutrition.fatGrams != null && `${nutrition.fatGrams}g Fat`,
      ].filter(Boolean)
    : []

  return (
    <div className="flex min-h-screen font-jakarta">
      <AppSidebar current="/recipes" open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0 flex-1">
        <header>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="sidebar"
            className="lg:hidden"
          >
            Menu
          </button>

          <nav aria-label="Recipe actions">
            <Link to="/generate">← Back to recipes</Link>
            <button type="button" aria-label="Bookmark recipe">Bookmark</button>
            <button type="button" aria-label="Share recipe">Share</button>
          </nav>
        </header>

        <main>
          {!generated && suggestions.length > 0 && (
            <section aria-labelledby="suggestions-heading">
              <h2 id="suggestions-heading">Suggested meals</h2>
              <ul>
                {suggestions.map((food) => (
                  <li key={food}>{food}</li>
                ))}
              </ul>
            </section>
          )}

          <article aria-labelledby="recipe-title">
            <figure>
              <img src={recipe.imageUrl || friedRiceImage} alt={recipe.title} />
              {totalMinutes > 0 && (
                <figcaption>
                  <time dateTime={`PT${totalMinutes}M`}>{totalMinutes} min</time>
                </figcaption>
              )}
              {recipe.imageCredit && (
                <small>
                  Photo by{' '}
                  {recipe.imageCreditUrl ? (
                    <a href={recipe.imageCreditUrl} target="_blank" rel="noreferrer">
                      {recipe.imageCredit}
                    </a>
                  ) : (
                    recipe.imageCredit
                  )}
                </small>
              )}
            </figure>

            <header>
              <h1 id="recipe-title">{recipe.title}</h1>
              {recipe.description && <p>{recipe.description}</p>}

              {tags.length > 0 && (
                <ul aria-label="Tags">
                  {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              )}

              <button type="button" aria-label="Add to favourites" aria-pressed="false">
                ♡
              </button>
            </header>

            <dl>
              {recipe.prepTimeMinutes != null && (
                <div>
                  <dt>Prep Time</dt>
                  <dd>{recipe.prepTimeMinutes} min</dd>
                </div>
              )}
              {recipe.cookTimeMinutes != null && (
                <div>
                  <dt>Cook Time</dt>
                  <dd>{recipe.cookTimeMinutes} min</dd>
                </div>
              )}
              {recipe.servings != null && (
                <div>
                  <dt>Servings</dt>
                  <dd>
                    {recipe.servings} {recipe.servings === 1 ? 'person' : 'people'}
                  </dd>
                </div>
              )}
              {recipe.cuisine && (
                <div>
                  <dt>Cuisine</dt>
                  <dd>{recipe.cuisine}</dd>
                </div>
              )}
            </dl>

            <section aria-labelledby="ingredients-heading">
              <h2 id="ingredients-heading">Ingredients</h2>
              <ul>
                {recipe.ingredients.map((ing) => (
                  <li key={ing.id ?? ing.name}>
                    <label>
                      <input type="checkbox" /> {formatIngredient(ing)}
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="instructions-heading">
              <h2 id="instructions-heading">Instructions</h2>
              <ol>
                {[...recipe.steps]
                  .sort((a, b) => a.order - b.order)
                  .map((step) => (
                    <li key={step.id ?? step.order}>{step.instruction}</li>
                  ))}
              </ol>
            </section>

            {nutritionParts.length > 0 && (
              <section aria-labelledby="nutrition-heading">
                <h2 id="nutrition-heading">Nutrition Info</h2>
                <p>{nutritionParts.join(' • ')}</p>
              </section>
            )}

            <button type="button">Save Recipe</button>
          </article>
        </main>
      </div>
    </div>
  )
}

export default Recipes
