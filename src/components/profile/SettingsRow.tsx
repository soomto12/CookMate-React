import { Link } from 'react-router-dom'
import Icon from '../Icon'
import { icons, rowClass, rowLabelClass, rowValueClass } from './shared'

interface Props {
  icon: string
  label: string
  value?: string
  /** When set, the row is a link; otherwise it is a button. */
  to?: string
  onClick?: () => void
}

/** A tappable list row: icon, label, optional value and a chevron. */
function SettingsRow({ icon, label, value, to, onClick }: Props) {
  const content = (
    <>
      <Icon d={icon} className="h-5 w-5 shrink-0 text-green-600" />
      <span className={rowLabelClass}>{label}</span>
      {value !== undefined && <span className={rowValueClass}>{value}</span>}
      <Icon d={icons.chevron} className="h-4 w-4 shrink-0 text-slate-400" />
    </>
  )

  return (
    <li>
      {to ? (
        <Link to={to} className={rowClass}>
          {content}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={rowClass}>
          {content}
        </button>
      )}
    </li>
  )
}

export default SettingsRow
