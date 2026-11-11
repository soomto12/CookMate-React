import { useSearchParams } from 'react-router-dom'
import RecipeView from '../components/RecipeView'
import { useRecipeById } from '../hooks/useRecipeById'

function Recipe() {
  const [searchParams] = useSearchParams()
  const { recipe, loading, error, reload } = useRecipeById(searchParams.get('id'))

  return (
    <RecipeView
      current="/recipes"
      recipe={recipe}
      loading={loading}
      error={error}
      onRetry={() => void reload()}
      backTo="/history"
      backLabel="Back to history"
      emptyTitle="Recipe not found"
      emptyMessage="We couldn't find a recipe for this link."
      emptyActionLabel="Back to history"
      emptyActionTo="/history"
    />
  )
}

export default Recipe
