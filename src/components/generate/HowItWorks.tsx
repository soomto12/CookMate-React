import Icon from '../Icon'
import { icons, steps } from '../../generateConstants'

/** The right-hand help panel: numbered steps and the tagline. */
function HowItWorks() {
  return (
    <aside aria-label="Recipe generator help" className="flex flex-col gap-8">
      <section className="rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100/60">
        <h2 className="flex items-center gap-3 text-base font-bold text-green-950">
          <Icon d={icons.sparkles} className="h-6 w-6 text-green-700" />
          How it works
        </h2>
        <ol className="mt-5 flex flex-col gap-5">
          {steps.map((step, i) => (
            <li key={step} className="flex items-start gap-4 text-sm leading-6 text-slate-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-800 text-xs font-bold text-white">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <p className="-rotate-6 font-display text-2xl italic leading-snug text-green-900">
        Better ingredients.
        <br />
        Better meals.
      </p>
    </aside>
  )
}

export default HowItWorks
