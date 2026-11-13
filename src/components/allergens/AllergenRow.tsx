import Icon from '../Icon'
import type { AllergenItem } from '../../hooks/useAllergens'
import { icons } from './shared'

interface Props {
  item: AllergenItem
  deleting: boolean
  disabled: boolean
  onRemove: (item: AllergenItem) => void
}

function AllergenRow({ item, deleting, disabled, onRemove }: Props) {
  return (
    <li className={`flex items-center gap-3 px-5 py-3.5 transition ${deleting ? 'opacity-50' : ''}`}>
      <span className="h-2 w-2 shrink-0 rounded-full bg-green-600" aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-green-950 sm:text-base">
        {item.name}
      </span>
      <button
        type="button"
        onClick={() => onRemove(item)}
        disabled={disabled}
        aria-label={`Remove ${item.name}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon d={icons.trash} className="h-[18px] w-[18px]" />
      </button>
    </li>
  )
}

export default AllergenRow
