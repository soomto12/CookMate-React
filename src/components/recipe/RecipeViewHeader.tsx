import { Link } from 'react-router-dom'
import Icon from '../Icon'
import UserMenu from '../UserMenu'
import { icons } from '../../recipesConstants'

interface Props {
  menuOpen: boolean
  onOpenMenu: () => void
  backTo: string
  backLabel: string
}

function RecipeViewHeader({ menuOpen, onOpenMenu, backTo, backLabel }: Props) {
  return (
    <header className="flex items-center gap-2 sm:gap-3">
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

      <nav aria-label="Recipe actions" className="flex min-w-0 flex-1 items-center gap-2">
        <Link
          to={backTo}
          className="flex min-w-0 items-center gap-2.5 rounded-full py-2 pr-3 text-sm font-bold text-green-950 transition hover:text-green-700 sm:text-base"
        >
          <Icon d={icons.back} className="h-5 w-5 shrink-0" />
          <span className="truncate">{backLabel}</span>
        </Link>

        <div className="ml-auto flex items-center gap-1">
          <UserMenu />
        </div>
      </nav>
    </header>
  )
}

export default RecipeViewHeader
