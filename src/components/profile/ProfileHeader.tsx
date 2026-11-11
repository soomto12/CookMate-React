import Icon from '../Icon'
import UserMenu from '../UserMenu'
import { icons } from './shared'

interface Props {
  menuOpen: boolean
  onOpenMenu: () => void
}

function ProfileHeader({ menuOpen, onOpenMenu }: Props) {
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
        <h1 className="text-2xl font-extrabold tracking-tight text-green-950 sm:text-3xl">
          Profile
        </h1>
        <p className="mt-1 text-sm text-slate-600 sm:text-base">
          Manage your account and preferences.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-11 w-11 items-center justify-center rounded-full text-green-950 transition hover:bg-emerald-100/70"
        >
          <Icon d={icons.bell} className="h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label="Toggle theme"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100/70 text-green-900 transition hover:bg-emerald-200/70"
        >
          <Icon d={icons.sun} className="h-6 w-6" />
        </button>
        <UserMenu />
      </div>
    </header>
  )
}

export default ProfileHeader
