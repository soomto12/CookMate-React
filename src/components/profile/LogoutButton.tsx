import Icon from '../Icon'
import { icons } from './shared'

function LogoutButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-rose-50 px-6 py-4 text-sm font-bold text-rose-600 ring-1 ring-rose-100 transition hover:bg-rose-100 sm:text-base"
    >
      <Icon d={icons.logout} className="h-5 w-5" />
      Log Out
    </button>
  )
}

export default LogoutButton
