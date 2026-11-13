import Icon from '../Icon'
import SettingsRow from './SettingsRow'
import { icons } from './shared'

interface Props {
  allergens: string[]
  loading: boolean
  error: string
}

/** Short text for the Allergies row, e.g. "None", "Milk, Eggs" or "5 foods". */
function allergiesSummary({ allergens, loading, error }: Props) {
  if (loading) return '...'
  if (error) return ''
  if (allergens.length > 2) return `${allergens.length} foods`
  if (allergens.length > 0) return allergens.join(', ')
  return 'None'
}

function PreferencesCard(props: Props) {
  return (
    <section
      aria-labelledby="preferences-heading"
      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100"
    >
      <h2
        id="preferences-heading"
        className="flex items-center gap-2 px-5 pb-1 pt-5 text-base font-extrabold text-green-950 sm:text-lg"
      >
        <Icon d={icons.gear} className="h-5 w-5 text-green-700" />
        Preferences
      </h2>
      <ul className="divide-y divide-emerald-50">
        <SettingsRow
          icon={icons.shield}
          label="Allergies"
          value={allergiesSummary(props)}
          to="/profile/allergens"
        />
      </ul>
    </section>
  )
}

export default PreferencesCard
