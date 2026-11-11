import Icon from '../Icon'
import UserMenu from '../UserMenu'
import { icons } from './shared'

interface Props {
  menuOpen: boolean
  onOpenMenu: () => void
}

function HistoryHeader({ menuOpen, onOpenMenu }: Props) {
  return (
    <header>
      <div className="mb-4 flex items-center justify-between">
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
  )
}

export default HistoryHeader
