import Icon from '../Icon'
import { icons } from './shared'

// TEMPORARY sample counts, shown until an account summary endpoint exists.
const SAMPLE_STATS = [
  { icon: icons.chef, value: 24, label: 'Recipes' },
  { icon: icons.heart, value: 8, label: 'Saved' },
  { icon: icons.clock, value: 12, label: 'History' },
  { icon: icons.cart, value: 3, label: 'Lists' },
]

function AccountOverview() {
  return (
    <section
      aria-labelledby="overview-heading"
      className="rounded-2xl bg-emerald-50/80 p-5 ring-1 ring-emerald-100 sm:p-6"
    >
      <h2 id="overview-heading" className="text-base font-extrabold text-green-950 sm:text-lg">
        Account Overview
      </h2>
      <dl className="mt-4 grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:divide-x sm:divide-emerald-200/70">
        {SAMPLE_STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 px-2">
            <Icon d={stat.icon} className="h-6 w-6 text-green-700" />
            <dt className="sr-only">{stat.label}</dt>
            <dd className="text-xl font-extrabold text-green-950">{stat.value}</dd>
            <p aria-hidden="true" className="text-xs text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default AccountOverview
