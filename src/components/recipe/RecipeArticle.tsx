import type { Recipe } from '../../types'
import IngredientsList from './IngredientsList'
import InstructionsList from './InstructionsList'
import NutritionInfo from './NutritionInfo'
import RecipeHero from './RecipeHero'
import RecipeStats from './RecipeStats'
import RecipeTitle from './RecipeTitle'
import ShoppingList from './ShoppingList'

/** The full recipe: photo, title, stats, ingredients, steps, shopping list, nutrition. */
function RecipeArticle({ recipe }: { recipe: Recipe }) {
  return (
    <article aria-labelledby="recipe-title">
      <RecipeHero recipe={recipe} />

      <div className="pb-8 pt-5">
        <RecipeTitle recipe={recipe} />
        <RecipeStats recipe={recipe} />

        <div className="mt-6 grid gap-7 lg:grid-cols-2 lg:gap-10">
          <IngredientsList ingredients={recipe.ingredients} />
          <InstructionsList steps={recipe.steps} />
        </div>

        <ShoppingList recipe={recipe} />
        <NutritionInfo nutrition={recipe.nutrition} />
      </div>
    </article>
  )
}

export default RecipeArticle
