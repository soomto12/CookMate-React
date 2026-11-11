import { useState } from 'react'
import AppSidebar from '../components/AppSidebar'
import AddAllergenCard from '../components/allergens/AddAllergenCard'
import AddAllergenForm from '../components/allergens/AddAllergenForm'
import AllergenSuggestions from '../components/allergens/AllergenSuggestions'
import AllergensHeader from '../components/allergens/AllergensHeader'
import ErrorAlert from '../components/allergens/ErrorAlert'
import SavedAllergensCard from '../components/allergens/SavedAllergensCard'
import { SUGGESTIONS, sameName } from '../components/allergens/shared'
import { useAllergens, type AllergenItem } from '../hooks/useAllergens'
import { getErrorMessage } from '../types'

function ManageAllergens() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { items, loading, error, reload, add, remove } = useAllergens()

  const [input, setInput] = useState('')
  const [adding, setAdding] = useState<string | null>(null)
  const [removing, setRemoving] = useState<AllergenItem | null>(null)
  const [actionError, setActionError] = useState('')

  const busy = adding !== null || removing !== null
  const has = (name: string) => items.some((a) => sameName(a.name, name))
  const suggestions = !loading && !error ? SUGGESTIONS.filter((s) => !has(s)) : []

  const handleAdd = async (raw: string) => {
    const name = raw.trim()
    if (!name || busy) return
    if (has(name)) {
      setActionError(`${name} is already in your list.`)
      return
    }
    setActionError('')
    setAdding(name)
    try {
      await add(name)
      setInput('')
    } catch (err) {
      setActionError(getErrorMessage(err))
    } finally {
      setAdding(null)
    }
  }

  const handleRemove = async (item: AllergenItem) => {
    if (busy) return
    setActionError('')
    setRemoving(item)
    try {
      await remove(item)
    } catch (err) {
      setActionError(getErrorMessage(err))
    } finally {
      setRemoving(null)
    }
  }

  return (
    <div className="flex min-h-screen font-jakarta">
      <AppSidebar current="/profile" open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0 flex-1 bg-white">
        <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <AllergensHeader menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />

          <main className="mt-6 grid max-w-3xl gap-4">
            <AddAllergenCard>
              <AddAllergenForm
                value={input}
                onChange={setInput}
                onSubmit={handleAdd}
                busy={busy}
                adding={adding}
              />
              <AllergenSuggestions
                suggestions={suggestions}
                onPick={handleAdd}
                busy={busy}
                adding={adding}
              />
              {actionError && <ErrorAlert message={actionError} className="mt-4" />}
            </AddAllergenCard>

            <SavedAllergensCard
              items={items}
              loading={loading}
              error={error}
              onRetry={() => reload()}
              removing={removing}
              busy={busy}
              onRemove={handleRemove}
            />
          </main>
        </div>
      </div>
    </div>
  )
}

export default ManageAllergens
