import { Link } from 'react-router-dom'
import Icon from '../Icon'
import { icons } from './shared'

interface Props {
  title: string
  viewTo: string
  open: boolean
  onToggle: () => void
  onClose: () => void
}

/** The "⋮" button on a history row and its small dropdown. */
function RowMenu({ title, viewTo, open, onToggle, onClose }: Props) {
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={onToggle}
        aria-label={`More options for ${title}`}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-emerald-50 hover:text-green-900"
      >
        <Icon d={icons.dots} className="h-5 w-5" />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div className="absolute right-0 top-10 z-20 w-48 overflow-hidden rounded-xl bg-white p-1 shadow-xl ring-1 ring-emerald-100">
            <Link
              to={viewTo}
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-green-950 transition hover:bg-emerald-50"
            >
              View recipe
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default RowMenu
