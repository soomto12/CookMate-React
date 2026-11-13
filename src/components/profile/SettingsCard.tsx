import Icon from '../Icon'
import Toggle from '../Toggle'
import SettingsRow from './SettingsRow'
import { icons, rowLabelClass } from './shared'

interface Props {
  notifications: boolean
  onNotificationsChange: (on: boolean) => void
}

function SettingsCard({ notifications, onNotificationsChange }: Props) {
  return (
    <section
      aria-label="Settings"
      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100"
    >
      <ul className="divide-y divide-emerald-50">
        <SettingsRow icon={icons.sun} label="Appearance" value="System" />

        <li className="flex items-center gap-3 px-5 py-4">
          <Icon d={icons.bell} className="h-5 w-5 shrink-0 text-green-600" />
          <span className={rowLabelClass}>Notifications</span>
          <Toggle
            name="notifications"
            label=""
            ariaLabel="Notifications"
            checked={notifications}
            onChange={onNotificationsChange}
          />
        </li>

        <SettingsRow icon={icons.question} label="Help & Support" />
        <SettingsRow icon={icons.info} label="About Mealio" />
      </ul>
    </section>
  )
}

export default SettingsCard
