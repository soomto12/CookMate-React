import { Link, useNavigate } from 'react-router-dom'
import type { CookMateUser } from '../types'

interface SiteHeaderProps {
  active: 'home' | 'history'
}

function SiteHeader({ active }: SiteHeaderProps) {
  const navigate = useNavigate()
  const user = JSON.parse(
    localStorage.getItem('cookmate_user') || 'null',
  ) as CookMateUser | null
  const initial = user?.name?.trim()?.[0]?.toUpperCase() || '?'

  const handleLogout = () => {
    localStorage.removeItem('cookmate_token')
    localStorage.removeItem('cookmate_user')
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-amber-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <div className="flex items-center gap-6">
          <Link to="/app" className="inline-flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight text-stone-900">
            <span className="text-3xl">👨‍🍳</span>
            Cook<span className="text-amber-700">Mate</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-stone-600 md:flex">
            <Link
              to="/app"
              className={`transition ${active === 'home' ? 'text-amber-700' : 'hover:text-amber-700'}`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`transition ${active === 'history' ? 'text-amber-700' : 'hover:text-amber-700'}`}
            >
              Meal History
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-600 transition hover:border-amber-200 hover:text-amber-700"
          >
            Logout
          </button>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-stone-800 text-sm font-semibold text-white shadow-sm">
            {initial}
          </span>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
