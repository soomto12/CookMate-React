import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'
import Icon from '../components/Icon'
import UserMenu from '../components/UserMenu'
import { useRecipe } from '../context/RecipeContext'
import heroFallback from '../assets/Fresh Grilled Chicken Power Bowl.png'

const icons = {
  menu: 'M4 6h16M4 12h16M4 18h16',
  history: 'M3.5 12a8.5 8.5 0 108.5-8.5A8.4 8.4 0 005.7 6.3M3 3.5v3.8h3.8M12 7.5V12l3 1.8',
  calendar:
    'M7 3v4M17 3v4M4 9.5h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z',
  dots: 'M12 6h.01M12 12h.01M12 18h.01',
  chef: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z',
  sparkles:
    'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
}

const formatDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

function History() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openRow, setOpenRow] = useState<string | null>(null)
  const { recipes, recipesLoading, recipesError, loadRecipes } = useRecipe()

  useEffect(() => {
    loadRecipes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex min-h-screen font-jakarta">
      <AppSidebar current="/history" open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0 flex-1 bg-white">
        <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <header>
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="sidebar"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-green-800 text-green-800 transition hover:bg-green-50 lg:hidden"
              >
                <Icon d={icons.menu} className="h-5 w-5" />
              </button>
              <div className="ml-auto">
                <UserMenu />
              </div>
            </div>

            <h1 className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-green-950 sm:text-3xl">
              <Icon d={icons.history} className="h-7 w-7 shrink-0 text-green-700 sm:h-8 sm:w-8" />
              My History
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 sm:text-base">
              View all the recipes you&rsquo;ve generated.
            </p>
          </header>

          <main className="mt-6">
            {recipesLoading ? (
              <ul aria-hidden="true" className="grid animate-pulse gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-emerald-100 sm:gap-4"
                  >
                    <div className="h-16 w-16 shrink-0 rounded-xl bg-emerald-100 sm:h-20 sm:w-24" />
                    <div className="min-w-0 flex-1">
                      <div className="h-4 w-2/3 rounded-md bg-emerald-100" />
                      <div className="mt-2 h-3 w-1/3 rounded-md bg-emerald-100" />
                    </div>
                  </li>
                ))}
              </ul>
            ) : recipesError ? (
              <div className="rounded-2xl bg-rose-50 px-6 py-12 text-center ring-1 ring-rose-100">
                <Icon d={icons.chef} className="mx-auto h-10 w-10 text-rose-500" />
                <h2 className="mt-3 text-lg font-extrabold text-green-950">
                  Couldn&rsquo;t load your history
                </h2>
                <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-600">{recipesError}</p>
                <button
                  type="button"
                  onClick={() => loadRecipes()}
                  className="mt-5 rounded-xl bg-green-800 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-green-900/20 transition hover:bg-green-900"
                >
                  Try again
                </button>
              </div>
            ) : recipes.length === 0 ? (
              <div className="rounded-2xl bg-emerald-50/60 px-6 py-12 text-center ring-1 ring-emerald-100">
                <Icon
                  d={icons.sparkles}
                  className="mx-auto h-10 w-10 text-green-600"
                />
                <h2 className="mt-3 text-lg font-extrabold text-green-950">No recipes yet</h2>
                <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-600">
                  Recipes you generate will show up here so you can cook them again.
                </p>
                <Link
                  to="/generate"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-900"
                >
                  Generate a recipe
                  <Icon d={icons.arrow} className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <ul className="grid gap-3">
                {recipes.map((entry) => {
                  const minutes = (entry.prepTimeMinutes ?? 0) + (entry.cookTimeMinutes ?? 0)
                  const date = formatDate(entry.createdAt)
                  return (
                    <li
                      key={entry.id}
                      className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-emerald-100 transition hover:shadow-md sm:gap-4"
                    >
                      <img
                        src={entry.imageUrl || heroFallback}
                        alt={entry.title}
                        className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-24"
                      />

                      <div className="min-w-0 flex-1">
                        <h2 className="truncate text-sm font-extrabold text-green-950 sm:text-lg">
                          {entry.title}
                        </h2>
                        {(date || minutes > 0) && (
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
                            <Icon d={icons.calendar} className="h-4 w-4 shrink-0" />
                            <span className="truncate">
                              {[date, minutes > 0 ? `${minutes} mins` : null]
                                .filter(Boolean)
                                .join(' • ')}
                            </span>
                          </p>
                        )}
                      </div>

                      <Link
                        to={`/recipes/view?id=${entry.id}`}
                        className="shrink-0 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-green-800 ring-1 ring-emerald-100 transition hover:bg-emerald-100 sm:px-5 sm:text-sm"
                      >
                        View Recipe
                      </Link>

                      <div className="relative shrink-0">
                        <button
                          type="button"
                          onClick={() => setOpenRow(openRow === entry.id ? null : entry.id)}
                          aria-label={`More options for ${entry.title}`}
                          aria-expanded={openRow === entry.id}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-emerald-50 hover:text-green-900"
                        >
                          <Icon d={icons.dots} className="h-5 w-5" />
                        </button>

                        {openRow === entry.id && (
                          <>
                            <button
                              type="button"
                              aria-label="Close menu"
                              onClick={() => setOpenRow(null)}
                              className="fixed inset-0 z-10 cursor-default"
                            />
                            <div className="absolute right-0 top-10 z-20 w-48 overflow-hidden rounded-xl bg-white p-1 shadow-xl ring-1 ring-emerald-100">
                              <Link
                                to={`/recipes/view?id=${entry.id}`}
                                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-green-950 transition hover:bg-emerald-50"
                              >
                                View recipe
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default History
