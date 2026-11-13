import Toggle from '../Toggle'
import { hintClass, icons } from '../../generateConstants'
import FormSection from './FormSection'

interface Props {
  allergens: string[]
  loading: boolean
  error: string
  exclude: boolean
  onExcludeChange: (exclude: boolean) => void
}

const linkClass = 'font-semibold text-green-800 hover:underline'

function AllergiesField({ allergens, loading, error, exclude, onExcludeChange }: Props) {
  return (
    <FormSection icon={icons.shield} title="Allergies">
      <p className={hintClass}>
        Exclude ingredients you are allergic to. These come from your saved allergies.
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex min-h-[3.25rem] flex-1 flex-wrap items-center gap-2 rounded-xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
          <SavedAllergens allergens={allergens} loading={loading} error={error} />
        </div>
        <Toggle
          name="excludeAllergens"
          label="Exclude allergens"
          checked={exclude}
          onChange={onExcludeChange}
        />
      </div>
    </FormSection>
  )
}

/** The chips inside the box: loading text, an error, "none saved" or the list. */
function SavedAllergens({ allergens, loading, error }: Pick<Props, 'allergens' | 'loading' | 'error'>) {
  if (loading) {
    return <span className="text-sm text-slate-400">Loading your allergies...</span>
  }
  if (error) {
    return <span role="alert" className="text-sm text-red-700">{error}</span>
  }
  if (allergens.length === 0) {
    return (
      <span className="text-sm text-slate-400">
        No allergies saved.{' '}
        <a href="/allergens" className={linkClass}>
          Add some
        </a>
      </span>
    )
  }
  return (
    <>
      {allergens.map((name) => (
        <span key={name} className="rounded-full bg-green-700 px-3 py-1 text-sm font-medium text-white">
          {name}
        </span>
      ))}
      <a href="/allergens" className={`text-sm ${linkClass}`}>
        Add more
      </a>
    </>
  )
}

export default AllergiesField
