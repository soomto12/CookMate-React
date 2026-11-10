import { useEffect } from 'react'
import RecipeView from '../components/RecipeView'
import { useRecipe } from '../context/RecipeContext'

function Recipes() {
  const { recipe, suggestions, recipeLoading, recipeError, loadLatestRecipe } = useRecipe()

  useEffect(() => {
    if (!recipe) loadLatestRecipe()
    // only on mount: once a recipe is set (by this fetch or by Generate), we don't refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <RecipeView
      current="/recipes"
      recipe={recipe}
      loading={recipeLoading}
      error={recipeError}
      onRetry={loadLatestRecipe}
      suggestions={suggestions}
      backTo="/generate"
      backLabel="Back to recipes"
      emptyTitle="No recipe yet"
      emptyMessage="Generate a recipe from your ingredients to see it here."
      emptyActionLabel="Generate a recipe"
      emptyActionTo="/generate"
    />
  )
}

export default Recipes
