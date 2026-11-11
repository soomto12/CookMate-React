import Icon from '../Icon'
import { icons } from './shared'

interface Props {
  name: string
  email: string
}

function AccountCard({ name, email }: Props) {
  const initial = name[0]?.toUpperCase() || '?'

  return (
    <section
      aria-label="Account"
      className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-emerald-100 sm:gap-5 sm:p-6"
    >
      <div className="relative shrink-0">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-green-900 text-3xl font-extrabold text-white sm:h-24 sm:w-24 sm:text-4xl">
          {initial}
        </span>
        <button
          type="button"
          aria-label="Change profile photo"
          className="absolute -bottom-0.5 -right-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-green-900 shadow-md ring-1 ring-emerald-100 transition hover:bg-emerald-50"
        >
          <Icon d={icons.pencil} className="h-4 w-4" />
        </button>
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-xl font-extrabold text-green-950 sm:text-2xl">{name}</h2>
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
          <Icon d={icons.mail} className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="truncate">{email}</span>
        </p>
      </div>

      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-green-800 ring-1 ring-emerald-100">
        <Icon d={icons.star} className="h-4 w-4" />
        Free Plan
      </span>
    </section>
  )
}

export default AccountCard
