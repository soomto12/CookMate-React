import UserMenu from '../UserMenu'

interface Props {
  menuOpen: boolean
  onOpenMenu: () => void
}

function GenerateHeader({ menuOpen, onOpenMenu }: Props) {
  return (
    <header className="flex items-center px-4 py-4 sm:px-8 sm:py-6">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
        aria-expanded={menuOpen}
        aria-controls="sidebar"
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border-2 border-green-800 text-green-800 transition hover:bg-green-50 lg:hidden"
      >
        <span className="h-0.5 w-5 rounded bg-current" />
        <span className="h-0.5 w-5 rounded bg-current" />
        <span className="h-0.5 w-5 rounded bg-current" />
      </button>
      <div className="ml-auto">
        <UserMenu />
      </div>
    </header>
  )
}

export default GenerateHeader
