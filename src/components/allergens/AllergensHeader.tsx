import { useNavigate } from 'react-router-dom'
import Icon from '../Icon'
import UserMenu from '../UserMenu'
import { icons } from './shared'

interface Props {
  menuOpen: boolean
  onOpenMenu: () => void
}

function AllergensHeader({ menuOpen, onOpenMenu }: Props) {
  const navigate = useNavigate()

  return (
    <header className="flex items-start gap-3">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
        aria-expanded={menuOpen}
        aria-controls="sidebar"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-green-800 text-green-800 transition hover:bg-green-50 lg:hidden"
      >
        <Icon d={icons.menu} className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="mb-1 inline-flex items-center gap-1 text-sm font-semibold text-green-800 hover:underline"
        >
          <Icon d={icons.back} className="h-4 w-4" />
          Profile
        </button>
        <h1 className="text-2xl font-extrabold tracking-tight text-green-950 sm:text-3xl">
          Allergies
        </h1>
        <p className="mt-1 text-sm text-slate-600 sm:text-base">
          Foods we&rsquo;ll keep out of your recipes.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <UserMenu />
      </div>
    </header>
  )
}

export default AllergensHeader
