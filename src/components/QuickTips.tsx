import { Link } from 'react-router-dom'
import Icon from './Icon'

const icons = {
  chef: 'M7 14a4 4 0 01-1-7.9A5 5 0 0116 5a4 4 0 011 8.1V20H7v-6zM7 17h10',
  leaf: 'M20 3C10 3 4 8.5 4 15c0 1.4.3 2.6.8 3.6C3.6 19.8 3 21 3 21M11 19c6 0 9-7 9-16',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z',
}

const tips = [
  {
    title: 'Save time',
    text: 'Try our 30-min meals',
    icon: icons.bolt,
    tile: 'bg-amber-50 ring-amber-100',
    badge: 'bg-amber-100 text-amber-600',
  },
  {
    title: 'Reduce waste',
    text: 'Use what you have',
    icon: icons.leaf,
    tile: 'bg-emerald-50 ring-emerald-100',
    badge: 'bg-emerald-100 text-green-700',
  },
  {
    title: 'Eat healthy',
    text: 'Feel your best',
    icon: icons.heart,
    tile: 'bg-rose-50 ring-rose-100',
    badge: 'bg-rose-100 text-rose-500',
  },
]

function QuickTips() {
  return (
    <>
      <section
        aria-label="Browse recipes"
        className="mx-4 flex flex-col gap-4 rounded-2xl bg-emerald-100/70 px-5 py-5 ring-1 ring-emerald-200/60 sm:mx-8 sm:flex-row sm:items-center sm:gap-5 lg:mx-10"
      >
        <Icon d={icons.chef} className="h-12 w-12 shrink-0 text-green-900" />
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-extrabold text-green-950">No specific ingredients?</h2>
          <p className="mt-0.5 text-sm text-slate-600">
            Just browse our collection and find something tasty!
          </p>
        </div>
        <Link
          to="/recipes"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-green-800 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-green-900/20 transition hover:bg-green-900"
        >
          Explore Recipes
          <Icon d={icons.arrow} className="h-4 w-4" />
        </Link>
      </section>

      <section aria-labelledby="quick-tips" className="px-4 pb-10 pt-8 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <h2 id="quick-tips" className="flex items-center gap-2 text-xl font-extrabold text-green-950">
            <Icon d={icons.leaf} className="h-6 w-6 text-green-600" />
            Quick Tips
          </h2>
          <Link
            to="/recipes"
            className="flex items-center gap-1.5 text-sm font-bold text-green-800 transition hover:text-green-950"
          >
            See all
            <Icon d={icons.arrow} className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {tips.map((tip) => (
            <li key={tip.title} className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 ring-1 ${tip.tile}`}>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tip.badge}`}>
                <Icon d={tip.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-green-950">{tip.title}</h3>
                <p className="truncate text-xs text-slate-600">{tip.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default QuickTips
