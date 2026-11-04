import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'
import Icon from '../components/Icon'
import Toggle from '../components/Toggle'
import { clearSession, readUser } from '../session'
import type { CookMateUser } from '../types'

const icons = {
  menu: 'M4 6h16M4 12h16M4 18h16',
  bell: 'M6 9a6 6 0 1112 0c0 5 2 6 2 7H4c0-1 2-2 2-7zM10 20a2 2 0 004 0',
  sun: 'M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  mail: 'M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zM3.5 7l8.5 6 8.5-6',
  pencil: 'M4 20h4l10-10-4-4L4 16v4zM14 6l4 4',
  star: 'M12 3l2.1 6.3H21l-5.4 3.9 2 6.3-5.6-4-5.6 4 2-6.3L3 9.3h6.9z',
  chef: 'M7 14a4 4 0 01-1-7.9A5 5 0 0116 5a4 4 0 011 8.1V20H7v-6zM7 17h10',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z',
  clock: 'M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z',
  cart: 'M3 4h2l2.4 10.4a1 1 0 001 .6h8.2a1 1 0 001-.8L19 8H6M9 20h.01M17 20h.01',
  gear: 'M12 15a3 3 0 100-6 3 3 0 000 6zM12 2l1.2 2.6 2.8-.6.6 2.8L19 8l-1.4 2.5L19 13l-2.4 1.2.6 2.8-2.8.6L13 20l-1-2.4L10 20l-1.4-2.4-2.8-.6.6-2.8L4 13l1.4-2.5L4 8l2.4-1.2-.6-2.8 2.8.6z',
  leaf: 'M20 3C10 3 4 8.5 4 15c0 1.4.3 2.6.8 3.6C3.6 19.8 3 21 3 21M11 19c6 0 9-7 9-16',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5',
  cutlery: 'M7 3v4a2 2 0 004 0V3M9 9v12M17 3c-1.4 2-2 4-2 6h4c0-2-.6-4-2-6zM17 9v12',
  chevron: 'M9 6l6 6-6 6',
  question: 'M12 21a9 9 0 100-18 9 9 0 000 18zM9.5 9.5a2.5 2.5 0 114 2c-.8.6-1.5 1.1-1.5 2M12 17h.01',
  info: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 8h.01M11 12h1v4h1',
  logout: 'M15 17l5-5-5-5M20 12H9M13 4H6a2 2 0 00-2 2v12a2 2 0 002 2h7',
}

// TEMPORARY sample counts, shown until an account summary endpoint exists.
const SAMPLE_STATS = [
  { icon: icons.chef, value: 24, label: 'Recipes' },
  { icon: icons.heart, value: 8, label: 'Saved' },
  { icon: icons.clock, value: 12, label: 'History' },
  { icon: icons.cart, value: 3, label: 'Lists' },
]

const rowClass =
  'flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-emerald-50/70'
const rowLabelClass = 'min-w-0 flex-1 truncate text-sm font-semibold text-green-950 sm:text-base'
const rowValueClass = 'shrink-0 text-sm text-slate-500'

function Profile() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(true)

  const user = readUser<CookMateUser>()
  const name = user?.name?.trim() || 'Guest'
  const email = user?.email?.trim() || 'Not signed in'
  const initial = name[0]?.toUpperCase() || '?'

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  const preferences = [
    { icon: icons.leaf, label: 'Dietary Preferences', value: 'None', to: '/allergens' },
    { icon: icons.shield, label: 'Allergies', value: 'None', to: '/allergens' },
    { icon: icons.clock, label: 'Cooking Time', value: 'Any Time', to: '/generate' },
    { icon: icons.cutlery, label: 'Meal Type', value: 'Any', to: '/generate' },
  ]

  return (
    <div className="flex min-h-screen font-jakarta">
      <AppSidebar current="/profile" open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0 flex-1 bg-white">
        <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <header className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="sidebar"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-green-800 text-green-800 transition hover:bg-green-50 lg:hidden"
            >
              <Icon d={icons.menu} className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-extrabold tracking-tight text-green-950 sm:text-3xl">
                Profile
              </h1>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">
                Manage your account and preferences.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Notifications"
                className="flex h-11 w-11 items-center justify-center rounded-full text-green-950 transition hover:bg-emerald-100/70"
              >
                <Icon d={icons.bell} className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Toggle theme"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100/70 text-green-900 transition hover:bg-emerald-200/70"
              >
                <Icon d={icons.sun} className="h-6 w-6" />
              </button>
            </div>
          </header>

          <main className="mt-6 grid gap-4">
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
                <h2 className="truncate text-xl font-extrabold text-green-950 sm:text-2xl">
                  {name}
                </h2>
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
                {preferences.map((pref) => (
                  <li key={pref.label}>
                    <Link to={pref.to} className={rowClass}>
                      <Icon d={pref.icon} className="h-5 w-5 shrink-0 text-green-600" />
                      <span className={rowLabelClass}>{pref.label}</span>
                      <span className={rowValueClass}>{pref.value}</span>
                      <Icon d={icons.chevron} className="h-4 w-4 shrink-0 text-slate-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-label="Settings"
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100"
            >
              <ul className="divide-y divide-emerald-50">
                <li>
                  <button type="button" className={rowClass}>
                    <Icon d={icons.sun} className="h-5 w-5 shrink-0 text-green-600" />
                    <span className={rowLabelClass}>Appearance</span>
                    <span className={rowValueClass}>System</span>
                    <Icon d={icons.chevron} className="h-4 w-4 shrink-0 text-slate-400" />
                  </button>
                </li>
                <li className="flex items-center gap-3 px-5 py-4">
                  <Icon d={icons.bell} className="h-5 w-5 shrink-0 text-green-600" />
                  <span className={rowLabelClass}>Notifications</span>
                  <Toggle
                    name="notifications"
                    label=""
                    ariaLabel="Notifications"
                    checked={notifications}
                    onChange={setNotifications}
                  />
                </li>
                <li>
                  <button type="button" className={rowClass}>
                    <Icon d={icons.question} className="h-5 w-5 shrink-0 text-green-600" />
                    <span className={rowLabelClass}>Help &amp; Support</span>
                    <Icon d={icons.chevron} className="h-4 w-4 shrink-0 text-slate-400" />
                  </button>
                </li>
                <li>
                  <button type="button" className={rowClass}>
                    <Icon d={icons.info} className="h-5 w-5 shrink-0 text-green-600" />
                    <span className={rowLabelClass}>About Mealio</span>
                    <Icon d={icons.chevron} className="h-4 w-4 shrink-0 text-slate-400" />
                  </button>
                </li>
              </ul>
            </section>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-rose-50 px-6 py-4 text-sm font-bold text-rose-600 ring-1 ring-rose-100 transition hover:bg-rose-100 sm:text-base"
            >
              <Icon d={icons.logout} className="h-5 w-5" />
              Log Out
            </button>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Profile
