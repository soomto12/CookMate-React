import Icon from '../Icon'
import { icons } from '../../generateConstants'

function GenerateIntro() {
  return (
    <section className="lg:col-span-2">
      <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-green-950 sm:text-4xl">
        <Icon d={icons.sparkles} className="h-8 w-8 shrink-0 text-green-700 sm:h-9 sm:w-9" />
        Generate Recipe
      </h1>
      <p className="mt-2 text-sm text-slate-500 sm:text-base">
        Tell us what you have, and let Mealio turn it into something delicious!
      </p>
    </section>
  )
}

export default GenerateIntro
