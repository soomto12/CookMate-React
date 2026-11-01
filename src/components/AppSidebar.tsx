import logo from '../assets/Mealio Green Fork Logo.png'
import Icon from './Icon'
import { navItems } from '../generateConstants'

type AppSidebarProps = {
  current: string
  open: boolean
  onClose: () => void
}

function AppSidebar({ current, open, onClose }: AppSidebarProps) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col overflow-y-auto bg-gradient-to-b from-green-900 to-green-950 px-4 py-8 text-white transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <a href="/app" className="mb-10 flex items-center gap-2 px-3 text-3xl font-extrabold">
          <img src={logo} alt="" className="h-12 w-12 rounded-full bg-white p-0.5" />
          Mealio
        </a>

        <nav aria-label="Main navigation">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={item.href === current ? 'page' : undefined}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                    item.href === current
                      ? 'bg-green-700/60 text-white'
                      : 'text-emerald-50/90 hover:bg-white/10'
                  }`}
                >
                  <Icon d={item.icon} className="h-6 w-6 shrink-0" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-white/5 px-5 py-6">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7 shrink-0 -rotate-12 text-emerald-400"
          >
            <path d="M20 3C10 3 4 8.5 4 15c0 1.4.3 2.6.8 3.6C3.6 19.8 3 21 3 21h2c.5-.9 1.4-1.8 2.6-2.6C8.7 19 9.9 19.2 11 19.2 17 19.2 20 12 20 3z" />
          </svg>
          <p className="font-display text-lg italic leading-snug text-white/90">
            Better Food
            <br />
            Better You.
          </p>
        </div>
      </aside>
    </>
  )
}

export default AppSidebar
