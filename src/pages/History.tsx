import { useEffect, useState } from 'react'
import AppSidebar from '../components/AppSidebar'
import HistoryHeader from '../components/history/HistoryHeader'
import HistoryList from '../components/history/HistoryList'
import { HistoryEmpty, HistoryError, HistorySkeleton } from '../components/history/HistoryStatus'
import { useRecipe } from '../context/RecipeContext'

function History() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { recipes, recipesLoading, recipesError, loadRecipes } = useRecipe()

  useEffect(() => {
    loadRecipes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderBody = () => {
    if (recipesLoading) return <HistorySkeleton />
    if (recipesError) return <HistoryError message={recipesError} onRetry={() => loadRecipes()} />
    if (recipes.length === 0) return <HistoryEmpty />
    return <HistoryList recipes={recipes} />
  }

  return (
    <div className="flex min-h-screen font-jakarta">
      <AppSidebar current="/history" open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0 flex-1 bg-white">
        <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <HistoryHeader menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />
          <main className="mt-6">{renderBody()}</main>
        </div>
      </div>
    </div>
  )
}

export default History
