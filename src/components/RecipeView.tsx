import { useState } from 'react'
import AppSidebar from './AppSidebar'
import RecipeSkeleton from './RecipeSkeleton'
import RecipeArticle from './recipe/RecipeArticle'
import { RecipeEmpty, RecipeLoadError } from './recipe/RecipeStatus'
import RecipeViewHeader from './recipe/RecipeViewHeader'
import SuggestedMeals from './recipe/SuggestedMeals'
import type { RecipeViewProps } from '../types'

function RecipeView({
  current,
  recipe,
  loading,
  error,
  onRetry,
  backTo,
  backLabel,
  suggestions = [],
  emptyTitle,
  emptyMessage,
  emptyActionLabel,
  emptyActionTo,
}: RecipeViewProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const renderBody = () => {
    if (recipe) return <RecipeArticle recipe={recipe} />
    if (loading) return <RecipeSkeleton />
    if (error) return <RecipeLoadError error={error} onRetry={onRetry} />
    return (
      <RecipeEmpty
        title={emptyTitle}
        message={emptyMessage}
        actionLabel={emptyActionLabel}
        actionTo={emptyActionTo}
      />
    )
  }

  return (
    <div className="flex min-h-screen font-jakarta">
      <AppSidebar current={current} open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0 flex-1 bg-white">
        <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <RecipeViewHeader
            menuOpen={menuOpen}
            onOpenMenu={() => setMenuOpen(true)}
            backTo={backTo}
            backLabel={backLabel}
          />

          <main className="mt-4">
            {!recipe && <SuggestedMeals suggestions={suggestions} />}
            {renderBody()}
          </main>
        </div>
      </div>
    </div>
  )
}

export default RecipeView
