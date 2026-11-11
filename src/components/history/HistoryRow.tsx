import { Link } from 'react-router-dom'
import Icon from '../Icon'
import type { Recipe } from '../../types'
import heroFallback from '../../assets/Fresh Grilled Chicken Power Bowl.png'
import RowMenu from './RowMenu'
import { formatDate, icons } from './shared'

interface Props {
  entry: Recipe
  menuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
}

/** One past recipe: photo, title, date and time, "View Recipe" and the ⋮ menu. */
function HistoryRow({ entry, menuOpen, onToggleMenu, onCloseMenu }: Props) {
  const minutes = (entry.prepTimeMinutes ?? 0) + (entry.cookTimeMinutes ?? 0)
  const date = formatDate(entry.createdAt)
  const details = [date, minutes > 0 ? `${minutes} mins` : null].filter(Boolean).join(' • ')
  const viewTo = `/recipes/view?id=${entry.id}`

  return (
    <li className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-emerald-100 transition hover:shadow-md sm:gap-4">
      <img
        src={entry.imageUrl || heroFallback}
        alt={entry.title}
        className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-24"
      />

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-sm font-extrabold text-green-950 sm:text-lg">{entry.title}</h2>
        {details && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
            <Icon d={icons.calendar} className="h-4 w-4 shrink-0" />
            <span className="truncate">{details}</span>
          </p>
        )}
      </div>

      <Link
        to={viewTo}
        className="shrink-0 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-green-800 ring-1 ring-emerald-100 transition hover:bg-emerald-100 sm:px-5 sm:text-sm"
      >
        View Recipe
      </Link>

      <RowMenu
        title={entry.title}
        viewTo={viewTo}
        open={menuOpen}
        onToggle={onToggleMenu}
        onClose={onCloseMenu}
      />
    </li>
  )
}

export default HistoryRow
